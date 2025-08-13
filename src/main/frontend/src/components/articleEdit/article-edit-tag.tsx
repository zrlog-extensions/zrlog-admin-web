import { Input, InputRef, Space, Tag } from "antd";
import { PlusOutlined, TagOutlined } from "@ant-design/icons";
import Title from "antd/es/typography/Title";
import { FunctionComponent, useRef, useState } from "react";
import { getRes } from "../../utils/constants";
import { getAppState } from "base/ConfigProviderApp";

type ArticleEditTagProps = {
    allTags: string[];
    keywords: string;
    onKeywordsChange: (text: string) => void;
};

type ArticleEditTagState = {
    keywords: string;
    inputVisible: boolean;
    inputValue: string;
};

const ArticleEditTag: FunctionComponent<ArticleEditTagProps> = ({ allTags, keywords, onKeywordsChange }) => {
    const [state, setState] = useState<ArticleEditTagState>({
        keywords: "",
        inputVisible: false,
        inputValue: "",
    });

    const inputRef = useRef<InputRef>(null);

    const handleClose = (removedTag: string) => {
        const tags = state.keywords.split(",").filter((tag) => tag !== removedTag);
        const nowKeywords = tags.join(",");
        if (state.keywords === nowKeywords) {
            return;
        }
        setState({
            ...state,
            keywords: nowKeywords,
        });
        onKeywordsChange(nowKeywords);
    };

    const showInput = () => {
        setState((prevState) => {
            setTimeout(() => {
                //让输入 focus
                if (inputRef && inputRef.current && inputRef.current.input) {
                    inputRef.current.input.focus();
                }
            }, 0);
            return { ...prevState, inputVisible: true };
        });
    };

    const handleInputChange = (e: any) => {
        setState({ ...state, inputValue: e.target.value });
    };

    const handleInputConfirm = () => {
        const { inputValue } = state;
        let keywords = state.keywords + "";
        if (inputValue) {
            if (keywords) {
                keywords = keywords += "," + inputValue;
            } else {
                keywords = inputValue;
            }
        }
        setState({
            keywords: keywords,
            inputVisible: false,
            inputValue: "",
        });
        if (keywords === state.keywords) {
            return;
        }
        onKeywordsChange(keywords);
    };

    const forMap = (tag: string) => {
        return (
            <Tag
                icon={<TagOutlined />}
                color={getAppState().colorPrimary}
                closable
                onClose={(e) => {
                    e.preventDefault();
                    handleClose(tag);
                }}
                style={{ userSelect: "none" }}
            >
                {tag}
            </Tag>
        );
    };

    const allTagsOnClick = (e: any) => {
        e.currentTarget.remove();
        let tags: any[];
        if (state.keywords) {
            tags = state.keywords.split(",");
        } else {
            tags = [];
        }
        tags.push(e.currentTarget.textContent);
        const nowKeywords = tags.join(",");
        setState({
            ...state,
            keywords: nowKeywords,
        });
        onKeywordsChange(nowKeywords);
    };

    const tagForMap = (tag: string) => {
        return (
            <Tag
                key={"all-" + tag}
                icon={<TagOutlined />}
                onClick={(e) => allTagsOnClick(e)}
                closable={false}
                style={{ userSelect: "none", cursor: "pointer" }}
                color={getAppState().colorPrimary}
            >
                {tag}
            </Tag>
        );
    };

    const { inputVisible, inputValue } = state;
    let tagChild;
    if (state.keywords === "") {
        if (keywords != null) {
            state.keywords = keywords;
        }
    }
    if (state.keywords !== undefined && state.keywords != null) {
        const newTags = Array.from(new Set(state.keywords.split(",").filter((x) => x !== "")));
        state.keywords = newTags.join(",");
        tagChild = newTags.map(forMap);
    } else {
        state.keywords = "";
        tagChild = [].map(forMap);
    }
    const allTagChild = allTags.map(tagForMap);
    return (
        <>
            {tagChild && tagChild.length > 0 && (
                <div style={{ marginBottom: 16 }}>
                    <Space size={[0, 8]} wrap>
                        {tagChild}
                    </Space>
                </div>
            )}
            {inputVisible && (
                <Input
                    ref={inputRef}
                    type="text"
                    style={{ width: 98 }}
                    value={inputValue}
                    onChange={handleInputChange}
                    onBlur={handleInputConfirm}
                    onPressEnter={handleInputConfirm}
                />
            )}
            {!inputVisible && (
                <>
                    <Space size={[0, 8]} wrap>
                        <Tag color={getAppState().colorPrimary} onClick={showInput} style={{ userSelect: "none" }}>
                            <PlusOutlined /> {getRes()["tagTips"]}
                        </Tag>
                    </Space>
                    <Title level={5} style={{ marginTop: 12, fontSize: 14 }}>
                        {getRes()["allTag"]}
                    </Title>
                    <div style={{ maxHeight: "240px", overflowY: "auto" }}>
                        <Space size={[0, 8]} wrap>
                            {allTagChild}
                        </Space>
                    </div>
                </>
            )}
        </>
    );
};
export default ArticleEditTag;
