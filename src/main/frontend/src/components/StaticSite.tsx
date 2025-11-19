import { FunctionComponent, useState } from "react";
import { AdminCommonProps } from "../type";
import { FloatButton, message } from "antd";
import { useAxiosBaseInstance } from "../base/AppBase";
import { LoadingOutlined, SyncOutlined } from "@ant-design/icons";
import { cacheIgnoreReloadTime } from "../utils/constants";

type StaticSiteData = {
    synced: boolean;
};

type StaticSiteState = {
    synced: boolean;
    syncing: boolean;
};

const StaticSite: FunctionComponent<AdminCommonProps<StaticSiteData>> = ({ data }) => {
    const [state, setState] = useState<StaticSiteState>({
        synced: data.synced,
        syncing: false,
    });

    const axiosBaseInstance = useAxiosBaseInstance();

    const [messageApi, messageContextHolder] = message.useMessage({
        maxCount: 3,
    });

    return (
        <>
            {messageContextHolder}
            <FloatButton
                style={{
                    display: state.synced ? "none" : "inherit",
                }}
                onClick={async () => {
                    setState({
                        synced: false,
                        syncing: true,
                    });
                    const { data } = await axiosBaseInstance.post("/api/admin/static-site/startSync");
                    if (data.error) {
                        messageApi.error("同步失败 -> " + data.message);
                        setState({
                            synced: false,
                            syncing: false,
                        });
                        return;
                    }
                    if (data.data as StaticSiteData) {
                        if (data.data.synced) {
                            messageApi.success("同步完成");
                            setState({
                                synced: data.data.synced,
                                syncing: false,
                            });
                            const url = new URL(window.location.href);
                            url.searchParams.set(cacheIgnoreReloadTime, new Date().getTime() + "");
                            window.location.replace(url.toString());
                        } else {
                            messageApi.info("同步未完成");
                            setState({
                                synced: false,
                                syncing: false,
                            });
                        }
                    }
                }}
                icon={state.syncing ? <LoadingOutlined /> : <SyncOutlined />}
            />
        </>
    );
};

export default StaticSite;
