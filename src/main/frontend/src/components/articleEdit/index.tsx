import { FunctionComponent, useEffect, useRef, useState } from "react";
import { App, Grid, InputRef, message, Space } from "antd";
import Row from "antd/es/grid/row";
import Col from "antd/es/grid/col";
import Divider from "antd/es/divider";
import Title from "antd/es/typography/Title";
import Card from "antd/es/card";
import { createUri, getRes, updateUri } from "../../utils/constants";
import Select from "antd/es/select";
import BaseInput from "../../common/BaseInput";
import EnvUtils, { isOffline } from "../../utils/env-utils";
import EditorStatistics, { toStatisticsByMarkdown } from "../../common/editor/editor-statistics-info";
import { useAxiosBaseInstance } from "../../base/AppBase";
import ArticleEditSettingButton from "./article-edit-setting-button";
import { ArticleChangeableValue, ArticleEditProps, ArticleEditState, ArticleEntry } from "./index.types";
import ArticleEditActionBar from "./article-edit-action-bar";
import {
    articleDataToState,
    articleSaveToCache,
    removeArticleCache,
    removeLocalArticleCache,
} from "../../utils/article-cache";
import ArticleEditFullscreenButton from "./article-edit-fullscreen-button";
import { auditTime, concatMap, Subject, tap } from "rxjs";
import { Subscription } from "rxjs/internal/Subscription";
import { deepEqualWithSpecialJSON, disableExitTips, enableExitTips } from "../../utils/helpers";
import MarkedEditor from "../../common/editor/marked-editor";
import { useLocation } from "react-router";
import { getPageDataCacheKeyByPath } from "../../utils/cache";
import RubbishText from "./RubbishText";

