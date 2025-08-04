import CodeMirror, { EditorSelection, EditorView } from "@uiw/react-codemirror";
import { FunctionComponent, useEffect, useRef, useState } from "react";
import { EditorConfig, MarkdownEditorProps } from "./editor.types";
import EnvUtils from "../../utils/env-utils";
import { StyledEditor } from "./styles/styled-editor";
import EditorToolBar from "./editor-tool-bar";
import { getRes } from "../../utils/constants";
import useMessage from "antd/es/message/useMessage";
import { getBorder } from "./editor-helpers";
import { languages } from "@codemirror/language-data";
import { markdown } from "@codemirror/lang-markdown";

import PasteUpload from "./paste-upload";
import ScrollSync from "./scroll-sync";
import HtmlPreviewPanel from "./html-preview-panel";
import { markdownToHtml } from "./utils/marked-utils";
import { addToCache, getCacheByKey } from "../../utils/cache";

type MarkdownEditorState = {
    markdownValue: string;
    content: string;
    preview: boolean;
    guttersWidth: number;
};

const MarkedEditor: FunctionComponent<MarkdownEditorProps> = ({
    height,
    value,
    onChange,
    content,
    loadSuccess,
    getContainer,
}) => {
    const getEditorConfigKey = () => {
        return "editor_config";
    };

    const getDefaultConfig = () => {
        const config = getCacheByKey(getEditorConfigKey()) as EditorConfig;
        if (config) {
            return config;
        }
        return { preview: window.innerWidth > 600 };
    };

    const [state, setState] = useState<MarkdownEditorState>({
        markdownValue: value ? value : "",
        //默认开启
        preview: getDefaultConfig().preview,
        content: content,
        guttersWidth: 27,
    });

    const editorRef = useRef<EditorView | null>(null);
    const previewRef = useRef<HTMLDivElement | null>(null);

    const [messageApi, contextHolder] = useMessage({ maxCount: 3 });

    const insertTextAtCursor = (text: string, cursorPosition: number) => {
        const view = editorRef.current;
        if (!view) return;

        const pos = view.state.selection.main.head; // 当前光标位置

        view.dispatch({
            changes: { from: pos, insert: text },
            selection: EditorSelection.cursor(pos + cursorPosition),
            scrollIntoView: true,
        });
        view.focus(); // 确保光标可见
    };

    function copyToClipboard(html: string) {
        const temp = document.createElement("input") as HTMLInputElement;
        document.body.append(temp);
        temp.value = html;
        temp.select();
        document.execCommand("copy", false);
        temp.remove();
    }

    const doCopy = async () => {
        copyToClipboard('<div class="markdown-body" style="padding:0">' + state.content + "</div>");
        messageApi.info(getRes().copPreviewHtmlToClipboardSuccess);
    };

    useEffect(() => {
        if (loadSuccess) {
            loadSuccess(null);
        }
    }, []);

    useEffect(() => {
        const md = state.markdownValue;
        markdownToHtml(md).then((html) => {
            const changeValues = {
                content: html,
                markdown: md,
            };
            setState((prevState) => {
                return {
                    ...prevState,
                    markdownValue: md,
                    content: html,
                };
            });
            onChange(changeValues);
        });
    }, [state.markdownValue]);

    const onViewChange = () => {
        if (editorRef.current && editorRef.current.dom) {
            const gutters = editorRef.current.dom.querySelector(".cm-gutters-before") as HTMLElement;
            //console.info( gutters.offsetWidth);
            if (gutters) {
                setState((prevState) => {
                    return {
                        ...prevState,
                        guttersWidth: gutters.offsetWidth,
                    };
                });
            }
        }
    };

    return (
        <StyledEditor style={{ paddingBottom: 30 }}>
            {editorRef.current && (
                <PasteUpload
                    onUploadSuccess={(imgUrl) => {
                        const content = "![](" + imgUrl + ")\n";
                        insertTextAtCursor(content, content.length);
                    }}
                    editorView={editorRef.current.contentDOM as HTMLElement}
                />
            )}
            <div className={EnvUtils.isDarkMode() ? "editor-dark" : "editor-light"} style={{ overflow: "hidden" }}>
                {contextHolder}
                <EditorToolBar
                    getContainer={getContainer}
                    onChange={(mdStr, cursorPosition) => {
                        insertTextAtCursor(mdStr, cursorPosition);
                    }}
                    onCopy={async () => {
                        await doCopy();
                    }}
                    onEditorModeChange={(preview) => {
                        setState((prevState) => {
                            addToCache(getEditorConfigKey(), { preview: preview });
                            return {
                                ...prevState,
                                preview: preview,
                            };
                        });
                    }}
                    preview={state.preview}
                />
                <div style={{ height: height, display: "flex", width: "100%" }}>
                    <CodeMirror
                        basicSetup={{ searchKeymap: false }}
                        placeholder={getRes()["editorPlaceholder"]}
                        value={state.markdownValue}
                        height={height}
                        width={"100%"}
                        onUpdate={(viewUpdate) => {
                            if (viewUpdate.viewportChanged) {
                                onViewChange();
                            }
                        }}
                        theme={EnvUtils.isDarkMode() ? "dark" : "light"}
                        extensions={[markdown({ codeLanguages: languages }), EditorView.lineWrapping]}
                        onCreateEditor={(view) => {
                            editorRef.current = view;
                            onViewChange();
                        }}
                        onChange={async (val, viewUpdate) => {
                            const gutter = viewUpdate.view.dom.querySelector(".cm-gutters") as HTMLElement;
                            if (gutter) {
                                const width = gutter.offsetWidth;
                                console.log("当前行号宽度:", width);
                            }
                            setState((prevState) => {
                                return {
                                    ...prevState,
                                    markdownValue: val,
                                };
                            });
                        }}
                        style={{
                            minWidth: state.preview ? `calc((50% + ${state.guttersWidth / 2}px)` : "100%",
                            width: state.preview ? `calc((50% + ${state.guttersWidth / 2}px)` : "100%",
                            overflow: "auto",
                        }}
                    />
                    <HtmlPreviewPanel
                        previewRef={previewRef}
                        style={{
                            display: state.preview ? "block" : "none",
                            minWidth: `calc((100% - ${state.guttersWidth}px) / 2)`,
                            width: `calc((100% - ${state.guttersWidth}px) / 2)`,
                            background: EnvUtils.isDarkMode() ? "#1a1a17" : "inherit",
                            paddingTop: 4,
                            paddingBottom: 4,
                            paddingRight: 2,
                            paddingLeft: 5,
                            borderLeft: getBorder(),
                            overflowY: "auto",
                            lineHeight: 1.4,
                            wordBreak: "break-word",
                            boxSizing: "border-box",
                        }}
                        htmlContent={state.content}
                    />
                </div>
            </div>
            {editorRef.current && previewRef.current && editorRef.current.scrollDOM && (
                <ScrollSync mdKey={state.markdownValue} editorRef={editorRef} previewRef={previewRef} />
            )}
        </StyledEditor>
    );
};

export default MarkedEditor;
