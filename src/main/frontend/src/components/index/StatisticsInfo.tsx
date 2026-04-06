import { Typography } from "antd";
import { getRealRouteUrl, getRes } from "../../utils/constants";
import Row from "antd/es/grid/row";
import Col from "antd/es/grid/col";
import { CommentOutlined, ContainerOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { StatisticsInfoState } from "../../type";
import { ReactElement } from "react";
import { getAppState } from "../../base/ConfigProviderApp";
import { useTheme } from "antd-style";

const StatisticsInfo = ({ data, versionInfo }: { data: StatisticsInfoState; versionInfo: string }) => {
    const isDark = getAppState().dark;
    const theme = useTheme();

    const value = (icon: ReactElement, text: string | number) => {
        return (
            <div
                style={{
                    display: "flex",
                    gap: 6,
                    flexFlow: "row",
                    alignItems: "center",
                    fontSize: 24,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    color: getAppState().colorPrimary,
                }}
            >
                {icon}
                <Typography.Text style={{ fontSize: 24, fontWeight: 600, lineHeight: 1.5 }} ellipsis={true}>
                    {text}
                </Typography.Text>
            </div>
        );
    };

    const StatCard = ({
        title,
        valueRender,
        link,
    }: {
        title: string;
        valueRender: () => JSX.Element;
        link?: string;
    }) => {
        const content = (
            <div
                style={{
                    padding: 24,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    borderRadius: theme.borderRadiusLG,
                    transition: "all 0.3s ease",
                    cursor: link ? "pointer" : "default",
                    boxShadow: isDark ? "0 1px 3px rgba(0,0,0,0.3)" : "0 1px 3px rgba(0,0,0,0.05)",
                }}
                onMouseEnter={(e) => {
                    if (link) {
                        e.currentTarget.style.transform = "translateY(-2px)";
                        e.currentTarget.style.boxShadow = isDark
                            ? "0 4px 12px rgba(0,0,0,0.4)"
                            : "0 4px 12px rgba(0,0,0,0.08)";
                    }
                }}
                onMouseLeave={(e) => {
                    if (link) {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = isDark
                            ? "0 1px 3px rgba(0,0,0,0.3)"
                            : "0 1px 3px rgba(0,0,0,0.05)";
                    }
                }}
            >
                <Typography.Text
                    type="secondary"
                    style={{ fontSize: 14, fontWeight: 500, marginBottom: 16, display: "block" }}
                >
                    {title}
                </Typography.Text>
                <div>{valueRender()}</div>
            </div>
        );

        if (link) {
            return (
                <Link to={getRealRouteUrl(link)} style={{ display: "block", height: "100%" }}>
                    {content}
                </Link>
            );
        }
        return content;
    };

    return (
        <div style={{ marginTop: 24 }}>
            <Row gutter={[16, 16]}>
                <Col xs={12} sm={12} md={6}>
                    <StatCard
                        title={getRes()["todayComment"]}
                        valueRender={() => value(<CommentOutlined />, data.toDayCommCount)}
                    />
                </Col>
                <Col xs={12} sm={12} md={6}>
                    <StatCard
                        title={getRes()["totalComment"]}
                        link="/comment"
                        valueRender={() => value(<CommentOutlined />, data.commCount)}
                    />
                </Col>
                <Col xs={12} sm={12} md={6}>
                    <StatCard
                        title={getRes()["totalArticle"]}
                        link="/article"
                        valueRender={() => value(<ContainerOutlined />, data.articleCount)}
                    />
                </Col>
                <Col xs={12} sm={12} md={6}>
                    <StatCard
                        title={getRes()["totalArticleView"]}
                        valueRender={() => value(<ContainerOutlined />, data.clickCount)}
                    />
                </Col>
                <Col xs={24} sm={24} md={12}>
                    <StatCard
                        title={getRes()["systemInfo"]}
                        link="/system"
                        valueRender={() => value(<InfoCircleOutlined />, versionInfo)}
                    />
                </Col>
            </Row>
        </div>
    );
};

export default StatisticsInfo;
