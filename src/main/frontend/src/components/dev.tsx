import { FunctionComponent } from "react";
import { AdminCommonProps } from "../type";
import { Button, message, Table } from "antd";
import { useAxiosBaseInstance } from "../base/AppBase";
import BaseTitle from "../base/BaseTitle";
import Divider from "antd/es/divider";

type Lock = {
    name: string;
    remark: string;
};

type DevResponse = {
    locks: Lock[];
};

const Dev: FunctionComponent<AdminCommonProps<DevResponse>> = ({ data }) => {
    const axiosInstance = useAxiosBaseInstance();

    const [messageApi, messageContextHolder] = message.useMessage({
        maxCount: 3,
    });

    return (
        <>
            {messageContextHolder}
            <BaseTitle title={"Dev"} />
            <Button
                type={"primary"}
                onClick={async () => {
                    const { data } = await axiosInstance.get("/api/admin/dev/releaseLocks");
                    if (data.error) {
                        messageApi.error(data.message);
                    } else {
                        messageApi.success(data.message);
                    }
                }}
            >
                Release All Lock
            </Button>
            <Divider />
            <Table
                columns={[
                    {
                        title: "name",
                        dataIndex: "name",
                        key: "name",
                    },
                    {
                        title: "remark",
                        dataIndex: "remark",
                        key: "remark",
                    },
                ]}
                dataSource={data.locks}
            />
        </>
    );
};
export default Dev;
