package com.zrlog.admin.business.rest.response;

import com.zrlog.admin.business.type.AIProviderType;
import com.zrlog.common.cache.dto.TagDTO;
import com.zrlog.common.cache.dto.TypeDTO;

import java.util.List;

public class ArticleGlobalResponse {

    private List<TagDTO> tags;
    private List<TypeDTO> types;
    private LoadEditArticleResponse article;
    private AIProviderType aiProvider;

    public LoadEditArticleResponse getArticle() {
        return article;
    }

    public void setArticle(LoadEditArticleResponse article) {
        this.article = article;
    }

    public List<TagDTO> getTags() {
        return tags;
    }

    public void setTags(List<TagDTO> tags) {
        this.tags = tags;
    }

    public List<TypeDTO> getTypes() {
        return types;
    }

    public void setTypes(List<TypeDTO> types) {
        this.types = types;
    }

    public AIProviderType getAiProvider() {
        return aiProvider;
    }

    public void setAiProvider(AIProviderType aiProvider) {
        this.aiProvider = aiProvider;
    }
}
