/* URL 복사 유틸함수 */

export const copyToClipboard = async () => {
  await navigator.clipboard.writeText(window.location.href);
};