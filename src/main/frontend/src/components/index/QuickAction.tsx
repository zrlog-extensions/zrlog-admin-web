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

const QuickActionCard = ({ draftCount, embedded = false }: { draftCount: number; embedded?: boolean }) => {
    const isDark = getAppState().dark;
    const theme = useTheme();
    const iconBgColor = embedded
        ? "rgba(255,255,255,0.12)"
        : isDark
        ? "rgba(255,255,255,0.08)"
        : `${getAppState().colorPrimary}15`;
    const textColor = embedded ? "rgba(255,255,255,0.92)" : undefined;
    const mutedTextColor = embedded ? "rgba(255,255,255,0.68)" : undefined;

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
                        padding: embedded ? "14px 10px" : "16px 8px",
                        borderRadius: embedded ? 18 : theme.borderRadiusLG,
                        cursor: "pointer",
                        transition: "all 0.3s",
                        backgroundColor: embedded ? "rgba(255,255,255,0.04)" : "transparent",
                        border: embedded ? "1px solid rgba(255,255,255,0.08)" : "1px solid transparent",
                        backdropFilter: embedded ? "blur(8px)" : undefined,
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = embedded
                            ? "rgba(255,255,255,0.10)"
                            : isDark
                            ? "rgba(255,255,255,0.04)"
                            : "rgba(0,0,0,0.02)";
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
                                borderRadius: embedded ? "18px" : "16px",
                                backgroundColor: iconBgColor,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                marginBottom: 10,
                                color: embedded ? "white" : getAppState().colorPrimary,
                                fontSize: 22,
                                boxShadow: embedded ? "inset 0 1px 0 rgba(255,255,255,0.08)" : undefined,
                            }}
                        >
                            {icon}
                        </div>
                    </Badge>
                    <Typography.Text
                        style={{ fontWeight: 500, fontSize: 13, whiteSpace: "nowrap", color: textColor }}
                        type={embedded ? undefined : "secondary"}
                    >
                        {label}
                    </Typography.Text>
                </div>
            </Link>
        </Col>
    );

    const content = (
        <Row gutter={[8, 8]}>
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
    );

    if (embedded) {
        return (
            <div
                style={{
                    marginTop: 20,
                    padding: 16,
                    borderRadius: 24,
                    background: "linear-gradient(180deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.06) 100%)",
                    border: "1px solid rgba(255,255,255,0.14)",
                    backdropFilter: "blur(14px)",
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.12)",
                }}
            >
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                    <ThunderboltOutlined style={{ color: "rgba(255,255,255,0.92)", fontSize: 14 }} />
                    <Typography.Text
                        style={{
                            color: mutedTextColor,
                            fontSize: 13,
                            fontWeight: 600,
                            letterSpacing: 0.2,
                        }}
                    >
                        {getRes()["quickAction"]}
                    </Typography.Text>
                </div>
                {content}
            </div>
        );
    }

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
        >
            {content}
        </Card>
    );
};

export default QuickActionCard;
