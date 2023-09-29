export function getDomain(url?: string) {
  if (!url) url = window.location.href;
  url = url.replace(/.*?\/\//i, "");
  const parts = url.split(".");
  const topLevelDomain = parts.slice(parts.length - 2).join(".");
  const domain = topLevelDomain.replace(/\/.*?$/i, "");
  return domain;
}
