import Divider from "antd/es/divider";
import Title from "antd/es/typography/Title";
import { getAppState } from "./ConfigProviderApp";

const BaseTitle = ({ title }: { title: string }) => {
    return (
        <>
            <Title
                className="page-header"
                level={3}
                style={{
                    borderLeft: `3px solid ${getAppState().colorPrimary}`,
                }}
            >
                {title}
            </Title>
            <Divider />
        </>
    );
};

export default BaseTitle;
