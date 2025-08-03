import { FunctionComponent, useState } from "react";
import Divider from "antd/es/divider";
import { UpgradeData } from "../type";
import HtmlPreviewPanel from "../common/editor/html-preview-panel";
import { markdownToHtmlSyncWithCallback } from "../common/editor/utils/marked-utils";

export type UpgradeContentProps = {
    data: UpgradeData;
};

const UpgradeContent: FunctionComponent<UpgradeContentProps> = ({ data }) => {
    const changeLogMd = data.version ? data.version.changeLog : "";
    const disableUpgradeMd = data.disableUpgradeReason ? data.disableUpgradeReason : "";

    const defaultHtmlStr = markdownToHtmlSyncWithCallback(changeLogMd, (htmlStr) => {
        setHtmlStr(htmlStr);
    });

    const defaultDisableHtmlStr = markdownToHtmlSyncWithCallback(disableUpgradeMd, (htmlStr) => {
        setDisableHtmlStr(htmlStr);
    });

    const [htmlStr, setHtmlStr] = useState<string>(defaultHtmlStr);
    const [disableHtmlStr, setDisableHtmlStr] = useState<string>(defaultDisableHtmlStr);

    return (
        <>
            <HtmlPreviewPanel htmlContent={data.version ? (htmlStr as string) : ""} />
            {!data.onlineUpgradable && (
                <>
                    <Divider />
                    <HtmlPreviewPanel htmlContent={disableHtmlStr} />
                </>
            )}
        </>
    );
};

export default UpgradeContent;
