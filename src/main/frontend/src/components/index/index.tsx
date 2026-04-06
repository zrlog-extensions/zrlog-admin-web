import Row from "antd/es/grid/row";
import Col from "antd/es/grid/col";
import { getRes } from "../../utils/constants";

import { FunctionComponent } from "react";
import { IndexData } from "../../type";
import ActivityGraph, { generateCompleteData } from "./ActivityGraph";
import { Typography } from "antd";
import IndexTipBg from "./IndexTipBg";
import StatisticsInfo from "./StatisticsInfo";
import BaseTitle from "../../base/BaseTitle";
import QuickActionCard from "./QuickAction";
import { getAppState } from "../../base/ConfigProviderApp";
import { useTheme } from "antd-style";

type IndexProps = {
    data: IndexData;
};

const Index: FunctionComponent<IndexProps> = ({ data }) => {
    const theme = useTheme();

    if (data.statisticsInfo === null) {
        return <></>;
    }
    return (
        <>
            <BaseTitle title={getRes().dashboard} />
            <Row gutter={[8, 8]}>
                <Col xs={24} md={12}>
                    <div
                        style={{
                            position: "relative",
                            background: getAppState().dark
                                ? "linear-gradient(135deg, #2b2930 0%, #1c1b1f 100%)" // MD3 surface layers
                                : `linear-gradient(135deg, ${getAppState().colorPrimary} 0%, ${
                                      getAppState().colorPrimary
                                  }dd 100%)`,
                            padding: "24px 16px",
                            marginBottom: 24,
                            borderRadius: theme.borderRadiusLG, // MD3 Extra Large
                            color: "white",
                            overflow: "hidden",
                            boxShadow: getAppState().dark
                                ? "0 4px 16px rgba(0,0,0,0.4)"
                                : `0 8px 24px ${getAppState().colorPrimary}40`,
                        }}
                    >
                        {/* Decorative Background */}
                        <IndexTipBg style={{ position: "absolute", height: "100%", width: "100%", top: 0, left: 0 }} />

                        {/* Content */}
                        <div style={{ position: "relative", zIndex: 1, padding: 6 }}>
                            <div
                                style={{
                                    fontSize: 26,
                                    lineHeight: 1.4,
                                    fontWeight: 700,
                                    paddingBottom: 6,
                                    textShadow: "0 2px 4px rgba(0,0,0,0.1)",
                                }}
                            >
                                {data.welcomeTip}
                            </div>
                            <div style={{ fontSize: 16, opacity: 0.9, lineHeight: 1.6 }}>
                                {data.tips.map((e, idx) => (
                                    <span key={idx} style={{ display: "block" }}>
                                        {e}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                    <StatisticsInfo data={data.statisticsInfo} versionInfo={data.versionInfo} />
                </Col>
                <Col xs={24} md={12}>
                    <div
                        style={{
                            padding: 24,
                            borderRadius: theme.borderRadiusLG,
                            boxShadow: getAppState().dark ? "0 1px 3px rgba(0,0,0,0.3)" : "0 1px 3px rgba(0,0,0,0.05)",
                        }}
                    >
                        <Typography.Title level={4} style={{ marginTop: 0, marginBottom: 20, fontWeight: 600 }}>
                            {getRes()["admin.index.activity"]}
                        </Typography.Title>
                        <div style={{ overflow: "auto" }}>
                            <ActivityGraph data={generateCompleteData(data.activityData)} />
                        </div>
                    </div>
                    <QuickActionCard />
                </Col>
            </Row>
        </>
    );
};

export default Index;
