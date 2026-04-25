import { HomeOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Alert, Button, Col, FloatButton, Layout, Row } from "antd";

import { getRes } from "../utils/constants";
import { FunctionComponent, PropsWithChildren, useEffect, useState } from "react";
import UserInfo from "./user-info";
import SliderMenu from "./slider";
import { BasicUserInfo } from "../type";
import MyLoadingComponent from "../components/my-loading-component";
import PWAHandler from "../base/PWAHandler";
import StyledIndexLayout from "./styled-index-layout";
import type { ScreenMap } from "antd/es/_util/responsiveObserver";
import useBreakpoint from "antd/es/grid/hooks/useBreakpoint";
import { addToCache, getCacheByKey } from "../utils/cache";
import StaticSite from "../components/StaticSite";
import { getAppState } from "../base/ConfigProviderApp";
import { useTheme } from "antd-style";
import SpotlightSearch from "./spotlight-search";

const { Header, Content, Sider } = Layout;

type AdminManageLayoutProps = PropsWithChildren & {
    loading: boolean;
    fullScreen?: boolean;
    offline: boolean;
    basicUserInfo: BasicUserInfo;
    syncStaticSite: boolean;
    systemNotification: string;
};

const AdminManageLayout: FunctionComponent<AdminManageLayoutProps> = ({
    offline,
    children,
    loading,
    fullScreen,
    basicUserInfo,
    syncStaticSite,
    systemNotification,
}) => {
    const screens = useBreakpoint();
    const theme = useTheme();

    const sliderStateKey = "sliderOpen";

    const mobileDevice = 576;

    const needCollSlider = (s: ScreenMap) => {
        if (window.innerWidth < mobileDevice) {
            const state = getCacheByKey(sliderStateKey);
            return state === undefined || state === null || state;
        }
        return s.xs === true;
    };
    const [showSliderBtn, setShowSliderBtn] = useState<boolean>(window.innerWidth < mobileDevice);
    const defaultHiddenSlider = needCollSlider(screens);
    const [hiddenSlider, setHiddenSlider] = useState(defaultHiddenSlider);

    useEffect(() => {
        setHiddenSlider(needCollSlider(screens));
        setShowSliderBtn(screens.xs === true);
    }, [screens]);

    if (screens.xs === undefined) {
        return <></>;
    }

    const getMainHeight = () => {
        return `calc(100vh - ${getHeaderHeight()}px)`;
    };

    const getHeaderHeight = () => {
        return getAppState().compactMode ? 54 : 64;
    };

    const getSiderWidth = () => {
        return getAppState().compactMode ? 64 : 88;
    };

    const getMainButton = () => {
        const home = (
            <a
                href={getRes()["homeUrl"] + "?spm=admin&buildId=" + getRes()["buildId"]}
                className="ant-menu-item"
                target="_blank"
                title={getRes()["websiteTitle"]}
                style={{
                    height: getHeaderHeight(),
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: getSiderWidth(),
                }}
                rel="noopener noreferrer"
            >
                <HomeOutlined
                    style={{
                        fontSize: getAppState().compactMode ? 22 : 28,
                        color: getAppState().dark ? "rgb(255 255 255 / 65%)" : "#333333",
                    }}
                />
            </a>
        );
        if (showSliderBtn) {
            return (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
                    <div
                        style={{
                            textAlign: "center",
                            width: getSiderWidth(),
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Button
                            type="primary"
                            onClick={() => {
                                const newState = !hiddenSlider;
                                addToCache(sliderStateKey, newState);
                                setHiddenSlider(newState);
                            }}
                        >
                            {hiddenSlider ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        </Button>
                    </div>
                    {home}
                </div>
            );
        }
        return home;
    };

    return (
        <PWAHandler>
            <StyledIndexLayout compactMode={getAppState().compactMode} colorPrimary={getAppState().colorPrimary}>
                {systemNotification && systemNotification.length > 0 && (
                    <Alert
                        showIcon={true}
                        banner={true}
                        type={"info"}
                        title={systemNotification}
                        style={{
                            position: "fixed",
                            zIndex: theme.zIndexPopupBase,
                            top: 38,
                            borderRadius: theme.borderRadius,
                            left: "50%",
                            transform: "translateX(-50%)",
                            width: "fit-content",
                        }}
                    />
                )}
                <Header
                    style={{
                        height: getHeaderHeight(),
                        display: fullScreen ? "none" : "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        backgroundColor: getAppState().dark
                            ? "rgba(26, 26, 26, 0.85)"
                            : getAppState().colorPrimary + "10",
                        backdropFilter: "blur(20px) saturate(180%)",
                        WebkitBackdropFilter: "blur(20px) saturate(180%)",
                        paddingLeft: 0,
                    }}
                >
                    {getMainButton()}
                    {offline && (
                        <span
                            style={{
                                display: "inline-block",
                                textAlign: "center",
                                fontSize: 20,
                                paddingLeft: 24,
                                userSelect: "none",
                                color: getAppState().colorPrimary,
                                fontWeight: 600,
                                textShadow: `0 2px 8px ${getAppState().colorPrimary}40`,
                            }}
                        >
                            {getRes()["admin.offline.desc"]}
                        </span>
                    )}
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <SpotlightSearch />
                        <UserInfo offline={offline} data={basicUserInfo} />
                    </div>
                </Header>
                <Row
                    style={{
                        position: "relative",
                        minHeight: getMainHeight(),
                    }}
                >
                    <Sider
                        width={getSiderWidth()}
                        style={{
                            opacity: fullScreen || hiddenSlider ? 0 : 1,
                            position: "absolute",
                            zIndex: 1000,
                            top: 0,
                            left: hiddenSlider ? `-${getSiderWidth()}px` : "0",
                            height: "100%",
                            transform: fullScreen || hiddenSlider ? "translateX(-100%)" : "translateX(0)",
                            backgroundColor: getAppState().dark
                                ? "rgba(26, 26, 26, 0.95)"
                                : "rgba(255, 255, 255, 0.95)" /* Solidified for drawer mode */,
                            backdropFilter: "blur(20px) saturate(180%)",
                            WebkitBackdropFilter: "blur(20px) saturate(180%)",
                        }}
                    >
                        <SliderMenu />
                    </Sider>

                    {/* MD3 Scrim (Backdrop) */}
                    {!hiddenSlider && showSliderBtn && (
                        <div
                            onClick={() => {
                                addToCache(sliderStateKey, true);
                                setHiddenSlider(true);
                            }}
                            style={{
                                position: "fixed",
                                top: getHeaderHeight(),
                                left: 0,
                                width: "100vw",
                                height: `calc(100vh - ${getHeaderHeight()}px)`,
                                backgroundColor: "rgba(0,0,0,0.32)" /* MD3 standard scrim */,
                                zIndex: 999,
                                transition: "opacity 0.2s cubic-bezier(0.2, 0, 0, 1)",
                            }}
                        />
                    )}

                    <Col
                        style={{
                            flex: 1,
                            width: "100%",
                            minHeight: fullScreen ? 0 : 1,
                            marginLeft: showSliderBtn || fullScreen ? 0 : getSiderWidth(),
                            transition: "margin-left 0.2s cubic-bezier(0.2, 0, 0, 1)",
                        }}
                    >
                        <Layout style={{ minHeight: getMainHeight(), overflow: fullScreen ? "hidden" : "auto" }}>
                            <Content
                                style={{
                                    paddingRight: fullScreen ? 0 : 12,
                                    paddingLeft: fullScreen ? 0 : 12,
                                    paddingBottom: fullScreen ? 0 : 12,
                                }}
                            >
                                {loading && <MyLoadingComponent />}
                                {children}
                            </Content>
                        </Layout>
                    </Col>
                </Row>
                <FloatButton.Group>
                    {syncStaticSite && <StaticSite data={{ synced: false }} offlineData={false} offline={offline} />}
                    <FloatButton.BackTop />
                </FloatButton.Group>
            </StyledIndexLayout>
        </PWAHandler>
    );
};

export default AdminManageLayout;
