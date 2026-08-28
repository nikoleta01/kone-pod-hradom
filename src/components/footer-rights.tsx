"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

/**
 * `SiteFooter` is statically generated, so `new Date()` there would freeze
 * at build time. Rendering the year client-side and correcting it after
 * mount keeps it accurate for a visitor on a build older than the current
 * year, without making the whole page dynamic.
 */
export function FooterRights({ buildYear }: { buildYear: number }) {
  const t = useTranslations("footer");
  const [year, setYear] = useState(buildYear);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return <>{t("rights", { year })}</>;
}
