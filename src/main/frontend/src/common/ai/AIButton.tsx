import AIDrawer from "./AIDrawer";
import { getRealRouteUrl, getRes } from "../../utils/constants";
import { Link } from "react-router-dom";
import { AIProviderType } from "../../type";
import { FunctionComponent, PropsWithChildren, useState } from "react";
import Popconfirm from "antd/es/popconfirm";
import { AIContent } from "./AIContentItem";

type AIButtonProps = PropsWithChildren & {
    input: string;
    sessionId: number;
    apiUri: string;
    onClose?: () => void;
    onOpen?: () => void;
    aiProvider: AIProviderType;
    getContainer?: () => HTMLElement;
    subject?: string;
    aiMessages?: AIContent[];
    onAiMessagesChange?: (messages: AIContent[]) => void;
};

const AIButton: FunctionComponent<AIButtonProps> = ({
    input,
    subject,
    aiProvider,
    sessionId,
    getContainer,
    children,
    onClose,
    onOpen,
    aiMessages,
    onAiMessagesChange,
}) => {
    const needConfig = (aiProvider as string) === "" || aiProvider === null || aiProvider === undefined;
    const [aiOpen, setAiOpen] = useState<boolean>(false);

    return (
        <>
            <AIDrawer
                aiProvider={aiProvider}
                hide={!aiOpen}
                apiUri={"/api/admin/article/ai"}
                input={input}
                subject={subject}
                sessionId={sessionId}
                onClose={() => {
                    setAiOpen(false);
                    if (onClose) {
                        onClose();
                    }
                }}
                onAiMessagesChange={onAiMessagesChange}
                aiMessages={aiMessages}
                getContainer={getContainer}
            />
            <Popconfirm
                disabled={!needConfig}
                title={getRes()["admin.ai.askConfig"]}
                okText={<Link to={getRealRouteUrl("/website/ai")}>{getRes()["admin.setting"]}</Link>}
            >
                <div
                    onClick={() => {
                        if (needConfig) {
                            return;
                        }
                        setAiOpen(true);
                        if (onOpen) {
                            onOpen();
                        }
                    }}
                >
                    {children}
                </div>
            </Popconfirm>
        </>
    );
};

export default AIButton;
