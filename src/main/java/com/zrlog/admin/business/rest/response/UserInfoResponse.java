package com.zrlog.admin.business.rest.response;

public class UserInfoResponse {

    private String userName;
    private String header;
    private String key;

    public UserInfoResponse() {
    }

    public UserInfoResponse(String userName, String header, String key) {
        this.userName = userName;
        this.header = header;
        this.key = key;
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

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }
}