const Index: FunctionComponent<ArticleEditProps> = ({
    offline,
    data,
    onExitFullScreen,
    onFullScreen,
    fullScreen,
    updateCache,
}) => {
    const location = useLocation();
    const editCardRef = useRef<HTMLDivElement>(null);

    const defaultState = articleDataToState(data);
    const [state, setState] = useState<ArticleEditState>(defaultState);

    const aliasRef = useRef<InputRef>(null);
    const digestRef = useRef<InputRef>(null);
    const versionRef = useRef<number>(defaultState.article.version);
    const logIdRef = useRef<number>(defaultState.article.logId ? defaultState.article.logId : -1);
    const subjectRef = useRef<Subject<ArticleEntry> | null>(null);
    const subRef = useRef<Subscription | null>(null);
    let pendingMessages = 0;

    const [messageApi, messageContextHolder] = message.useMessage({
        maxCount: 3,
        getContainer: () => editCardRef.current as HTMLElement,
    });
    const { modal } = App.useApp();
    const axiosInstance = useAxiosBaseInstance(() => editCardRef.current as HTMLElement);

    const updateRubbishState = (newArticle: ArticleEntry, create: boolean) => {
        setState((prevState) => ({
            ...prevState,
            rubbish: true,
            article: doMergeArticle(prevState.article, newArticle, create),
            saving: {
                ...prevState.saving,
                rubbishSaving: false,
                previewIng: false,
                autoSaving: false,
            },
        }));
    };

    const updateReleaseState = (newArticle: ArticleEntry, create: boolean) => {
        setState((prevState) => ({
            ...prevState,
            rubbish: false,
            article: doMergeArticle(prevState.article, newArticle, create),
            saving: {
                ...prevState.saving,
                releaseSaving: false,
                rubbishSaving: false,
                previewIng: false,
                autoSaving: false,
            },
        }));
    };

    const persistToCache = (newArticle: ArticleEntry) => {
        articleSaveToCache(newArticle);
        setState((prevState) => {
            return {
                ...prevState,
                article: newArticle,
                saving: {
                    ...prevState.saving,
                    releaseSaving: false,
                    rubbishSaving: false,
                    previewIng: false,
                    autoSaving: false,
                },
            };
        });

        //没有堆积的消息了，才能触发移除强制离开页面的提示
        if (pendingMessages === 0) {
            disableExitTips();
        }
    };

    const onSubmit = async (article: ArticleEntry, release: boolean, preview: boolean, autoSave: boolean) => {
        let newArticle = {
            ...article,
            version: versionRef.current,
            rubbish: !release,
        };
        if (isOffline()) {
            persistToCache(article);
            return;
        }
        //do check
        if (isTitleError(article)) {
            messageApi.error({ content: getRes()["article_require_title"] });
            return;
        }
        if (isTypeError(article)) {
            messageApi.error(getRes()["article_require_type"]);
            return;
        }
        //非自动保存的情况下，需要清空当前缓存队列
        if (!autoSave) {
            setSubject();
        }
        let uri;
        const create = article.logId === undefined || article.logId === null || article.logId <= 0;
        if (create) {
            uri = createUri;
        } else {
            uri = updateUri;
        }
        if (release) {
            setState((prevState) => {
                return {
                    ...prevState,
                    saving: {
                        ...prevState.saving,
                        releaseSaving: true,
                        autoSaving: autoSave,
                    },
                };
            });
        } else {
            setState((prevState) => {
                return {
                    ...prevState,
                    saving: {
                        ...prevState.saving,
                        rubbishSaving: true,
                        previewIng: preview,
                        autoSaving: autoSave,
                    },
                };
            });
        }

        enableExitTips(getRes()["articleEditExitWithOutSaveSuccess"]);
        try {
            let responseData;
            try {
                const { data } = await axiosInstance.post(uri, newArticle);
                responseData = data;
                if (data.error) {
                    modal.error({
                        title: "保存失败",
                        content: data.message,
                        getContainer: () => editCardRef.current as HTMLElement,
                    });
                    return;
                }
                if (data.data) {
                    versionRef.current = data.data.article.version;
                }
            } finally {
                //@ts-ignore
            }
            const data = responseData;
            if (data.error === 0) {
                //没有堆积的消息了，才能触发移除强制离开页面的提示
                if (pendingMessages === 0) {
                    disableExitTips();
                }
                if (!autoSave) {
                    messageApi.info(data.message);
                }
                if (preview) {
                    window.open(data.data.article["previewUrl"], "_blank");
                }
                const responseArticle = data.data.article;
                const url = new URL(window.location.href);
                if (create) {
                    logIdRef.current = responseArticle.logId;
                    url.searchParams.set("id", responseArticle.logId);
                    newArticle = { ...newArticle, ...responseArticle };
                    removeLocalArticleCache();
                    window.history.replaceState(null, "", url.toString());
                } else {
                    newArticle = {
                        ...newArticle,
                        thumbnail: responseArticle.thumbnail,
                        lastUpdateDate: responseArticle.lastUpdateDate,
                        version: responseArticle.version,
                    };
                    removeArticleCache(newArticle);
                }
                const cacheKey = getPageDataCacheKeyByPath(location.pathname, "?" + url.searchParams.toString());
                if (updateCache) {
                    updateCache(data.data, cacheKey);
                }
            }
        } finally {
            // 根据 release 的值调用对应的状态更新回调函数
            release ? updateReleaseState(newArticle, create) : updateRubbishState(newArticle, create);
        }
    };

    const doMergeArticle = (
        stateArticle: ArticleEntry,
        updateResponseArticle: ArticleEntry,
        create: boolean
    ): ArticleEntry => {
        const mergeArticle = {
            ...updateResponseArticle,
            logId: updateResponseArticle.logId,
            lastUpdateDate: updateResponseArticle.lastUpdateDate,
            version: updateResponseArticle.version,
            thumbnail:
                stateArticle.thumbnail && stateArticle.thumbnail.trim().length > 0
                    ? stateArticle.thumbnail
                    : updateResponseArticle.thumbnail,
        };
        //处理文章别名
        if (aliasRef.current && aliasRef.current.input) {
            if (aliasRef.current.input.value.trim().length === 0 && create) {
                mergeArticle.alias = updateResponseArticle.alias;
                aliasRef.current.input.value = updateResponseArticle.alias as string;
            } else {
                mergeArticle.alias = aliasRef.current.input.value;
            }
        }
        //处理摘要
        if (digestRef.current && digestRef.current.input) {
            if (digestRef.current.input.value.trim().length === 0 && create) {
                mergeArticle.digest = updateResponseArticle.digest;
                digestRef.current.input.value = updateResponseArticle.digest as string;
            } else {
                //mergeArticle.digest = digestRef.current.input.value;
            }
        }
        return mergeArticle;
    };

    const isSaving = () => {
        return state.saving.rubbishSaving || state.saving.releaseSaving || state.saving.previewIng;
    };

    useEffect(() => {
        const newState = articleDataToState(data);
        //如果文章内容没有变更，不更新 state，避免触发更新导致文章状态不对
        if (deepEqualWithSpecialJSON(newState.article, data.article)) {
            console.info("Skip article data useEffect() " + JSON.stringify(data.article.logId));
            return;
        }

        //仅设置状态，同时覆盖版本信息
        versionRef.current = newState.article.version;
        if (newState.article.logId) {
            logIdRef.current = newState.article.logId;
        } else {
            logIdRef.current = -1;
        }
        handleValuesChange(newState.article);
    }, [data]);

    useEffect(() => {
        //如果文章内容没有变更，不更新 state，避免触发更新导致文章状态不对
        if (deepEqualWithSpecialJSON(state.article, data.article)) {
            console.info("Skip article data useEffect() " + JSON.stringify(data.article.logId));
            return;
        }
        if (offline) {
            articleSaveToCache(state.article);
            return;
        } else {
            //覆盖版本信息
            versionRef.current = state.article.version;
            handleValuesChange(state.article);
        }
    }, [offline]);

    const setSubject = () => {
        if (subRef.current) {
            subRef.current.unsubscribe();
        }
        subjectRef.current = new Subject();
        // 订阅 Subject，只在 2 秒内没有新事件时更新状态
        const subscription = subjectRef.current
            .pipe(
                tap(() => {
                    enableExitTips(getRes()["articleEditExitWithOutSaveSuccess"]);
                }),
                auditTime(2000),
                tap(() => {
                    pendingMessages += 1; // 有新消息进入，标记为“待处理”
                }),
                concatMap(async (article) => {
                    // 确保顺序执行
                    pendingMessages -= 1;
                    //console.log("Submitting:", nextValue);
                    article.logId = logIdRef.current;
                    try {
                        await onSubmit(article, false, false, true);
                    } catch (e) {
                        console.error(e);
                    }
                })
            )
            .subscribe();
        if (subRef.current) {
            subRef.current = subscription;
        }
    };

    useEffect(() => {
        // 初始化 Subject，仅在组件挂载时创建一次
        setSubject();
        // 在组件卸载时清理订阅
        return () => {
            if (subRef.current) {
                subRef.current.unsubscribe();
            }
        };
    }, []);

    const isTitleError = (changedArticle: ArticleEntry) => {
        return changedArticle.title === undefined || changedArticle.title === null || changedArticle.title === "";
    };

    const isTypeError = (changedArticle: ArticleEntry) => {
        return changedArticle.typeId === undefined || changedArticle.typeId === null || changedArticle.typeId < 0;
    };

    const validForm = (changedArticle: ArticleEntry): boolean => {
        const titleError = isTitleError(changedArticle);
        const typeError = isTypeError(changedArticle);
        return !(titleError || typeError);
    };

    const handleValuesChange = (cv: ArticleChangeableValue) => {
        setState((prev) => {
            const newArticle = { ...prev.article, ...cv };
            //没有验证通过的情况下，保存本地缓存
            if (!validForm(newArticle)) {
                persistToCache(newArticle);
            } else {
                const sub = subjectRef.current;
                if (sub) {
                    sub.next(newArticle);
                }
            }
            return { ...prev, article: newArticle };
        });
    };

    const { useBreakpoint } = Grid;
    const screens = useBreakpoint();

    const getBaseHeight = () => {
        if (screens.md) {
            return 85;
        }
        if (screens.sm) {
            return 85 + 38;
        }
        return 85 + 38 + 40;
    };

    const getEditorHeight = () => {
        const baseHeight = (fullScreen ? 0 : 12 + 64 + 33 + 52) + 30 + 4 + getBaseHeight();
        return `calc(100vh - ${baseHeight}px)`;
    };

    return (
        <>
            <div style={{ paddingTop: fullScreen ? 0 : 20, gap: 8, display: "flex", justifyContent: "space-between" }}>
                <Title className="page-header" style={{ marginTop: 0, marginBottom: 0 }} level={3} hidden={fullScreen}>
                    {getRes()["admin.log.edit"]}
                </Title>
                {!fullScreen && (
                    <ArticleEditActionBar
                        key={data.article.logId + "actionbar_offline:" + offline}
                        fullScreen={fullScreen}
                        offline={offline}
                        data={state}
                        onSubmit={onSubmit}
                    />
                )}
            </div>
            {!fullScreen && <Divider style={{ marginTop: 16, marginBottom: 16 }} />}
            {messageContextHolder}
            <Card
                title={""}
                ref={editCardRef}
                style={{
                    borderRadius: fullScreen ? 0 : 8,
                    overflow: "hidden",
                }}
                styles={{
                    body: {
                        padding: 0,
                    },
                }}
            >
                <Row
                    gutter={[8, 0]}
                    style={{
                        position: "relative",
                        borderBottom: EnvUtils.isDarkMode() ? "1px solid rgba(253, 253, 253, 0.12)" : "1px solid #DDD",
                    }}
                >
                    <Col md={fullScreen ? 4 : 8} xl={9} xxl={12} xs={24} sm={fullScreen ? 4 : 6}>
                        <BaseInput
                            maxLength={100}
                            variant={"borderless"}
                            size={"large"}
                            key={data.article.version}
                            placeholder={getRes().inputArticleTitle}
                            defaultValue={state.article.title ? state.article.title : undefined}
                            onChange={(e) => {
                                handleValuesChange({ title: e });
                            }}
                            style={{ fontSize: 22, fontWeight: 500, textOverflow: "ellipsis" }}
                        />
                    </Col>
                    <Col
                        md={fullScreen ? 8 : 13}
                        xxl={fullScreen ? 7 : 10}
                        xs={24}
                        sm={fullScreen ? 8 : 12}
                        style={{ display: "flex", alignItems: "center" }}
                    >
                        <Space.Compact style={{ display: "flex", width: "100%" }} hidden={fullScreen}>
                            <Select
                                getPopupContainer={(triggerNode) => triggerNode.parentElement}
                                variant={"borderless"}
                                style={{
                                    minWidth: 156,
                                    paddingLeft: 0,
                                    display: "flex",
                                    zIndex: 20,
                                }}
                                size={"large"}
                                value={state.article.typeId}
                                showSearch={true}
                                optionFilterProp="children"
                                filterOption={(input, option) => (option?.label ?? "").includes(input)}
                                filterSort={(optionA, optionB) =>
                                    (optionA?.label ?? "")
                                        .toLowerCase()
                                        .localeCompare((optionB?.label ?? "").toLowerCase())
                                }
                                onChange={(value) => {
                                    handleValuesChange({ typeId: value });
                                }}
                                options={state.typeOptions}
                                placeholder={getRes()["pleaseChoose"] + getRes()["admin.type.manage"]}
                            />
                            <BaseInput
                                ref={aliasRef}
                                defaultValue={state.article.alias}
                                onChange={(e) => {
                                    handleValuesChange({ alias: e });
                                }}
                                key={data.article.version}
                                maxLength={256}
                                size={"large"}
                                variant={"borderless"}
                                placeholder={getRes().inputArticleAlias}
                                style={{ fontSize: 16, minWidth: 48, paddingLeft: 0, textOverflow: "ellipsis" }}
                            />
                            <RubbishText
                                offline={offline}
                                rubbish={state.rubbish}
                                lastUpdateDate={state.article.lastUpdateDate}
                                fullScreen={fullScreen}
                            />
                        </Space.Compact>
                    </Col>
                    <Col
                        md={fullScreen ? 6 : 4}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-end",
                            position: "absolute",
                            right: 0,
                            top: 0,
                        }}
                    >
                        {fullScreen && (
                            <Col xxl={9} md={12} sm={18} xs={16} style={{ padding: 0 }}>
                                <ArticleEditActionBar
                                    offline={offline}
                                    fullScreen={fullScreen}
                                    data={state}
                                    onSubmit={onSubmit}
                                />
                            </Col>
                        )}
                        <ArticleEditSettingButton
                            initDigest={data.article.digest ? data.article.digest : ""}
                            digestRef={digestRef}
                            article={state.article}
                            saving={isSaving()}
                            tags={state.tags}
                            containerRef={editCardRef}
                            handleValuesChange={handleValuesChange}
                        />
                        <ArticleEditFullscreenButton
                            fullScreen={fullScreen}
                            fullScreenElement={editCardRef.current as HTMLDivElement}
                            onExitFullScreen={onExitFullScreen}
                            onFullScreen={onFullScreen}
                        />
                    </Col>
                </Row>
                <MarkedEditor
                    fullscreen={fullScreen}
                    height={getEditorHeight()}
                    loadSuccess={() => {
                        //ignore
                    }}
                    content={state.article.content ? state.article.content : ""}
                    getContainer={() => {
                        return editCardRef.current as HTMLDivElement;
                    }}
                    value={state.article.markdown}
                    onChange={(v) => {
                        if (
                            v.markdown === "" &&
                            (state.article.markdown === "" ||
                                state.article.markdown === undefined ||
                                state.article.markdown === null)
                        ) {
                            return;
                        }
                        //不检查 content，避免因为 markdown 渲染库升级，载入文章时自动更新为草稿
                        if (v.markdown === state.article.markdown) {
                            return;
                        }
                        handleValuesChange(v);
                    }}
                />
                <EditorStatistics data={toStatisticsByMarkdown(state.article.markdown)} fullScreen={fullScreen} />
            </Card>
        </>
    );
};

export default Index;
