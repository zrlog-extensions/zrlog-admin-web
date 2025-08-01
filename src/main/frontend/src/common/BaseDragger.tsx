import Dragger from "antd/es/upload/Dragger";
import { CSSProperties, FunctionComponent, PropsWithChildren } from "react";
import { useAxiosBaseInstance } from "../base/AppBase";
import { tryAppendBackendServerUrl } from "../utils/constants";

export type DraggerUploadResponse = { data: { url: string } };

type BaseDraggerProps = PropsWithChildren & {
    style?: CSSProperties;
    accept?: string;
    action: string;
    name: string;
    onSuccess?: (data: DraggerUploadResponse) => void;
    onProgress?: (percent: number) => void;
    disabled?: boolean;
    onError?: (error: Error) => void;
    getContainer?: () => HTMLElement;
};

const BaseDragger: FunctionComponent<BaseDraggerProps> = ({
    children,
    style,
    action,
    accept,
    name,
    onSuccess,
    disabled,
    onProgress,
    onError,
    getContainer,
}) => {
    const axiosInstance = useAxiosBaseInstance(getContainer);

    const customRequest = async (options: any) => {
        const { file } = options;

        const formData = new FormData();
        formData.append(name, file);

        try {
            const { data } = await axiosInstance.post(action, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                onUploadProgress: ({ total, loaded }) => {
                    if (total) {
                        const percent = Math.round((loaded / total) * 100);
                        if (onProgress) {
                            onProgress(percent);
                        }
                    }
                },
            });

            if (data.error) {
                if (onError) {
                    onError(new Error("upload error -> " + data.message));
                }
                return;
            }
            // 触发成功回调
            if (onSuccess) {
                data.data.url = tryAppendBackendServerUrl(data.data.url);
                onSuccess(data);
            }
        } catch (err: any) {
            console.error(err);
            if (onError) {
                onError(err);
            }
        }
    };

    return (
        <Dragger
            disabled={disabled}
            multiple={false}
            accept={accept}
            showUploadList={false}
            customRequest={customRequest}
            style={style}
        >
            {children}
        </Dragger>
    );
};

export default BaseDragger;
