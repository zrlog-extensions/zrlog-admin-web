import { getAppState } from "../../base/ConfigProviderApp";

export const getBorder = () => {
    return getAppState().dark ? `1px solid rgba(253, 253, 253, 0.12)` : "1px solid #DDD";
};

export const getBorderColor = () => {
    return getAppState().dark ? `rgba(253, 253, 253, 0.12)` : "#DDD";
};
