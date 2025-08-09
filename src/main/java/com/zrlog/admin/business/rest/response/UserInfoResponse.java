package com.zrlog.admin.business.rest.response;

public class UserInfoResponse {

    private String userName;
    private String header;

    public UserInfoResponse() {
    }

    public UserInfoResponse(String userName, String header) {
        this.userName = userName;
        this.header = header;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getHeader() {
        return header;
    }

    public void setHeader(String header) {
        this.header = header;
    }
}
