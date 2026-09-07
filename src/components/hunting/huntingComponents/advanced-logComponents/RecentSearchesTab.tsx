import React, { useState } from "react";
import {
  AiChatIcon,
  DeleteIcon,
  Details1Icon,
  EditIcon,
  MarkIcon,
  ResetIcon,
  ScheduleIcon,
  Search1Icon,
  Share2Icon,
  SquaredInfoIcon,
  ZapIcon,
} from "../../../../utils/icons";
import Drawer from "../../../props/Drawer";
import Button from "../../../props/Button";
import Checkbox from "../../../props/Checkbox";
import { useNavigate } from "react-router-dom";

const RECENTSEARCHES = [
  {
    id: "01",
    title: "Suspicious PowerShell Usage",
    desc: "Detects execution of encoded PowerShell commands often used in privilege escalation attempts.”,",
    query: "EventID: 4625 AND IPAddress: ‘192.168.*’ AND TimeGe...",
    hits: "123",
    lastRun: "Aug 12, 2025",
    tags: ["PowerShell", "PrivEsc"],
    viewDetails: "View Details",
  },
  {
    id: "02",
    title: "Failed RDP Attempts – External",
    desc: "Finds repeated failed RDP login attempts from non-corporate IP ranges. Helps spot brute force attacks.",
    query: "EventID: 4625 AND IPAddress: ‘192.168.*’ AND TimeGe...",
    hits: "232",
    lastRun: "Aug 15, 2025",
    tags: ["Brute Force", "Remote Access"],
    viewDetails: "View Details",
  },
  {
    id: "03",
    title: "Malware Beaconing Patterns",
    desc: "Searches for network traffic matching known beaconing intervals used by C2 malware families.",
    query: "EventID: 4625 AND IPAddress: ‘192.168.*’ AND TimeGe...",
    hits: "34",
    lastRun: "Aug 10, 2025",
    tags: ["C2", "Network", "Beaconing"],
    viewDetails: "View Details",
  },
];

