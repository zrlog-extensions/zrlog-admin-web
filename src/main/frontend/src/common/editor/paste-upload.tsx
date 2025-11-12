import { useAxiosBaseInstance } from "../../base/AppBase";
import { FunctionComponent, useEffect } from "react";
import { getBackendServerUrl, isStaticPage } from "../../utils/constants";

type PasteUploadProps = {
    onUploadSuccess: (imgUrl: string) => void;
    onUploading?: () => void;
    onUploadFailure?: () => void;
    getContainer?: () => HTMLElement;
    editorView?: HTMLElement;
};

const PasteUpload: FunctionComponent<PasteUploadProps> = ({
    onUploadSuccess,
    getContainer,
    editorView,
    onUploading,
    onUploadFailure,
}) => {
    const axiosInstance = useAxiosBaseInstance(getContainer);

    function uploadFile(file: File | null) {
        const index = Math.random().toString(10).substr(2, 5) + "-" + Math.random().toString(36).substr(2);

        const fileName = index + ".png";
        const formData = new FormData();
        if (file) {
            formData.append("imgFile", file, fileName);
            if (onUploading) {
                onUploading();
            }
            axiosInstance
                .post("/api/admin/upload?dir=image", formData)
                .then(({ data }) => {
                    const url = data.data.url;
                    if (isStaticPage() && url.startsWith("/")) {
                        onUploadSuccess(getBackendServerUrl() + data.data.url.substring(1));
                        return;
                    }
                    onUploadSuccess(url);
                })
                .catch(() => {
                    if (onUploadFailure) {
                        onUploadFailure();
                    }
                });
        }
    }

    const doUpload = (e: ClipboardEvent) => {
        const clipboardData = e.clipboardData;
        if (clipboardData === null) {
            return;
        }
        const items = clipboardData.items;
        for (let i = 0; i < items.length; i++) {
            if (items[i].kind === "file" && items[i].type.match(/^image/)) {
                // 取消默认的粘贴操作
                e.preventDefault();
                // 上传文件
                uploadFile(items[i].getAsFile());
                break;
            }
        }
    };

    const doHandler = () => {
        if (editorView) {
            editorView.addEventListener("paste", doUpload);
        }
    };

    useEffect(() => {
        doHandler();

        return () => {
            editorView?.removeEventListener("paste", doUpload);
        };
    }, []);

    return <></>;
};

export default PasteUpload;
