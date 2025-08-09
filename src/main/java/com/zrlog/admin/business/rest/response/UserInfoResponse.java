package com.zrlog.admin.business.rest.response;

public class UserInfoResponse {

    private String userName;
    private String header;
    private String key;
    private CheckVersionResponse lastVersion;

    public UserInfoResponse() {
    }

    public UserInfoResponse(String userName, String header, String key,CheckVersionResponse lastVersion) {
        this.userName = userName;
        this.header = header;
        this.key = key;
        this.lastVersion = lastVersion;
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

    public CheckVersionResponse getLastVersion() {
        return lastVersion;
    }

    public void setLastVersion(CheckVersionResponse lastVersion) {
        this.lastVersion = lastVersion;
    }
}
