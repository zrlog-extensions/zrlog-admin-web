import Title from "antd/es/typography/Title";
import Divider from "antd/es/divider";
import Form from "antd/es/form";
import TextArea from "antd/es/input/TextArea";
import Button from "antd/es/button";
import { getRes } from "../../utils/constants";
import { useEffect, useState } from "react";

import { AI } from "./index";
import Select from "antd/es/select";
import { Input } from "antd";
import AIIcon from "@editor/dist/src/ai/AIIcon";

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const AIForm = ({
    data,
    offline,
    offlineData,
    onSubmit,
    loading,
}: {
    data: AI;
    offline: boolean;
    offlineData: boolean;
    onSubmit: (data: AI) => void;
    loading?: boolean;
}) => {
    const [state, setState] = useState<AI>(data);
    const [form] = Form.useForm();

    useEffect(() => {
        setState(data);
        form.setFieldsValue(data);
    }, [data]);

    useEffect(() => {
        setState((prevState) => {
            return {
                ...prevState,
                ai_model: "",
            };
        });
    }, [state.ai_provider]);

    return (
        <Form
            form={form}
            {...layout}
            disabled={offline || offlineData}
            initialValues={data}
            onValuesChange={(_k, v) => setState({ ...state, ...v })}
            onFinish={(nv) => onSubmit({ ...state, ...nv })}
        >
            <Title level={4}>{getRes()["admin.ai.manage"]}</Title>
            <Divider />
            <Form.Item name="ai_provider" label={getRes()["website.ai_provider"]} required={true}>
                <Select style={{ maxWidth: 200 }}>
                    {data.allProviders.map((provider) => {
                        return (
                            <Select.Option value={provider.name}>
                                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                                    <AIIcon name={provider.name} /> {provider.name.toLowerCase().replace("_", "")}
                                </div>
                            </Select.Option>
                        );
                    })}
                </Select>
            </Form.Item>
            <Form.Item name={"ai_model"} label={getRes()["website.ai_model"]} required={true}>
                <Select style={{ maxWidth: 200 }}>
                    {data.allProviders.map((e) => {
                        if (state.ai_provider === e.name) {
                            return (
                                <>
                                    {e.models.map((e) => {
                                        return <Select.Option value={e}>{e}</Select.Option>;
                                    })}
                                </>
                            );
                        }
                        return <></>;
                    })}
                </Select>
            </Form.Item>
            <Form.Item name={"ai_api_key"} label={getRes()["website.ai_api_key"]} required={true}>
                <Input />
            </Form.Item>
            <Form.Item name={"ai_prompt"} label={getRes()["website.ai_prompt"]}>
                <TextArea rows={7} />
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

export default AIForm;
