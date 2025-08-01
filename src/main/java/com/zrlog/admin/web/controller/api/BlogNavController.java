package com.zrlog.admin.web.controller.api;

import com.hibegin.common.dao.dto.PageData;
import com.hibegin.http.annotation.ResponseBody;
import com.zrlog.admin.business.rest.request.CreateNavRequest;
import com.zrlog.admin.business.rest.request.UpdateNavRequest;
import com.zrlog.admin.business.rest.response.AdminApiPageDataStandardResponse;
import com.zrlog.admin.business.rest.response.UpdateRecordResponse;
import com.zrlog.admin.web.annotation.RefreshCache;
import com.zrlog.admin.web.annotation.RequestLock;
import com.zrlog.business.util.ControllerUtil;
import com.zrlog.common.controller.BaseController;
import com.zrlog.data.dto.LogNavDTO;
import com.zrlog.model.LogNav;

import java.io.IOException;
import java.sql.SQLException;
import java.util.Objects;

public class BlogNavController extends BaseController {

    @RefreshCache(async = true)
    @ResponseBody
    @RequestLock
    public UpdateRecordResponse delete() throws SQLException {
        String idStr = getParamWithEmptyCheck("id");
        String[] ids = idStr.split(",");
        for (String id : ids) {
            new LogNav().deleteById(Integer.parseInt(id));
        }
        return new UpdateRecordResponse();
    }

    @ResponseBody
    public AdminApiPageDataStandardResponse<PageData<LogNavDTO>> index() throws SQLException {
        PageData<LogNavDTO> mapPageData = new LogNav().find(ControllerUtil.unPageRequest());
        mapPageData.getRows().forEach(e -> {
            e.setJumpUrl(e.getUrl());
        });
        return new AdminApiPageDataStandardResponse<>(mapPageData, "", request.getUri());
    }

    @RefreshCache(async = true)
    @ResponseBody
    @RequestLock
    public UpdateRecordResponse add() throws IOException, SQLException {
        CreateNavRequest createNavRequest = getRequestBodyWithNullCheck(CreateNavRequest.class);
        return new UpdateRecordResponse(new LogNav().set("navName", createNavRequest.getNavName()).set("url",
                createNavRequest.getUrl()).set("sort", createNavRequest.getSort()).save());
    }

    @RefreshCache(async = true)
    @ResponseBody
    @RequestLock
    public UpdateRecordResponse update() throws IOException, SQLException {
        UpdateNavRequest createNavRequest = getRequestBodyWithNullCheck(UpdateNavRequest.class);
        return new UpdateRecordResponse(new LogNav()
                .set("navName", createNavRequest.getNavName())
                .set("url", createNavRequest.getUrl())
                .set("sort", Objects.requireNonNullElse(createNavRequest.getSort(), 0))
                .updateById(createNavRequest.getId()));
    }

}
