import { FunctionComponent } from "react";
import Divider from "antd/es/divider";
import { UpgradeData } from "../type";
import HtmlPreviewPanel from "../common/editor/html-preview-panel";
import { marked } from "marked";

export type UpgradeContentProps = {
    data: UpgradeData;
};

const UpgradeContent: FunctionComponent<UpgradeContentProps> = ({ data }) => {
    return (
        <>
            <HtmlPreviewPanel htmlContent={data.version ? (marked(data.version.changeLog) as string) : ""} />
            {!data.onlineUpgradable && (
                <>
                    <Divider />
                    <HtmlPreviewPanel
                        style={{ overflowWrap: "break-word" }}
                        htmlContent={marked(data.disableUpgradeReason) as string}
                    />
                </>
            )}
        </>
    );
};

export default UpgradeContent;
