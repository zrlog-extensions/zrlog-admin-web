package com.zrlog.admin.web.controller.api;

import com.hibegin.http.annotation.ResponseBody;
import com.hibegin.http.server.execption.NotFindResourceException;
import com.zrlog.admin.business.rest.response.AdminApiPageDataStandardResponse;
import com.zrlog.admin.business.rest.response.AdminStaticSiteSyncResponse;
import com.zrlog.admin.web.annotation.RequestLock;
import com.zrlog.admin.web.plugin.AdminStaticResourcePlugin;
import com.zrlog.admin.web.token.AdminTokenThreadLocal;
import com.zrlog.business.plugin.StaticSitePlugin;
import com.zrlog.business.plugin.type.StaticSiteType;
import com.zrlog.business.util.CacheUtils;
import com.zrlog.common.Constants;
import com.zrlog.common.controller.BaseController;

import java.util.List;
import java.util.Objects;

public class AdminStaticSiteController extends BaseController {

    @ResponseBody
    @RequestLock
    public AdminApiPageDataStandardResponse<AdminStaticSiteSyncResponse> startSync() {
        if (StaticSitePlugin.isDisabled()) {
            //仅让浏览器刷新
            return new AdminApiPageDataStandardResponse<>(new AdminStaticSiteSyncResponse(true));
        }
        AdminStaticResourcePlugin adminStaticResourcePlugin = Constants.zrLogConfig.getPlugin(AdminStaticResourcePlugin.class);
        if (Objects.isNull(adminStaticResourcePlugin)) {
            throw new NotFindResourceException("plugin not found");
        }
        return new AdminApiPageDataStandardResponse<>(new AdminStaticSiteSyncResponse(CacheUtils.refreshStaticSiteCache(request, List.of(StaticSiteType.ADMIN))));
    }

    @ResponseBody
    public AdminApiPageDataStandardResponse<AdminStaticSiteSyncResponse> index() {
        if (StaticSitePlugin.isDisabled()) {
            return new AdminApiPageDataStandardResponse<>(new AdminStaticSiteSyncResponse(true), "", request.getUri());
        }
        AdminStaticResourcePlugin adminStaticResourcePlugin = Constants.zrLogConfig.getPlugin(AdminStaticResourcePlugin.class);
        if (Objects.isNull(adminStaticResourcePlugin)) {
            throw new NotFindResourceException("plugin not found");
        }
        return new AdminApiPageDataStandardResponse<>(new AdminStaticSiteSyncResponse(adminStaticResourcePlugin.isSynchronized(AdminTokenThreadLocal.getUserProtocol())), "", request.getUri());
    }
}
