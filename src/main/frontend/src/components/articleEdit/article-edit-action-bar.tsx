import { Button, Grid } from "antd";
import { EyeOutlined, SaveOutlined, SendOutlined } from "@ant-design/icons";
import { getRes } from "../../utils/constants";
import { ArticleEditState, ArticleEntry } from "./index.types";
import { FunctionComponent, useEffect, useRef } from "react";
import styled from "styled-components";
import AIIcon from "../../common/ai/AIIcon";
import { getAppState } from "../../base/ConfigProviderApp";
import AIButton from "../../common/ai/AIButton";
import { getAiDrawerOpen } from "../../common/ai/AIDrawer";
import { AIContent } from "../../common/ai/AIContentItem";

type ArticleEditActionBarProps = {
    data: ArticleEditState;
    fullScreen: boolean;
    offline: boolean;
    onSubmit: (article: ArticleEntry, release: boolean, preview: boolean, autoSave: boolean) => Promise<void>;
    getContainer?: () => HTMLElement;
    onAiMessagesChange?: (messages: AIContent[]) => void;
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
}) => {
    const enterBtnRef = useRef<HTMLAnchorElement | HTMLButtonElement>(null);

    const { useBreakpoint } = Grid;
    const screens = useBreakpoint();

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
                aiMessages={data.aiMessages}
                subject={data.article.title}
                sessionId={data.article.logId ? data.article.logId : 0}
                getContainer={getContainer}
                onAiMessagesChange={onAiMessagesChange}
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
