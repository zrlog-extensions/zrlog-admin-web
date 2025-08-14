package com.zrlog.admin.web.controller.api;

import com.hibegin.common.dao.dto.PageData;
import com.hibegin.http.annotation.ResponseBody;
import com.zrlog.admin.business.rest.request.ReadCommentRequest;
import com.zrlog.admin.business.rest.response.AdminApiPageDataStandardResponse;
import com.zrlog.admin.business.rest.response.UpdateRecordResponse;
import com.zrlog.admin.business.service.AdminCommentService;
import com.zrlog.admin.web.annotation.RefreshCache;
import com.zrlog.business.plugin.type.StaticSiteType;
import com.zrlog.business.util.ControllerUtil;
import com.zrlog.common.controller.BaseController;
import com.zrlog.common.rest.response.StandardResponse;
import com.zrlog.data.dto.CommentDTO;

import java.sql.SQLException;

public class CommentController extends BaseController {

    private final AdminCommentService commentService = new AdminCommentService();

    @RefreshCache(updateStaticSites = StaticSiteType.BLOG)
    @ResponseBody
    public StandardResponse delete() throws SQLException {
        return commentService.delete(getParamWithEmptyCheck("id").split(","));
    }

    @ResponseBody
    public UpdateRecordResponse read() {
        return commentService.read(getRequestBodyWithNullCheck(ReadCommentRequest.class));
    }

    @ResponseBody
    public AdminApiPageDataStandardResponse<PageData<CommentDTO>> index() throws SQLException {
        return new AdminApiPageDataStandardResponse<>(commentService.page(ControllerUtil.getPageRequest(this)), "", request.getUri());
    }
}
