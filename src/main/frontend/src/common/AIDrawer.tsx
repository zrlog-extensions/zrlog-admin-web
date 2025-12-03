import { getRes } from "../utils/constants";
import { Avatar, Button, Drawer } from "antd";
import { FunctionComponent, useEffect, useRef, useState } from "react";
import Form from "antd/es/form";
import { InfoCircleOutlined, OpenAIFilled, UpCircleOutlined } from "@ant-design/icons";
import { useAxiosBaseInstance } from "../base/AppBase";
import useMessage from "antd/es/message/useMessage";
import HtmlPreviewPanel from "./editor/html-preview-panel";
import { markdownToHtmlSyncWithCallback } from "./editor/utils/marked-utils";
import { getAppState } from "../base/ConfigProviderApp";
import { addToCache, getCacheByKey } from "../utils/cache";
import { BasicUserInfo } from "../type";
import TextArea from "antd/es/input/TextArea";

type AIDrawerProps = {
    input: string;
    sessionId: number;
    apiUri: string;
    onClose?: () => void;
    hide: boolean;
    getContainer?: () => HTMLElement;
};

type Content = {
    role: string;
    content: string;
    htmlContent: string;
};

type AIDrawerState = {
    open: boolean;
    input: string;
    sending: boolean;
    contents: Content[];
};

const AIDrawer: FunctionComponent<AIDrawerProps> = ({ sessionId, input, onClose, getContainer, apiUri, hide }) => {
    const getAICacheKey = () => {
        return "ai/chat/" + sessionId;
    };

    const defaultContents = getCacheByKey(getAICacheKey());

    const enterBtnRef = useRef<HTMLAnchorElement | HTMLButtonElement>(null);

    const [size, setSize] = useState<string | number>("large");

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

            const contents: Content[] = [...state.contents, ...data.data];
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

    const getUserInfo = (): BasicUserInfo => {
        return getCacheByKey("/user") as BasicUserInfo;
    };

    const getItem = (content: Content) => {
        if (content.role === "user") {
            return (
                <div
                    style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "end",
                        flexFlow: "column",
                        alignItems: "end",
                    }}
                >
                    <div style={{ paddingBottom: 12, float: "right" }}>
                        <Avatar src={getUserInfo().header} />
                        <span style={{ paddingLeft: 8 }}>{getUserInfo().userName}</span>
                    </div>
                    <div style={{ maxWidth: "90%" }}>
                        <span>{content.content}</span>
                    </div>
                </div>
            );
        }
        return (
            <>
                <div style={{ paddingBottom: 12 }}>
                    <Avatar icon={<OpenAIFilled />} />
                    <span style={{ paddingLeft: 8 }}>{getRes()["admin.ai"]}</span>
                </div>
                <div style={{ maxWidth: "90%" }}>
                    <HtmlPreviewPanel htmlContent={content.htmlContent} />
                </div>
            </>
        );
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
                    paddingTop: 8,
                    maxHeight: "calc(100vh - 168px)",
                    overflow: "scroll",
                }}
            >
                {state.contents.map((e) => {
                    return <div style={{ paddingBottom: 12 }}>{getItem(e)}</div>;
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
        addToCache(getAICacheKey(), state.contents);
    }, [state.contents]);

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
                if (enterBtnRef.current && !realHide.current) {
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
                <>
                    <OpenAIFilled /> {getRes()["admin.ai"]}
                </>
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
            closable={false}
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
                    padding: 12,
                    overflowX: "hidden",
                },
            }}
            open={state.open}
            getContainer={getContainer}
        >
            {contextHolder}
            {getContent()}
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    overflow: "hidden",
                    background: getAppState().dark ? "#141414" : "white",
                }}
            >
                <Form
                    form={form}
                    initialValues={state}
                    style={{
                        position: "absolute",
                        width: "80%",
                        display: "flex",
                        bottom: 32,
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
                    <Form.Item name={"input"} style={{ flex: 1, marginBottom: 0 }}>
                        <TextArea
                            size={"large"}
                            disabled={state.sending}
                            placeholder={getRes()["admin.ai.inputTips"]}
                        />
                    </Form.Item>
                    <Button
                        ref={enterBtnRef}
                        htmlType={"submit"}
                        size={"large"}
                        type={"link"}
                        disabled={state.input.length === 0}
                        style={{ position: "absolute", right: 2, bottom: 2 }}
                        loading={state.sending}
                        onClick={async () => {
                            await onSubmit();
                        }}
                    >
                        {!state.sending && <UpCircleOutlined />}
                    </Button>
                </Form>
                <span style={{ position: "absolute", bottom: 6, fontSize: 12 }}>
                    <InfoCircleOutlined style={{ paddingRight: 4 }} /> {getRes()["admin.ai.contentTips"]}
                </span>
            </div>
        </Drawer>
    );
};

export default AIDrawer;
