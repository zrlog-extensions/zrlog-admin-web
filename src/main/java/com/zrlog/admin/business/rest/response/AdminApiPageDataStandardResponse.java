package com.zrlog.admin.business.rest.response;

import com.hibegin.common.util.StringUtils;
import com.zrlog.admin.business.AdminConstants;
import com.zrlog.common.Constants;
import com.zrlog.common.ZrLogConfig;
import com.zrlog.common.rest.response.StandardResponse;

import java.util.Objects;

public class AdminApiPageDataStandardResponse<T> extends StandardResponse {
    private final String pageBuildId;
    protected String documentTitle;
    private T data;


    public AdminApiPageDataStandardResponse() {
        this(null);
    }

    public AdminApiPageDataStandardResponse(T data) {
        this(data, "");
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

    public AdminApiPageDataStandardResponse(T data, String message) {
        this(data, message, null);
    }

    public AdminApiPageDataStandardResponse(T data, String message, String requestUri) {
        this.data = data;
        this.setMessage(message);
        ZrLogConfig zrLogConfig = Constants.zrLogConfig;
        if (Objects.nonNull(zrLogConfig) && Objects.nonNull(AdminConstants.adminResource)) {
            this.pageBuildId = AdminConstants.adminResource.getStaticResourceBuildId();
        } else {
            this.pageBuildId = "";
        }
        if (StringUtils.isNotEmpty(requestUri)) {
            this.documentTitle = AdminConstants.getAdminDocumentTitleByUri(requestUri);
        }
    }

    public String getPageBuildId() {
        return pageBuildId;
    }

    public String getDocumentTitle() {
        return documentTitle;
    }

    public void setDocumentTitle(String documentTitle) {
        this.documentTitle = documentTitle;
    }
}
