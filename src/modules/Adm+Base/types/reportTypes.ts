export type ReportStatus = "PENDING" | "RESOLVED" | "DISMISSED";
export type ReportType = "USER" | "RECOMMENDATION" | "COMMENT";
export type ReportReason = "SPAM" | "INAPPROPRIATE" | "HARASSMENT" | "OTHER";

export interface Report {
  id: string;
  targetId: string;
  targetName: string;
  type: ReportType;
  reporterName: string;
  reason: ReportReason;
  description: string;
  status: ReportStatus;
  createdAt: string;
}
