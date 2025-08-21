package com.zrlog.admin.web.plugin;

import com.hibegin.common.util.EnvKit;
import com.zrlog.business.util.NativeUtils;
import com.zrlog.common.vo.Version;

import java.util.Map;
import java.util.Objects;

public class FaasUpdateVersionHandler implements UpdateVersionHandler {

    private final Version version;

    public FaasUpdateVersionHandler(Map<String, Object> backend, Version version) {
        this.version = version;
    }

    private static String getS3UpdateShell(String downloadUrl, String functionName) {
        String finalName = "zrlog-" + NativeUtils.getRealFileArch() + "-latest.zip";
        String lambdaRepoName = Objects.requireNonNullElse(System.getenv("LAMBDA_S3_REPO_NAME"), "zrlog-update-bucket");
        String s3FileUrl = "s3://" + lambdaRepoName + "/" + finalName;
        return "UA=\"Mozilla/5.0 (X11; Ubuntu; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36\"\n" +
                "wget --user-agent=\"${UA}\" -O \"" + finalName + "\" \"" + downloadUrl + "\"\n" +
                "aws s3 cp " + finalName + " " + s3FileUrl + "\n" +
                "aws lambda update-function-code \\\n" +
                "  --function-name " + functionName + " \\\n" +
                "  --s3-bucket " + lambdaRepoName + " \\\n" +
                "  --s3-key " + finalName + "\n\n\n";
    }

    @Override
    public String getMessage() {
        String downloadUrl = version.getZipDownloadUrl().replaceFirst(".zip", "-faas.zip");
        if (EnvKit.isLambda()) {
            return "#### Update by aws-cli (CloudShell) \n```bash\n" +
                    getS3UpdateShell(downloadUrl, System.getenv("AWS_LAMBDA_FUNCTION_NAME")) +
                    "```";
        }
        return "[download upgrade file](" + downloadUrl + ")";
    }

    public static void main(String[] args) {
        String s3UpdateShell = getS3UpdateShell("https://dl.zrlog.com/preview/zrlog-Linux-amd64-faas.zip", "faas-zrlog-com");
        System.out.println(s3UpdateShell);
    }

    @Override
    public boolean isFinish() {
        return false;
    }

    @Override
    public void doHandle() {

    }
}
