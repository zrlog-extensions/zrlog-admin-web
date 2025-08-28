import Divider from "antd/es/divider";
import Title from "antd/es/typography/Title";
import { getAppState } from "./ConfigProviderApp";
import { CSSProperties, FunctionComponent } from "react";

type BaseTitleProps = {
    title: string;
    noBottomBorder?: boolean;
    style?: CSSProperties;
};

const BaseTitle: FunctionComponent<BaseTitleProps> = ({ title, noBottomBorder, style }) => {
    return (
        <>
            <Title
                className="page-header"
                level={3}
                style={{
                    borderLeft: `3px solid ${getAppState().colorPrimary}`,
                    ...style,
                }}
            >
                {title}
            </Title>
            {noBottomBorder ? <></> : <Divider />}
        </>
    );
};

export default BaseTitle;
