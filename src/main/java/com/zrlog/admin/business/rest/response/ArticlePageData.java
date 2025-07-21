package com.zrlog.admin.business.rest.response;

import com.hibegin.common.dao.dto.PageData;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class ArticlePageData extends PageData<ArticleResponseEntry> implements Serializable {

    private Boolean article_thumbnail_status;

    public ArticlePageData() {
    }

    private List<Map<String, Object>> types = new ArrayList<>();

    public List<Map<String, Object>> getTypes() {
        return types;
    }

    public void setTypes(List<Map<String, Object>> types) {
        this.types = types;
    }

    public Boolean getArticle_thumbnail_status() {
        return article_thumbnail_status;
    }

    public void setArticle_thumbnail_status(Boolean article_thumbnail_status) {
        this.article_thumbnail_status = article_thumbnail_status;
    }
}
