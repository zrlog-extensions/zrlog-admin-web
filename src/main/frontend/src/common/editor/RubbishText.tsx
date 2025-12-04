import { getRes } from "../../utils/constants";
import TimeAgo from "../TimeAgo";
import { FunctionComponent } from "react";

type RubbishTextProps = {
    offline: boolean;
    rubbish: boolean;
    lastUpdateDate?: number;
    fullScreen: boolean;
};

const RubbishText: FunctionComponent<RubbishTextProps> = ({ offline, rubbish, lastUpdateDate }) => {
    let tips;
    if (offline) {
        tips = getRes()["admin.offline.article-editing"];
    } else {
        if (!rubbish) {
            return <></>;
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
        <span
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
                backgroundColor: "inherit",
            }}
        >
            {tips}
        </span>
    );
};

export default RubbishText;
