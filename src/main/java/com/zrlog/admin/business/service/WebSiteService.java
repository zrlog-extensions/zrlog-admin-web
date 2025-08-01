package com.zrlog.admin.business.service;

import com.hibegin.common.dao.ResultBeanUtils;
import com.hibegin.common.util.StringUtils;
import com.zrlog.admin.business.AdminConstants;
import com.zrlog.admin.business.rest.base.*;
import com.zrlog.admin.web.type.AutoUpgradeVersionType;
import com.zrlog.common.Constants;
import com.zrlog.common.TokenService;
import com.zrlog.model.WebSite;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Objects;

public class WebSiteService {


    public UpgradeWebSiteInfo upgradeWebSiteInfo() {
        UpgradeWebSiteInfo upgrade = queryToMap(Arrays.asList("upgradePreview", AdminConstants.AUTO_UPGRADE_VERSION_KEY), UpgradeWebSiteInfo.class);
        if (Objects.isNull(upgrade.getAutoUpgradeVersion())) {
            upgrade.setAutoUpgradeVersion(AutoUpgradeVersionType.ONE_DAY.getCycle());
        }
        upgrade.setUpgradePreview(Objects.equals(upgrade.getUpgradePreview(), true));
        return upgrade;
    }

    public BlogWebSiteInfo blogWebSiteInfo() {
        BlogWebSiteInfo blog = queryToMap(Arrays.asList(WebSite.generator_html_status, WebSite.host, WebSite.disable_comment_status, WebSite.article_thumbnail_status), BlogWebSiteInfo.class);
        blog.setGenerator_html_status(Objects.equals(blog.getGenerator_html_status(), true));
        blog.setDisable_comment_status(Objects.equals(blog.getDisable_comment_status(), true));
        blog.setArticle_thumbnail_status(Objects.equals(blog.getArticle_thumbnail_status(), true));
        return blog;
    }

    public BasicWebSiteInfo basicWebSiteInfo() {
        return queryToMap(Arrays.asList(WebSite.title, WebSite.second_title, WebSite.description, WebSite.keywords, "favicon_ico_base64"), BasicWebSiteInfo.class);
    }

    public AdminWebSiteInfo adminWebSiteInfo() {
        AdminWebSiteInfo admin = queryToMap(Arrays.asList(WebSite.admin_darkMode, WebSite.language,
                WebSite.admin_color_primary, WebSite.session_timeout, WebSite.article_auto_digest_length,
                "favicon_png_pwa_512_base64", "favicon_png_pwa_192_base64",
                "admin_article_page_size", "admin_static_resource_base_url"), AdminWebSiteInfo.class);
        if (StringUtils.isEmpty(admin.getAdmin_color_primary())) {
            admin.setAdmin_color_primary(Constants.DEFAULT_COLOR_PRIMARY_COLOR);
        }
        if (Objects.isNull(admin.getAdmin_article_page_size()) || admin.getAdmin_article_page_size() <= 0) {
            admin.setAdmin_article_page_size(10L);
        }
        if (Objects.isNull(admin.getSession_timeout()) || admin.getSession_timeout() <= 0) {
            admin.setSession_timeout(TokenService.DEFAULT_SESSION_TIMEOUT / 60 / 1000);
        }
        if (Objects.isNull(admin.getArticle_auto_digest_length()) || admin.getArticle_auto_digest_length() <= 0) {
            admin.setArticle_auto_digest_length(Constants.DEFAULT_ARTICLE_DIGEST_LENGTH);
        }
        return admin;
    }

    private <T> T queryToMap(List<String> names, Class<T> clazz) {
        Map<String, Object> webSiteByNameIn = new WebSite().getWebSiteByNameIn(names);
        return ResultBeanUtils.convert(webSiteByNameIn, clazz);
    }

    public OtherWebSiteInfo other() {
        return queryToMap(Arrays.asList(WebSite.icp, WebSite.webCm, WebSite.robotRuleContent), OtherWebSiteInfo.class);
    }
}
