import { getColorPrimary, getRes } from "../../utils/constants";
import { CheckOutlined, EditOutlined } from "@ant-design/icons";
import BaseTextArea from "../../common/BaseTextArea";
import HtmlPreviewPanel from "../../common/editor/html-preview-panel";
import Card from "antd/es/card";
import { FunctionComponent, memo, RefObject, useEffect, useRef, useState } from "react";
import { InputRef } from "antd";
import { ArticleChangeableValue } from "./index.types";

type DigestEditorCardProps = {
    digestRef: RefObject<InputRef>;
    initDigest: string;
    handleValuesChange: (cv: ArticleChangeableValue) => void;
};

const DigestEditorCard: FunctionComponent<DigestEditorCardProps> = memo(
    ({ digestRef, initDigest, handleValuesChange }) => {
        const [editDigest, setEditDigest] = useState<boolean>(false);

        const [digest, setDigest] = useState<string>(initDigest);
        const [value, setValue] = useState<string>(initDigest);
        const hasMounted = useRef(false);

        useEffect(() => {
            if (!hasMounted.current) {
                hasMounted.current = true;
                return;
            }
            handleValuesChange({ digest: digest });
        }, [digest]);

        useEffect(() => {
            if (!editDigest) {
                setValue(digest);
            }
        }, [editDigest]);

        const getBody = () => {
            if (editDigest) {
                return (
                    <BaseTextArea
                        ref={digestRef}
                        variant={"borderless"}
                        defaultValue={digest}
                        placeholder={getRes().digestTips}
                        onChange={(text: string) => {
                            setDigest(text);
                        }}
                        minRows={2}
                        maxRows={12}
                        style={{ padding: 0 }}
                        formStyle={{ marginBottom: 0 }}
                    />
                );
            }
            return (
                <HtmlPreviewPanel
                    style={{ maxHeight: 264, overflowY: "auto", overflowX: "hidden" }}
                    onContentChange={(text: string) => {
                        setDigest(text);
                    }}
                    editable={true}
                    htmlContent={value}
                />
            );
        };

        return (
            <Card
                size="small"
                title={getRes().digest}
                style={{ marginBottom: 36 }}
                extra={[
                    editDigest ? (
                        <CheckOutlined
                            onClick={() => {
                                setEditDigest(false);
                            }}
                            style={{ color: getColorPrimary(), cursor: "pointer" }}
                        />
                    ) : (
                        <EditOutlined
                            onClick={() => {
                                setEditDigest(true);
                            }}
                            style={{ color: getColorPrimary(), cursor: "pointer" }}
                        />
                    ),
                ]}
            >
                {getBody()}
            </Card>
        );
    }
);

export default DigestEditorCard;
