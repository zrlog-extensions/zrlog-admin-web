import Title from "antd/es/typography/Title";
import Divider from "antd/es/divider";
import Form from "antd/es/form";
import Input from "antd/es/input";
import Switch from "antd/es/switch";
import { getRealRouteUrl, getRes } from "../../utils/constants";
import Select from "antd/es/select";
import Button from "antd/es/button";
import { useEffect, useState } from "react";
import { ColorPicker, message } from "antd";
import { Admin } from "./index";
import FaviconUpload from "./FaviconUpload";
import { colorPickerBgColors } from "../../utils/helpers";
import { useAxiosBaseInstance } from "../../base/AppBase";
import zh_CN from "antd/es/locale/zh_CN";
import en_US from "antd/es/locale/en_US";
import { useLocation } from "react-router-dom";

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const { Option } = Select;

const BlogForm = ({
    data,
    offlineData,
    offline,
    onSuccess,
}: {
    data: Admin;
    offlineData: boolean;
    offline: boolean;
    onSuccess: (data: Admin) => void;
}) => {
    const [state, setState] = useState<Admin>(data);
    const [form] = Form.useForm();

    const [messageApi, contextHolder] = message.useMessage({ maxCount: 3 });
    const [loading, setLoading] = useState<boolean>(false);
    const location = useLocation();

    const axiosInstance = useAxiosBaseInstance();
    const websiteFormFinish = async (changedValues: Admin) => {
        try {
            setLoading(true);
            const { data } = await axiosInstance.post("/api/admin/website/admin", { ...form, ...changedValues });
            setLoading(false);
            if (data.error) {
                await messageApi.error(data.message);
                return;
            }
            if (data.error === 0) {
                await messageApi.success(data.message);
                onSuccess(data.data);
                window.location.search = getRealRouteUrl(location.pathname).split("?")[1];
                window.location.reload();
            } else {
                await messageApi.error(data.message);
            }
        } catch (e) {
            setLoading(false);
            await messageApi.error((e as Error).message);
        } finally {
            setLoading(false);
        }
    };

    const getItems_per_page = () => {
        if (getRes()["lang"] === "zh_CN") {
            // @ts-ignore
            return zh_CN.Pagination.items_per_page;
        }
        // @ts-ignore
        return en_US.Pagination.items_per_page;
    };

    useEffect(() => {
        setState(data);
        form.setFieldsValue(data);
    }, [data]);

    return (
        <>
            {contextHolder}
            <Form
                {...layout}
                form={form}
                disabled={offline || offlineData}
                initialValues={data}
                onValuesChange={(_k, v) => setState({ ...state, ...v })}
                onFinish={(v) => websiteFormFinish(v)}
            >
                <Title level={4}>{getRes()["admin.admin.manage"]}</Title>
                <Divider />
                <Form.Item name="admin_static_resource_base_url" label="管理页静态资源（URL）">
                    <Input style={{ maxWidth: "300px" }} placeholder="留空，及禁用" />
                </Form.Item>
                <Form.Item name="session_timeout" label="管理界面会话超时" rules={[{ required: true }]}>
                    <Input
                        suffix="分钟"
                        style={{ maxWidth: "120px" }}
                        max={99999}
                        type={"number"}
                        min={5}
                        placeholder=""
                    />
                </Form.Item>
                <Form.Item name="language" label={getRes()["language"]}>
                    <Select style={{ maxWidth: "120px" }}>
                        <Option value="zh_CN">{getRes()["languageChinese"]}</Option>
                        <Option value="en_US">{getRes()["languageEnglish"]}</Option>
                    </Select>
                </Form.Item>
                <Form.Item valuePropName="checked" name="admin_darkMode" label={getRes()["admin.dark.mode"]}>
                    <Switch size={"small"} />
                </Form.Item>
                <Form.Item name="admin_article_page_size" label={getRes()["admin_article_page_size"]}>
                    <Select
                        style={{ maxWidth: "120px" }}
                        options={[
                            {
                                value: 10,
                                label: "10 " + getItems_per_page(),
                            },
                            {
                                value: 20,
                                label: "20 " + getItems_per_page(),
                            },
                            {
                                value: 50,
                                label: "50 " + getItems_per_page(),
                            },
                            {
                                value: 100,
                                label: "100 " + getItems_per_page(),
                            },
                        ]}
                    />
                </Form.Item>
                <Form.Item label={getRes()["admin.color.primary"]}>
                    <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
                        <ColorPicker
                            value={state.admin_color_primary}
                            onChange={(color) => {
                                setState({ ...state, admin_color_primary: color.toHexString() });
                            }}
                            presets={[
                                {
                                    defaultOpen: true,
                                    label: "预设",
                                    colors: colorPickerBgColors,
                                },
                            ]}
                        />
                        <span style={{ paddingLeft: 8 }}>{state.admin_color_primary}</span>
                    </div>
                </Form.Item>
                <Form.Item name="favicon_png_pwa_192_base64" label={`${getRes()["favicon"]} PWA (192px)`}>
                    <FaviconUpload
                        url={state.favicon_png_pwa_192_base64}
                        onChange={(e) => {
                            setState({ ...state, favicon_png_pwa_192_base64: e ? e : "" });
                        }}
                    />
                </Form.Item>
                <Form.Item name="favicon_png_pwa_512_base64" label={`${getRes()["favicon"]} PWA (512px)`}>
                    <FaviconUpload
                        url={state.favicon_png_pwa_512_base64}
                        onChange={(e) => {
                            setState({ ...state, favicon_png_pwa_512_base64: e ? e : "" });
                        }}
                    />
                </Form.Item>
                <Title level={4}>文章/编辑器设置</Title>
                <Divider />

                <Form.Item name="article_auto_digest_length" label="文章自动摘要最大长度">
                    <Input
                        suffix="字"
                        style={{ maxWidth: "120px" }}
                        max={99999}
                        type={"number"}
                        min={-1}
                        placeholder=""
                    />
                </Form.Item>
                <Divider />
                <Button loading={loading} disabled={offline || offlineData} type="primary" htmlType="submit">
                    {getRes().submit}
                </Button>
            </Form>
        </>
    );
};

export default BlogForm;
