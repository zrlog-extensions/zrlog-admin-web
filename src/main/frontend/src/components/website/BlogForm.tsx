import Divider from "antd/es/divider";
import Form from "antd/es/form";
import Input from "antd/es/input";
import Switch from "antd/es/switch";
import { getRes } from "../../utils/constants";
import Button from "antd/es/button";
import { useEffect, useState } from "react";
import { Blog } from "./index";
import Title from "antd/es/typography/Title";
import TextArea from "antd/es/input/TextArea";

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const BlogForm = ({
    data,
    offlineData,
    offline,
    onSubmit,
    loading,
}: {
    data: Blog;
    offlineData: boolean;
    offline?: boolean;
    loading?: boolean;
    onSubmit: (data: Blog) => void;
}) => {
    const [state, setState] = useState<Blog>(data);
    const [form] = Form.useForm();

    useEffect(() => {
        setState(data);
        form.setFieldsValue(data);
    }, [data]);

    return (
        <Form
            form={form}
            {...layout}
            initialValues={data}
            disabled={offline || offlineData}
            onValuesChange={(_k, v) => setState({ ...state, ...v })}
            onFinish={(nv) => onSubmit({ ...state, ...nv })}
        >
            <Title level={4}>{getRes()["admin.blog.manage"]}</Title>
            <Divider />
            <Form.Item name="host" label={getRes()["blogHost"]}>
                <Input style={{ maxWidth: 300 }} placeholder="" />
            </Form.Item>
            <Form.Item valuePropName="checked" name="generator_html_status" label={getRes()["staticSite"]}>
                <Switch />
            </Form.Item>
            <Form.Item valuePropName="checked" name="disable_comment_status" label={getRes()["disableComment"]}>
                <Switch />
            </Form.Item>
            <Form.Item valuePropName="checked" name="article_thumbnail_status" label={getRes()["articleCover"]}>
                <Switch />
            </Form.Item>
            <Form.Item name="system_notification" label={getRes()["systemNotify"]}>
                <TextArea />
            </Form.Item>
            <Divider />
            <Button
                enterKeyHint={"enter"}
                loading={loading}
                type="primary"
                disabled={offline || offlineData}
                htmlType="submit"
            >
                {getRes().submit}
            </Button>
        </Form>
    );
};

export default BlogForm;
