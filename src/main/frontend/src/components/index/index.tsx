import Row from "antd/es/grid/row";
import Col from "antd/es/grid/col";
import { getColorPrimary, getRes } from "../../utils/constants";

import { FunctionComponent } from "react";
import { IndexData } from "../../type";
import ActivityGraph, { generateCompleteData } from "./ActivityGraph";
import Card from "antd/es/card";
import IndexTipBg from "./IndexTipBg";
import EnvUtils from "../../utils/env-utils";
import StatisticsInfo from "./StatisticsInfo";
import styled from "styled-components";
import BaseTitle from "../../base/BaseTitle";
import QuickAccessCard from "./QuickAccessCard";

type IndexProps = {
    data: IndexData;
};

const PREFIX = "index";

const classes = {
    card: `${PREFIX}-card`,
};

const StyledIndex = styled(`div`)({
    [`& .${PREFIX}-card`]: {
        background: EnvUtils.isDarkMode() ? "#141414" : getColorPrimary(),
        padding: 0,
        marginBottom: 8,
        color: "white",
    },
});

const Index: FunctionComponent<IndexProps> = ({ data }) => {
    if (data.statisticsInfo === null) {
        return <></>;
    }
    return (
        <StyledIndex>
            <BaseTitle title={getRes().dashboard} />
            <Row gutter={[8, 8]}>
                <Col xs={24} md={12}>
                    <Card
                        title={""}
                        styles={{
                            body: {
                                padding: 0,
                            },
                        }}
                        className={classes.card}
                    >
                        <IndexTipBg style={{ position: "absolute", height: "100%", width: "100%", zIndex: 2 }} />
                        <div style={{ padding: 12 }}>
                            <div
                                style={{
                                    fontSize: 20,
                                    fontWeight: 500,
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                }}
                            >
                                {data.welcomeTip}
                            </div>
                            <div style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                {data.tips.map((e) => {
                                    return e;
                                })}
                            </div>
                        </div>
                    </Card>
                    <StatisticsInfo data={data.statisticsInfo} versionInfo={data.versionInfo} />
                </Col>
                <Col xs={24} md={12}>
                    <Card
                        title={getRes()["admin.index.activity"]}
                        size={"small"}
                        styles={{
                            body: {
                                overflow: "auto",
                                marginTop: 8,
                                marginRight: 8,
                            },
                        }}
                    >
                        <ActivityGraph data={generateCompleteData(data.activityData)} />
                    </Card>
                    <QuickAccessCard />
                </Col>
            </Row>
        </StyledIndex>
    );
};

export default Index;
