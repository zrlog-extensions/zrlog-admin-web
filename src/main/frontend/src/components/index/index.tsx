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
import DataInsights from "./DataInsights";

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
            <Row gutter={[24, 24]}>
                {/* Left Column */}
                <Col xs={24} lg={12}>
                    <div
                        style={{
                            position: "relative",
                            background: getAppState().dark
                                ? "linear-gradient(135deg, #2b2930 0%, #1c1b1f 100%)"
                                : `linear-gradient(135deg, ${getAppState().colorPrimary} 0%, ${
                                      getAppState().colorPrimary
                                  }dd 100%)`,
                            padding: "32px 24px",
                            marginBottom: 24,
                            borderRadius: theme.borderRadiusLG,
                            color: "white",
                            overflow: "hidden",
                            boxShadow: getAppState().dark
                                ? "0 4px 16px rgba(0,0,0,0.4)"
                                : `0 8px 24px ${getAppState().colorPrimary}40`,
                        }}
                    >
                        <IndexTipBg style={{ position: "absolute", height: "100%", width: "100%", top: 0, left: 0 }} />
                        <div style={{ position: "relative", zIndex: 1 }}>
                            <div
                                style={{
                                    fontSize: 28,
                                    lineHeight: 1.2,
                                    fontWeight: 700,
                                    paddingBottom: 8,
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
                    <QuickActionCard draftCount={data.statisticsInfo.draftCount} />
                </Col>

                {/* Right Column */}
                <Col xs={24} lg={12}>
                    <div
                        style={{
                            padding: 24,
                            borderRadius: theme.borderRadiusLG,
                            boxShadow: getAppState().dark ? "0 1px 3px rgba(0,0,0,0.3)" : "0 1px 3px rgba(0,0,0,0.05)",
                            backgroundColor: getAppState().dark ? "transparent" : "#fff",
                        }}
                    >
                        <Typography.Title level={4} style={{ marginTop: 0, marginBottom: 20, fontWeight: 600 }}>
                            {getRes()["admin.index.activity"]}
                        </Typography.Title>
                        <div style={{ overflow: "auto" }}>
                            <ActivityGraph data={generateCompleteData(data.activityData)} />
                        </div>
                    </div>
                    <DataInsights typeData={data.statisticsInfo.typeData} tagData={data.statisticsInfo.tagData} />
                </Col>
            </Row>
        </>
    );
};

export default Index;
