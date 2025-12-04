import { ChangedContent } from "../../components/articleEdit/index.types";
import { AIProviderType } from "../../type";

export type MarkdownEditorProps = {
    height: any;
    onChange: (content: ChangedContent) => void;
    value?: string;
    loadSuccess?: (editor: any) => void;
    getContainer?: () => HTMLElement;
    fullscreen: boolean;
    content: string;
    aiProvider: AIProviderType;
    sessionId: number;
    aiApiUri: string;
};

export type EditorDialogState = {
    open: boolean;
    title: string;
    type: DialogType;
};

export type EditorConfig = {
    preview: boolean;
};

export type DialogType = "image" | "video" | "file" | "link" | "code" | "table" | "help";
