import { Badge, Card } from "antd";
import { getBackendServerUrl, getRealRouteUrl, getRes } from "../../utils/constants";
import Meta from "antd/es/card/Meta";
import Col from "antd/es/grid/col";
import { TemplateEntry } from "./index";
import { FunctionComponent, useState } from "react";
import { CheckOutlined, DeleteOutlined, EyeOutlined, LoadingOutlined, SettingOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import Popconfirm from "antd/es/popconfirm";
import { useAxiosBaseInstance } from "../../base/AppBase";
import Tags from "../../common/Tags";

type TemplateCardProps = {
    template: TemplateEntry;
    onUpdate: () => void;
};

const TemplateCard: FunctionComponent<TemplateCardProps> = ({ template, onUpdate }) => {
    const axiosInstance = useAxiosBaseInstance();

    const [applying, setApplying] = useState<boolean>(false);

    const preview = (shortTemplate: string) => {
        axiosInstance.post("/api/admin/template/preview?shortTemplate=" + shortTemplate).then(() => {
            window.open(document.baseURI, "_blank");
            onUpdate();
        });
    };

    const apply = (shortTemplate: string) => {
        setApplying(true);
        axiosInstance
            .post("/api/admin/template/apply?shortTemplate=" + shortTemplate)
            .then(() => {
                onUpdate();
            })
            .finally(() => {
                setApplying(false);
            });
    };

    const deleteTemplate = (shortTemplate: string) => {
        axiosInstance.post("/api/admin/template/delete?shortTemplate=" + shortTemplate).then(() => {
            onUpdate();
        });
    };

    const getActions = (template: TemplateEntry) => {
        const links = [];
        links.push(
            <div onClick={() => preview(template.shortTemplate)}>
                <EyeOutlined key="preview" />
            </div>,
            <Link to={getRealRouteUrl("/template-config?shortTemplate=" + template.shortTemplate)}>
                <SettingOutlined key="setting" />
            </Link>,
            <Link
                to={"#apply"}
                onClick={(e) => {
                    e.preventDefault();
                    apply(template.shortTemplate);
                }}
            >
                {applying ? <LoadingOutlined /> : <CheckOutlined />}
            </Link>
        );
        if (template.deleteAble) {
            links.push(
                <Popconfirm
                    title={getRes()["deleteTips"]}
                    onConfirm={() => {
                        deleteTemplate(template.shortTemplate);
                    }}
                >
                    <DeleteOutlined key="delete" />
                </Popconfirm>
            );
        }
        return links;
    };

    return (
        <>
            <Col md={6} xxl={4} xs={24}>
                <Badge.Ribbon
                    text={
                        template.use
                            ? getRes()["admin.theme.inUse"]
                            : template.preview
                            ? getRes()["admin.theme.inPreview"]
                            : ""
                    }
                    style={{
                        fontSize: 16,
                        display: template.use || template.preview ? "" : "none",
                    }}
                >
                    <Card
                        hoverable={true}
                        cover={
                            <div style={{ overflow: "hidden" }}>
                                <div style={{ position: "absolute", top: 8, left: 8 }}>
                                    <Tags
                                        keywords={
                                            "v" +
                                            template.version +
                                            (template.tags ? "," + template.tags.join(",") : "")
                                        }
                                    />
                                </div>
                                <img
                                    style={{ width: "100%", minHeight: 250 }}
                                    alt={template.name}
                                    title={template.name}
                                    src={getBackendServerUrl() + template.adminPreviewImage.substring(1)}
                                />
                            </div>
                        }
                        actions={getActions(template)}
                    >
                        <Meta title={template.name} description={template.digest} />
                    </Card>
                </Badge.Ribbon>
            </Col>
        </>
    );
};

export default TemplateCard;
