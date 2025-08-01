package com.zrlog.admin.business.service;

import com.google.gson.Gson;
import com.hibegin.common.util.FileUtils;
import com.hibegin.common.util.IOUtil;
import com.hibegin.common.util.LoggerUtil;
import com.hibegin.common.util.ZipUtil;
import com.hibegin.http.server.util.PathUtil;
import com.zrlog.admin.business.rest.response.UpdateRecordResponse;
import com.zrlog.admin.business.rest.response.UploadTemplateResponse;
import com.zrlog.admin.web.controller.api.TemplateController;
import com.zrlog.business.service.TemplateInfoHelper;
import com.zrlog.business.util.TemplateDownloadUtils;
import com.zrlog.common.Constants;
import com.zrlog.common.vo.TemplateVO;
import com.zrlog.model.WebSite;
import com.zrlog.util.I18nUtil;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.net.URISyntaxException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.logging.Logger;

public class TemplateService {

    private static final Logger LOGGER = LoggerUtil.getLogger(TemplateController.class);

    public UpdateRecordResponse save(String template, Map<String, Object> settingMap) throws SQLException {
        new WebSite().updateTemplateConfigMap(template, settingMap);
        UpdateRecordResponse updateRecordResponse = new UpdateRecordResponse();
        updateRecordResponse.setMessage(I18nUtil.getBackendStringFromRes("templateUpdateSuccess"));
        return updateRecordResponse;
    }

    public UploadTemplateResponse upload(String templateName, File file) throws IOException {
        String finalPath = PathUtil.getStaticFile(Constants.TEMPLATE_BASE_PATH).toString();
        String finalFile = finalPath + templateName;
        FileUtils.deleteFile(finalFile);
        //start extract template file
        FileUtils.moveOrCopyFile(file.toString(), finalFile, true);
        UploadTemplateResponse response = new UploadTemplateResponse();
        response.setMessage(I18nUtil.getBackendStringFromRes("templateUploadSuccess"));
        String extractFolder = finalPath + templateName.replace(".zip", "");
        FileUtils.deleteFile(extractFolder);
        ZipUtil.unZip(finalFile, extractFolder);
        return response;
    }

    public List<TemplateVO> getAllTemplates(String previewTemplate) throws IOException {
        String currentTemplate = Constants.zrLogConfig.getCacheService().getPublicWebSiteInfo().getTemplate();
        if (!Objects.equals(currentTemplate, Constants.DEFAULT_TEMPLATE_PATH)) {
            try {
                TemplateDownloadUtils.installByTemplateName(currentTemplate, false);
            } catch (IOException | URISyntaxException | InterruptedException e) {
                LOGGER.warning("Download template failed " + e.getMessage());
            }
        }
        List<TemplateVO> templates = new ArrayList<>();
        TemplateVO defaultTemplateInfo = TemplateInfoHelper.getDefaultTemplateVO();
        if (Objects.nonNull(defaultTemplateInfo)) {
            defaultTemplateInfo.setDeleteAble(false);
            defaultTemplateInfo.setConfigAble(true);
            templates.add(defaultTemplateInfo);
        }
        File[] templatesFile = PathUtil.getStaticFile(Constants.TEMPLATE_BASE_PATH).listFiles();
        if (templatesFile != null) {
            for (File file : templatesFile) {
                if (file.isDirectory() && !file.isHidden()) {
                    TemplateVO templateVO = getTemplateVO(file);
                    if (Objects.isNull(templateVO)) {
                        continue;
                    }
                    //跳过默认主题
                    if (Objects.equals(templateVO.getTemplate(), Constants.DEFAULT_TEMPLATE_PATH)) {
                        continue;
                    }
                    templateVO.setDeleteAble(true);
                    File settingFile = PathUtil.getStaticFile(templateVO.getTemplate() + "/setting/config-form.json");
                    templateVO.setConfigAble(settingFile.exists());
                    templates.add(templateVO);
                }
            }
        }
        for (TemplateVO templateVO : templates) {
            //同时存在以使用为主
            if (templateVO.getTemplate().equals(Constants.zrLogConfig.getCacheService().getPublicWebSiteInfo().getTemplate())) {
                templateVO.setUse(true);
                templateVO.setDeleteAble(false);
                continue;
            }

            if (templateVO.getTemplate().equals(previewTemplate)) {
                templateVO.setPreview(true);
            }
        }
        return templates;
    }


    private static TemplateVO getTemplateVO(File file) throws IOException {
        if (!file.exists() || !file.isDirectory()) {
            return null;
        }
        File templateInfo = new File(file + "/template.properties");
        if (!templateInfo.exists()) {
            return null;
        }
        String templatePath = file.toString().substring(PathUtil.getStaticFile("/").toString().length()).replace("\\", "/");
        return TemplateInfoHelper.getTemplateVOByInputStream(templatePath, new FileInputStream(templateInfo));
    }

    private TemplateVO.TemplateConfigMap getConfigMap(String templateName) throws IOException {
        if (Objects.equals(templateName, Constants.DEFAULT_TEMPLATE_PATH)) {
            String jsonStr = IOUtil.getStringInputStream(TemplateService.class.getResourceAsStream(Constants.DEFAULT_TEMPLATE_PATH + "/setting/config-form.json"));
            return new Gson().fromJson(jsonStr, TemplateVO.TemplateConfigMap.class);
        }
        File configFile = PathUtil.getStaticFile(templateName + "/setting/config-form.json");
        //文件存在才配置
        if (configFile.exists()) {
            String jsonStr;
            jsonStr = IOUtil.getStringInputStream(new FileInputStream(configFile));
            return new Gson().fromJson(jsonStr, TemplateVO.TemplateConfigMap.class);
        }
        return new TemplateVO.TemplateConfigMap();
    }

    public TemplateVO loadTemplateConfig(String templateName) throws IOException {
        TemplateVO templateVO = Objects.equals(templateName, Constants.DEFAULT_TEMPLATE_PATH) ? TemplateInfoHelper.getDefaultTemplateVO() : getTemplateVO(
                PathUtil.getStaticFile(templateName));
        if (Objects.isNull(templateVO)) {
            return null;
        }
        TemplateVO.TemplateConfigMap config = getConfigMap(templateName);
        Map<String, Object> dbConfig = new WebSite().getTemplateConfigMap(templateName);
        config.forEach((key, value) -> value.setValue(dbConfig.get(key)));
        templateVO.setConfig(config);
        //添加一个隐藏的表单域
        TemplateVO.TemplateConfigVO templateConfigVO = new TemplateVO.TemplateConfigVO();
        templateConfigVO.setHtmlElementType("input");
        templateConfigVO.setType("hidden");
        templateConfigVO.setValue(templateName);
        config.put("template", templateConfigVO);
        return templateVO;
    }


}
