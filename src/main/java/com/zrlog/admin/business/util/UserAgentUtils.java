package com.zrlog.admin.business.util;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class UserAgentUtils {

    public static class UserAgentInfo {
        private final String os;
        private final String browser;
        private final String browserVersion;

        public UserAgentInfo(String os, String browser, String browserVersion) {
            this.os = os;
            this.browser = browser;
            this.browserVersion = browserVersion;
        }

        public String getOs() { return os; }
        public String getBrowser() { return browser; }
        public String getBrowserVersion() { return browserVersion; }

        public String getFullBrowser() {
            if ("Unknown".equals(browserVersion)) {
                return browser;
            }
            return browser + " " + browserVersion;
        }
    }

    public static UserAgentInfo parse(String ua) {
        if (ua == null || ua.isEmpty()) {
            return new UserAgentInfo("Unknown", "Unknown", "Unknown");
        }

        String os = "Unknown";
        String browser = "Unknown";
        String version = "Unknown";

        String lowerUa = ua.toLowerCase();

        // 1. 解析操作系统
        if (lowerUa.contains("windows")) {
            os = "Windows";
            if (lowerUa.contains("windows nt 10.0")) os = "Windows 10/11";
            else if (lowerUa.contains("windows nt 6.1")) os = "Windows 7";
            else if (lowerUa.contains("windows nt 6.2")) os = "Windows 8";
        } else if (lowerUa.contains("mac os x")) {
            os = "Mac OS X";
            if (lowerUa.contains("iphone")) os = "iPhone (iOS)";
            else if (lowerUa.contains("ipad")) os = "iPad (iOS)";
        } else if (lowerUa.contains("android")) {
            os = "Android";
        } else if (lowerUa.contains("linux")) {
            os = "Linux";
        }

        // 2. 解析浏览器及版本
        if (lowerUa.contains("micromessenger")) {
            browser = "WeChat";
            version = getVersion(ua, "MicroMessenger/(\\d+(\\.\\d+)*)");
        } else if (lowerUa.contains("edg/")) {
            browser = "Edge";
            version = getVersion(ua, "Edg/(\\d+(\\.\\d+)*)");
        } else if (lowerUa.contains("firefox")) {
            browser = "Firefox";
            version = getVersion(ua, "Firefox/(\\d+(\\.\\d+)*)");
        } else if (lowerUa.contains("chrome")) {
            browser = "Chrome";
            version = getVersion(ua, "Chrome/(\\d+(\\.\\d+)*)");
        } else if (lowerUa.contains("safari")) {
            browser = "Safari";
            version = getVersion(ua, "Version/(\\d+(\\.\\d+)*)");
            if ("Unknown".equals(version)) {
                version = getVersion(ua, "Safari/(\\d+(\\.\\d+)*)");
            }
        } else if (lowerUa.contains("msie") || lowerUa.contains("trident")) {
            browser = "Internet Explorer";
            version = getVersion(ua, "(MSIE |rv:)(\\d+(\\.\\d+)*)");
        }

        return new UserAgentInfo(os, browser, version);
    }

    private static String getVersion(String ua, String regex) {
        try {
            Pattern pattern = Pattern.compile(regex);
            Matcher matcher = pattern.matcher(ua);
            if (matcher.find()) {
                // 这里的 group(1) 逻辑需要根据正则微调，通常我们取第一个捕获组
                // 对于版本号，通常在匹配到的字符串的最后部分
                String v = matcher.group(matcher.groupCount());
                // 如果版本号太长（如 Chrome 的 124.0.6367.201），我们截取主版本号
                if (v != null && v.contains(".")) {
                    return v.split("\\.")[0];
                }
                return v;
            }
        } catch (Exception e) {
            // ignore
        }
        return "Unknown";
    }
}
