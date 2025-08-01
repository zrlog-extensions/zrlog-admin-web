import { ArticleEditInfo, ArticleEditState, ArticleEntry } from "../components/articleEdit/index.types";
import { addToCache, getCacheByKey, removeCacheDataByKey } from "./cache";

const buildCacheKey = (logId: number | undefined | null) => {
    if (logId === undefined || logId === null || logId <= 0) {
        return "local-article-cache-draft";
    }
    return "local-article-cache-" + logId;
};

export const articleDataToState = (data: ArticleEditInfo): ArticleEditState => {
    const article: ArticleEntry =
        data.article.logId && data.article.logId > 0
            ? data.article
            : {
                  version: -1,
                  title: "",
                  keywords: "",
                  /*默认创建的为草稿*/
                  rubbish: true,
              };
    const cachedArticle = getCacheByKey(buildCacheKey(article.logId)) as ArticleEntry;
    let realArticle;
    //本地缓存版本是没有被服务器再次修改的情况下才使用缓存数据
    if (cachedArticle && cachedArticle.version >= data.article.version) {
        realArticle = cachedArticle;
    } else if (cachedArticle && article.version === -1) {
        realArticle = cachedArticle;
    } else {
        realArticle = data.article;
    }

    return {
        typeOptions: data.types
            ? data.types.map((x) => {
                  return { value: x.id, label: x.typeName };
              })
            : [],
        editorVersion: realArticle.version,
        tags: data.tags ? data.tags : [],
        rubbish: data.article && data.article.rubbish ? data.article.rubbish : false,
        article: realArticle,
        saving: {
            previewIng: false,
            releaseSaving: false,
            rubbishSaving: false,
            autoSaving: false,
        },
    };
};

export const articleSaveToCache = (article: ArticleEntry) => {
    addToCache(buildCacheKey(article.logId), article);
};

export const removeArticleCache = (article: ArticleEntry) => {
    removeCacheDataByKey(buildCacheKey(article.logId));
};

export const removeLocalArticleCache = () => {
    removeCacheDataByKey(buildCacheKey(null));
};
