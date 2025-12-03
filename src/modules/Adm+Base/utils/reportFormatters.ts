export const formatReportType = (
  type: string,
  t: (key: string) => string,
): string => {
  const keys: Record<string, string> = {
    USER: "reports.typeUser",
    RECOMMENDATION: "reports.typeRecommendation",
    COMMENT: "reports.typeComment",
  };
  return keys[type] ? t(keys[type]) : type;
};

export const formatReportReason = (
  reason: string,
  t: (key: string) => string,
): string => {
  const key = `reports.${reason.toLowerCase()}`;
  return t(key);
};

export const formatReportStatus = (
  status: string,
  t: (key: string) => string,
): string => {
  const key = `reports.${status.toLowerCase()}`;
  return t(key);
};
