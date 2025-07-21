import { Card, Statistic, Typography } from "antd";
import { getRealRouteUrl, getRes } from "../../utils/constants";
import Row from "antd/es/grid/row";
import Col from "antd/es/grid/col";
import { CommentOutlined, ContainerOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { StatisticsInfoState } from "../../type";
import { ReactElement } from "react";

const StatisticsInfo = ({ data, versionInfo }: { data: StatisticsInfoState; versionInfo: string }) => {
    const value = (icon: ReactElement, text: string | number) => {
        return (
            <div
                style={{
                    display: "flex",
                    gap: 3,
                    flexFlow: "row",
                    alignItems: "center",
                    fontSize: 24,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                }}
            >
                {icon}
                <Typography.Text style={{ fontSize: 18, lineHeight: "28px" }} ellipsis={true}>
                    {text}
                </Typography.Text>
            </div>
        );
    };

    return (
        <Card size={"small"} title={getRes()["admin.index.outline"]}>
            <Row gutter={[8, 8]}>
                <Col xs={24} md={12}>
                    <Card styles={{ body: { padding: 16 } }}>
                        <Statistic
                            title={getRes()["todayComment"]}
                            valueRender={() => value(<CommentOutlined />, data.toDayCommCount)}
                        />
                    </Card>
                </Col>
                <Col xs={24} md={12}>
                    <Link to={getRealRouteUrl("/comment")}>
                        <Card styles={{ body: { padding: 16 } }} hoverable={true}>
                            <Statistic
                                title={getRes()["totalComment"]}
                                valueRender={() => value(<CommentOutlined />, data.commCount)}
                            />
                        </Card>
                    </Link>
                </Col>
            </Row>
            <Row gutter={[8, 8]} style={{ paddingTop: 8 }}>
                <Col xs={24} md={12}>
                    <Link to={getRealRouteUrl("/article")}>
                        <Card styles={{ body: { padding: 16 } }} hoverable={true}>
                            <Statistic
                                title={getRes()["totalArticle"]}
                                valueRender={() => value(<ContainerOutlined />, data.articleCount)}
                            />
                        </Card>
                    </Link>
                </Col>
                <Col xs={24} md={12}>
                    <Card styles={{ body: { padding: 16 } }}>
                        <Statistic
                            title={getRes()["totalArticleView"]}
                            valueRender={() => value(<ContainerOutlined />, data.clickCount)}
                        />
                    </Card>
                </Col>
                <Col xs={24} md={12}>
                    <Link to={getRealRouteUrl("/system")}>
                        <Card styles={{ body: { padding: 16 } }} hoverable={true}>
                            <Statistic
                                title={getRes()["systemInfo"]}
                                valueRender={() => value(<InfoCircleOutlined />, versionInfo)}
                            />
                        </Card>
                    </Link>
                </Col>
            </Row>
        </Card>
    );
};

export default StatisticsInfo;
