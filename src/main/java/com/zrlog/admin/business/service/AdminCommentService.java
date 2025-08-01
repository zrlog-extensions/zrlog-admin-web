package com.zrlog.admin.business.service;

import com.hibegin.common.dao.dto.PageData;
import com.hibegin.common.dao.dto.PageRequest;
import com.zrlog.admin.business.rest.request.ReadCommentRequest;
import com.zrlog.admin.business.rest.response.UpdateRecordResponse;
import com.zrlog.common.rest.response.StandardResponse;
import com.zrlog.data.dto.CommentDTO;
import com.zrlog.model.Comment;

import java.sql.SQLException;
import java.util.Map;
import java.util.Objects;

public class AdminCommentService {

    public StandardResponse delete(String[] ids) throws SQLException {
        for (String id : ids) {
            new Comment().deleteById(Integer.parseInt(id));
        }
        return new StandardResponse();
    }

    public UpdateRecordResponse read(ReadCommentRequest commentRequest) {
        if (Objects.isNull(commentRequest)) {
            return new UpdateRecordResponse(false);
        }
        new Comment().doRead(commentRequest.getId());
        return new UpdateRecordResponse();
    }

    public PageData<CommentDTO> page(PageRequest pageable) throws SQLException {
        return new Comment().find(pageable);
    }
}
