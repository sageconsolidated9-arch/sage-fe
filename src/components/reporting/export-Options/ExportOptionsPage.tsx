import React from "react";
import ExportOptionsHeader from "../reportingComponent/Export-OptionsComponent/ExportOptionsHeader";
import ExportQuickExportOptions from "../reportingComponent/Export-OptionsComponent/ExportQuickExportOptions";
import ExportBuildCustomExport from "../reportingComponent/Export-OptionsComponent/ExportBuildCustomExport";

const ExportOptionsPage = () => {
  return (
    <div className="flex flex-col gap-6">
      <ExportOptionsHeader />
      <ExportQuickExportOptions />
      <ExportBuildCustomExport />
    </div>
  );
};

export default ExportOptionsPage;
