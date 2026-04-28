import { HomeOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Alert, Button, Col, FloatButton, Layout, Row, Tag, Typography } from "antd";

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
import { useLocation } from "react-router-dom";
import { PageHeaderContext } from "../base/PageHeaderContext";

const { Header, Content, Sider } = Layout;
const { Text } = Typography;

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
    const location = useLocation();

    const sliderStateKey = "sliderOpen";
    const panelStateKey = "sliderPanelOpen";

    const mobileDevice = 576;

    const needCollSlider = (s: ScreenMap) => {
        if (window.innerWidth < mobileDevice) {
            const state = getCacheByKey(sliderStateKey);
            return state === undefined || state === null || state;
        }
        return s.xs === true;
    };
    const defaultHiddenSlider = needCollSlider(screens);
    const [hiddenSlider, setHiddenSlider] = useState(defaultHiddenSlider);
    const [panelOpen, setPanelOpen] = useState<boolean>(getCacheByKey(panelStateKey) === true);

    useEffect(() => {
        setHiddenSlider(needCollSlider(screens));
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
        return getAppState().compactMode ? 72 : 80;
    };

    const getPanelWidth = () => {
        return getAppState().compactMode ? 228 : 248;
    };

    const mobileMode = screens.xs === true;
    const desktopNavWidth = panelOpen ? getPanelWidth() : getSiderWidth();

    const toggleNavigation = () => {
        if (mobileMode) {
            const newState = !hiddenSlider;
            addToCache(sliderStateKey, newState);
            setHiddenSlider(newState);
            return;
        }
        const newState = !panelOpen;
        addToCache(panelStateKey, newState);
        setPanelOpen(newState);
    };

    const getHeaderMeta = () => {
        const pathname = location.pathname.split(".")[0];
        const searchParams = new URLSearchParams(location.search);

        if (pathname === "" || pathname === "/" || pathname === "/index") {
            return { title: getRes()["dashboard"], subtitle: getRes()["admin.management"] };
        }
        if (pathname.startsWith("/article-edit")) {
            return { title: getRes()["admin.log.edit"], subtitle: getRes()["blogManage"] };
        }
        if (pathname.startsWith("/article")) {
            return {
                title: searchParams.get("status") === "draft" ? getRes()["articleDraft"] : getRes()["blogManage"],
                subtitle: getRes()["admin.management"],
            };
        }
        if (pathname.startsWith("/article-type")) {
            return { title: getRes()["admin.type.manage"], subtitle: getRes()["blogManage"] };
        }
        if (pathname.startsWith("/nav")) {
            return { title: getRes()["admin.nav.manage"], subtitle: getRes()["admin.management"] };
        }
        if (pathname.startsWith("/link")) {
            return { title: getRes()["admin.link.manage"], subtitle: getRes()["admin.management"] };
        }
        if (pathname.startsWith("/comment")) {
            return { title: getRes()["admin.comment.manage"], subtitle: getRes()["admin.management"] };
        }
        if (pathname.startsWith("/plugin")) {
            return { title: getRes()["admin.plugin.manage"], subtitle: getRes()["admin.setting"] };
        }
        if (pathname.startsWith("/template-center")) {
            return { title: getRes()["templateCenter"], subtitle: getRes()["admin.setting"] };
        }
        if (pathname.startsWith("/system")) {
            return { title: getRes()["systemInfo"], subtitle: getRes()["admin.setting"] };
        }
        if (pathname.startsWith("/user-update-password")) {
            return { title: getRes()["admin.changePwd"], subtitle: getRes()["admin.user.info"] };
        }
        if (pathname.startsWith("/user")) {
            return { title: getRes()["admin.user.info"], subtitle: getRes()["admin.setting"] };
        }
        if (pathname.startsWith("/website/version") || pathname.startsWith("/upgrade")) {
            return { title: getRes()["admin.version"], subtitle: getRes()["admin.setting"] };
        }
        if (pathname.startsWith("/website/template")) {
            return { title: getRes()["admin.template.manage"], subtitle: getRes()["admin.setting"] };
        }
        if (pathname.startsWith("/website/ai")) {
            return { title: getRes()["admin.ai.manage"], subtitle: getRes()["admin.setting"] };
        }
        if (pathname.startsWith("/website/other")) {
            return { title: getRes()["admin.other.manage"], subtitle: getRes()["admin.setting"] };
        }
        if (pathname.startsWith("/website/blog")) {
            return { title: getRes()["admin.blog.manage"], subtitle: getRes()["admin.setting"] };
        }
        if (pathname.startsWith("/website/admin")) {
            return { title: getRes()["admin.basic.manage"], subtitle: getRes()["admin.setting"] };
        }
        if (pathname.startsWith("/website")) {
            return { title: getRes()["admin.setting"], subtitle: getRes()["admin.management"] };
        }
        return { title: getRes()["admin.management"], subtitle: getRes()["websiteTitle"] };
    };

    const headerMeta = getHeaderMeta();

    const getSidebarBrand = (showLabel: boolean) => {
        return (
            <a
                href={getRes()["homeUrl"] + "?spm=admin&buildId=" + getRes()["buildId"]}
                className={`sidebar-brand ${showLabel ? "sidebar-brand-expanded" : "sidebar-brand-collapsed"}`}
                target="_blank"
                title={getRes()["websiteTitle"]}
                rel="noopener noreferrer"
            >
                <span className="sidebar-brand-mark">
                    <HomeOutlined />
                </span>
                {showLabel && (
                    <span className="sidebar-brand-copy">
                        <span className="sidebar-brand-title">{getRes()["websiteTitle"]}</span>
                        <span className="sidebar-brand-subtitle">Admin Console</span>
                    </span>
                )}
            </a>
        );
    };

    const getMainButton = () => {
        return (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-start", minWidth: 0 }}>
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
                        type="text"
                        shape="circle"
                        onClick={toggleNavigation}
                        icon={
                            mobileMode ? (
                                hiddenSlider ? (
                                    <MenuUnfoldOutlined />
                                ) : (
                                    <MenuFoldOutlined />
                                )
                            ) : panelOpen ? (
                                <MenuFoldOutlined />
                            ) : (
                                <MenuUnfoldOutlined />
                            )
                        }
                        style={{
                            width: 44,
                            height: 44,
                            color: getAppState().dark ? "rgba(255,255,255,0.88)" : "#0f0f0f",
                            background: "transparent",
                            boxShadow: "none",
                            fontSize: 20,
                        }}
                    />
                </div>
                <div className="header-title-block">
                    <Text className="header-title-eyebrow">{headerMeta.subtitle}</Text>
                    <Text className="header-title-main" ellipsis>
                        {headerMeta.title}
                    </Text>
                </div>
            </div>
        );
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
                        backgroundColor: getAppState().dark ? "rgba(18, 18, 18, 0.82)" : "rgba(255, 255, 255, 0.82)",
                        backdropFilter: "blur(20px) saturate(180%)",
                        WebkitBackdropFilter: "blur(20px) saturate(180%)",
                        paddingLeft: 0,
                        paddingRight: getAppState().compactMode ? 12 : 16,
                        borderBottom: getAppState().dark
                            ? "1px solid rgba(255,255,255,0.06)"
                            : "1px solid rgba(15,23,42,0.06)",
                    }}
                >
                    {getMainButton()}
                    <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0 }}>
                        <SpotlightSearch compact />
                        {offline && (
                            <Tag
                                bordered={false}
                                style={{
                                    marginInlineEnd: 0,
                                    borderRadius: 999,
                                    paddingInline: 10,
                                    height: 30,
                                    lineHeight: "30px",
                                    fontSize: 12,
                                    fontWeight: 600,
                                    backgroundColor: getAppState().dark
                                        ? "rgba(255, 120, 117, 0.16)"
                                        : "rgba(255, 77, 79, 0.10)",
                                    color: getAppState().dark ? "#ffb3b0" : "#cf1322",
                                }}
                            >
                                {getRes()["admin.offline.short"]}
                            </Tag>
                        )}
                        <UserInfo offline={offline} data={basicUserInfo} />
                    </div>
                </Header>
                <Row
                    style={{
                        position: "relative",
                        minHeight: getMainHeight(),
                    }}
                >
                    {!mobileMode && !fullScreen && (
                        <Sider
                            width={desktopNavWidth}
                            style={{
                                position: "absolute",
                                zIndex: 1000,
                                top: 0,
                                left: 0,
                                height: "100%",
                                backgroundColor: getAppState().dark
                                    ? "rgba(26, 26, 26, 0.86)"
                                    : "rgba(255, 255, 255, 0.88)",
                                backdropFilter: "blur(18px) saturate(160%)",
                                WebkitBackdropFilter: "blur(18px) saturate(160%)",
                                borderRight: getAppState().dark
                                    ? "1px solid rgba(255,255,255,0.08)"
                                    : "1px solid rgba(15,23,42,0.08)",
                                overflow: "hidden",
                                transition: "width 0.22s cubic-bezier(0.2, 0, 0, 1)",
                                boxShadow: panelOpen
                                    ? getAppState().dark
                                        ? "18px 0 36px rgba(0,0,0,0.34)"
                                        : "18px 0 36px rgba(15,23,42,0.08)"
                                    : "none",
                            }}
                        >
                            <div className="sidebar-shell">
                                {getSidebarBrand(panelOpen)}
                                <SliderMenu expanded={panelOpen} />
                            </div>
                        </Sider>
                    )}

                    {mobileMode && (
                        <Sider
                            width={getPanelWidth()}
                            style={{
                                opacity: fullScreen || hiddenSlider ? 0 : 1,
                                position: "absolute",
                                zIndex: 1001,
                                top: 0,
                                left: hiddenSlider ? `-${getPanelWidth()}px` : "0",
                                height: "100%",
                                transform: fullScreen || hiddenSlider ? "translateX(-100%)" : "translateX(0)",
                                backgroundColor: getAppState().dark
                                    ? "rgba(26, 26, 26, 0.95)"
                                    : "rgba(255, 255, 255, 0.95)",
                                backdropFilter: "blur(20px) saturate(180%)",
                                WebkitBackdropFilter: "blur(20px) saturate(180%)",
                                borderRight: getAppState().dark
                                    ? "1px solid rgba(255,255,255,0.08)"
                                    : "1px solid rgba(15,23,42,0.08)",
                            }}
                        >
                            <div className="sidebar-shell">
                                {getSidebarBrand(true)}
                                <SliderMenu expanded={true} />
                            </div>
                        </Sider>
                    )}

                    {/* MD3 Scrim (Backdrop) */}
                    {((mobileMode && !hiddenSlider) || (!mobileMode && panelOpen)) && !fullScreen && (
                        <div
                            onClick={() => {
                                if (mobileMode) {
                                    addToCache(sliderStateKey, true);
                                    setHiddenSlider(true);
                                } else {
                                    addToCache(panelStateKey, false);
                                    setPanelOpen(false);
                                }
                            }}
                            style={{
                                position: "fixed",
                                top: getHeaderHeight(),
                                left: 0,
                                width: "100vw",
                                height: `calc(100vh - ${getHeaderHeight()}px)`,
                                backgroundColor: mobileMode ? "rgba(0,0,0,0.32)" : "rgba(15,23,42,0.08)",
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
                            marginLeft: fullScreen ? 0 : mobileMode ? 0 : getSiderWidth(),
                            transition: "margin-left 0.2s cubic-bezier(0.2, 0, 0, 1)",
                        }}
                    >
                        <Layout style={{ minHeight: getMainHeight(), overflow: fullScreen ? "hidden" : "auto" }}>
                            <Content
                                style={{
                                    paddingTop: fullScreen ? 0 : getAppState().compactMode ? 16 : 20,
                                    paddingRight: fullScreen ? 0 : 12,
                                    paddingLeft: fullScreen ? 0 : 12,
                                    paddingBottom: fullScreen ? 0 : 12,
                                }}
                            >
                                {loading && <MyLoadingComponent />}
                                <PageHeaderContext.Provider value={{ title: headerMeta.title }}>
                                    {children}
                                </PageHeaderContext.Provider>
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
