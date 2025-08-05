import Col from "antd/es/grid/col";
import { Button, Grid } from "antd";
import { EyeOutlined, SaveOutlined, SendOutlined } from "@ant-design/icons";
import { getRes } from "../../utils/constants";
import { ArticleEditState, ArticleEntry } from "./index.types";
import { FunctionComponent, useEffect, useRef } from "react";
import styled from "styled-components";

type ArticleEditActionBarProps = {
    data: ArticleEditState;
    fullScreen: boolean;
    offline: boolean;
    onSubmit: (article: ArticleEntry, release: boolean, preview: boolean, autoSave: boolean) => Promise<void>;
};

const StyledActionBar = styled(Col)`
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
                if (enterBtnRef.current) {
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
        <StyledActionBar
            xxl={9}
            md={12}
            sm={18}
            xs={16}
            style={{ display: "flex", justifyContent: "end", paddingRight: 4, gap: 8 }}
        >
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
