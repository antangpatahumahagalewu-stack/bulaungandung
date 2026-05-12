import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale, localePrefix } from "./i18n.config";

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix,
});

export const config = {
  matcher: ["/((?!studio|api|_next|_vercel|.*\\..*).*)"],
};
