import { getRes } from "../../utils/constants";
import { Button, Drawer } from "antd";
import { FunctionComponent, useEffect, useRef, useState } from "react";
import Form from "antd/es/form";
import { ArrowUpOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { useAxiosBaseInstance } from "../../base/AppBase";
import useMessage from "antd/es/message/useMessage";
import { markdownToHtmlSyncWithCallback } from "../editor/utils/marked-utils";
import { addToCache, getCacheByKey } from "../../utils/cache";
import { AIProviderType } from "../../type";
import TextArea from "antd/es/input/TextArea";
import Title from "antd/es/typography/Title";
import AIIcon from "./AIIcon";
import AIContentItem, { AIContent } from "./AIContentItem";
import { Content } from "antd/es/layout/layout";

type AIDrawerProps = {
    input: string;
    sessionId: number;
    apiUri: string;
    onClose?: () => void;
    hide: boolean;
    aiProvider: AIProviderType;
    getContainer?: () => HTMLElement;
    subject?: string;
};

type AIDrawerState = {
    open: boolean;
    input: string;
    sending: boolean;
    contents: AIContent[];
};

const aiDrawerOpenKey = "aiDrawerOpen";

export const getAiDrawerOpen = () => {
    return getCacheByKey(aiDrawerOpenKey);
};

const AIDrawer: FunctionComponent<AIDrawerProps> = ({
    sessionId,
    input,
    onClose,
    getContainer,
    apiUri,
    hide,
    aiProvider,
    subject,
}) => {
    const getAICacheKey = () => {
        return "ai/chat/" + sessionId;
    };

    const getDrawerWidthKey = () => {
        return "ai/chat/width";
    };

    const defaultContents = getCacheByKey(getAICacheKey());

    const enterBtnRef = useRef<HTMLAnchorElement | HTMLButtonElement>(null);

    const defaultWidth = getCacheByKey(getDrawerWidthKey());

    const [size, setSize] = useState<string | number>(defaultWidth ? defaultWidth : "large");

    const [state, setState] = useState<AIDrawerState>({
        open: !hide,
        input: input,
        contents: defaultContents ? defaultContents : [],
        sending: false,
    });
    const axiosBaseInstance = useAxiosBaseInstance(getContainer);
    const [messageApi, contextHolder] = useMessage({ maxCount: 3, getContainer: getContainer });

    const [form] = Form.useForm();
    const realHide = useRef<boolean>(hide);

    const onSubmit = async () => {
        const nowContents = state.contents;
        nowContents.push({
            role: "user",
            content: state.input,
            htmlContent: "",
        });
        setState((prevState) => {
            return {
                ...prevState,
                sending: true,
            };
        });
        try {
            const { data } = await axiosBaseInstance.get(
                apiUri + "?id=" + (sessionId ? sessionId : 0) + `&input=${encodeURIComponent(state.input)}`
            );
            if (data.error) {
                messageApi.error(data.message);
                setState((prevState) => {
                    return {
                        ...prevState,
                        sending: false,
                    };
                });
                return;
            }

            setState((prevState) => {
                return {
                    ...prevState,
                    sending: false,
                    input: "",
                    contents: contents,
                };
            });

            form.setFieldsValue({ input: "" });

            const contents: AIContent[] = [...state.contents, ...data.data];
            contents.map((e) => {
                markdownToHtmlSyncWithCallback(e.content, (x) => {
                    e.htmlContent = x;
                    setState((prevState) => {
                        return {
                            ...prevState,
                            contents: contents,
                        };
                    });
                });
            });
        } catch (e) {
            messageApi.error("Unknown error");
        }
    };

    const getContent = () => {
        if (state.contents.length === 0) {
            return <></>;
        }

        return (
            <div
                style={{
                    paddingRight: 16,
                    paddingLeft: 16,
                    paddingTop: 12,
                    maxHeight: "calc(100vh - 168px)",
                    maxWidth: 768,
                }}
            >
                {state.contents.map((e, idx) => {
                    return (
                        <AIContentItem key={idx} content={e} aiProvider={aiProvider} style={{ paddingBottom: 12 }} />
                    );
                })}
            </div>
        );
    };

    useEffect(() => {
        setState((prevState) => {
            return {
                ...prevState,
                open: !hide,
            };
        });
        realHide.current = hide;
    }, [hide]);

    useEffect(() => {
        addToCache(aiDrawerOpenKey, state.open);
    }, [state.open]);

    useEffect(() => {
        addToCache(getDrawerWidthKey(), size);
    }, [size]);

    useEffect(() => {
        addToCache(getAICacheKey(), state.contents);
    }, [state.contents]);

    useEffect(() => {
        setState((prevState) => {
            return {
                ...prevState,
                input: input,
            };
        });
        form.setFieldValue("input", input);
    }, [input]);

    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            // 检查是否是 macOS 系统
            const isMac = /Mac|iPhone|iPad|iPod/i.test(navigator.userAgent);

            // 检查按键组合
            if (
                (isMac && event.metaKey && event.key === "Enter") ||
                (!isMac && event.ctrlKey && event.key === "Enter")
            ) {
                // 处理 Ctrl + Enter 或 Cmd + Enter 的逻辑
                //console.log('Ctrl + Enter 或 Cmd + Enter 按下');
                if (enterBtnRef.current && getAiDrawerOpen()) {
                    enterBtnRef.current.click();
                }
                //onSubmit(data.article, true, false, false);
            }
        };

        // 绑定键盘事件
        window.addEventListener("keydown", handleKeyPress);

        // 在组件卸载时移除事件监听
        return () => {
            window.removeEventListener("keydown", handleKeyPress);
        };
    }, []);

    return (
        <Drawer
            title={
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <AIIcon name={aiProvider} />
                    <span>{getRes()["admin.ai"]} </span>
                    <span>{subject && subject.length > 0 ? "[ " + subject + " ]" : ""}</span>
                </div>
            }
            resizable={{
                onResize: (n) => {
                    if (n <= 378) {
                        setSize("default");
                    } else {
                        setSize(n);
                    }
                },
            }}
            placement="right"
            size={size as number}
            closable={{ placement: "end" }}
            keyboard={true}
            autoFocus={false}
            onClose={() => {
                setState((prevState) => {
                    return {
                        ...prevState,
                        open: false,
                    };
                });
                if (onClose) {
                    onClose();
                }
            }}
            styles={{
                header: {
                    padding: 12,
                },
                body: {
                    padding: 0,
                    overflowX: "hidden",
                },
            }}
            open={state.open}
            getContainer={getContainer}
        >
            {contextHolder}
            <Content>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        overflow: "auto",
                    }}
                >
                    {getContent()}
                    <Form
                        form={form}
                        initialValues={state}
                        style={{
                            position: "absolute",
                            width: "80%",
                            maxWidth: 768,
                            bottom: state.contents.length == 0 ? "45%" : 32,
                            justifyContent: "center",
                        }}
                        onValuesChange={(r) => {
                            setState((prevState) => {
                                return {
                                    ...prevState,
                                    ...r,
                                };
                            });
                        }}
                    >
                        {state.contents.length === 0 && (
                            <Title level={3} style={{ textAlign: "center", lineHeight: 2 }}>
                                {getRes()["admin.ai.title"]}
                            </Title>
                        )}
                        <Form.Item name={"input"} style={{ flex: 1, marginBottom: 0 }}>
                            <TextArea
                                autoFocus={true}
                                size={"large"}
                                disabled={state.sending}
                                style={{ minHeight: 48, maxHeight: 72, resize: "none" }}
                                placeholder={getRes()["admin.ai.inputTips"]}
                            />
                        </Form.Item>
                        <Button
                            ref={enterBtnRef}
                            htmlType={"submit"}
                            size={"large"}
                            type={"dashed"}
                            disabled={state.input.length === 0}
                            style={{
                                position: "absolute",
                                right: 1,
                                bottom: 1,
                                border: "none",
                                boxShadow: "none",
                                background: "inherit",
                            }}
                            loading={state.sending}
                            onClick={async () => {
                                await onSubmit();
                            }}
                        >
                            {!state.sending && <ArrowUpOutlined />}
                        </Button>
                    </Form>
                    {state.contents.length > 0 && (
                        <span style={{ position: "absolute", bottom: 6, fontSize: 12 }}>
                            <InfoCircleOutlined style={{ paddingRight: 4 }} /> {getRes()["admin.ai.contentTips"]}
                        </span>
                    )}
                </div>
            </Content>
        </Drawer>
    );
};

export default AIDrawer;
