import BaseTable, { PageDataSource } from "../../common/BaseTable";
import { getRes } from "../../utils/constants";
import BaseTitle from "../../base/BaseTitle";
import CreateOrEditNav from "./create_or_edit_nav";
import { EditOutlined } from "@ant-design/icons";
import { getAppState } from "../../base/ConfigProviderApp";
import { Button } from "antd";

const Nav = ({ data, offline }: { data: PageDataSource; offline: boolean }) => {
    const getColumns = () => {
        return [
            {
                title: getRes()["admin.nav.manage"],
                dataIndex: "url",
                width: 140,
                key: "url",
                render: (url: string, r: Record<string, any>) => (
                    <a style={{ display: "inline" }} rel="noopener noreferrer" target={"_blank"} href={r["jumpUrl"]}>
                        {url}
                    </a>
                ),
            },
            {
                title: getRes()["admin.nav.name"],
                dataIndex: "navName",
                key: "navName",
                width: 140,
            },
            {
                title: getRes()["icon"],
                dataIndex: "icon",
                key: "icon",
                width: 240,
            },
            {
                title: getRes()["order"],
                key: "sort",
                dataIndex: "sort",
                width: 60,
            },
        ];
    };

    return (
        <>
            <BaseTitle title={getRes()["admin.nav.manage"]} />
            <BaseTable
                defaultPageSize={10}
                offline={offline}
                hideId={true}
                columns={getColumns()}
                addBtnRender={(addSuccessCall) => {
                    return (
                        <CreateOrEditNav
                            record={{ id: -1, navName: "", url: "", icon: "" }}
                            offline={offline}
                            editSuccessCall={addSuccessCall}
                        >
                            <Button type="primary" disabled={offline} style={{ marginBottom: 8 }}>
                                {getRes()["add"]}
                            </Button>
                        </CreateOrEditNav>
                    );
                }}
                editBtnRender={(_id, record, editSuccessCall) => (
                    <CreateOrEditNav offline={offline} record={record} editSuccessCall={editSuccessCall}>
                        <EditOutlined style={{ color: getAppState().colorPrimary }} />
                    </CreateOrEditNav>
                )}
                datasource={data}
                deleteApi={"/api/admin/nav/delete"}
            />
        </>
    );
};

export default Nav;
