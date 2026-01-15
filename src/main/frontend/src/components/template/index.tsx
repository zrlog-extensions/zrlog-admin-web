import Title from "antd/es/typography/Title";
import Divider from "antd/es/divider";
import Row from "antd/es/grid/row";
import { CloudDownloadOutlined } from "@ant-design/icons";
import Button from "antd/es/button";
import { useEffect, useState } from "react";
import { getBackendServerUrl, getRealRouteUrl, getRes, isStaticPage } from "../../utils/constants";
import { Link, useLocation } from "react-router-dom";
import { useAxiosBaseInstance } from "../../base/AppBase";
import { getCsrData } from "../../api";
import { addToCache } from "../../utils/cache";
import TemplateCard from "./template-card";

export type TemplateEntry = {
    template: string;
    deleteAble: boolean;
    use: boolean;
    name: string;
    shortTemplate: string;
    previewImage: string;
    adminPreviewImage: string;
    preview: boolean;
    digest: string;
    version: string;
    tags: string[];
};

const Template = ({ data }: { data: TemplateEntry[] }) => {
    const [templateState, setTemplateState] = useState<TemplateEntry[]>(data);

    const axiosInstance = useAxiosBaseInstance();

    const location = useLocation();

    const load = () => {
        getCsrData("/template", axiosInstance).then(({ data }) => {
            setTemplateState(data);
            addToCache(data, location.pathname);
        });
    };

    useEffect(() => {
        setTemplateState(data);
    }, [data]);

    const getHost = () => {
        if (isStaticPage()) {
            return new URL(getBackendServerUrl()).host;
        }
        return window.location.host;
    };

    return (
        <>
            <Title level={4}>{getRes()["admin.template.manage"]}</Title>
            <Divider />
            <Row gutter={[16, 16]}>
                {templateState.map((template) => {
                    return <TemplateCard key={template.template} template={template} onUpdate={load} />;
                })}
            </Row>
            <Divider />
            <Link to={getRealRouteUrl(`/template-center?host=${getHost()}`)}>
                <Button icon={<CloudDownloadOutlined />} type={"primary"}>
                    {getRes()["admin.theme.download"]}
                </Button>
            </Link>
        </>
    );
};

export default Template;
