package com.zrlog.admin.web.interceptor;

import com.hibegin.common.util.EnvKit;
import com.hibegin.common.util.LoggerUtil;
import com.hibegin.common.util.StringUtils;
import com.hibegin.http.HttpMethod;
import com.hibegin.http.server.api.HandleAbleInterceptor;
import com.hibegin.http.server.api.HttpRequest;
import com.hibegin.http.server.api.HttpResponse;
import com.hibegin.http.server.web.MethodInterceptor;
import com.zrlog.admin.business.AdminConstants;
import com.zrlog.admin.util.AdminWebTools;
import com.zrlog.admin.util.PluginUtils;
import com.zrlog.admin.web.annotation.RefreshCache;
import com.zrlog.admin.web.annotation.RequestLock;
import com.zrlog.admin.web.token.AdminTokenThreadLocal;
import com.zrlog.business.plugin.PluginCorePlugin;
import com.zrlog.common.Constants;
import com.zrlog.common.TokenService;
import com.zrlog.common.cache.vo.BaseDataInitVO;
import com.zrlog.common.exception.ArgsException;
import com.zrlog.common.exception.ResourceLockedException;
import com.zrlog.common.vo.AdminFullTokenVO;
import com.zrlog.common.vo.AdminTokenVO;
import com.zrlog.data.service.DistributedLock;
import com.zrlog.plugin.BaseStaticSitePlugin;
import com.zrlog.util.ThreadUtils;

import java.lang.reflect.Method;
import java.util.Objects;
import java.util.concurrent.locks.Lock;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * 负责全部后台请求的处理（/admin/plugins/*,/api/admin/plugins/* 除外）
 */
public class AdminInterceptor implements HandleAbleInterceptor {

    private static final Logger LOGGER = LoggerUtil.getLogger(AdminInterceptor.class);

    private final TokenService tokenService;

    public AdminInterceptor() {
        this.tokenService = Constants.zrLogConfig.getTokenService();
    }

    private void validPluginToken(HttpRequest request) {
        String requestToken = request.getHeader("X-Plugin-Token");
        if (StringUtils.isEmpty(requestToken)) {
            throw new ArgsException("missing_token");
        }
        PluginCorePlugin plugin = Constants.zrLogConfig.getPlugin(PluginCorePlugin.class);
        if (Objects.isNull(plugin) || !Objects.equals(plugin.getToken(), requestToken)) {
            throw new ArgsException("token");
        }
    }

    private void doRefreshCache(HttpRequest request, Method method) {
        if (Objects.equals(request.getAttr().get(AdminConstants.SYNC_UPDATE_CACHE_KEY), true)) {
            updateCache(false, request);
            return;
        }
        RefreshCache annotation = method.getAnnotation(RefreshCache.class);
        if (Objects.nonNull(annotation)) {
            //跳过非更新
            if (annotation.onlyOnPostMethod() && request.getMethod() != HttpMethod.POST) {
                return;
            }
            //FaaS 强制同步完成请求
            boolean async = annotation.async() && !EnvKit.isFaaSMode();
            updateCache(async, request);
        }
    }

    private void updateCache(boolean async, HttpRequest request) {
        try {
            BaseDataInitVO initVO = Constants.zrLogConfig.getCacheService().refreshInitData();
            if (async) {
                ThreadUtils.start(() -> {
                    PluginUtils.refreshPluginCacheData(initVO.getVersion() + "", request);
                });
            } else {
                PluginUtils.refreshPluginCacheData(initVO.getVersion() + "", request);
            }
        } catch (Exception e) {
            LOGGER.log(Level.SEVERE, "Refresh cache error ", e);
        }
    }

    private Lock getLock(Method method, HttpRequest request) {
        if (Objects.isNull(method)) {
            return null;
        }
        RequestLock annotation = method.getAnnotation(RequestLock.class);
        if (Objects.isNull(annotation)) {
            return null;
        }
        if (annotation.onlyOnPostMethod() && request.getMethod() != HttpMethod.POST) {
            return null;
        }
        String userFlag = "";
        if (Objects.nonNull(AdminTokenThreadLocal.getUser())) {
            userFlag = AdminTokenThreadLocal.getUser().getSessionId();
        }
        return new DistributedLock("request-lock-" + request.getUri() + "-" + userFlag);
    }

    /**
     * 为了规范代码，这里做了一点类是Spring的ResponseEntity的东西，及通过方法的返回值来判断是应该返回页面还会对应JSON数据
     * 具体方式看 AdminRouters，这里用到了 ThreadLocal
     */
    public boolean doInterceptor(HttpRequest request, HttpResponse response) throws Exception {
        try {
            String uri = request.getUri();
            if (AdminConstants.ADMIN_LOGIN_URI_PATH.equals(uri)) {
                AdminTokenVO adminTokenVO = tokenService.getAdminTokenVO(request);
                if (adminTokenVO != null) {
                    response.redirect(AdminConstants.ADMIN_URI_BASE_PATH + AdminConstants.INDEX_URI_PATH);
                } else {
                    new MethodInterceptor().doInterceptor(request, response);
                }
                return false;
            }
            //拦截请求
            if (request.getUri().startsWith(AdminConstants.ADMIN_DEV_FILE_URI_BASE_PATH)) {
                AdminFullTokenVO adminTokenVO = tokenService.getAdminTokenVO(request);
                if (Objects.isNull(adminTokenVO)) {
                    response.renderCode(403);
                    return false;
                }
            }
            if (Objects.equals(AdminConstants.ADMIN_REFRESH_CACHE_API_URI_PATH, uri)) {
                AdminTokenVO adminTokenVO = tokenService.getAdminTokenVO(request);
                if (Objects.isNull(adminTokenVO)) {
                    validPluginToken(request);
                }
                new MethodInterceptor().doInterceptor(request, response);
                return false;
            }
            if ((AdminConstants.ADMIN_URI_BASE_PATH + "/logout").equals(uri) || ("/api" + AdminConstants.ADMIN_LOGIN_URI_PATH).equals(uri)) {
                new MethodInterceptor().doInterceptor(request, response);
                return false;
            }
            Method method = request.getServerConfig().getRouter().getMethod(request.getUri(), request.getMethod());
            if (Objects.nonNull(method) && !BaseStaticSitePlugin.isStaticPluginRequest(request)) {
                AdminFullTokenVO adminTokenVO = tokenService.getAdminTokenVO(request);
                if (adminTokenVO == null) {
                    AdminWebTools.blockUnLoginRequestHandler(request, response);
                    return false;
                }
                tokenService.setAdminToken(adminTokenVO.getUserId(), adminTokenVO.getSecretKey(), adminTokenVO.getSessionId(), adminTokenVO.getProtocol(), request, response);
            }

            Lock lock = getLock(method, request);
            if (Objects.nonNull(lock)) {
                if (!lock.tryLock()) {
                    throw new ResourceLockedException();
                }
            }
            try {
                new MethodInterceptor().doInterceptor(request, response);
                if (Objects.nonNull(method)) {
                    doRefreshCache(request, method);
                }
            } finally {
                if (Objects.nonNull(lock)) {
                    lock.unlock();
                }
            }
            return false;
        } finally {
            AdminTokenThreadLocal.remove();
        }
    }

    @Override
    public boolean isHandleAble(HttpRequest request) {
        if (Objects.equals(request.getUri(), "/admin") || Objects.equals(request.getUri(), "/api/admin")) {
            return true;
        }
        return request.getUri().startsWith("/admin/") || request.getUri().startsWith("/api/admin/");
    }
}
