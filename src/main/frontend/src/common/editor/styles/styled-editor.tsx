import styled from "styled-components";
import { getBorderColor } from "../editor-helpers";
import { getAppState } from "../../../base/ConfigProviderApp";

export const StyledEditor = styled("div")`
    .cm-editor.cm-focused {
        outline: none !important;
        box-shadow: none !important;
    }

    .editor-icon:hover {
        color: ${getAppState().colorPrimary} !important;
        background: ${getBorderColor()};
        border-radius: 2px;
    }

    .preview {
        overflow: auto;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans",
            sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    }

    .cm-scroller {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans",
            sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    }

    .cm-gutters {
        user-select: none;
    }

    .cm-panel.cm-search {
        font-size: 14px !important;
    }

    .cm-panels.cm-panels-bottom {
        border-top: none;
    }

    .cm-panel {
        border-top: ${getBorderColor()} solid 1px !important;
    }

    .cm-panel.cm-search .cm-button {
        font-size: 14px !important;
        background: ${getAppState().colorPrimary};
        color: white;
        border-radius: 4px;
    }

    .cm-panel.cm-search > button {
        cursor: pointer;
    }

    .cm-panel.cm-search [name="close"] {
        font-size: 22px !important;
        height: 32px !important;
        min-width: 32px !important;
    }

    .cm-panel.cm-search > label {
        font-size: 14px !important;
    }

    .cm-panel.cm-search > input {
        font-size: 14px !important;
        height: 26px;
        border-radius: 4px;
    }

    .editor-dark .cm-scroller {
        background-color: #1a1a17;
    }

    .editor-dark .cm-gutters {
        background-color: #141414;
    }

    .editor-dark .markdown-body table th,
    .editor-dark .markdown-body table td {
        border: 1px solid rgba(198, 198, 198, 0.5);
    }

    .editor-dark .markdown-body table tr {
        background-color: #212529 !important;
        border-top: 1px solid rgba(198, 198, 198, 0.5);
    }

    .editor-dark .markdown-body table tr:nth-child(2n) {
        background-color: #212529 !important;
    }

    .editor-dark .markdown-body pre {
        background-color: #1f1f1f !important;
    }
`;
