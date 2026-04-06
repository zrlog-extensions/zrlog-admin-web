import { Col, Row, Typography } from "antd";

import { Link } from "react-router-dom";
import { getRealRouteUrl, getRes } from "utils/constants";
import { DatabaseOutlined, FolderAddFilled, PlusCircleOutlined } from "@ant-design/icons";
import { getAppState } from "../../base/ConfigProviderApp";
import { useTheme } from "antd-style";

const QuickActionCard = () => {
    const isDark = getAppState().dark;
    const iconBgColor = isDark ? "rgba(255,255,255,0.08)" : `${getAppState().colorPrimary}15`;
    const theme = useTheme();

    const ActionItem = ({ to, icon, label }: { to: string; icon: React.ReactNode; label: string }) => (
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
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.02)";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent";
                    }}
                >
                    <div
                        style={{
                            width: 56,
                            height: 56,
                            borderRadius: theme.borderRadiusLG, // Complete circle/pill
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
                    <Typography.Text style={{ fontWeight: 500, fontSize: 13, whiteSpace: "nowrap" }}>
                        {label}
                    </Typography.Text>
                </div>
            </Link>
        </Col>
    );

    return (
        <div
            style={{
                marginTop: 16,
                padding: 24,
                borderRadius: theme.borderRadiusLG,
                boxShadow: isDark ? "0 1px 3px rgba(0,0,0,0.3)" : "0 1px 3px rgba(0,0,0,0.05)",
            }}
        >
            <Typography.Title level={4} style={{ marginTop: 0, marginBottom: 20, fontWeight: 600 }}>
                {getRes()["quickAction"]}
            </Typography.Title>
            <Row gutter={[16, 16]}>
                <ActionItem to="/article-edit" icon={<PlusCircleOutlined />} label={getRes()["writeArticle"]} />
                <ActionItem to="/article-type" icon={<FolderAddFilled />} label={getRes()["admin.type.manage"]} />
                <ActionItem
                    to="/plugin?page=backup-sql-file/files"
                    icon={<DatabaseOutlined />}
                    label={getRes()["backupFiles"]}
                />
            </Row>
        </div>
    );
};

export default QuickActionCard;
