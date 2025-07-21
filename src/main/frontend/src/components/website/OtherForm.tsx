import Title from "antd/es/typography/Title";
import Divider from "antd/es/divider";
import Form from "antd/es/form";
import TextArea from "antd/es/input/TextArea";
import Button from "antd/es/button";
import { getRes } from "../../utils/constants";
import { useEffect, useState } from "react";
import { message } from "antd";

import { Other } from "./index";
import { useAxiosBaseInstance } from "../../base/AppBase";

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const OtherForm = ({
    data,
    offline,
    offlineData,
    onSuccess,
}: {
    data: Other;
    offline: boolean;
    offlineData: boolean;
    onSuccess: (data: Other) => void;
}) => {
    const [state, setState] = useState<Other>(data);
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage({ maxCount: 3 });
    const [loading, setLoading] = useState<boolean>(false);

    const axiosInstance = useAxiosBaseInstance();
    const websiteFormFinish = async (changedValues: Other) => {
        if (loading) {
            return;
        }
        try {
            setLoading(true);
            const { data } = await axiosInstance.post("/api/admin/website/other", { ...state, ...changedValues });
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
            <Title level={4}>{getRes()["admin.other.manage"]}</Title>
            <Divider />
            <Form
                form={form}
                {...layout}
                disabled={offline || offlineData}
                initialValues={data}
                onValuesChange={(_k, v) => setState({ ...state, ...v })}
                onFinish={(k) => websiteFormFinish(k)}
            >
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
                <Button disabled={offline || offlineData} loading={loading} type="primary" htmlType="submit">
                    {getRes().submit}
                </Button>
            </Form>
        </>
    );
};

export default OtherForm;
