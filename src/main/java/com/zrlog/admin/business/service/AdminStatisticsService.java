package com.zrlog.admin.business.service;

import com.hibegin.common.util.LoggerUtil;
import com.zrlog.admin.business.rest.response.StatisticsInfoResponse;
import com.zrlog.model.Comment;
import com.zrlog.model.Log;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.Executor;
import java.util.logging.Logger;

public class AdminStatisticsService {

    private static final Logger LOGGER = LoggerUtil.getLogger(AdminStatisticsService.class);

    public CompletableFuture<StatisticsInfoResponse> statisticsInfo(Executor executor) {
        return CompletableFuture.supplyAsync(() -> {
            StatisticsInfoResponse info = new StatisticsInfoResponse();
            List<CompletableFuture<Void>> futures = new ArrayList<>();
            futures.add(CompletableFuture.runAsync(() -> {
                try {
                    info.setCommCount(new Comment().count());
                } catch (SQLException e) {
                    info.setCommCount(-1L);
                    LOGGER.warning("Query comment count error," + e.getMessage());
                }
            }, executor));
            futures.add(CompletableFuture.runAsync(() -> {
                try {
                    info.setToDayCommCount(new Comment().countToDayComment());
                } catch (SQLException e) {
                    info.setToDayCommCount(-1L);
                    LOGGER.warning("Query to day comment count error, " + e.getMessage());
                }
            }, executor));
            futures.add(CompletableFuture.runAsync(() -> {
                try {
                    info.setClickCount(new Log().sumClick().longValue());
                } catch (SQLException e) {
                    info.setClickCount(-1L);
                    LOGGER.warning("Query click count error, " + e.getMessage());
                }
            }, executor));
            futures.add(CompletableFuture.runAsync(() -> {
                info.setArticleCount(new Log().getAdminCount());
            }, executor));
            CompletableFuture.allOf(futures.toArray(new CompletableFuture[0])).join();
            return info;
        }, executor);
    }
}
