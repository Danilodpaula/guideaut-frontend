import api from "./client";
import {
  Report,
  ReportReason,
  ReportStatus,
  ReportType,
} from "@/modules/Adm+Base/types/reportTypes";

export interface CreateReportRequest {
  targetId: string;
  type: ReportType;
  reason: ReportReason;
  description: string;
}

export const createReportApi = (data: CreateReportRequest) => {
  return api.post("/reports", data);
};

export const getReportsApi = () => {
  return api.get<Report[]>("/admin/reports");
};

export const updateReportStatusApi = (id: string, status: ReportStatus) => {
  return api.patch(`/admin/reports/${id}/status`, { status });
};
