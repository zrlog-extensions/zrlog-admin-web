import { DownOutlined, KeyOutlined, LogoutOutlined, SoundOutlined, UserOutlined } from "@ant-design/icons";
import { Badge, Button, MenuProps, Modal, Typography } from "antd";
import { Link } from "react-router-dom";

import Dropdown from "antd/es/dropdown";
import Image from "antd/es/image";
import Constants, { getBackendServerUrl, getRealRouteUrl, getRes, isStaticPage } from "../utils/constants";
import Divider from "antd/es/divider";
import { BasicUserInfo } from "../type";
import { tryBlock } from "../utils/helpers";
import { getAppState } from "../base/ConfigProviderApp";

const { Text } = Typography;

const UserInfo = ({ data, offline }: { data: BasicUserInfo; offline: boolean }) => {
    const [modal, contextHolder] = Modal.useModal();

    const adminSettings = (res: Record<string, never>): MenuProps["items"] => {
        let base = [
            {
                key: "1",
                label: (
                    <Link to={getRealRouteUrl("/user")} onClick={(e) => tryBlock(e, modal)}>
                        <Button icon={<UserOutlined />} type={"text"} size={"small"} style={{ padding: 0 }}>
                            {res["admin.user.info"]}
                        </Button>
                    </Link>
                ),
            },
            {
                key: "2",
                label: (
                    <Link to={getRealRouteUrl("/user-update-password")} onClick={(e) => tryBlock(e, modal)}>
                        <Button icon={<KeyOutlined />} type={"text"} size={"small"} style={{ padding: 0 }}>
                            {res["admin.changePwd"]}
                        </Button>
                    </Link>
                ),
            },
            {
                key: "-",
                label: (
                    <Divider style={{ marginTop: "5px", marginBottom: "5px", userSelect: "none", cursor: "none" }} />
                ),
            },
        ];
        if (!offline) {
            base.push({
                key: "3",
                label: (
                    <a
                        href={getBackendServerUrl() + "admin/logout" + (isStaticPage() ? "?sp=true" : "")}
                        onClick={(e) => tryBlock(e, modal)}
                    >
                        <Button icon={<LogoutOutlined />} type={"text"} size={"small"} style={{ padding: 0 }}>
                            {res["admin.user.logout"]}
                        </Button>
                    </a>
                ),
            });
        }
        if (data.lastVersion?.upgrade) {
            base = [
                {
                    key: "99",
                    label: (
                        <Link to={getRealRouteUrl("/upgrade")} onClick={(e) => tryBlock(e, modal)}>
                            <Badge
                                dot={true}
                                styles={{
                                    root: {
                                        whiteSpace: "nowrap",
                                    },
                                }}
                            >
                                <Button icon={<SoundOutlined />} type={"text"} size={"small"} style={{ padding: 0 }}>
                                    {res["newVersion"]} - ({data.lastVersion.version.version}#
                                    {data.lastVersion.version.type})
                                </Button>
                            </Badge>
                        </Link>
                    ),
                },
                ...base,
            ];
        }
        return base;
    };

    const items = adminSettings(getRes());

    const getImgSize = () => {
        if (getAppState().compactMode) {
            return 32;
        }
        return 40;
    };

    return (
        <>
            {contextHolder}
            <Dropdown menu={{ items }} placement="bottom">
                <div
                    style={{
                        color: "#ffffff",
                        borderRadius: 0,
                        marginRight: 16,
                        height: 50,
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <Image
                        preview={false}
                        fallback={Constants.getFillBackImg()}
                        className={"userAvatarImg"}
                        src={data.header}
                        style={{ lineHeight: getImgSize(), width: getImgSize(), height: getImgSize() }}
                    />
                    <Badge dot={data.lastVersion?.upgrade}>
                        <Text
                            style={{
                                color: "#ffffff",
                                paddingLeft: 8,
                            }}
                        >
                            {data.userName}
                        </Text>
                    </Badge>
                    <DownOutlined />
                </div>
            </Dropdown>
        </>
    );
};

export default UserInfo;
