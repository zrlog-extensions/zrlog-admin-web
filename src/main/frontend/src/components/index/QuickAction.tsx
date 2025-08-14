import { Col, Row, Typography } from "antd";
import Card from "antd/es/card";
import { Link } from "react-router-dom";
import { getRealRouteUrl, getRes } from "utils/constants";
import { DatabaseOutlined, FolderAddFilled, PlusCircleOutlined } from "@ant-design/icons";
import { getAppState } from "../../base/ConfigProviderApp";

const QuickActionCard = () => {
    return (
        <Card
            title={getRes()["quickAction"]}
            styles={{
                body: {
                    overflow: "auto",
                    marginTop: 8,
                    marginRight: 8,
                },
            }}
            style={{ marginTop: 8 }}
        >
            <Row gutter={[8, 8]}>
                <Col xs={12} md={6} lg={4}>
                    <Link to={getRealRouteUrl("/article-edit")}>
                        <Card hoverable={true} style={{ border: "none" }}>
                            <div
                                style={{
                                    display: "flex",
                                    flexFlow: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <PlusCircleOutlined style={{ fontSize: 28, color: getAppState().colorPrimary }} />
                                <Typography.Text style={{ lineHeight: 2, paddingTop: 8, whiteSpace: "nowrap" }}>
                                    {getRes()["writeArticle"]}
                                </Typography.Text>
                            </div>
                        </Card>
                    </Link>
                </Col>
                <Col xs={12} md={6} lg={4}>
                    <Link to={getRealRouteUrl("/article-type")}>
                        <Card hoverable={true} style={{ border: "none" }}>
                            <div
                                style={{
                                    display: "flex",
                                    flexFlow: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <FolderAddFilled style={{ fontSize: 28, color: getAppState().colorPrimary }} />
                                <Typography.Text style={{ lineHeight: 2, paddingTop: 8, whiteSpace: "nowrap" }}>
                                    {getRes()["admin.type.manage"]}
                                </Typography.Text>
                            </div>
                        </Card>
                    </Link>
                </Col>
                <Col xs={12} md={6} lg={4}>
                    <Link to={getRealRouteUrl("/plugin?page=backup-sql-file/files")}>
                        <Card hoverable={true} style={{ border: "none" }}>
                            <div
                                style={{
                                    display: "flex",
                                    flexFlow: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <DatabaseOutlined style={{ fontSize: 28, color: getAppState().colorPrimary }} />
                                <Typography.Text style={{ lineHeight: 2, paddingTop: 8, whiteSpace: "nowrap" }}>
                                    {getRes()["backupFiles"]}
                                </Typography.Text>
                            </div>
                        </Card>
                    </Link>
                </Col>
            </Row>
        </Card>
    );
};

export default QuickActionCard;
