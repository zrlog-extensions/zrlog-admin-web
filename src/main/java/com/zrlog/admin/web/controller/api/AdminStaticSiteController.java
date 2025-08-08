package com.zrlog.admin.web.controller.api;

import com.hibegin.common.util.EnvKit;
import com.hibegin.http.annotation.ResponseBody;
import com.hibegin.http.server.execption.NotFindResourceException;
import com.zrlog.admin.business.rest.response.AdminApiPageDataStandardResponse;
import com.zrlog.admin.business.rest.response.AdminStaticSiteSyncResponse;
import com.zrlog.admin.web.annotation.RequestLock;
import com.zrlog.admin.web.plugin.AdminStaticResourcePlugin;
import com.zrlog.business.plugin.StaticSitePlugin;
import com.zrlog.common.Constants;
import com.zrlog.common.controller.BaseController;

import java.util.Objects;

public class AdminStaticSiteController extends BaseController {

    @ResponseBody
    @RequestLock
    public AdminApiPageDataStandardResponse<AdminStaticSiteSyncResponse> startSync() {
        if (StaticSitePlugin.isDisabled()) {
            return new AdminApiPageDataStandardResponse<>(new AdminStaticSiteSyncResponse(false));
        }
        AdminStaticResourcePlugin adminStaticResourcePlugin = Constants.zrLogConfig.getPlugin(AdminStaticResourcePlugin.class);
        if (Objects.isNull(adminStaticResourcePlugin)) {
            throw new NotFindResourceException("plugin not found");
        }
        adminStaticResourcePlugin.start();
        int timeout = 3600;
        if (EnvKit.isLambda()) {
            //建议配置 Lambda 为最大超时
            timeout = 12 * 60;
        }
        return new AdminApiPageDataStandardResponse<>(new AdminStaticSiteSyncResponse(adminStaticResourcePlugin.waitCacheSync(request, timeout)));
    }

    @ResponseBody
    public AdminApiPageDataStandardResponse<AdminStaticSiteSyncResponse> index() {
        if (StaticSitePlugin.isDisabled()) {
            return new AdminApiPageDataStandardResponse<>(new AdminStaticSiteSyncResponse(false));
        }
        AdminStaticResourcePlugin adminStaticResourcePlugin = Constants.zrLogConfig.getPlugin(AdminStaticResourcePlugin.class);
        if (Objects.isNull(adminStaticResourcePlugin)) {
            throw new NotFindResourceException("plugin not found");
        }
        return new AdminApiPageDataStandardResponse<>(new AdminStaticSiteSyncResponse(adminStaticResourcePlugin.isSynchronized(request)), "", request.getUri());
    }
}
