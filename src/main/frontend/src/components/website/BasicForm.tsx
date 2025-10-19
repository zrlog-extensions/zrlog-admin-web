import Divider from "antd/es/divider";
import Form from "antd/es/form";
import Input from "antd/es/input";
import TextArea from "antd/es/input/TextArea";
import Button from "antd/es/button";
import { getRes } from "../../utils/constants";
import { useEffect, useState } from "react";
import { Basic } from "./index";
import FaviconUpload from "./FaviconUpload";
import Title from "antd/es/typography/Title";

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const BasicForm = ({
    data,
    offlineData,
    offline,
    onSubmit,
    loading,
}: {
    data: Basic;
    offlineData: boolean;
    offline: boolean;
    loading?: boolean;
    onSubmit: (data: Basic) => void;
}) => {
    const [state, setState] = useState<Basic>(data);
    const [form] = Form.useForm();

    useEffect(() => {
        setState(data);
        form.setFieldsValue(data);
    }, [data]);

    return (
        <Form
            form={form}
            {...layout}
            disabled={offline || offlineData}
            initialValues={data}
            onValuesChange={(_k, v) => setState({ ...state, ...v })}
            onFinish={(nv) => onSubmit({ ...state, ...nv })}
        >
            <Title level={4}>{getRes()["admin.basic.manage"]}</Title>
            <Divider />
            <Form.Item name="title" label={getRes()["title"]} rules={[{ required: true }]}>
                <Input placeholder="" showCount={true} maxLength={30} />
            </Form.Item>
            <Form.Item name="second_title" label={getRes()["subTitle"]}>
                <Input placeholder="" showCount={true} maxLength={30} />
            </Form.Item>
            <Form.Item name="keywords" label={getRes()["keywords"]}>
                <TextArea showCount={true} rows={2} maxLength={160} />
            </Form.Item>
            <Form.Item name="description" label={getRes()["websiteDesc"]}>
                <TextArea showCount={true} rows={5} maxLength={160} />
            </Form.Item>
            <Form.Item name="favicon_ico_base64" label={`${getRes()["favicon"]}`}>
                <FaviconUpload
                    url={state.favicon_ico_base64}
                    onChange={(e) => {
                        setState({ ...state, favicon_ico_base64: e ? e : "" });
                    }}
                />
            </Form.Item>
            <Divider />
            <Button
                enterKeyHint={"enter"}
                loading={loading}
                disabled={offline || offlineData}
                type="primary"
                htmlType="submit"
            >
                {getRes().submit}
            </Button>
        </Form>
    );
};

export default BasicForm;
