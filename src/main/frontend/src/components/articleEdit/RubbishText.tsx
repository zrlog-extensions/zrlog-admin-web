import { getRes } from "../../utils/constants";
import Col from "antd/es/grid/col";
import TimeAgo from "../../common/TimeAgo";
import EnvUtils from "../../utils/env-utils";
import { FunctionComponent } from "react";
import { Button } from "antd";

type RubbishTextProps = {
    offline: boolean;
    rubbish: boolean;
    lastUpdateDate?: number;
    fullScreen: boolean;
};

const RubbishText: FunctionComponent<RubbishTextProps> = ({ offline, rubbish, lastUpdateDate, fullScreen }) => {
    let tips;
    if (offline) {
        tips = getRes()["admin.offline.article-editing"];
    } else {
        if (!rubbish) {
            return <Col xxl={3} md={3} sm={4} style={{ padding: 0 }} />;
        }

        if (lastUpdateDate && lastUpdateDate > 0) {
            tips = (
                <>
                    <TimeAgo timestamp={lastUpdateDate} />
                    更新
                </>
            );
        } else {
            tips = "当前为草稿";
        }
    }
    return (
        <Button
            disabled={true}
            style={{
                border: 0,
                display: "flex",
                justifyContent: "end",
                alignItems: "center",
                textAlign: "center",
                whiteSpace: "nowrap",
                paddingLeft: 8,
                paddingRight: 8,
                height: "auto",
                cursor: "auto",
                backgroundColor: fullScreen ? (EnvUtils.isDarkMode() ? "rgb(20 20 20)" : "white") : "inherit",
            }}
        >
            {tips}
        </Button>
    );
};

export default RubbishText;
