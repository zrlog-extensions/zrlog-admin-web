import React from "react";
import EditorIcon from "./editor-icon";
import { AIProviderType } from "../../type";
import AIIcon from "../ai/AIIcon";
import AIButton from "../ai/AIButton";
import { getBgColor } from "./editor-helpers";
import { EditorToolBarDivider } from "./editor-tool-bar";

export interface SelectionToolbarProps {
    visible: boolean;
    top: number;
    left: number;
    onBold: () => void;
    onItalic: () => void;
    onStrikethrough: () => void;
    aiProvider: AIProviderType;
    selectedText: string;
    sessionId: number;
    aiApiUri: string;
    subject: string;
}

export const SelectionToolbar: React.FC<SelectionToolbarProps> = ({
    visible,
    top,
    left,
    onBold,
    onStrikethrough,
    aiProvider,
    selectedText,
    aiApiUri,
    sessionId,
    onItalic,
    subject,
}) => {
    if (!visible) return null;

    return (
        <div
            style={{
                position: "fixed",
                top,
                left,
                padding: "4px 8px",
                borderRadius: 4,
                display: "flex",
                gap: 8,
                zIndex: 1,
                alignItems: "center",
                background: getBgColor(),
            }}
            // 避免点击时让编辑器失焦 / 选区消失
            onMouseDown={(e) => e.preventDefault()}
        >
            <EditorIcon name={"bold"} onClick={onBold} />
            <EditorIcon name={"strikethrough"} onClick={onStrikethrough} />
            <EditorIcon name={"italic"} onClick={onItalic} />
            <EditorToolBarDivider />
            <AIButton
                input={selectedText}
                subject={subject}
                sessionId={sessionId}
                apiUri={aiApiUri}
                hide={true}
                aiProvider={aiProvider}
            >
                <div
                    className={"editor-icon"}
                    style={{
                        cursor: "pointer",
                        minWidth: 34,
                        display: "flex",
                        alignItems: "center",
                        color: "rgb(119, 119, 119)",
                        fontSize: 16,
                        height: 38,
                        borderRadius: 6,
                        justifyContent: "center",
                    }}
                >
                    <AIIcon name={aiProvider} />
                </div>
            </AIButton>
        </div>
    );
};

export default SelectionToolbar;
