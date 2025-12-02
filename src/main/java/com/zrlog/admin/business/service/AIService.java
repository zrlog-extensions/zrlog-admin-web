package com.zrlog.admin.business.service;

import com.google.gson.Gson;
import com.hibegin.common.util.BeanUtil;
import com.hibegin.common.util.http.HttpUtil;
import com.hibegin.common.util.http.handle.HttpHandle;
import com.hibegin.common.util.http.handle.HttpResponseJsonHandle;
import com.zrlog.admin.business.rest.base.AIWebSiteInfo;
import com.zrlog.admin.business.rest.response.AIResponseEntry;
import com.zrlog.admin.business.type.AIProviderType;
import com.zrlog.common.exception.NotImplementException;

import java.io.IOException;
import java.rmi.RemoteException;
import java.util.*;

public class AIService {

    public List<AIResponseEntry.AIContentEntry> getResponse(String input, Long articleId) throws IOException, InterruptedException {
        AIWebSiteInfo aiWebSiteInfo = new WebSiteService().ai();
        Map<String, Object> params = new HashMap<>();
        List<Map<String, Object>> messages = new ArrayList<>();
        messages.add(Map.of("content", aiWebSiteInfo.getAi_prompt(), "role", "system"));
        messages.add(Map.of("content", input, "role", "user"));
        params.put("messages", messages);
        params.put("model", aiWebSiteInfo.getAi_model());
        String requestBody = new Gson().toJson(params);
        Map<String, String> requestHeaders = new HashMap<>();
        requestHeaders.put("Content-Type", "application/json");
        requestHeaders.put("Authorization", "Bearer " + aiWebSiteInfo.getAi_api_key());
        HttpHandle<Map> httpHandle = HttpUtil.getInstance().sendPostRequest(aiWebSiteInfo.getAi_provider().getBaseUrl(), requestBody.getBytes(), new HttpResponseJsonHandle<>(Map.class), requestHeaders);
        Map responseBody = httpHandle.getT();
        if (Objects.isNull(responseBody)) {
            throw new RemoteException("response body is null");
        }
        if (aiWebSiteInfo.getAi_provider() == AIProviderType.DEEK_SEEK) {
            List<Map<String, Object>> choices = (List<Map<String, Object>>) responseBody.get("choices");
            AIResponseEntry.AIContentEntry outputs = BeanUtil.convert(choices.get(0).get("message"), AIResponseEntry.AIContentEntry.class);
            return Collections.singletonList(outputs);
        }
        throw new NotImplementException();
    }
}
