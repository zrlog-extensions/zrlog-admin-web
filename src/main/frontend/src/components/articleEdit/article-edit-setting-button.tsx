import { getRes } from "../../utils/constants";
import Col from "antd/es/grid/col";
import Row from "antd/es/grid/row";
import Card from "antd/es/card";
import ThumbnailUpload from "./thumbnail-upload";
import Form from "antd/es/form";
import Switch from "antd/es/switch";
import ArticleEditTag from "./article-edit-tag";
import { Drawer, InputRef } from "antd";
import { SettingFilled, SettingOutlined } from "@ant-design/icons";
import { RefObject, useState } from "react";
import { ArticleChangeableValue, ArticleEntry } from "./index.types";
import Button from "antd/es/button";
import DigestEditorCard from "./digest-editor-card";
import { getAppState } from "../../base/ConfigProviderApp";
import { Link } from "react-router-dom";

const ArticleEditSettingButton = ({
    article,
    initDigest,
    saving,
    tags,
    containerRef,
    digestRef,
    handleValuesChange,
}: {
    article: ArticleEntry;
    initDigest: string;
    saving: boolean;
    tags: any;
    containerRef: RefObject<HTMLDivElement>;
    digestRef: RefObject<InputRef>;
    handleValuesChange: (cv: ArticleChangeableValue) => void;
}) => {
    const [settingsOpen, setSettingsOpen] = useState(false);

    return (
        <>
            <Link to={"#settings"}>
                <Button
                    type={"text"}
                    title={getRes()["admin.setting"]}
                    style={{
                        border: 0,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: 47,
                        minWidth: 47,
                        borderRadius: 8,
                        height: 47,
                        cursor: "pointer",
                        background: getAppState().dark ? "#141414" : "white",
                        color: "rgb(102, 102, 102)",
                    }}
                    icon={
                        settingsOpen ? (
                            <SettingFilled style={{ fontSize: 24 }} />
                        ) : (
                            <SettingOutlined style={{ fontSize: 24 }} />
                        )
                    }
                    className={"editor-icon"}
                    onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        setSettingsOpen((prevState) => {
                            return !prevState;
                        });
                    }}
                />
            </Link>
            <Drawer
                title={getRes()["admin.setting"] + (saving ? "[" + getRes().saving + "]" : "")}
                placement="right"
                closable={{ placement: "end" }}
                autoFocus={false}
                keyboard={true}
                onClose={() => {
                    setSettingsOpen(false);
                }}
                styles={{
                    header: {
                        padding: 12,
                    },
                    body: {
                        padding: 12,
                        overflowX: "hidden",
                    },
                }}
                open={settingsOpen}
                //@ts-ignore
                getContainer={() => {
                    return containerRef.current;
                }}
            >
                <Col md={24} sm={24} xs={24} style={{ overflow: "hidden" }}>
                    <Row gutter={[8, 8]}>
                        <Col span={24}>
                            <Card
                                title={
                                    <span style={{ textAlign: "start", display: "flex" }}>
                                        {getRes()["articleCover"]}
                                    </span>
                                }
                                style={{ textAlign: "center", marginTop: 6 }}
                            >
                                <ThumbnailUpload
                                    //@ts-ignore
                                    getContainer={() => {
                                        return containerRef.current;
                                    }}
                                    thumbnail={article.thumbnail}
                                    onChange={(e) => {
                                        handleValuesChange({ thumbnail: e });
                                    }}
                                />
                            </Card>
                        </Col>
                        <Col span={24}>
                            <Card title={getRes()["admin.setting"]}>
                                <Row>
                                    <Col xs={24} md={12}>
                                        <Form.Item
                                            style={{ marginBottom: 0 }}
                                            valuePropName="checked"
                                            label={getRes()["commentAble"]}
                                        >
                                            <Switch
                                                value={article.canComment}
                                                onChange={(checked) => {
                                                    handleValuesChange({ canComment: checked });
                                                }}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} md={12}>
                                        <Form.Item
                                            style={{ marginBottom: 0 }}
                                            valuePropName="checked"
                                            label={getRes()["private"]}
                                        >
                                            <Switch
                                                value={article.privacy}
                                                onChange={(checked) => {
                                                    handleValuesChange({ privacy: checked });
                                                }}
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                        <Col span={24}>
                            <Card title={getRes().tag}>
                                <ArticleEditTag
                                    onKeywordsChange={(text: string) => {
                                        handleValuesChange({ keywords: text });
                                    }}
                                    keywords={article!.keywords ? article.keywords : ""}
                                    allTags={tags.map((x: { text: any }) => x.text)}
                                />
                            </Card>
                        </Col>
                        <Col span={24}>
                            <DigestEditorCard
                                digestRef={digestRef}
                                initDigest={initDigest}
                                handleValuesChange={handleValuesChange}
                            />
                        </Col>
                    </Row>
                </Col>
            </Drawer>
        </>
    );
};
export default ArticleEditSettingButton;
