import AppBase, { useAxiosBaseInstance } from "base/AppBase";
import { FunctionComponent, useEffect, useState } from "react";
import { getRes, isStaticPage, setBackendServerUrl, setRes } from "../utils/constants";
import Init from "../components/init";
import Spin from "antd/es/spin";
import UnknownErrorPage from "../components/unknown-error-page";
import { AppState } from "../type";
import { changeAppState } from "./ConfigProviderApp";
import { isOffline } from "../utils/env-utils";

type AppInitProps = {
    offline: boolean;
    lang: string;
    onInit: (data: AppState) => void;
};

type AppInitState = {
    resLoaded: boolean;
    resLoadErrorMsg: string;
    requiredBackendServerUrl: boolean;
};

export const getColorPrimaryByRes = (): string => {
    const color: string | undefined = getRes()["admin_color_primary"];
    if (color === undefined || (color as string).length === 0) {
        return "#1677ff";
    }
    return color;
};

const getPreferredColorScheme = (): string => {
    if (window.matchMedia) {
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            return "dark";
        } else {
            return "dark";
        }
    }
    return "light";
};

export const isDarkModeByRes = (): boolean => {
    const configDarkMode = getRes()["admin_darkMode"];
    if (configDarkMode !== undefined) {
        return configDarkMode;
    }
    return getPreferredColorScheme() === "dark";
};

export const isCompactModeByRes = (): boolean => {
    return getRes()["admin_compactMode"] === true;
};

const AppInit: FunctionComponent<AppInitProps> = ({ lang, offline }) => {
    const [appState, setAppState] = useState<AppInitState>({
        resLoaded: false,
        resLoadErrorMsg: "",
        requiredBackendServerUrl: false,
    });

    const axiosInstance = useAxiosBaseInstance();

    const loadResourceFromServer = (baseUrl: string) => {
        const resourceApi = "/api/public/adminResource";
        if (baseUrl.length > 0) {
            axiosInstance.defaults.baseURL = baseUrl;
        }
        axiosInstance
            .get(resourceApi)
            .then(({ data }: { data: Record<string, any> }) => {
                if (baseUrl.length > 0) {
                    setBackendServerUrl(baseUrl);
                }
                handleRes(data.data);
            })
            .catch((e) => {
                const errorMsg =
                    "Request " + axiosInstance.defaults.baseURL + resourceApi.substring(1) + " error -> " + e.message;
                //console.info(errorMsg);
                if (isStaticPage()) {
                    setAppState((prevState) => {
                        return {
                            ...prevState,
                            resLoaded: true,
                            requiredBackendServerUrl: true,
                        };
                    });
                    return;
                }
                setAppState((prevState) => {
                    return {
                        ...prevState,
                        resLoadErrorMsg: errorMsg,
                        resLoaded: false,
                    };
                });
            });
    };
    const handleRes = (data: Record<string, never>) => {
        // @ts-ignore
        data.copyrightTips =
            data.copyright + ' <a target="_blank" href="https://blog.zrlog.com/about.html?footer">ZrLog</a>';
        // @ts-ignore
        if (window.inited === undefined || window.inited === null) {
            setRes(data);
            changeAppState({
                offline: isOffline(),
                lang: data.lang,
                dark: isDarkModeByRes(),
                colorPrimary: getColorPrimaryByRes(),
                compactMode: isCompactModeByRes(),
            });
            // @ts-ignore
            window.inited = true;
        }

        setAppState((prevState) => {
            return {
                ...prevState,
                resLoadErrorMsg: "",
                resLoaded: true,
                requiredBackendServerUrl: false,
            };
        });
    };

    const initRes = () => {
        const resourceData = getRes();
        if (resourceData === null || Object.keys(resourceData).length === 0) {
            loadResourceFromServer("");
        } else {
            handleRes(resourceData);
        }
    };

    useEffect(() => {
        initRes();
    }, []);

    if (appState.requiredBackendServerUrl) {
        return (
            <Init
                lang={lang}
                onSubmit={(backendServerUrl) => {
                    loadResourceFromServer(backendServerUrl);
                }}
            />
        );
    } else if (appState.resLoaded) {
        return <AppBase offline={offline} />;
    } else if (appState.resLoadErrorMsg.length === 0) {
        return <Spin delay={1000} fullscreen={true} />;
    }
    return (
        <UnknownErrorPage
            code={500}
            data={{ message: appState.resLoadErrorMsg }}
            style={{ width: "100vw", height: "100vh" }}
        />
    );
};

export default AppInit;
