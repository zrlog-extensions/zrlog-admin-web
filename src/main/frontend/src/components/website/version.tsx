import { FunctionComponent, useState } from "react";
import Card from "antd/es/card";
import BaseTitle from "../../base/BaseTitle";
import HtmlPreviewPanel from "../../common/editor/html-preview-panel";
import { markdownToHtmlSyncWithCallback } from "../../common/editor/utils/marked-utils";

type VersionProps = {
    data: VersionResponse;
};

type VersionResponse = {
    version: string;
    changelog: string;
    buildSystemInfo: string;
};

const Version: FunctionComponent<VersionProps> = ({ data }) => {
    const defaultHtmlStr = markdownToHtmlSyncWithCallback(data.changelog, (htmlStr) => {
        setChangeLogStr(htmlStr);
    });

    const defaultBuildStr = markdownToHtmlSyncWithCallback(data.buildSystemInfo, (htmlStr) => {
        setBuildStr(htmlStr);
    });

    const [changeLogStr, setChangeLogStr] = useState<string>(defaultHtmlStr);
    const [buildStr, setBuildStr] = useState<string>(defaultBuildStr);

    return (
        <>
            <BaseTitle title={data.version} />
            <Card title={""} style={{ padding: 8, maxWidth: 600 }}>
                <HtmlPreviewPanel htmlContent={changeLogStr} />
            </Card>
            <Card title={""} style={{ padding: 8, maxWidth: 600, marginTop: 12 }}>
                <HtmlPreviewPanel htmlContent={buildStr} />
            </Card>
        </>
    );
};
export default Version;
