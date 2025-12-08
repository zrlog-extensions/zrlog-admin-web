import { Button, Grid } from "antd";
import { EyeOutlined, SaveOutlined, SendOutlined } from "@ant-design/icons";
import { getRealRouteUrl, getRes } from "../../utils/constants";
import { ArticleEditState, ArticleEntry } from "./index.types";
import { FunctionComponent, useEffect, useRef } from "react";
import styled from "styled-components";
import { getAppState } from "../../base/ConfigProviderApp";
import { AIContent } from "@editor/dist/src/ai/AIContentItem";
import AIButton from "@editor/dist/src/ai/AIButton";
import AIIcon from "@editor/dist/src/ai/AIIcon";
import { useAxiosBaseInstance } from "../../base/AppBase";
import { getAiDrawerOpen } from "@editor/dist/src/ai/AIDrawer";
import { getEditorUser } from "../../utils/helpers";

type ArticleEditActionBarProps = {
    data: ArticleEditState;
    fullScreen: boolean;
    offline: boolean;
    onSubmit: (article: ArticleEntry, release: boolean, preview: boolean, autoSave: boolean) => Promise<void>;
    getContainer?: () => HTMLElement;
    onAiMessagesChange?: (messages: AIContent[]) => void;
    onAiDrawerSizeChange?: (newSize: number) => void;
    aiDrawerWidth?: number | "default" | "large";
};

const StyledActionBar = styled(`div`)`
    .ant-btn {
        -webkit-transition: none;
        box-shadow: none;
    }

    .btn {
        min-width: 120px;
    }

    @media screen and (max-width: 576px) {
        .btn {
            min-width: 40px;
        }
    }
`;

const ArticleEditActionBar: FunctionComponent<ArticleEditActionBarProps> = ({
    data,
    offline,
    fullScreen,
    onSubmit,
    getContainer,
    onAiMessagesChange,
    onAiDrawerSizeChange,
    aiDrawerWidth,
}) => {
    const enterBtnRef = useRef<HTMLAnchorElement | HTMLButtonElement>(null);

    const { useBreakpoint } = Grid;
    const screens = useBreakpoint();

    const axiosInstance = useAxiosBaseInstance(getContainer);

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
                if (enterBtnRef.current && !getAiDrawerOpen()) {
                    enterBtnRef.current.click();
                }
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
        <StyledActionBar style={{ display: "flex", justifyContent: "end", gap: 8 }}>
            <AIButton
                aiProvider={data.aiProvider}
                apiUri={"/api/admin/article/ai"}
                input={""}
                aiMessages={data.aiMessages ? data.aiMessages : []}
                subject={data.article.title}
                sessionId={data.article.logId ? data.article.logId : 0}
                getContainer={getContainer}
                onAiMessagesChange={onAiMessagesChange}
                axiosInstance={axiosInstance}
                user={getEditorUser()}
                drawerWidth={aiDrawerWidth}
                dark={getAppState().dark}
                configUrl={getRealRouteUrl("/website/ai")}
                onSizeChange={onAiDrawerSizeChange}
            >
                <Button
                    className={"btn"}
                    type={"primary"}
                    style={{
                        background: `linear-gradient(135deg, #6253e1, ${getAppState().colorPrimary})`,
                        border: "none",
                    }}
                >
                    <AIIcon name={data.aiProvider} />
                    {screens.sm && <span>{getRes()["admin.ai"]}</span>}
                </Button>
            </AIButton>

            <Button
                className={"btn"}
                type={fullScreen ? "default" : "dashed"}
                disabled={offline || (data.saving.rubbishSaving && !data.saving.autoSaving)}
                onClick={async () => await onSubmit(data.article, false, false, false)}
            >
                <SaveOutlined hidden={data.saving.rubbishSaving} />
                {screens.sm && <span>{data.saving.rubbishSaving ? getRes().saving : getRes().saveAsDraft}</span>}
            </Button>
            <Button
                className={"btn"}
                type="dashed"
                disabled={offline || (data.saving.previewIng && !data.saving.autoSaving)}
                style={{ display: fullScreen ? "none" : "flex" }}
                onClick={async () => await onSubmit(data.article, !data.rubbish, true, false)}
            >
                <EyeOutlined />
                {screens.sm && getRes().preview}
            </Button>
            <Button
                ref={enterBtnRef}
                type="primary"
                className={"btn"}
                disabled={offline}
                loading={data.saving.releaseSaving}
                onClick={async () => {
                    await onSubmit(data.article, true, false, false);
                }}
            >
                <SendOutlined />
                {screens.sm && <span>{data.article.privacy === true ? getRes()["save"] : getRes().release}</span>}
            </Button>
        </StyledActionBar>
    );
};
export default ArticleEditActionBar;
