import { App, ConfigProvider, theme } from "antd";
import { useEffect, useState } from "react";
import { isOffline } from "../utils/env-utils";
import { getContextPath } from "../utils/helpers";
import zh_CN from "antd/es/locale/zh_CN";
import en_US from "antd/es/locale/en_US";
import { legacyLogicalPropertiesTransformer, StyleProvider } from "@ant-design/cssinjs";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppInit, { getColorPrimaryByRes, getLangByRes, isCompactModeByRes, isDarkModeByRes } from "./AppInit";
import { AppColorPrimaryState, AppCompactModeState, AppDarkState, AppLangState, AppState } from "../type";

const { darkAlgorithm, defaultAlgorithm, compactAlgorithm } = theme;

type ChangeAbleState = AppCompactModeState | AppColorPrimaryState | AppDarkState | AppLangState;

export const changeAppState = (appState: ChangeAbleState | AppState) => {
    //@ts-ignore
    window.changeAppState(appState);
};

const getDefaultAppState = (): AppState => {
    return {
        lang: getLangByRes(),
        dark: isDarkModeByRes(),
        colorPrimary: getColorPrimaryByRes(),
        offline: isOffline(),
        compactMode: isCompactModeByRes(),
    };
};

let gAppState = getDefaultAppState();

export const getAppState = (): AppState => {
    //console.info(gAppState);
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

    useEffect(() => {
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
            locale={appState.lang.startsWith("en") ? en_US : zh_CN}
            theme={{
                algorithm: themeAlgorithms,
                token: {
                    colorPrimary: appState.colorPrimary,
                    borderRadius: 10,
                    wireframe: false,
                    fontSize: 14,
                    lineHeight: 1.65,
                    // Premium multi-layer shadows
                    boxShadow: appState.dark
                        ? "0 1px 3px 0 rgba(0, 0, 0, 0.4), 0 1px 2px -1px rgba(0, 0, 0, 0.3)"
                        : "0 1px 3px 0 rgba(0, 0, 0, 0.06), 0 1px 2px -1px rgba(0, 0, 0, 0.04)",
                    boxShadowSecondary: appState.dark
                        ? "0 10px 40px rgba(0, 0, 0, 0.5), 0 2px 8px rgba(0, 0, 0, 0.4)"
                        : "0 10px 40px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)",
                    // Sophisticated background colors with subtle tints
                    colorBgContainer: appState.dark ? "#1a1a1a" : "#ffffff",
                    colorBgElevated: appState.dark ? "#222222" : "#ffffff",
                },
                components: {
                    Menu: {
                        itemBorderRadius: 10,
                        itemMarginInline: 8,
                        itemSelectedBg: appState.dark
                            ? `linear-gradient(135deg, ${appState.colorPrimary}22, ${appState.colorPrimary}33)`
                            : `linear-gradient(135deg, ${appState.colorPrimary}15, ${appState.colorPrimary}25)`,
                    },
                    Card: {
                        borderRadiusLG: 16,
                        paddingLG: 24,
                        // Premium multi-layer card shadow
                        boxShadow: appState.dark
                            ? "0 4px 16px rgba(0, 0, 0, 0.4), 0 1px 4px rgba(0, 0, 0, 0.3)"
                            : "0 2px 12px rgba(0, 0, 0, 0.06), 0 1px 4px rgba(0, 0, 0, 0.03), 0 0 1px rgba(0, 0, 0, 0.02)",
                        boxShadowTertiary: appState.dark
                            ? "0 8px 24px rgba(0, 0, 0, 0.5)"
                            : "0 8px 24px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)",
                    },
                    Button: {
                        borderRadius: 8,
                        controlHeight: 32,
                        fontWeight: 500,
                        primaryShadow: appState.dark
                            ? "0 2px 8px rgba(0, 0, 0, 0.4)"
                            : `0 2px 8px ${appState.colorPrimary}30, 0 1px 2px ${appState.colorPrimary}20`,
                    },
                    Input: {
                        borderRadius: 8,
                        controlHeight: 32,
                        activeShadow: `0 0 0 3px ${appState.colorPrimary}15`,
                        hoverBorderColor: appState.colorPrimary,
                    },
                    Layout: {
                        // Subtle tinted backgrounds for depth
                        colorBgBody: appState.dark ? "#0a0a0a" : "#f8f9fb",
                        colorBgHeader: appState.dark ? "#1a1a1a" : "#ffffff",
                        colorBgLayout: appState.dark ? "#0f0f0f" : "#f8f9fb",
                    },
                    Table: {
                        borderRadius: 12,
                        headerBg: appState.dark ? "#1f1f1f" : "#f7f8fa",
                        headerColor: appState.dark ? "#e0e0e0" : "#1f1f1f",
                        rowHoverBg: appState.dark ? "#252525" : "#f5f7fa",
                        borderColor: appState.dark ? "#2a2a2a" : "#e8eaed",
                        cellPaddingBlock: 16,
                        cellPaddingInline: 16,
                        fontSize: 14,
                    },
                    Tabs: {
                        borderRadius: 8,
                    },
                    Divider: {
                        colorSplit: appState.dark ? "#2a2a2a" : "#e8eaed",
                    },
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
                        padding: "0 16px",
                        minHeight: appState.compactMode ? 36 : 48,
                        background: appState.dark
                            ? "linear-gradient(135deg, #1f1f1f 0%, #252525 100%)"
                            : "linear-gradient(135deg, #fafafa 0%, #ffffff 100%)",
                    },
                    body: {
                        padding: 16,
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
