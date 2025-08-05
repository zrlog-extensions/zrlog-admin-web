import Divider from "antd/es/divider";
import Form from "antd/es/form";
import Input from "antd/es/input";
import Switch from "antd/es/switch";
import { getRes } from "../../utils/constants";
import Button from "antd/es/button";
import { useEffect, useState } from "react";
import { message } from "antd";
import { Blog } from "./index";
import Title from "antd/es/typography/Title";
import { useAxiosBaseInstance } from "../../base/AppBase";
import TextArea from "antd/es/input/TextArea";

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const BlogForm = ({
    data,
    offlineData,
    offline,
    onSuccess,
}: {
    data: Blog;
    offlineData: boolean;
    offline?: boolean;
    onSuccess: (data: Blog) => void;
}) => {
    const [state, setState] = useState<Blog>(data);
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage({ maxCount: 3 });
    const [loading, setLoading] = useState<boolean>(false);

    const axiosInstance = useAxiosBaseInstance();

    const websiteFormFinish = async (changedValues: Blog) => {
        if (loading) {
            return;
        }
        try {
            setLoading(true);
            const { data } = await axiosInstance.post("/api/admin/website/blog", { ...form, ...changedValues });
            setLoading(false);
            if (data.error) {
                await messageApi.error(data.message);
                return;
            }
            if (data.error === 0) {
                await messageApi.success(data.message);
                onSuccess(data.data);
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

    useEffect(() => {
        setState(data);
        form.setFieldsValue(data);
    }, [data]);

    return (
        <>
            {contextHolder}
            <Form
                form={form}
                {...layout}
                initialValues={data}
                disabled={offline || offlineData}
                onValuesChange={(_k, v) => setState({ ...state, ...v })}
                onFinish={(v) => websiteFormFinish(v)}
            >
                <Title level={4}>{getRes()["admin.blog.manage"]}</Title>
                <Divider />
                <Form.Item name="host" label="博客域名（Host）">
                    <Input style={{ maxWidth: "300px" }} placeholder="留空，程序将读取接收到的 Host 字段" />
                </Form.Item>
                <Form.Item valuePropName="checked" name="generator_html_status" label="静态化文章页">
                    <Switch size={"small"} />
                </Form.Item>
                <Form.Item valuePropName="checked" name="disable_comment_status" label="关闭评论">
                    <Switch size={"small"} />
                </Form.Item>
                <Form.Item valuePropName="checked" name="article_thumbnail_status" label={getRes()["articleCover"]}>
                    <Switch size={"small"} />
                </Form.Item>
                <Form.Item name="system_notification" label={"系统通知"}>
                    <TextArea />
                </Form.Item>
                <Divider />
                <Button loading={loading} type="primary" disabled={offline || offlineData} htmlType="submit">
                    {getRes().submit}
                </Button>
            </Form>
        </>
    );
};

export default BlogForm;
