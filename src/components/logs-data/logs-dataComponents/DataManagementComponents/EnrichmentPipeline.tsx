import React, { useState } from "react";
import Button from "../../../props/Button";
import {
  AddCustomIcon,
  DetailsIcon,
  IntelIcon,
  MarkIcon,
  ReOrderIcon,
  RunIcon,
  ViewIcon,
  XIcon,
} from "../../../../utils/icons";
import Toggle from "../../../props/Toggle";

const STAGES = [
  {
    id: "01",
    title: "Geo-IP Lookup",
    description: "Adds country, city, ASN for external IPs.",
    status: "Enabled",
    type: "default",
    view: "View Matches",
  },
  {
    id: "02",
    title: "Threat Intel Matching",
    description: "Matches domains, IPs, hashes against MISP, VirusTotal.",
    status: "Enabled",
    type: "active",
    view: "View Details",
  },
  {
    id: "03",
    title: "Asset Owner Tagging",
    description: "Links device → user → department.",
    status: "Enabled",
    type: "default",
    view: "View Mappings",
  },
  {
    id: "04",
    title: "User Risk Scoring",
    description: "Flags suspicious sender domains.",
    status: "Enabled",
    type: "default",
    view: "Configure",
  },
  {
    id: "05",
    title: "Email Reputation",
    description: "suspicious sender domains.",
    status: "Optional",
    type: "default",
  },
];

const EnrichmentPipeline = () => {
  const [activeModal, setActiveModal] = useState<
    "EXPORT_SCHEMA" | "COMPARE_VERSIONS" | "RUN" | null
  >(null);

  const [activeStage, setActiveStage] = useState("02");

  return (
    <div className="border border-border rounded-[18px] p-6 flex flex-col gap-8 bg-white">
      {/* ===========Pipeline Stages ========*/}
      <div>
        <p className="text-text-primary text-2xl tracking-[2%] mb-6">
          Pipeline Stages
        </p>

        {/* Pipeline Grid */}
        <div className="flex items-center flex-wrap gap-6">
          {STAGES.map((stage) => (
            <div
              key={stage.id}
              onClick={() => setActiveStage(stage.id)}
              className="flex items-center gap-3 cursor-pointer group"
            >
              {/* ID Circle - Unified Click */}
              <div
                className={`relative transition-all border-2 font-bold w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-full ${
                  activeStage === stage.id
                    ? "border-primary  shadow-md"
                    : "border-text-secondary font-bold text-text-secondary group-hover:border-text-primary/30"
                }`}
              >
                <span className="font-bold text-lg">{stage.id}</span>
              </div>

              {/* Card - Unified Click */}
              <div
                className={`relative p-4 rounded-3xl border-2 transition-all min-w-[320px] ${
                  activeStage === stage.id
                    ? "border-primary shadow-lg bg-white"
                    : "border-border bg-white group-hover:border-text-primary/10"
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <p className="font-bold text-text-secondary text-base leading-6">
                    {stage.title}
                  </p>
                  <div className="flex items-center gap-1 text-xs">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        stage.status === "Enabled" ? "bg-success" : "bg-warning"
                      }`}
                    ></span>
                    {stage.status}
                  </div>
                </div>

                <div>
                  <p className="text-xs w-fit text-text-secondary mt-1 bg-hover-light py-0.5 px-1 rounded-sm">
                    {stage.description}
                  </p>
                </div>

                <div className="border-t border-border mt-3 pt-2">
                  {stage.status === "Optional" ? (
                    <div className="flex items-center scale-90 origin-left">
                      <Toggle label="Enable" />
                    </div>
                  ) : (
                    <button className="text-text-secondary text-sm flex items-center gap-1 hover:opacity-80 transition-opacity">
                      <ViewIcon className="w-4 h-4 text-primary-hover" />
                      {stage.view}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Pipeline Grid */}
      </div>

      {/* ===========Pipeline Stages ========*/}

      {/* ===========Stage Detail ========*/}
      <div className="border border-primary rounded-[18px] p-6 flex flex-col gap-4 bg-white">
        <div className="flex justify-between ">
          <p className="text-text-primary text-2xl">Stage Detail</p>
          <button className="ml-4 flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors cursor-pointer font-bold">
            <XIcon className="w-5 h-5" />
            <span>Close</span>
          </button>
        </div>

        {/* border */}
        <div className="border border-border"></div>
        {/* border */}
        <p className="text-text-primary text-xl tracking-[2%]">
          Header: <span className="font-bold">Threat Intel Matching</span>
        </p>

        <p className="tracking-[2%] text-text-primary text-base">
          Definition:{" "}
          <span className="text-text-secondary text-xs">
            Matches event fields (IP, hash, domain) against threat intel
            sources.
          </span>
        </p>

        {/* border */}
        <div className="border border-border"></div>
        {/* border */}

        <div className="flex gap-8">
          {/* ====1====== */}
          <div className="flex flex-col gap-3 w-[286px]">
            <p className="text-text-primary text-base tracking-[2%] font-bold">
              Sources
            </p>
            <ul className="pl-8 list-disc flex flex-col gap-3">
              <li className="tracking-[2%] text-text-primary text-base">
                VirusTotal
              </li>
              <li className="tracking-[2%] text-text-primary text-base">
                MISP
              </li>
              <li className="tracking-[2%] text-text-primary text-base">
                Internal IoC feed
              </li>
            </ul>
          </div>
          {/* ====1====== */}

          {/* ====2====== */}
          <div className="flex flex-col gap-3">
            <p className="text-text-primary text-base tracking-[2%] font-bold">
              Matched Fields
            </p>
            <ul className="pl-8 list-disc flex flex-col gap-3">
              <li className="tracking-[2%] text-text-primary text-base">
                source.ip
              </li>
              <li className="tracking-[2%] text-text-primary text-base">
                network.domain
              </li>
              <li className="tracking-[2%] text-text-primary text-base">
                file.hash.sha256
              </li>
            </ul>
          </div>
          {/* ====2====== */}
        </div>

        {/* ========links========= */}
        <div className="flex items-center gap-7 mt-6">
          {/*toggle  */}
          <div className="">
            <Toggle label="Off" />
          </div>
          {/* toggle */}
          <div className="flex items-center gap-1.5 text-sm">
            <MarkIcon className="text-success" />
            Set priority
          </div>
          <div className="flex items-center gap-1.5 text-sm">
            <IntelIcon className="text-selection" />
            Choose intel sources
          </div>
        </div>
        {/* ========links========= */}
      </div>
      {/* ===========Stage Detail ========*/}

      {/* ==========Footer Actions======= */}
      <section className="mt-10">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl text-text-primary">Recommended Actions</h1>
        </div>
        <div className="flex items-center gap-4 pt-4">
          <div>
            <Button
              onClick={() => setActiveModal("EXPORT_SCHEMA")}
              paddingX="py-3"
              paddingY="px-6"
              icon={<ReOrderIcon className="text-white" />}
            >
              Reorder Pipeline
            </Button>
          </div>
          <div>
            <Button
              paddingX="py-3"
              paddingY="px-6"
              variant="white"
              icon={<AddCustomIcon className="text-text-secondary" />}
            >
              Add Custom Enrichment
            </Button>
          </div>
          <div className="">
            <Button
              onClick={() => setActiveModal("RUN")}
              paddingX="py-3"
              paddingY="px-6"
              variant="white"
              icon={<RunIcon className="text-text-secondary" />}
              disabled
            >
              Run Validation
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EnrichmentPipeline;
