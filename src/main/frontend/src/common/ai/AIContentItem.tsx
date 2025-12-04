import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import AIIcon from "./AIIcon";
import { getRes } from "../../utils/constants";
import HtmlPreviewPanel from "../editor/html-preview-panel";
import { CSSProperties, FunctionComponent } from "react";
import { AIProviderType, BasicUserInfo } from "../../type";
import { getCacheByKey } from "../../utils/cache";

export type Content = {
    role: string;
    content: string;
    htmlContent: string;
};

type AIContentItemProps = {
    content: Content;
    aiProvider: AIProviderType;
    style?: CSSProperties;
};

const AIContentItem: FunctionComponent<AIContentItemProps> = ({ content, aiProvider, style }) => {
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

    if (content.role === "user") {
        return (
            <div
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
    return (
        <div style={{ ...style }}>
            <div style={{ paddingBottom: 12 }}>
                <Avatar icon={<AIIcon name={aiProvider} />} />
                <span style={{ paddingLeft: 8 }}>{getRes()["admin.ai"]}</span>
            </div>
            <HtmlPreviewPanel htmlContent={content.htmlContent} style={{ maxWidth: "90%" }} />
        </div>
    );
};

export default AIContentItem;
