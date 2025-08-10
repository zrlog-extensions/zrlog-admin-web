import Title from "antd/es/typography/Title";
import Divider from "antd/es/divider";
import Form from "antd/es/form";
import TextArea from "antd/es/input/TextArea";
import Button from "antd/es/button";
import { getRes } from "../../utils/constants";
import { useEffect, useState } from "react";

import { Other } from "./index";

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const OtherForm = ({
    data,
    offline,
    offlineData,
    onSubmit,
    loading,
}: {
    data: Other;
    offline: boolean;
    offlineData: boolean;
    onSubmit: (data: Other) => void;
    loading?: boolean;
}) => {
    const [state, setState] = useState<Other>(data);
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
            <Title level={4}>{getRes()["admin.other.manage"]}</Title>
            <Divider />
            <Form.Item name="icp" label="ICP备案信息">
                <TextArea />
            </Form.Item>
            <Form.Item name="webCm" label="网站统计">
                <TextArea rows={7} />
            </Form.Item>
            <Form.Item name="robotRuleContent" label="robots.txt">
                <TextArea rows={7} placeholder={"User-agent: *\n" + "Disallow: /admin/"} />
            </Form.Item>
            <Divider />
            <Button
                enterKeyHint={"enter"}
                disabled={offline || offlineData}
                loading={loading}
                type="primary"
                htmlType="submit"
            >
                {getRes().submit}
            </Button>
        </Form>
    );
};

export default OtherForm;
