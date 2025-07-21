package com.zrlog.admin.web;

import com.google.gson.Gson;
import com.hibegin.common.util.EnvKit;
import com.hibegin.http.server.api.Interceptor;
import com.hibegin.http.server.util.NativeImageUtils;
import com.zrlog.admin.business.AdminConstants;
import com.zrlog.admin.business.rest.base.*;
import com.zrlog.admin.business.rest.request.*;
import com.zrlog.admin.business.rest.response.*;
import com.zrlog.admin.business.service.AdminResource;
import com.zrlog.admin.util.DevKit;
import com.zrlog.admin.util.ServerInfo;
import com.zrlog.admin.web.config.AdminRouters;
import com.zrlog.admin.web.interceptor.*;
import com.zrlog.admin.web.plugin.AdminStaticResourcePlugin;
import com.zrlog.admin.web.plugin.UpdateVersionInfoPlugin;
import com.zrlog.business.rest.response.PluginStatusResponse;
import com.zrlog.common.ZrLogConfig;
import com.zrlog.common.rest.response.ApiStandardResponse;
import com.zrlog.common.vo.AdminFullTokenVO;
import com.zrlog.common.vo.AdminTokenVO;
import com.zrlog.common.vo.TemplateVO;
import com.zrlog.data.dto.CommentDTO;
import com.zrlog.data.dto.LinkDTO;
import com.zrlog.data.dto.LogNavDTO;
import com.zrlog.data.dto.TypeDTO;
import com.zrlog.plugin.Plugins;
import com.zrlog.web.WebSetup;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class AdminWebSetup implements WebSetup {

    private final ZrLogConfig zrLogConfig;
    private final AdminResource adminResource;
    private final String contextPath;

    private static void adminRequestJson() {
        //post
        new Gson().toJson(new CreateArticleRequest());
        new Gson().toJson(new CreateTypeRequest());
        new Gson().toJson(new LoginRequest());
        new Gson().toJson(new UpdateArticleRequest());
        new Gson().toJson(new CreateOrUpdateArticleResponse());
        new Gson().toJson(new CreateLinkRequest());
        new Gson().toJson(new CreateNavRequest());
        //update
        new Gson().toJson(new UpdateNavRequest());
        new Gson().toJson(new UpdateTypeRequest());
        new Gson().toJson(new UpdateLinkRequest());
        new Gson().toJson(new UpdateAdminRequest());
        new Gson().toJson(new ReadCommentRequest());
        new Gson().toJson(new UpdatePasswordRequest());
        new Gson().toJson(new UserBasicInfoResponse());
        new Gson().toJson(new AdminStaticSiteSyncResponse());
    }

    private static void adminResponseJson() {
        new Gson().toJson(new TemplateDownloadResponse(""));
        new Gson().toJson(new TypeDTO());
        new Gson().toJson(new CommentDTO());
        new Gson().toJson(new LinkDTO());
        new Gson().toJson(new LogNavDTO());
        new Gson().toJson(new ArticleResponseEntry());
        new Gson().toJson(new DownloadUpdatePackageResponse(0));
        new Gson().toJson(new UpgradeProcessResponse(false, ""));
        new Gson().toJson(new PreCheckVersionResponse());
        new Gson().toJson(new BlogWebSiteInfo());
        new Gson().toJson(new OtherWebSiteInfo());
        new Gson().toJson(new AdminWebSiteInfo());
        new Gson().toJson(new UpgradeWebSiteInfo());
        new Gson().toJson(new TemplateVO());
        new Gson().toJson(new BasicWebSiteInfo());
        new Gson().toJson(new ArticleGlobalResponse());
        new Gson().toJson(new ArticlePageData());
        new Gson().toJson(new ApiStandardResponse<>());
        new Gson().toJson(new UploadFileResponse(""));
        new Gson().toJson(new IndexResponse(new StatisticsInfoResponse(), "", new ArrayList<>(), new ArrayList<>(), ""));
        new Gson().toJson(new StatisticsInfoResponse());
        new Gson().toJson(new ServerSideDataResponse<>(new UserBasicInfoResponse(), new HashMap<>(), new Object(), "/", ""));
        new Gson().toJson(new AdminTokenVO());
        new Gson().toJson(new AdminFullTokenVO());
        new Gson().toJson(new VersionResponse());
        new Gson().toJson(new PluginStatusResponse());
        new Gson().toJson(new UploadTemplateResponse());
        new Gson().toJson(new DeleteLogResponse(true));
        new Gson().toJson(new LoadEditArticleResponse());
        new Gson().toJson(new UserBasicInfoResponse());
        new Gson().toJson(new ServerInfo("1", "1", ""));
        new Gson().toJson(new SystemResponse(new ArrayList<>(), new ArrayList<>(), false, false));
    }

    private static void adminJson() {
        adminResponseJson();
        adminRequestJson();
    }

    public AdminWebSetup(ZrLogConfig zrLogConfig, AdminResource adminResource, String contextPath) {
        this.zrLogConfig = zrLogConfig;
        this.adminResource = adminResource;
        this.contextPath = contextPath;
        AdminConstants.adminResource = adminResource;
        if (zrLogConfig.getServerConfig().isNativeImageAgent()) {
            //register
            NativeImageUtils.doResourceLoadByResourceNames(getResources(adminResource));
            adminJson();
        }
    }

    private static List<String> getResources(AdminResource adminResource) {
        List<String> resourceUris = new ArrayList<>(adminResource.getAdminStaticResourceUris());
        resourceUris.add("/assets/images/default-portrait.gif");
        resourceUris.add(AdminConstants.ADMIN_HTML_PAGE);
        resourceUris.add(AdminConstants.ADMIN_PWA_MANIFEST_JSON);
        resourceUris.add(AdminConstants.ADMIN_SERVICE_WORKER_JS);
        resourceUris.add(AdminResource.ADMIN_ASSET_MANIFEST_JSON);
        resourceUris.add(AdminConstants.FAVICON_PNG_PWA_192_URI_PATH);
        resourceUris.add(AdminConstants.FAVICON_PNG_PWA_512_URI_PATH);
        resourceUris.add("/i18n/admin_en_US.properties");
        resourceUris.add("/i18n/admin_zh_CN.properties");
        return resourceUris;
    }

    @Override
    public void setup() {
        List<Class<? extends Interceptor>> interceptors = zrLogConfig.getServerConfig().getInterceptors();
        //admin
        interceptors.add(AdminCrossOriginInterceptor.class);
        interceptors.add(PwaInterceptor.class);
        interceptors.add(AdminPwaInterceptor.class);
        interceptors.add(AdminStaticResourceInterceptor.class);
        interceptors.add(AdminPluginInterceptor.class);
        interceptors.add(AdminInterceptor.class);
        if (EnvKit.isDevMode()) {
            DevKit.configDev(zrLogConfig.getServerConfig());
        }
        //router
        AdminRouters.configAdminRoute(zrLogConfig.getServerConfig().getRouter(), adminResource, contextPath);
        for (String uri : AdminConstants.adminStaticResources) {
            zrLogConfig.getServerConfig().addStaticResourceMapper(uri, uri, AdminWebSetup.class::getResourceAsStream);
        }
    }

    @Override
    public Plugins getPlugins() {
        Plugins iPlugins = new Plugins();
        iPlugins.add(new UpdateVersionInfoPlugin());
        iPlugins.add(new AdminStaticResourcePlugin(zrLogConfig, adminResource, contextPath));
        return iPlugins;
    }
}
