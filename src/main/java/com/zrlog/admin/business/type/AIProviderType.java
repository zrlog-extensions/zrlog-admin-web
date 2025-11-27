package com.zrlog.admin.business.type;

import java.util.Arrays;
import java.util.List;

public enum AIProviderType {

    DEEK_SEEK("https://", Arrays.asList("")),
    OPEN_AI("https://api.openai.com/v1/responses", Arrays.asList("gpt-5.1", "gpt-5", "gpt-5-mini", "gpt-4.1"));

    private final String baseUrl;
    private final List<String> models;

    AIProviderType(String baseUrl, List<String> models) {
        this.baseUrl = baseUrl;
        this.models = models;
    }

    public String getBaseUrl() {
        return baseUrl;
    }

    public List<String> getModels() {
        return models;
    }
}