const RecentSearchesTab = () => {
  const [activeStage, setActiveStage] = useState("01");
  const [selectedLibraryStage, setSelectedLibraryStage] = useState<
    (typeof RECENTSEARCHES)[number] | null
  >(null);
  const navigate = useNavigate();

  const newQuery = () => {
    navigate("/hunting/advanced-log-search/new-query");
  };

  return (
    <div>
      <div className="flex items-center gap-2 pb-5">
        <button className="flex items-center gap-1.5">
          <ResetIcon className="text-primary-hover" />
          Refresh
        </button>
        <button className="flex items-center gap-1.5">
          <DeleteIcon className="text-primary-hover" />
          Delete
        </button>
        <button className="flex items-center gap-1.5">
          <AiChatIcon className="text-primary-hover" />
          Ai Assit
        </button>
      </div>
      {/* Library Grid */}
      <div className="flex items-center flex-wrap gap-4">
        {RECENTSEARCHES.map((stage) => (
          <div
            key={stage.id}
            onClick={() => {
              setActiveStage(stage.id);
            }}
          >
            {/* Card - Unified Click */}
            <div className="relative p-4 rounded-3xl border-2 transition-all max-w-[460px] flex flex-col gap-2 cursor-pointer border-border bg-white group-hover:border-text-primary/10">
              <div className="flex justify-between">
                <div className="flex items-center gap-2 ">
                  {" "}
                  <Search1Icon className="text-primary" />
                  <p className="font-bold text-text-secondary text-base leading-6">
                    {stage.title}
                  </p>
                </div>
                <div>
                  <Checkbox />
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs">
                {stage.desc}
              </div>

              <div className="flex gap-1 border border-border py-1 px-1 rounded-lg w-fit">
                <p>Query : </p>
                <p className="text-xs  text-text-primary  ">{stage.query}</p>
              </div>

              <div className="text-text-secondary text-base flex items-center gap-1.5">
                <p>Hits: </p>
                <p>{stage.hits}</p>
              </div>
              <div className="text-text-secondary text-base flex items-center gap-1.5">
                <p>Last Run: </p>
                <p>{stage.lastRun}</p>
              </div>

              <div className=" flex gap-2.5 items-center mb-1">
                <span className="text-sm font-medium text-text-secondary">
                  Triggers:
                </span>
                <div className="flex flex-wrap gap-2">
                  {stage.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-border text-[10px] rounded-xl font-medium text-text-primary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => {
                    setSelectedLibraryStage(stage);
                  }}
                  className="text-primary-hover text-base underline  hover:opacity-80 transition-opacity cursor-pointer"
                >
                  {stage.viewDetails}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/*Library Grid */}
      {/* Drawer - Opens when a stage is selected */}
      <Drawer
        isOpen={!!selectedLibraryStage}
        onClose={() => setSelectedLibraryStage(null)}
        width="800px"
      >
        {selectedLibraryStage && (
          <>
            <Drawer.Header title="Suspicious PowerShell Usage" />

            <Drawer.Body>
              <div className="flex flex-col gap-6">
                {/* ===================================== */}
                <div className="flex flex-col gap-3">
                  <div className="text-base text-text-primarys">
                    <p className="">
                      Detects execution of encoded PowerShell commands often
                      used in privilege escalation attempts.
                    </p>
                  </div>
                  <div>
                    <p className="text-base text-text-primary pb-2">Actions</p>
                    <div className="flex items-center gap-5">
                      <button
                        onClick={newQuery}
                        className="flex items-center gap-1.5 bg-alt py-2 px-2 rounded-xl hover:border hover:border-[#A4C1E3] cursor-pointer "
                      >
                        <ZapIcon className="text-primary" />
                        Run Hunt
                      </button>
                      <button className="flex items-center gap-1.5">
                        <EditIcon className="text-error" />
                        Edit
                      </button>

                      <button className="flex items-center gap-1.5">
                        <Share2Icon className="text-primary" />
                        Share
                      </button>
                    </div>
                  </div>

                  {/* border */}
                  <div className="border border-border "></div>
                  {/* border */}
                </div>
                {/* ===================================== */}
                <div>
                  <p className="text-base text-text-primary font-bold">
                    Hunts Summary
                  </p>
                  <div className="ml-7 text-base font-normal">
                    <li>Hits: 124</li>
                    <li>Last Run: Aug 12, 2025</li>
                    <li>Owner: SecOps Team</li>
                    <li>
                      <div className="flex items-center gap-1.5">
                        Tags:
                        <span className="bg-border text-sm text-text-primary px-2 py-1 rounded-xl">
                          PowerShell
                        </span>
                        <span className="bg-border text-sm text-text-primary px-2 py-1 rounded-xl">
                          PrivEsc
                        </span>
                      </div>
                    </li>
                  </div>
                </div>

                {/* ========Markdown Cell (Intro):============== */}
                <div>
                  <div>
                    <div className="flex items-center gap-1.5 mb-3">
                      <Details1Icon className="text-primary" />
                      <p className=" text-base text-text-primary font-bold">
                        Query Definition
                      </p>
                    </div>
                    <div className="bg-default border border-border p-4 rounded-xl text-base font-fira-code tracking-[0.5%] leading-4  text-primary flex flex-col gap-1.5 h-[150px] px-8">
                      <p>ProcessName == "powershell.exe"</p>
                      <p>AND CommandLine contains "EncodedCommand"</p>
                      <p>AND TimeGenerated {">"} ago(7d)</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-warning mt-1 ">
                    <SquaredInfoIcon />
                    <p className=" text-xs">
                      This query runs against endpoint logs to detect encoded
                      PowerShell commands.
                    </p>
                  </div>
                </div>
                {/* ==========Markdown Cell (Intro):============ */}
              </div>
            </Drawer.Body>

            <Drawer.Footer className="justify-start ">
              <div className="flex items-center gap-6 ">
                <Button
                  paddingX="px-4"
                  paddingY="py-2"
                  height="min-h-[0px]"
                  icon={<MarkIcon className="text-white" />}
                >
                  Save as Template
                </Button>
                <Button
                  paddingX="px-4"
                  paddingY="py-2"
                  height="min-h-[0px]"
                  variant="white"
                  icon={<ScheduleIcon />}
                >
                  Schedule Hunt
                </Button>
                <Button
                  paddingX="px-4"
                  paddingY="py-2"
                  height="min-h-[0px]"
                  variant="white"
                  icon={<DeleteIcon />}
                >
                  Delete Hunt
                </Button>
              </div>
            </Drawer.Footer>
          </>
        )}
      </Drawer>
    </div>
  );
};

export default RecentSearchesTab;
