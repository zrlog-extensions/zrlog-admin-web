import { useEffect, useState } from "react";
import { ColorPicker, Form, Input, message, Row } from "antd";
import Divider from "antd/es/divider";
import Button from "antd/es/button";
import Image from "antd/es/image";
import TextArea from "antd/es/input/TextArea";
import Col from "antd/es/grid/col";
import { getRes } from "../../utils/constants";
import Switch from "antd/es/switch";
import { colorPickerBgColors } from "../../utils/helpers";
import { useAxiosBaseInstance } from "../../base/AppBase";
import BaseDragger, { DraggerUploadResponse } from "../../common/BaseDragger";
import BaseTitle from "../../base/BaseTitle";
import { CameraOutlined } from "@ant-design/icons";
import PreviewConfig from "./preview-config";

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

type TemplateConfigState = {
    dataMap: Record<string, any>;
    config: ConfigParam[];
    loading: boolean;
};

export type ConfigParam = {
    label: string;
    type: string;
    value: string;
    previewValue: string;
    htmlElementType: string;
    contentType: string;
    placeholder: string;
};

const convertToDataMap = (data: TemplateConfigState) => {
    const dataMap = {};
    for (const [key, value] of Object.entries(data.config)) {
        //@ts-ignore
        dataMap[key] = value.value;
    }
    return dataMap;
};

const TemplateConfig = ({
    data,
    offline,
    offlineData,
}: {
    data: TemplateConfigState;
    offline: boolean;
    offlineData: boolean;
}) => {
    const dataMap = convertToDataMap(data);
    const [state, setState] = useState<TemplateConfigState>({
        config: data.config,
        dataMap: dataMap,
        loading: false,
    });

    const [form] = Form.useForm();

    const [messageApi, contextHolder] = message.useMessage({ maxCount: 3 });

    const setValue = (changedValues: any) => {
        setState({
            ...state,
            dataMap: changedValues,
        });
    };

    const onUploadChange = (data: DraggerUploadResponse, key: string) => {
        state.dataMap[key] = data.data.url;
        setState({
            ...state,
            dataMap: state.dataMap,
        });
    };

    const getInput = (key: string, value: ConfigParam) => {
        if (value.type === "file") {
            return (
                <BaseDragger
                    style={{ width: 96, height: 96 }}
                    onSuccess={(e) => onUploadChange(e, key)}
                    name="imgFile"
                    onError={(e) => {
                        messageApi.error(e.message);
                    }}
                    action="/api/admin/upload?dir=image"
                >
                    {state.dataMap[key] && state.dataMap[key].length > 0 ? (
                        <Image
                            style={{ borderRadius: 8 }}
                            preview={false}
                            height={96}
                            width={96}
                            src={state.dataMap[key]}
                        />
                    ) : (
                        <p
                            className="ant-upload-drag-icon"
                            style={{
                                borderRadius: 8,
                                margin: 0,
                                width: 96,
                                height: 96,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <CameraOutlined style={{ fontSize: 36 }} />
                        </p>
                    )}
                </BaseDragger>
            );
        } else if (value.htmlElementType === "switch") {
            return <Switch />;
        } else if (value.htmlElementType === "textarea" || value.htmlElementType === "large-textarea") {
            return (
                <TextArea rows={value.htmlElementType === "large-textarea" ? 20 : 5} placeholder={value.placeholder} />
            );
        } else if (value.type === "hidden") {
            return <Input hidden={true} />;
        } else if (value.htmlElementType === "colorPicker") {
            return (
                <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
                    <ColorPicker
                        value={state.dataMap[key]}
                        onChange={(color) => {
                            state.dataMap[key] = color.toHexString();
                            setState({
                                ...state,
                                dataMap: state.dataMap,
                            });
                        }}
                        presets={[
                            {
                                defaultOpen: true,
                                label: "预设",
                                colors: colorPickerBgColors,
                            },
                        ]}
                    />
                    <span style={{ paddingLeft: 8 }}>{state.dataMap[key]}</span>
                </div>
            );
        }
        return <Input type={value.type} placeholder={value.placeholder} />;
    };

    const getFormItems = () => {
        const formInputs = [];
        for (const [key, value] of Object.entries(state.config)) {
            const input = (
                <>
                    <Form.Item
                        label={value.label}
                        name={key}
                        key={key}
                        style={{ display: value.type === "hidden" ? "none" : "" }}
                    >
                        {getInput(key, value)}
                    </Form.Item>
                    <PreviewConfig
                        contentType={value.contentType}
                        value={state.dataMap[key]}
                        initPreviewValue={value.previewValue ? value.previewValue : ""}
                    />
                </>
            );
            formInputs.push(input);
        }
        return formInputs;
    };

    const axiosInstance = useAxiosBaseInstance();
    const onFinish = async () => {
        setState((prevState) => {
            return {
                ...prevState,
                loading: true,
            };
        });
        try {
            const { data } = await axiosInstance.post("/api/admin/template/config", state.dataMap);
            if (data.error) {
                messageApi.error(data.message);
            } else if (data.error === 0) {
                messageApi.success(data.message);
            }
        } finally {
            setState((prevState) => {
                return {
                    ...prevState,
                    loading: false,
                };
            });
        }
    };

    useEffect(() => {
        const newDataMap = convertToDataMap(data);
        form.setFieldsValue(newDataMap);
        setState({
            config: data.config,
            dataMap: newDataMap,
            loading: false,
        });
    }, [data]);

    return (
        <>
            {contextHolder}
            <BaseTitle title={getRes()["templateConfig"]} />
            <Row>
                <Col xs={24} style={{ maxWidth: 600 }}>
                    <Form
                        form={form}
                        disabled={offline || offlineData}
                        onFinish={() => onFinish()}
                        initialValues={state.dataMap}
                        onValuesChange={(_k, v) => setValue(v)}
                        {...layout}
                    >
                        {getFormItems()}
                        <Divider />
                        <Button
                            loading={state.loading}
                            disabled={offline || offlineData}
                            type="primary"
                            htmlType="submit"
                        >
                            {getRes()["submit"]}
                        </Button>
                    </Form>
                </Col>
            </Row>
        </>
    );
};

export default TemplateConfig;
