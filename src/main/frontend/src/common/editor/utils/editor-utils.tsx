export function copyToClipboard(html: string) {
    const temp = document.createElement("input") as HTMLInputElement;
    document.body.append(temp);
    temp.value = html;
    temp.select();
    document.execCommand("copy", false);
    temp.remove();
}
