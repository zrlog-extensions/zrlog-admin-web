import { StyledHighlightDark } from "./highlight/styled-highlight-dark";
import { StyledHighlightDefault } from "./highlight/styled-highlight-default";
import { CSSProperties, FunctionComponent, MutableRefObject, useEffect, useRef } from "react";
import { StyledPreview } from "./styles/styled-preview";
import { getAppState } from "../../base/ConfigProviderApp";
import "katex/dist/katex.min.css";

export type EditorPreviewProps = {
    htmlContent: string;
    editable?: boolean;
    previewRef?: MutableRefObject<HTMLDivElement | null>;
    onContentChange?: (str: string) => void;
    style?: CSSProperties;
};

const HtmlPreviewPanel: FunctionComponent<EditorPreviewProps> = ({
    htmlContent,
    previewRef,
    editable,
    onContentChange,
    style,
}) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (ref.current && ref.current.innerHTML !== htmlContent) {
            ref.current.innerHTML = htmlContent;
        }
    }, [htmlContent]);

    const handleInput = () => {
        if (onContentChange && ref.current) {
            onContentChange(ref.current.innerHTML);
        }
    };

    const commonProps = {
        ref,
        autoFocus: false,
        contentEditable: editable,
        className: "markdown-body",
        onInput: handleInput,
        style: {
            outline: "none",
            boxShadow: "none",
        },
    };

    return (
        <StyledPreview ref={previewRef} style={style}>
            {getAppState().dark ? (
                <StyledHighlightDark {...commonProps} />
            ) : (
                <StyledHighlightDefault {...commonProps} />
            )}
        </StyledPreview>
    );
};

export default HtmlPreviewPanel;
