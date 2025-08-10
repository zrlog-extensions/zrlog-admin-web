import { Col, Row, Typography } from "antd";
import Card from "antd/es/card";
import { Link } from "react-router-dom";
import { getColorPrimary, getRealRouteUrl } from "utils/constants";
import { DatabaseOutlined, FolderAddFilled, PlusCircleOutlined } from "@ant-design/icons";

const QuickAccessCard = () => {
    return (
        <Card
            title={"快捷操作"}
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
                                <PlusCircleOutlined style={{ fontSize: 28, color: getColorPrimary() }} />
                                <Typography.Text style={{ lineHeight: 2, paddingTop: 8, whiteSpace: "nowrap" }}>
                                    写文章
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
                                <FolderAddFilled style={{ fontSize: 28, color: getColorPrimary() }} />
                                <Typography.Text style={{ lineHeight: 2, paddingTop: 4, whiteSpace: "nowrap" }}>
                                    分类
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
                                <DatabaseOutlined style={{ fontSize: 28, color: getColorPrimary() }} />
                                <Typography.Text style={{ lineHeight: 2, paddingTop: 4, whiteSpace: "nowrap" }}>
                                    备份数据
                                </Typography.Text>
                            </div>
                        </Card>
                    </Link>
                </Col>
            </Row>
        </Card>
    );
};

export default QuickAccessCard;
