import { Badge, Col, Row, Typography, Card } from "antd";

import { Link } from "react-router-dom";
import { getRealRouteUrl, getRes } from "utils/constants";
import {
    DatabaseOutlined,
    FolderAddFilled,
    PlusCircleOutlined,
    EditOutlined,
    ThunderboltOutlined,
} from "@ant-design/icons";
import { getAppState } from "../../base/ConfigProviderApp";
import { useTheme } from "antd-style";

const QuickActionCard = ({ draftCount }: { draftCount: number }) => {
    const isDark = getAppState().dark;
    const iconBgColor = isDark ? "rgba(255,255,255,0.08)" : `${getAppState().colorPrimary}15`;
    const theme = useTheme();

    const ActionItem = ({
        to,
        icon,
        label,
        count,
    }: {
        to: string;
        icon: React.ReactNode;
        label: string;
        count?: number;
    }) => (
        <Col xs={12} md={8} lg={6}>
            <Link to={getRealRouteUrl(to)}>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "16px 8px",
                        borderRadius: theme.borderRadiusLG,
                        cursor: "pointer",
                        transition: "all 0.3s",
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.02)";
                        e.currentTarget.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent";
                        e.currentTarget.style.transform = "translateY(0)";
                    }}
                >
                    <Badge count={count} offset={[-5, 5]} size="small" color={getAppState().colorPrimary}>
                        <div
                            style={{
                                width: 56,
                                height: 56,
                                borderRadius: "16px",
                                backgroundColor: iconBgColor,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                marginBottom: 12,
                                color: getAppState().colorPrimary,
                                fontSize: 24,
                            }}
                        >
                            {icon}
                        </div>
                    </Badge>
                    <Typography.Text style={{ fontWeight: 500, fontSize: 13, whiteSpace: "nowrap" }}>
                        {label}
                    </Typography.Text>
                </div>
            </Link>
        </Col>
    );

    return (
        <Card
            title={
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <ThunderboltOutlined />
                    <span>{getRes()["quickAction"]}</span>
                </div>
            }
            bordered={false}
            className="dashboard-card"
            style={{ marginTop: 24 }}
        >
            <Row gutter={[16, 16]}>
                <ActionItem to="/article-edit" icon={<PlusCircleOutlined />} label={getRes()["writeArticle"]} />
                <ActionItem
                    to="/article?status=draft"
                    icon={<EditOutlined />}
                    label={getRes()["articleDraft"]}
                    count={draftCount}
                />
                <ActionItem to="/article-type" icon={<FolderAddFilled />} label={getRes()["admin.type.manage"]} />
                <ActionItem
                    to="/plugin?page=backup-sql-file/files"
                    icon={<DatabaseOutlined />}
                    label={getRes()["backupFiles"]}
                />
            </Row>
        </Card>
    );
};

export default QuickActionCard;
