import { EditOutlined, LockOutlined, GlobalOutlined, AppstoreOutlined } from "@ant-design/icons";

import { Segmented, TableColumnsType, Tooltip, Space, Tag } from "antd";
import Search from "antd/es/input/Search";
import Divider from "antd/es/divider";
import { getRealRouteUrl, getRes } from "../../utils/constants";
import type * as React from "react";
import { ReactElement, useEffect, useRef, useState } from "react";
import BaseTable, { ArticlePageDataSource } from "../../common/BaseTable";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router";
import { getAppState } from "../../base/ConfigProviderApp";
import BaseTitle from "../../base/BaseTitle";
import { ArticlePreviewAction } from "./ArticlePreviewAction";
import { removeCacheDataByKey } from "../../utils/cache";

const genTypes = (d: ArticlePageDataSource, search: string) => {
    const typesStr = new URLSearchParams(search).get("types");

    return d.types
        ? d.types.map((e) => {
              return {
                  text: e.typeName,
                  value: e.alias,
                  selected: typesStr ? typesStr.split(",").includes(e.alias) : false,
              };
          })
        : [];
};

const Index = ({ data, offline }: { data: ArticlePageDataSource; offline: boolean }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const ds = genTypes(data, location.search);

    const statusOptions = [
        { label: `${getRes()["allTag"]} (${data.statusCounts?.total || 0})`, value: "", icon: <AppstoreOutlined /> },
        {
            label: `${getRes()["published"]} (${data.statusCounts?.published || 0})`,
            value: "published",
            icon: <GlobalOutlined />,
        },
        {
            label: `${getRes()["articlePrivate"]} (${data.statusCounts?.privateCount || 0})`,
            value: "private",
            icon: <LockOutlined />,
        },
        {
            label: `${getRes()["articleDraft"]} (${data.statusCounts?.draft || 0})`,
            value: "draft",
            icon: <EditOutlined />,
        },
    ];

    const [filters, setFilters] = useState<Record<string, any>[]>(ds); // 用于存储选中的筛选项
    const jumped = useRef(false);

    // 从 URL 或后端数据中读取当前 status
    const currentStatus = data.status || new URLSearchParams(location.search).get("status") || "";

    const handleStatusChange = (value: string | number) => {
        const params = new URLSearchParams(location.search);
        if (value) {
            params.set("status", value as string);
        } else {
            params.delete("status");
        }
        navigate(getRealRouteUrl(location.pathname + "?" + params.toString()));
    };

    const handleNavigation = () => {
        const params = new URLSearchParams(location.search);
        const selectedTypes = filters
            .filter((e) => e.selected)
            .map((e) => e.value)
            .join(",");
        if (selectedTypes) {
            params.set("types", selectedTypes);
        } else {
            params.delete("types");
        }
        navigate(getRealRouteUrl(location.pathname + "?" + params.toString()));
    };

    const handleFilterChange = (value: string, checked: boolean) => {
        setFilters((prevFilters) => prevFilters.map((f) => (f.value === value ? { ...f, selected: checked } : f)));
    };

    useEffect(() => {
        if (jumped.current) {
            handleNavigation();
        }
        jumped.current = true;
    }, [filters]);

    const wrapperArticleStateInfo = (record: any, element: ReactElement) => {
        const title: ReactElement[] = [];
        if (record.rubbish) {
            title.push(
                <Tag key="rubbish" color="red">
                    {getRes()["articleDraft"]}
                </Tag>
            );
        }
        if (record.privacy) {
            title.push(
                <Tag key="privacy" color="orange">
                    {getRes()["articlePrivate"]}
                </Tag>
            );
        }
        if (title.length > 0) {
            return (
                <Space>
                    {element}
                    {title}
                </Space>
            );
        }
        return element;
    };

    const getColumns = (): TableColumnsType<any> => {
        const queryParams = new URLSearchParams(location.search);
        const sortParam = queryParams.get("sort");
        const sorterMap: Record<string, "descend" | "ascend" | undefined> = {};
        if (sortParam) {
            const [field, order] = sortParam.split(",");
            sorterMap[field] = order.toUpperCase() === "DESC" ? "descend" : "ascend";
        }

        return [
            {
                title: getRes()["title"],
                key: "title",
                dataIndex: "title",
                ellipsis: {
                    showTitle: false,
                },
                width: 300,
                render: (text: string, record: any) => {
                    const t = (
                        <Tooltip
                            placement="top"
                            title={
                                <div>
                                    点击查看《<span dangerouslySetInnerHTML={{ __html: text }}></span>》
                                </div>
                            }
                        >
                            <span
                                style={{ overflow: "hidden", textOverflow: "ellipsis", wordBreak: "break-word" }}
                                dangerouslySetInnerHTML={{ __html: text }}
                            />
                        </Tooltip>
                    );
                    if (record["url"].includes("previewMode")) {
                        return wrapperArticleStateInfo(record, <Link to={record["url"]}>{t}</Link>);
                    }
                    return wrapperArticleStateInfo(
                        record,
                        <a rel="noopener noreferrer" target={"_blank"} href={record.url}>
                            {t}
                        </a>
                    );
                },
            },
            {
                title: getRes()["type"],
                key: "typeName",
                dataIndex: "typeName",
                width: 100,
                //@ts-ignore
                filters: filters,
                filterMultiple: false,
                filteredValue: filters.filter((e) => e.selected).map((e) => e.value), // 动态绑定当前选中值
                onFilter: (value: React.Key | boolean) => {
                    // 更新选中状态
                    if (
                        filters
                            .filter((e) => e.selected)
                            .map((e) => e.value)
                            .includes(value)
                    ) {
                        return true;
                    }
                    //@ts-ignore
                    handleFilterChange(value, true);
                    handleNavigation();
                    return true; // 保留默认筛选功能
                },
            },
            {
                title: getRes()["viewCount"],
                key: "click",
                dataIndex: "click",
                width: 100,
                sorter: true,
                sortDirections: ["descend", "ascend"],
                sortOrder: sorterMap["click"],
            },
            {
                title: getRes()["commentAble"],
                key: "canComment",
                dataIndex: "canComment",
                render: (v: boolean) => (v ? getRes()["yes"] : getRes()["no"]),
                width: 80,
            },
            {
                title: getRes()["commentSize"],
                key: "commentSize",
                dataIndex: "commentSize",
                width: 100,
                sorter: true,
                sortDirections: ["descend", "ascend"],
                sortOrder: sorterMap["commentSize"],
            },
            {
                title: getRes()["createTime"],
                key: "releaseTime",
                dataIndex: "releaseTime",
                width: 120,
                sorter: true,
                sortDirections: ["ascend", "descend"],
                sortOrder: sorterMap["releaseTime"],
            },
            {
                title: getRes()["lastUpdateDate"],
                key: "lastUpdateDate",
                dataIndex: "lastUpdateDate",
                width: 120,
                sorter: true,
                sortDirections: ["ascend", "descend"],
                sortOrder: sorterMap["lastUpdateDate"],
            },
        ];
    };

    const onSearch = (key: string) => {
        setSearchKey(key);
    };

    const getDeleteApiUri = () => {
        return "/api/admin/article/delete";
    };

    const [searchKey, setSearchKey] = useState<string>(data.key ? data.key : "");

    return (
        <>
            <div style={{ paddingTop: 24, justifyContent: "space-between", display: "flex", alignItems: "center" }}>
                <BaseTitle
                    noBottomBorder={true}
                    style={{ marginTop: 0, marginBottom: 0 }}
                    title={getRes()["blogManage"]}
                />
                <Search
                    disabled={offline}
                    placeholder={getRes().searchTip}
                    onSearch={onSearch}
                    defaultValue={data.key}
                    enterButton={getRes()["search"]}
                    style={{ maxWidth: 196, float: "right" }}
                />
            </div>
            <div style={{ padding: "16px 0 0" }}>
                <Segmented options={statusOptions} value={currentStatus} onChange={handleStatusChange} />
            </div>
            <Divider />
            <BaseTable
                defaultPageSize={data.defaultPageSize}
                offline={offline}
                datasource={data}
                columns={getColumns()}
                editBtnRender={(id) => (
                    <Space size={16}>
                        <ArticlePreviewAction id={id} />
                        <Tooltip title={getRes()["edit"]}>
                            <Link to={getRealRouteUrl("/article-edit?id=" + id)}>
                                <EditOutlined style={{ color: getAppState().colorPrimary }} />
                            </Link>
                        </Tooltip>
                    </Space>
                )}
                deleteSuccessCallback={(id) => {
                    removeCacheDataByKey(getRealRouteUrl("/article-edit?id=" + id));
                }}
                deleteApi={getDeleteApiUri()}
                searchKey={searchKey}
            />
        </>
    );
};

export default Index;
