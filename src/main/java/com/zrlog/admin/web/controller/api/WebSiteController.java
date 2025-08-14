package com.zrlog.admin.web.controller.api;

import com.hibegin.common.util.BeanUtil;
import com.hibegin.common.util.IOUtil;
import com.hibegin.http.HttpMethod;
import com.hibegin.http.annotation.ResponseBody;
import com.zrlog.admin.business.AdminConstants;
import com.zrlog.admin.business.rest.base.*;
import com.zrlog.admin.business.rest.response.AdminApiPageDataStandardResponse;
import com.zrlog.admin.business.rest.response.VersionResponse;
import com.zrlog.admin.business.service.WebSiteService;
import com.zrlog.admin.web.annotation.RefreshCache;
import com.zrlog.admin.web.annotation.RequestLock;
import com.zrlog.admin.web.plugin.UpdateVersionInfoPlugin;
import com.zrlog.admin.web.type.AutoUpgradeVersionType;
import com.zrlog.business.plugin.type.StaticSiteType;
import com.zrlog.common.Constants;
import com.zrlog.common.cache.vo.BaseDataInitVO;
import com.zrlog.common.controller.BaseController;
import com.zrlog.model.WebSite;
import com.zrlog.util.BlogBuildInfoUtil;
import com.zrlog.util.I18nUtil;

import java.io.InputStream;
import java.sql.SQLException;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Objects;

public class WebSiteController extends BaseController {

    private final WebSiteService webSiteService = new WebSiteService();

    @ResponseBody
    public AdminApiPageDataStandardResponse<VersionResponse> version() {
        VersionResponse versionResponse = new VersionResponse();
        versionResponse.setBuildId(BlogBuildInfoUtil.getBuildId());
        versionResponse.setVersion(BlogBuildInfoUtil.getVersion());
        versionResponse.setChangelog(UpdateVersionInfoPlugin.getCurrentChangeLog(I18nUtil.getAdminBackend()));
        InputStream resourceAsStream = WebSiteController.class.getResourceAsStream(AdminConstants.BUILD_SYSTEM_INFO_MD);
        if (Objects.nonNull(resourceAsStream)) {
            versionResponse.setBuildSystemInfo(IOUtil.getStringInputStream(resourceAsStream));
        } else {
            versionResponse.setBuildSystemInfo("#### Not find build system info file");
        }
        return new AdminApiPageDataStandardResponse<>(versionResponse, "", request.getUri());
    }

    @ResponseBody
    public AdminApiPageDataStandardResponse<BasicWebSiteInfo> index() throws SQLException {
        return basic();
    }

    @RefreshCache(onlyOnPostMethod = true, updateStaticSites = {StaticSiteType.BLOG, StaticSiteType.ADMIN})
    @RequestLock(onlyOnPostMethod = true)
    @ResponseBody
    public AdminApiPageDataStandardResponse<BasicWebSiteInfo> basic() throws SQLException {
        if (request.getMethod() == HttpMethod.POST) {
            update(getRequestBodyWithNullCheck(BasicWebSiteInfo.class));
        }
        return new AdminApiPageDataStandardResponse<>(webSiteService.basicWebSiteInfo(), I18nUtil.getAdminBackendStringFromRes("updateSuccess"), request.getUri());

    }

    private AdminApiPageDataStandardResponse<Void> update(Object t) throws SQLException {
        Map<String, Object> requestMap = BeanUtil.convert(t, Map.class);
        if (Objects.nonNull(requestMap)) {
            for (Entry<String, Object> param : requestMap.entrySet()) {
                new WebSite().updateByKV(param.getKey(), param.getValue());
            }
        }
        AdminApiPageDataStandardResponse<Void> updateResponse = new AdminApiPageDataStandardResponse<>();
        updateResponse.setError(0);
        updateResponse.setMessage(I18nUtil.getAdminBackendStringFromRes("updateSuccess"));
        BaseDataInitVO dataInitVO = Constants.zrLogConfig.getCacheService().getInitData();
        if (Objects.nonNull(dataInitVO)) {
            dataInitVO.setWebSite(new WebSite().getPublicWebSite());
        }
        return updateResponse;
    }

    @RefreshCache(onlyOnPostMethod = true, updateStaticSites = StaticSiteType.BLOG)
    @RequestLock(onlyOnPostMethod = true)
    @ResponseBody
    public AdminApiPageDataStandardResponse<BlogWebSiteInfo> blog() throws SQLException {
        if (request.getMethod() == HttpMethod.POST) {
            update(getRequestBodyWithNullCheck(BlogWebSiteInfo.class));
        }
        return new AdminApiPageDataStandardResponse<>(webSiteService.blogWebSiteInfo(), I18nUtil.getAdminBackendStringFromRes("updateSuccess"), request.getUri());
    }

    @RefreshCache(onlyOnPostMethod = true, updateStaticSites = StaticSiteType.BLOG)
    @RequestLock(onlyOnPostMethod = true)
    @ResponseBody
    public AdminApiPageDataStandardResponse<OtherWebSiteInfo> other() throws SQLException {
        if (request.getMethod() == HttpMethod.POST) {
            update(getRequestBodyWithNullCheck(OtherWebSiteInfo.class));
        }
        return new AdminApiPageDataStandardResponse<>(webSiteService.other(), I18nUtil.getAdminBackendStringFromRes("updateSuccess"), request.getUri());
    }

    @RefreshCache(onlyOnPostMethod = true, updateStaticSites = StaticSiteType.ADMIN)
    @RequestLock(onlyOnPostMethod = true)
    @ResponseBody
    public AdminApiPageDataStandardResponse<AdminWebSiteInfo> admin() throws SQLException {
        if (request.getMethod() == HttpMethod.POST) {
            AdminWebSiteInfo adminWebSiteInfo = getRequestBodyWithNullCheck(AdminWebSiteInfo.class);
            update(adminWebSiteInfo);
            Constants.zrLogConfig.getTokenService().updateSessionTimeout(adminWebSiteInfo.getSession_timeout());
        }
        return new AdminApiPageDataStandardResponse<>(webSiteService.adminWebSiteInfo(), I18nUtil.getAdminBackendStringFromRes("updateSuccess"), request.getUri());
    }

    @RequestLock(onlyOnPostMethod = true)
    @ResponseBody
    public AdminApiPageDataStandardResponse<UpgradeWebSiteInfo> upgrade() throws SQLException {
        if (request.getMethod() == HttpMethod.POST) {
            UpdateVersionInfoPlugin updateVersionInfoPlugin = Constants.zrLogConfig.getPlugin(UpdateVersionInfoPlugin.class);
            if (Objects.isNull(updateVersionInfoPlugin)) {
                throw new RuntimeException("Missing setup updateVersionInfoPlugin");
            }
            UpgradeWebSiteInfo request = getRequestBodyWithNullCheck(UpgradeWebSiteInfo.class);
            update(request);
            if (AutoUpgradeVersionType.cycle(request.getAutoUpgradeVersion()) == AutoUpgradeVersionType.NEVER) {
                updateVersionInfoPlugin.stop();
            } else {
                updateVersionInfoPlugin.start();
            }
        }
        return new AdminApiPageDataStandardResponse<>(webSiteService.upgradeWebSiteInfo(), I18nUtil.getAdminBackendStringFromRes("updateSuccess"), request.getUri());
    }
}
