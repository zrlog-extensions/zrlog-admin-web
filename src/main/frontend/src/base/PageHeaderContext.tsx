import { createContext, useContext } from "react";

type PageHeaderContextValue = {
    title?: string;
};

export const PageHeaderContext = createContext<PageHeaderContextValue>({});

export const usePageHeaderContext = () => useContext(PageHeaderContext);
