import Row from "antd/es/grid/row";
import Col from "antd/es/grid/col";
import Button from "antd/es/button";
import { getRealRouteUrl, getRes } from "../../utils/constants";
import Form from "antd/es/form";
import Select from "antd/es/select";
import Switch from "antd/es/switch";
import Divider from "antd/es/divider";
import { App, message } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Upgrade } from "./index";
import { useAxiosBaseInstance } from "../../base/AppBase";
import { ApiResponse, UpgradeData } from "../../type";
import { AxiosResponse } from "axios";
import UpgradeContent from "../upgrade-content";

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const UpgradeSettingForm = ({
    data,
    offlineData,
    offline,
    onSubmit,
    loading,
}: {
    data: Upgrade;
    offlineData: boolean;
    offline: boolean;
    loading?: boolean;
    onSubmit: (data: Upgrade) => void;
}) => {
    const [checking, setChecking] = useState<boolean>(false);
    const { modal } = App.useApp();
    const [messageApi, contextHolder] = message.useMessage({ maxCount: 3 });

    const [state, setState] = useState<Upgrade>(data);
    const [form] = Form.useForm();

    const navigate = useNavigate();
    const axiosInstance = useAxiosBaseInstance();

    const checkNewVersion = async () => {
        if (checking) {
            return;
        }
        setChecking(true);
        try {
            const { data }: AxiosResponse<ApiResponse<UpgradeData>> = await axiosInstance.get("/api/admin/upgrade");
            if (data.data.upgrade) {
                const title = `${getRes()["newVersion"]} - #${data.data.version.type}`;
                modal.info({
                    width: 682,
                    title: title,
                    content: <UpgradeContent data={data.data} />,
                    closable: true,
                    okText: getRes()["doUpgrade"],
                    onOk: function () {
                        navigate(getRealRouteUrl("/upgrade"));
                    },
                });
            } else {
                if (data.error === 0) {
                    setChecking(false);
                    await messageApi.info(data.message);
                }
            }
        } finally {
            setChecking(false);
        }
    };

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
            {contextHolder}
            <Row>
                <Col xs={24}>
                    <Button
                        type="dashed"
                        disabled={offline || offlineData}
                        loading={checking}
                        onClick={checkNewVersion}
                        style={{ float: "right" }}
                    >
                        {getRes().checkUpgrade}
                    </Button>
                </Col>
            </Row>
            <Form.Item name="autoUpgradeVersion" label={getRes()["admin.upgrade.autoCheckCycle"]}>
                <Select style={{ maxWidth: "120px" }}>
                    <Select.Option key="86400" value={86400}>
                        {getRes()["admin.upgrade.cycle.oneDay"]}
                    </Select.Option>
                    <Select.Option key="604800" value={604800}>
                        {getRes()["admin.upgrade.cycle.oneWeek"]}
                    </Select.Option>
                    <Select.Option key="1296000" value={1296000}>
                        {getRes()["admin.upgrade.cycle.halfMonth"]}
                    </Select.Option>
                    <Select.Option key="-1" value={-1}>
                        {getRes()["admin.upgrade.cycle.never"]}
                    </Select.Option>
                </Select>
            </Form.Item>
            <Form.Item valuePropName="checked" name="upgradePreview" label={getRes()["admin.upgrade.canPreview"]}>
                <Switch />
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

export default UpgradeSettingForm;
