package com.zrlog.admin.web.controller.page;

import com.hibegin.common.util.FileUtils;
import com.hibegin.http.annotation.RequestMethod;
import com.hibegin.http.server.util.MimeTypeUtil;
import com.hibegin.http.server.util.PathUtil;
import com.zrlog.admin.business.service.TemplateService;
import com.zrlog.admin.util.AdminTemplateUtils;
import com.zrlog.business.util.TemplateDownloadUtils;
import com.zrlog.common.Constants;
import com.zrlog.common.controller.BaseController;
import com.zrlog.common.vo.TemplateVO;
import com.zrlog.util.ZrLogUtil;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.Objects;

public class AdminTemplatePageController extends BaseController {


    @RequestMethod
    public void download() throws IOException, URISyntaxException, InterruptedException {
        String downloadUrl = request.getParaToStr("downloadUrl", "");
        TemplateDownloadUtils.installByUrl(downloadUrl);
        response.redirect(Constants.ADMIN_URI_BASE_PATH + "/website/template");
    }

    @RequestMethod
    public void previewImage() throws IOException {
        String templateName = AdminTemplateUtils.loadTemplatePathByRequestInfo(this);
        TemplateVO templateVO = new TemplateService().loadTemplateConfig(templateName);
        if (Objects.isNull(templateVO)) {
            response.renderCode(404);
            return;
        }
        if (templateVO.getPreviewImage().startsWith(Constants.TEMPLATE_BASE_PATH)) {
            ZrLogUtil.putLongTimeCache(response);
            response.addHeader("Content-Type", MimeTypeUtil.getMimeStrByExt(FileUtils.getFileExt(templateVO.getPreviewImage())));
            if (Objects.equals(templateVO.getTemplate(), Constants.DEFAULT_TEMPLATE_PATH)) {
                response.write(AdminTemplatePageController.class.getResourceAsStream(templateVO.getPreviewImage()));
            } else {
                response.writeFile(PathUtil.getStaticFile(templateVO.getPreviewImage()));
            }
        } else {
            response.renderCode(403);
        }
    }


}
