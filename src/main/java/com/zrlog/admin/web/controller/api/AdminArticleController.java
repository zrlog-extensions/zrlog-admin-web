package com.zrlog.admin.web.controller.api;

import com.hibegin.common.util.EnvKit;
import com.hibegin.common.util.StringUtils;
import com.hibegin.http.annotation.ResponseBody;
import com.zrlog.admin.business.dto.AIStreamResponse;
import com.zrlog.admin.business.exception.PermissionErrorException;
import com.zrlog.admin.business.rest.request.CreateArticleRequest;
import com.zrlog.admin.business.rest.request.UpdateArticleRequest;
import com.zrlog.admin.business.rest.response.*;
import com.zrlog.admin.business.service.AIService;
import com.zrlog.admin.business.service.AdminArticleService;
import com.zrlog.admin.web.annotation.RefreshCache;
import com.zrlog.admin.web.token.AdminTokenThreadLocal;
import com.zrlog.business.plugin.type.StaticSiteType;
import com.zrlog.business.util.CacheUtils;
import com.zrlog.business.util.ControllerUtil;
import com.zrlog.common.controller.BaseController;
import com.zrlog.common.exception.ArgsException;
import com.zrlog.data.exception.DAOException;
import com.zrlog.model.WebSite;
import com.zrlog.util.I18nUtil;
import com.zrlog.util.ZrLogUtil;

import java.io.IOException;
import java.sql.SQLException;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.concurrent.ExecutionException;

public class AdminArticleController extends BaseController {

    private final AdminArticleService articleService = new AdminArticleService();

    @RefreshCache(async = true, updateStaticSites = StaticSiteType.BLOG)
    @ResponseBody
    public DeleteResponse delete() throws SQLException {
        if (ZrLogUtil.isPreviewMode()) {
            throw new PermissionErrorException();
        }
        String idStr = getParamWithEmptyCheck("id");
        if (StringUtils.isEmpty(idStr)) {
            throw new ArgsException("id");
        }
        String[] ids = idStr.split(",");
        boolean deleted = Arrays.stream(ids).allMatch(id -> {
            try {
                return articleService.delete(Long.valueOf(id));
            } catch (SQLException e) {
                throw new DAOException(e);
            }
        });
        new com.zrlog.admin.business.service.AdminAuditService().record(request, "删除文章 ID：" + idStr, "article");
        return new DeleteResponse(deleted);
    }

    private String getResponseMsg(CreateOrUpdateArticleResponse response) {
        return I18nUtil.getAdminBackendStringFromRes(Objects.equals(response.getRubbish(), true)
                || Objects.equals(response.getPrivacy(), true) ? "saveSuccess" : "releaseSuccess");
    }

    private AdminApiPageDataStandardResponse<ArticleGlobalResponse> toResponseByArticle(
            CreateOrUpdateArticleResponse createOrUpdateArticleResponse) throws SQLException {
        AdminApiPageDataStandardResponse<ArticleGlobalResponse> detail = articleService
                .loadDetailById(createOrUpdateArticleResponse.getLogId() + "", request);
        LoadEditArticleResponse loadEditArticleResponse = detail.getData().getArticle();
        // 为发布状态才需要更新缓存信息（避免无用更新）
        if (Objects.equals(loadEditArticleResponse.isRubbish(), false)) {
            CacheUtils.updateCache(false, request, List.of(StaticSiteType.BLOG));
        }
        detail.setMessage(getResponseMsg(createOrUpdateArticleResponse));
        return detail;
    }

    @ResponseBody
    public AdminApiPageDataStandardResponse<ArticleGlobalResponse> create() throws SQLException {
        CreateArticleRequest body = getRequestBodyWithNullCheck(CreateArticleRequest.class);
        CreateOrUpdateArticleResponse create = articleService.create(AdminTokenThreadLocal.getUser(), body);
        new com.zrlog.admin.business.service.AdminAuditService().record(request, "发布文章：" + body.getTitle(), "article");
        return toResponseByArticle(create);
    }

    @ResponseBody
    public AdminApiPageDataStandardResponse<ArticleGlobalResponse> update() throws SQLException {
        UpdateArticleRequest body = getRequestBodyWithNullCheck(UpdateArticleRequest.class);
        CreateOrUpdateArticleResponse update = articleService.update(AdminTokenThreadLocal.getUser(), body);
        new com.zrlog.admin.business.service.AdminAuditService().record(request, "更新文章：" + body.getTitle(), "article");
        return toResponseByArticle(update);
    }

    @ResponseBody
    public AdminApiPageDataStandardResponse<ArticlePageData> index()
            throws SQLException, ExecutionException, InterruptedException {
        String key = request.getParaToStr("key", "");
        String types = request.getParaToStr("types", "");
        String status = request.getParaToStr("status", "");
        int pageSize = request.getParaToInt("size", -1);
        if (pageSize <= 0) {
            String adminArticlePageSize = new WebSite().getStringValueByName("admin_article_page_size");
            if (StringUtils.isNotEmpty(adminArticlePageSize)) {
                pageSize = (int) Double.parseDouble(adminArticlePageSize);
            } else {
                pageSize = 10;
            }
        }
        ArticlePageData pageData = articleService.adminPage(ControllerUtil.toPageRequest(this, pageSize), key, types,
                status, request);
        return new AdminApiPageDataStandardResponse<>(pageData, "", request.getUri());
    }

    @ResponseBody
    public AdminApiPageDataStandardResponse<ArticleGlobalResponse> articleEdit() throws SQLException {
        String id = request.getParaToStr("id", "");
        return articleService.loadDetailById(id, request);
    }

    /**
     * 仅保留，便于测试
     *
     * @return
     * @throws SQLException
     */
    @ResponseBody
    @Deprecated
    public AdminApiPageDataStandardResponse<LoadEditArticleResponse> detail() throws SQLException {
        return new AdminApiPageDataStandardResponse<>(articleService.loadDetail(getParamWithEmptyCheck("id"), request));
    }

    public void ai() throws IOException, InterruptedException, SQLException {
        AIStreamResponse streamResponse = new AIService().startStreamResponse(getParamWithEmptyCheck("input"),
                Long.parseLong(getParamWithEmptyCheck("id")));
        // 使用 setHeader 确保覆盖默认的 application/json
        getResponse().setContentType("text/event-stream;charset=UTF-8");
        getResponse().addHeader("Cache-Control", "no-cache");
        getResponse().addHeader("Connection", "keep-alive");
        getResponse().addHeader("X-Accel-Buffering", "no"); // 禁用 Nginx 缓冲
        getResponse().write(streamResponse.getInputStream());
    }
}
