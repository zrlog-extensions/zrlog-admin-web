package com.zrlog.admin.business.service;

import com.google.gson.Gson;
import com.hibegin.common.util.BeanUtil;
import com.hibegin.common.util.http.HttpUtil;
import com.hibegin.common.util.http.handle.HttpHandle;
import com.hibegin.common.util.http.handle.HttpResponseJsonHandle;
import com.zrlog.admin.business.exception.AdminUnknownException;
import com.zrlog.admin.business.rest.base.AIWebSiteInfoWithAIMessages;
import com.zrlog.admin.business.rest.response.AIResponseEntry;

import java.io.IOException;
import java.sql.SQLException;
import java.util.*;

public class AIService {

    public List<AIResponseEntry.AIContentEntry> getResponse(String input, Long articleId) throws IOException, InterruptedException, SQLException {
        AIWebSiteInfoWithAIMessages aiWebSiteInfo = new WebSiteService().getAiMessageInfoByArticleId(articleId);
        Map<String, Object> params = new HashMap<>();
        List<AIResponseEntry.AIContentEntry> messages = aiWebSiteInfo.getAiMessages();
        if (aiWebSiteInfo.getAiMessages().isEmpty()) {
            messages.add(new AIResponseEntry.AIContentEntry("system", aiWebSiteInfo.getAi_prompt()));
        }
        messages.add(new AIResponseEntry.AIContentEntry("user", input));
        params.put("messages", messages);
        params.put("model", aiWebSiteInfo.getAi_model());
        String requestBody = new Gson().toJson(params);
        Map<String, String> requestHeaders = new HashMap<>();
        requestHeaders.put("Content-Type", "application/json");
        requestHeaders.put("Authorization", "Bearer " + aiWebSiteInfo.getAi_api_key());
        HttpHandle<Map> httpHandle = HttpUtil.getInstance().sendPostRequest(aiWebSiteInfo.getAi_provider().getBaseUrl(), requestBody.getBytes(), new HttpResponseJsonHandle<>(Map.class), requestHeaders);
        Map responseBody = httpHandle.getT();
        if (Objects.isNull(responseBody)) {
            throw new AdminUnknownException("response body is null");
        }
        List<Map<String, Object>> choices = (List<Map<String, Object>>) responseBody.get("choices");
        AIResponseEntry.AIContentEntry outputs = BeanUtil.convert(choices.get(0).get("message"), AIResponseEntry.AIContentEntry.class);
        messages.add(outputs);
        if (new WebSiteService().saveAIMessage(messages, articleId)) {
            return Collections.singletonList(outputs);
        }
        throw new AdminUnknownException("Save to db failed");
    }
}
