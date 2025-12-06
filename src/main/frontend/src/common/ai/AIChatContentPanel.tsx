import AIContentItem, { AIContent } from "./AIContentItem";
import { FunctionComponent, useRef } from "react";
import { AIProviderType } from "../../type";

type AIChatContentPanelProps = {
    contents: AIContent[];
    aiProvider: AIProviderType;
};

const AIChatContentPanel: FunctionComponent<AIChatContentPanelProps> = ({ contents, aiProvider }) => {
    const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});

    const scrollToItem = (id: string) => {
        const el = itemRefs.current[id];
        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    if (contents.length === 0) {
        return <></>;
    }

    return (
        <div
            style={{
                paddingRight: 16,
                paddingLeft: 16,
                paddingTop: 12,
                maxHeight: "calc(100vh - 168px)",
                maxWidth: 768,
                width: "100%",
            }}
        >
            {contents.map((e, idx) => {
                return (
                    <AIContentItem
                        key={idx}
                        onRenderSuccess={() => {
                            scrollToItem(contents.length - 1 + "");
                        }}
                        ref={(el) => (itemRefs.current[idx + ""] = el)}
                        content={e}
                        aiProvider={aiProvider}
                        style={{ paddingTop: 8, paddingBottom: 8 }}
                    />
                );
            })}
        </div>
    );
};

export default AIChatContentPanel;
