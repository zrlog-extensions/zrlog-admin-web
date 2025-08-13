import { ActivityDay } from "./components/index/ActivityGraph";

export type AppCompactModeState = {
    compactMode: boolean;
};

export type AppColorPrimaryState = {
    colorPrimary: string;
};

export type AppDarkState = {
    dark: boolean;
};

export type AppLangState = {
    lang: string;
};

export type AppState = AppCompactModeState &
    AppColorPrimaryState &
    AppDarkState &
    AppLangState & {
        offline: boolean;
    };

export type UpgradeData = {
    upgrade: boolean;
    onlineUpgradable: boolean;
    disableUpgradeReason: string;
    preUpgradeKey: string;
    version: UpgradeVersion;
};

export type ApiResponse<T> = {
    data: T;
    error: number;
    message: string;
    pageBuildId: string;
    documentTitle?: string;
};

export type UpgradeVersion = {
    changeLog: string;
    buildId: string;
    type: string;
};

export type StatisticsInfoState = {
    clickCount: number;
    articleCount: number;
    commCount: number;
    toDayCommCount: number;
    loading: boolean;
    usedCacheSpace: number;
    usedDiskSpace: number;
};

export type Version = {
    type: string;
    version: string;
};

export type LastVersion = {
    upgrade: boolean;
    version: Version;
};

export type BasicUserInfo = {
    userName: string;
    header: string;
    key: string;
    lastVersion?: LastVersion;
    cacheableApiUris?: string[];
};

export type AdminCommonProps<P> = {
    data: P;
    offlineData: boolean;
    offline: boolean;
    fullScreen?: boolean;
    userInfo?: BasicUserInfo;
    pageBuildId?: string;
    systemNotification?: string;
    updateCache?: (cache: P, cacheKey: string) => void;
};

export type ServerInfoEntry = {
    name: string;
    key: string;
    value: string;
};

export type IndexData = {
    statisticsInfo: StatisticsInfoState;
    activityData: ActivityDay[];
    tips: string[];
    welcomeTip: string;
    versionInfo: string;
};

export type SystemData = {
    serverInfos: ServerInfoEntry[];
    serverInfos2: ServerInfoEntry[];
    dockerMode: boolean;
    nativeImageMode: boolean;
};
