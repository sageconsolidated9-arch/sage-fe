import React from "react";
import ComplianceReportHeader from "../reportingComponent/Compliance-ReportComponent/ComplianceReportHeader";
import ComplainceReportView from "../reportingComponent/Compliance-ReportComponent/ComplainceReportView";
import ComplianceReportAndOverview from "../reportingComponent/Compliance-ReportComponent/ComplianceReportAndOverview";
import ComplianceReportLibrary from "../reportingComponent/Compliance-ReportComponent/ComplianceReportLibrary";

const ComplianceReportsPage = () => {
  return (
    <div className="flex flex-col gap-6">
      <ComplianceReportHeader />
      <ComplainceReportView />
      <ComplianceReportAndOverview />
      <ComplianceReportLibrary />
    </div>
  );
};

export default ComplianceReportsPage;
