package com.zrlog.admin.web.controller.api;

import com.hibegin.common.dao.dto.PageData;
import com.hibegin.http.annotation.ResponseBody;
import com.zrlog.admin.business.rest.request.CreateLinkRequest;
import com.zrlog.admin.business.rest.request.UpdateLinkRequest;
import com.zrlog.admin.business.rest.response.AdminPageDataResponse;
import com.zrlog.admin.business.rest.response.DeleteResponse;
import com.zrlog.admin.business.rest.response.UpdateRecordResponse;
import com.zrlog.admin.business.service.LinkService;
import com.zrlog.admin.web.annotation.RefreshCache;
import com.zrlog.admin.web.annotation.RequestLock;
import com.zrlog.business.plugin.type.StaticSiteType;
import com.zrlog.business.util.ControllerUtil;
import com.zrlog.common.cache.dto.LinkDTO;
import com.zrlog.common.controller.BaseController;
import com.zrlog.common.exception.ArgsException;

import java.io.IOException;
import java.sql.SQLException;

public class LinkController extends BaseController {

    private final LinkService linkService = new LinkService();

    @RefreshCache(async = true, updateStaticSites = StaticSiteType.BLOG)
    @ResponseBody
    @RequestLock
    public DeleteResponse delete() throws SQLException {
        Integer id = request.getParaToInt("id");
        if (id == null || id <= 0) {
            throw new ArgsException("id");
        }
        return new DeleteResponse(linkService.delete(id));
    }

    @RefreshCache(async = true, updateStaticSites = StaticSiteType.BLOG)
    @ResponseBody
    @RequestLock
    public UpdateRecordResponse update() throws IOException, SQLException {
        UpdateLinkRequest linkRequest = getRequestBodyWithNullCheck(UpdateLinkRequest.class);
        linkService.update(linkRequest);
        return new UpdateRecordResponse();
    }

    @ResponseBody
    public AdminPageDataResponse<PageData<LinkDTO>> index() throws SQLException {
        return new AdminPageDataResponse<>(linkService.find(ControllerUtil.unPageRequest()), "", request.getUri());
    }

    @RefreshCache(async = true, updateStaticSites = StaticSiteType.BLOG)
    @ResponseBody
    @RequestLock
    public UpdateRecordResponse add() throws IOException, SQLException {
        CreateLinkRequest linkRequest = getRequestBodyWithNullCheck(CreateLinkRequest.class);
        return new UpdateRecordResponse(linkService.add(linkRequest));
    }

}
