import React, { CSSProperties, ReactElement, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getRealRouteUrl, getRes } from "../utils/constants";
import {
    ApiFilled,
    ApiOutlined,
    AppstoreFilled,
    AppstoreOutlined,
    CommentOutlined,
    ContainerFilled,
    ContainerOutlined,
    DashboardFilled,
    DashboardOutlined,
    EditFilled,
    EditOutlined,
    SettingFilled,
    SettingOutlined,
} from "@ant-design/icons";
import { Menu, MenuProps, Modal } from "antd";
import { useLocation } from "react-router";
import { tryBlock } from "../utils/helpers";
import { getAppState } from "../base/ConfigProviderApp";

type MenuItem = Required<MenuProps>["items"][number];

type MenuEntry = {
    link: string;
    selectIcon: ReactElement;
    icon: ReactElement;
    text: string;
};

type IconInfo = { selected: boolean; icon: ReactElement };

export function colorToRgba(color: string, alpha: number) {
    if (color.startsWith("#")) {
        // Convert hexadecimal to rgba
        const hex = color.slice(1);
        let bigint;
        if (hex.length === 3) {
            bigint = parseInt(hex, 16) * 0x10101;
        } else if (hex.length === 6) {
            bigint = parseInt(hex, 16);
        } else {
            throw new Error("Invalid hexadecimal color format");
        }
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    } else if (color.startsWith("rgba(")) {
        // Extract alpha from rgba and replace with the specified alpha
        return color.replace(/[^,]+(?=\))/, alpha.toString());
    } else if (color.startsWith("rgb(")) {
        // Convert rgb to rgba
        return `rgba(${color.slice(color.indexOf("(") + 1, color.lastIndexOf(","))}, ${alpha})`;
    } else {
        throw new Error("Unsupported color format");
    }
}

const SliderMenu = () => {
    const location = useLocation();
    const [modal, contextHolder] = Modal.useModal();

    const getInfo = (entry: MenuEntry): IconInfo => {
        let realPathName = location.pathname.split(".")[0];
        if (realPathName === "/") {
            realPathName = "/index";
        }
        if (realPathName.startsWith("/website") && entry.link.startsWith("/website")) {
            return { selected: true, icon: entry.selectIcon };
        }
        if (realPathName === entry.link) {
            return { selected: true, icon: entry.selectIcon };
        }
        if (entry.link !== "#more") {
            return { selected: false, icon: entry.icon };
        }
        if (
            realPathName.startsWith("/link") ||
            realPathName.startsWith("/nav") ||
            realPathName.startsWith("/article-type")
        ) {
            return { selected: true, icon: entry.selectIcon };
        }
        return { selected: false, icon: entry.icon };
    };

    const getIconSize = () => {
        if (getAppState().compactMode) {
            return 20;
        }
        return 24;
    };

    function getItem(entry: MenuEntry, key: React.Key | null, children: MenuItem[]): MenuItem {
        const info = getInfo(entry);
        const label = (
            <Link
                to={getRealRouteUrl(entry.link)}
                style={{
                    color: info.selected && getAppState().dark ? getAppState().colorPrimary : "#FFF",
                }}
                onClick={(e) => {
                    tryBlock(e, modal);
                }}
            >
                {info.icon}
                <span className="menu-title">{entry.text}</span>
            </Link>
        );
        const style: CSSProperties = {
            margin: 0,
            borderRadius: 0,
            width: "100%",
            color: "#FFF",
        };
        if (info.selected) {
            style.background = colorToRgba(getAppState().colorPrimary, 0.3);
        }
        if (children.length > 0) {
            return {
                key,
                children,
                label,
                style,
            } as MenuItem;
        }
        return {
            key,
            label,
            style,
        } as MenuItem;
    }

    const items: MenuItem[] = [
        getItem(
            {
                text: getRes().dashboard,
                link: "/index",
                selectIcon: <DashboardFilled style={{ fontSize: getIconSize() }} />,
                icon: <DashboardOutlined style={{ fontSize: getIconSize() }} />,
            },
            "/index",
            []
        ),
        getItem(
            {
                text: getRes()["admin.log.edit"],
                link: "/article-edit",
                selectIcon: <EditFilled style={{ fontSize: getIconSize() }} />,
                icon: <EditOutlined style={{ fontSize: getIconSize() }} />,
            },
            "/article-edit",
            []
        ),
        getItem(
            {
                text: getRes()["blogManage"],
                link: "/article",
                selectIcon: <ContainerFilled style={{ fontSize: getIconSize() }} />,
                icon: <ContainerOutlined style={{ fontSize: getIconSize() }} />,
            },
            "/article",
            []
        ),
        getItem(
            {
                text: getRes()["admin.comment.manage"],
                link: "/comment",
                selectIcon: <CommentOutlined style={{ fontSize: getIconSize() }} />,
                icon: <CommentOutlined style={{ fontSize: getIconSize() }} />,
            },
            "/comment",
            []
        ),
        getItem(
            {
                text: getRes()["admin.plugin.manage"],
                link: "/plugin",
                selectIcon: <ApiFilled style={{ fontSize: getIconSize() }} />,
                icon: <ApiOutlined style={{ fontSize: getIconSize() }} />,
            },
            "/plugin",
            []
        ),
        getItem(
            {
                text: getRes()["admin.setting"],
                link: "/website",
                selectIcon: <SettingFilled style={{ fontSize: getIconSize() }} />,
                icon: <SettingOutlined style={{ fontSize: getIconSize() }} />,
            },
            "/website",
            []
        ),
        getItem(
            {
                text: getRes()["admin.more"],
                link: "#more",
                selectIcon: <AppstoreFilled style={{ fontSize: getIconSize() }} />,
                icon: <AppstoreOutlined style={{ fontSize: getIconSize() }} />,
            },
            "/more",
            [
                getItem(
                    {
                        text: getRes()["admin.type.manage"],
                        link: "/article-type",
                        selectIcon: <span />,
                        icon: <span />,
                    },
                    "/article-type",
                    []
                ),
                getItem(
                    {
                        text: getRes()["admin.link.manage"],
                        link: "/link",
                        selectIcon: <span />,
                        icon: <span />,
                    },
                    "/link",
                    []
                ),
                getItem(
                    {
                        text: getRes()["admin.nav.manage"],
                        link: "/nav",
                        selectIcon: <span />,
                        icon: <span />,
                    },
                    "/nav",
                    []
                ),
            ]
        ),
    ];

    const getSelectMenu = () => {
        if (location.pathname === "") {
            return "/index";
        } else if (location.pathname.startsWith("/website")) {
            return "/website";
        } else if (
            location.pathname === "/link" ||
            location.pathname === "/nav" ||
            location.pathname === "/article-type"
        ) {
            return "/more";
        } else {
            return location.pathname;
        }
    };

    const defaultSelectMenu = getSelectMenu();

    const [selectMenu, setSelectMenu] = useState<string>(defaultSelectMenu);

    useEffect(() => {
        setSelectMenu(getSelectMenu());
    }, [location]);

    return (
        <>
            {contextHolder}
            <Menu
                selectedKeys={[selectMenu]}
                items={items}
                theme={getAppState().dark ? "light" : "dark"}
                style={{
                    minHeight: "100%",
                    backgroundColor: getAppState().dark ? "#1f1f1f" : "#001529",
                    borderInlineEnd: "unset",
                }}
            />
        </>
    );
};
export default SliderMenu;
