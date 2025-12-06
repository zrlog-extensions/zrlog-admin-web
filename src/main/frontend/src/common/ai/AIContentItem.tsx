import { Avatar, Typography } from "antd";
import { LoadingOutlined, UserOutlined } from "@ant-design/icons";
import AIIcon from "./AIIcon";
import { getRes } from "../../utils/constants";
import HtmlPreviewPanel from "../editor/html-preview-panel";
import { CSSProperties, forwardRef, useEffect, useState } from "react";
import { AIProviderType, BasicUserInfo } from "../../type";
import { getCacheByKey } from "../../utils/cache";
import { markdownToHtmlSyncWithCallback } from "../editor/utils/marked-utils";

const { Paragraph } = Typography;

export type AIContent = {
    role: "user" | "assistant" | "";
    content: string;
    thinking: boolean;
};

type AIContentItemProps = {
    content: AIContent;
    aiProvider: AIProviderType;
    style?: CSSProperties;
    onRenderSuccess?: () => void;
};

const AIContentItem = forwardRef<HTMLDivElement, AIContentItemProps>(
    ({ content, aiProvider, style, onRenderSuccess }, ref) => {
        const getUserInfo = (): BasicUserInfo => {
            const user = getCacheByKey("/user") as BasicUserInfo;
            if (user) {
                return user;
            }
            return {
                userName: "admin",
                header: "",
                key: "",
            };
        };

        const [html, setHtml] = useState<string>("");

        const renderMd = () => {
            if (content.role === "assistant") {
                markdownToHtmlSyncWithCallback(content.content, (x) => {
                    setHtml(x);
                    setTimeout(() => {
                        if (onRenderSuccess) {
                            onRenderSuccess();
                        }
                    }, 100);
                });
            } else {
                if (onRenderSuccess) {
                    onRenderSuccess();
                }
            }
        };

        useEffect(() => {
            renderMd();
        }, []);

        useEffect(() => {
            renderMd();
        }, [content.content]);

        if (content.role === "user") {
            return (
                <div
                    ref={ref}
                    style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "end",
                        flexFlow: "column",
                        alignItems: "end",
                        ...style,
                    }}
                >
                    <div style={{ paddingBottom: 12, float: "right" }}>
                        <Avatar
                            src={getUserInfo().header}
                            icon={getUserInfo().header.length === 0 ? <UserOutlined /> : <></>}
                        />
                        <span style={{ paddingLeft: getUserInfo().userName.length > 0 ? 8 : 0 }}>
                            {getUserInfo().userName}
                        </span>
                    </div>
                    <div style={{ maxWidth: "90%" }}>
                        <span>{content.content}</span>
                    </div>
                </div>
            );
        }

        const getAIReplyContent = () => {
            if (content.thinking || content.content.length === 0) {
                return (
                    <>
                        <span style={{ paddingRight: 8 }}>{getRes()["admin.ai.thinking"]}</span>
                        <LoadingOutlined />
                    </>
                );
            }
            return (
                <>
                    <HtmlPreviewPanel htmlContent={html} style={{ maxWidth: "90%" }} />
                    <Paragraph copyable={{ text: content.content }} style={{ paddingTop: 8 }} />
                </>
            );
        };

        return (
            <div style={{ ...style }} ref={ref}>
                <div style={{ paddingBottom: 12 }}>
                    <Avatar icon={<AIIcon name={aiProvider} />} />
                    <span style={{ paddingLeft: 8 }}>{getRes()["admin.ai"]}</span>
                </div>
                {getAIReplyContent()}
            </div>
        );
    }
);

export default AIContentItem;
