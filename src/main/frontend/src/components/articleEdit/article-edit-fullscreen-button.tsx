import { FullscreenExitOutlined, FullscreenOutlined } from "@ant-design/icons";
import EnvUtils, { isPWA } from "../../utils/env-utils";
import { Button } from "antd";
import screenfull from "screenfull";
import { FunctionComponent, useEffect } from "react";
import { FullScreenProps } from "./index.types";

type ArticleEditFullscreenButton = FullScreenProps & {
    fullScreenElement: HTMLDivElement;
};

const ArticleEditFullscreenButton: FunctionComponent<ArticleEditFullscreenButton> = ({
    fullScreenElement,
    onExitFullScreen,
    onFullScreen,
    fullScreen,
}) => {
    const toggleFullScreen = () => {
        if (fullScreen) {
            onfullscreenExit();
        } else {
            onfullscreen();
        }
    };

    const onfullscreen = () => {
        try {
            if (screenfull.isEnabled) {
                screenfull
                    .request(fullScreenElement)
                    .then(() => {
                        //ignore
                    })
                    .catch((e) => {
                        console.error(e);
                    });
            }
        } catch (e) {
            console.error(e);
        } finally {
            onFullScreen();
        }
    };

    const onfullscreenExit = () => {
        if (screenfull.isEnabled) {
            screenfull
                .exit()
                .then(() => {
                    onExitFullScreen();
                })
                .catch((e) => {
                    console.error(e);
                });
        }
    };

    /**
     * 监听：用原生事件判断状态
     */
    const nativeFullscreenChange = () => {
        const isFullscreen = !!document.fullscreenElement;
        if (isFullscreen) {
            //ignore, fullscreen required click
        } else {
            //console.log("退出全屏");
            onfullscreenExit();
        }
    };

    useEffect(() => {
        if (fullScreen && isPWA()) {
            onfullscreen();
        }
        document.addEventListener("fullscreenchange", nativeFullscreenChange);
        return () => {
            document.removeEventListener("fullscreenchange", nativeFullscreenChange);
        };
    });

    return (
        <Button
            type={"default"}
            icon={
                fullScreen ? (
                    <FullscreenExitOutlined style={{ fontSize: 24 }} />
                ) : (
                    <FullscreenOutlined style={{ fontSize: 24 }} />
                )
            }
            className={"editor-icon"}
            href={
                fullScreen
                    ? window.location.pathname + "#exitFullScreen"
                    : window.location.pathname + "#enterFullScreen"
            }
            style={{
                border: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: 47,
                minWidth: 47,
                borderRadius: 8,
                height: 47,
                fontSize: 24,
                cursor: "pointer",
                color: "rgb(102, 102, 102)",
                background: EnvUtils.isDarkMode() ? "#141414" : "white",
            }}
            onClick={(e) => {
                toggleFullScreen();
                e.stopPropagation();
                e.preventDefault();
            }}
        ></Button>
    );
};

export default ArticleEditFullscreenButton;
