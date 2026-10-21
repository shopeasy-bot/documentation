/** URL pública do site, sem barra no final. */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://shopeasy.site").replace(/\/+$/, "");

export const siteName = "ShopEasy";

export function absoluteUrl(path = "/") {
  return new URL(path, `${siteUrl}/`).toString();
}
