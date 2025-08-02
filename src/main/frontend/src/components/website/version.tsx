import { FunctionComponent } from "react";
import Card from "antd/es/card";
import BaseTitle from "../../base/BaseTitle";
import HtmlPreviewPanel from "../../common/editor/html-preview-panel";
import { marked } from "marked";

type VersionProps = {
    data: VersionResponse;
};

type VersionResponse = {
    version: string;
    changelog: string;
};

const Version: FunctionComponent<VersionProps> = ({ data }) => {
    return (
        <>
            <BaseTitle title={data.version} />
            <Card title={""} size={"small"} style={{ padding: 8 }}>
                <HtmlPreviewPanel htmlContent={marked(data.changelog) as string} />
            </Card>
        </>
    );
};
export default Version;
