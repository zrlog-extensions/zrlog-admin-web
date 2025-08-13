import { App, ConfigProvider, theme } from "antd";
import { useEffect, useState } from "react";
import { isOffline } from "../utils/env-utils";
import { getContextPath } from "../utils/helpers";
import zh_CN from "antd/es/locale/zh_CN";
import en_US from "antd/es/locale/en_US";
import { legacyLogicalPropertiesTransformer, StyleProvider } from "@ant-design/cssinjs";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppInit, { getColorPrimaryByRes, isCompactModeByRes, isDarkModeByRes } from "./AppInit";
import { AppColorPrimaryState, AppCompactModeState, AppDarkState, AppState } from "../type";

const { darkAlgorithm, defaultAlgorithm, compactAlgorithm } = theme;

type ChangeAbleState = AppCompactModeState | AppColorPrimaryState | AppDarkState;

export const changeAppState = (appState: ChangeAbleState | AppState) => {
    //@ts-ignore
    window.changeAppState(appState);
};

const getDefaultAppState = (): AppState => {
    return {
        lang: document.documentElement.lang ? document.documentElement.lang : "zh_CN",
        dark: isDarkModeByRes(),
        colorPrimary: getColorPrimaryByRes(),
        offline: isOffline(),
        compactMode: isCompactModeByRes(),
    };
};

let gAppState = getDefaultAppState();

export const getAppState = (): AppState => {
    console.info(gAppState);
    return gAppState;
};

const ConfigProviderApp = () => {
    const [appState, setState] = useState<AppState>(gAppState);

    const updateOnlineStatus = () => {
        setState((prevState) => {
            return {
                ...prevState,
                offline: isOffline(),
            };
        });
    };

    useEffect(() => {
        //@ts-ignore
        window.changeAppState = (newAppState: ChangeAbleState) => {
            setState((prevState) => {
                gAppState = {
                    ...prevState,
                    ...newAppState,
                };
                return gAppState;
            });
        };
        window.addEventListener("online", updateOnlineStatus);
        window.addEventListener("offline", updateOnlineStatus);
        // Cleanup event listeners on component unmount
        return () => {
            window.removeEventListener("online", updateOnlineStatus);
            window.removeEventListener("offline", updateOnlineStatus);
        };
    }, []);

    const basePath = getContextPath() + "admin";

    useEffect(() => {
        window.document.body.setAttribute("class", appState.dark ? "dark" : "light");
    }, [appState.dark]);

    const themeAlgorithms = [];

    if (appState.dark) {
        themeAlgorithms.push(darkAlgorithm);
    } else {
        themeAlgorithms.push(defaultAlgorithm);
    }

    if (appState.compactMode) {
        themeAlgorithms.push(compactAlgorithm);
    }

    return (
        <ConfigProvider
            //key={appState.lang + "_" + appState.dark + "_" + appState.colorPrimary}
            locale={appState.lang.startsWith("zh") ? zh_CN : en_US}
            theme={{
                algorithm: themeAlgorithms,
                token: {
                    colorPrimary: appState.colorPrimary,
                },
            }}
            componentSize={appState.compactMode ? "small" : undefined}
            table={{
                style: {
                    whiteSpace: "nowrap",
                },
            }}
            divider={{
                style: {
                    margin: "16px 0",
                },
            }}
            card={{
                styles: {
                    header: {
                        padding: "0 8px",
                        lineHeight: "24px",
                        minHeight: appState.compactMode ? 36 : 42,
                    },
                    body: {
                        padding: 8,
                    },
                },
            }}
        >
            <App>
                <StyleProvider transformers={[legacyLogicalPropertiesTransformer]}>
                    <BrowserRouter
                        basename={basePath}
                        future={{
                            v7_relativeSplatPath: true,
                            v7_startTransition: true,
                        }}
                    >
                        <Routes>
                            <Route
                                path={"/*"}
                                element={
                                    <AppInit
                                        lang={appState.lang}
                                        offline={appState.offline}
                                        onInit={(newState) => {
                                            setState((prevState) => {
                                                return {
                                                    ...prevState,
                                                    ...newState,
                                                };
                                            });
                                        }}
                                    />
                                }
                            />
                        </Routes>
                    </BrowserRouter>
                </StyleProvider>
            </App>
        </ConfigProvider>
    );
};

export default ConfigProviderApp;
