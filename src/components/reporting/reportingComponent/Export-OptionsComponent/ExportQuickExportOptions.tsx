import React, { useState } from "react";
import { Import2Icon, ImportIcon, MoreIcon } from "../../../../utils/icons";
import Radio from "../../../props/Radio";

const ExportQuickExportOptions = () => {
  const [activeStage, setActiveStage] = useState("01");

  const SelectRunTime = [
    {
      id: "01",
      title: "Executive Dashboard",
      description:
        "Download a clean, presentation-ready overview of your security posture, risks, and trends.",
      exportPdf: "",
      exportSvg: "",
    },
    {
      id: "02",
      title: "Compliance Report",
      description:
        "Generate evidence-ready documentation for SOC 2, ISO 27001, NIST, or GDPR frameworks.",
    },
    {
      id: "03",
      title: "Incident Summary",
      description:
        "Export incident queues, timelines, and analyst notes in a single consolidated file.",
    },
    {
      id: "04",
      title: "Raw Log Data",
      description:
        "Download raw or filtered security events for offline analysis, correlation, or archiving.",
    },
  ];
  return (
    <div className="flex flex-col gap-6 bg-surface py-[27px] px-[30px] rounded-[18px] relative shadow-shadow-card min-w-[1000px] ">
      <div className="flex items-center justify-between">
        <p className="text-xl font-bold text-text-secondary">
          Quick Export Options
        </p>
        <MoreIcon />
      </div>

      {/* border */}
      <div className="border border-border"></div>
      {/* border */}

      <p className="text-text-secondary text-sm">
        Shortcuts for the most-requested exports.
      </p>

      <div>
        <div className="flex items-center flex-wrap gap-4">
          {SelectRunTime.map((stage) => (
            <div key={stage.id} onClick={() => setActiveStage(stage.id)}>
              {/* Card - Unified Click */}
              <div
                className={`relative p-4 rounded-xl border-2 transition-all max-w-[360px] flex flex-col gap-2 ${
                  activeStage === stage.id
                    ? "border-primary shadow-lg bg-white"
                    : "border-border bg-white group-hover:border-text-primary/10"
                }`}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-0.5">
                    <div className="pointer-events-none">
                      <Radio
                        id={stage.id}
                        name=""
                        checked={activeStage === stage.id}
                        onChange={() => setActiveStage(stage.id)}
                        label=""
                      />
                    </div>
                    <p
                      className={`font-bold text-base leading-6 ${activeStage === stage.id ? "text-primary" : " text-text-secondary"}`}
                    >
                      {stage.title}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-xs w-fit text-text-secondary mt-1 py-0.5 px-1 rounded-sm">
                    {stage.description}
                  </p>
                </div>

                <div className="flex items-center gap-5 ">
                  <div className="flex items-center gap-2 bg-hover-light rounded-xl px-2 py-1.5">
                    <Import2Icon className="text-primary" />
                    <p>Export PDF</p>
                  </div>
                  <div className="flex items-center gap-2 bg-hover-light rounded-xl px-2 py-1.5 ">
                    <Import2Icon className="text-primary" />
                    <p>Export SVG</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExportQuickExportOptions;
