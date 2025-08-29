import styled from "styled-components";
import { getBorderColor } from "../editor-helpers";

export const StyledEditor = styled("div")<{ mainColor: string }>(({ mainColor }) => {
    return {
        ".cm-editor.cm-focused": {
            outline: "none !important",
            boxShadow: "none !important",
        },
        ".editor-icon:hover": {
            borderRadius: 2,
            color: `${mainColor} !important`,
            background: `${getBorderColor()}`,
        },
        ".preview": {
            overflow: "auto",
            fontFamily:
                '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans",sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
        },
        ".cm-scroller": {
            fontFamily:
                '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans",sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
        },
        ".cm-gutters": { userSelect: "none" },
        ".cm-panel.cm-search": { fontSize: "14px !important" },
        ".cm-panels.cm-panels-bottom": { borderTop: "none" },
        ".cm-panel": {
            borderTop: `${mainColor} solid 1px !important`,
        },
        ".cm-panel.cm-search .cm-button": {
            fontSize: "14px !important",
            background: mainColor,
            color: "white",
            borderRadius: 4,
        },
        ".cm-panel.cm-search > button": { cursor: "pointer" },
        '.cm-panel.cm-search [name="close"]': {
            fontSize: "22px !important",
            height: "32px !important",
            minWidth: "32px !important",
        },
        ".cm-panel.cm-search > label": { fontSize: "14px !important" },
        ".cm-panel.cm-search > input": {
            fontSize: "14px !important",
            height: 26,
            borderRadius: 4,
        },
        ".editor-dark .cm-scroller": { backgroundColor: "#1a1a17" },
        ".editor-dark .cm-gutters": { backgroundColor: "#141414" },
        ".editor-dark .markdown-body table th": {
            border: "1px solid rgba(198, 198, 198, 0.5)",
        },
        ".editor-dark .markdown-body table td": {
            border: "1px solid rgba(198, 198, 198, 0.5)",
        },
        ".editor-dark .markdown-body table tr": {
            backgroundColor: "#212529 !important",
            borderTop: "1px solid rgba(198, 198, 198, 0.5)",
        },
        ".editor-dark .markdown-body table tr:nth-child(2n)": {
            backgroundColor: "#212529 !important",
        },
        ".editor-dark .markdown-body pre": { backgroundColor: "#1f1f1f !important" },
    };
});
