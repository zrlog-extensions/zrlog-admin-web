package com.zrlog.admin.business.rest.response;

import com.zrlog.data.dto.LockDTO;

import java.util.List;

public class DevInfoResponse {

    private List<LockDTO> locks;

    public List<LockDTO> getLocks() {
        return locks;
    }

    public void setLocks(List<LockDTO> locks) {
        this.locks = locks;
    }
}
