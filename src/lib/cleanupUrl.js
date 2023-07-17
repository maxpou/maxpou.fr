export default function cleanupUrl(url) {
  return url.replace('http://', '').replace('https://', '').replace('www.', '')
}
