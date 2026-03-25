import { Settings, ShieldAlert } from "lucide-react";
import Table from "../../../shared/Table";
import {
  AiChatIcon,
  ChevronRight1Icon,
  DetailsIcon,
  PlusIcon,
  ShieldIcon,
  XIcon,
} from "../../../utils/icons";
import {
  SeverityIndicator,
  StatusBadge,
  type Incident,
} from "../../../utils/incident";
import type { ColumnDef } from "../../../types/table";
import ContainAssetsModal from "../incident-modals/ContainAssetsModal";
import { useState } from "react";
import Drawer from "../../props/Drawer";
import { useNavigate } from "react-router-dom";

interface TableProps {
  data: Incident[];
}

const InprogressTable = ({ data }: TableProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState(false);

  const navigate = useNavigate();

  const viewDetails = () => {
    navigate("/incidents-&-alerts/view-details");
  };

  const columns: ColumnDef<Incident>[] = [
    {
      key: "name",
      header: "Incident name",
      cell: (i) => (
        <span className="text-text-secondary text-sm">{i.name}</span>
      ),
    },
    {
      key: "source",
      header: "Detection Source:",
      cell: (i) => (
        <span className="text-text-secondary text-sm">{i.source}</span>
      ),
    },
    {
      key: "severity",
      header: "Severity",
      cell: (i) => <SeverityIndicator level={i.severity} />,
    },
    {
      key: "timeDetected",
      header: "Time Detected",
      cell: (i) => (
        <span className="text-text-secondary text-sm">{i.timeDetected}</span>
      ),
    },
    {
      key: "status",
      header: "Status:",
      cell: (i) => (
        <div className="flex gap-2 items-center">
          {i.status === "New" && <StatusBadge status="New" />}
          <StatusBadge status={i.status} />
        </div>
      ),
    },
    {
      key: "action",
      header: "Action",
      cell: () => (
        <div className="flex items-center gap-3">
          <button onClick={() => setIsOpen(true)} className="cursor-pointer">
            <ShieldIcon className="text-selection cursor-pointer" />
          </button>

          <AiChatIcon className="text-primary-hover" />
          <button
            onClick={() => setSelectedIncident(true)}
            className="cursor-pointer"
          >
            <ChevronRight1Icon className="text-text-muted" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <Table<Incident>
        data={data}
        columns={columns}
        showHeader={false}
        className="bg-transparent"
      />

      <ContainAssetsModal isOpen={isOpen} setIsOpen={setIsOpen} />

      <Drawer
        isOpen={!!selectedIncident}
        onClose={() => setSelectedIncident(false)}
        width="710px"
      >
        <Drawer.Header title="" />

        <Drawer.Body className="flex flex-col gap-6">
          {/* Header Section */}
          <div className="flex justify-between items-start ">
            <div>
              <p className="text-xl text-text-primary font-normal">
                Malicious Macro Doc
              </p>
              <p className="text-xs text-text-muted mt-1">
                Aug 4, 2025 12:14 am
              </p>
              <div className="flex items-center gap-2 mt-4">
                <span className="text-sm text=text-primary">Assigned to</span>
                <div className="flex items-center gap-2 bg-alt pl-8 px-3 py-1 rounded-full text-sm">
                  <span>Victor</span>
                  <XIcon />
                </div>
              </div>
            </div>
            <div className="text-right">
              <h3 className="text-base font-normal text-text-primary">
                Reconnaissance
              </h3>
              <div className="flex gap-1 justify-end mt-1">
                <div className="w-3 h-3 bg-orange-500 rounded-sm" />
                <div className="w-3 h-3 bg-orange-500 rounded-sm" />
                <div className="w-3 h-3 bg-orange-500 rounded-sm" />
              </div>
            </div>
          </div>

          {/* Quick Info */}
          <div className="  text-text-secondary text-xs">
            <div className="flex justify-between ">
              <span className=" ">Tools detected:</span>
              <span className="">Nmap, Shodan queries</span>
            </div>
            <div className="flex justify-between ">
              <span className="">Source IP:</span>
              <span className="">192.172.1.2</span>
            </div>
            <div className="flex justify-between ">
              <span className="">Time of Activity:</span>
              <span className="">Aug 4, 2025 12:14 am</span>
            </div>
          </div>

          {/* Contextual Metadata */}
          <div className="">
            <h4 className="text-text-primary font-normal text-base mb-4">
              Contextual Metadata
            </h4>
            <div className="space-y-3">
              {[
                { label: "First Seen", value: "2 Days Ago" },
                { label: "Last Seen", value: "3 Hours Ago" },
                { label: "Frequency", value: "5" },
                { label: "Attack Stage Confidence Level", value: "High" },
                {
                  label: "Tactics & Techniques",
                  value: "T1595 - Active Scanning",
                },
                {
                  label: "Geolocation of Source",
                  value: "Abuja, Nigeria. MTN NG",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex justify-between text-text-secondary text-xs"
                >
                  <span className="">{item.label}</span>
                  <span className="text-right">{item.value}</span>
                </div>
              ))}
              <div className="flex justify-between text-text-secondary text-xs">
                <span className="">Historical Trend</span>
                <span className="">
                  Sparkline chart showing increase/decrease in reconnaissance
                  attempts over time
                </span>
              </div>
            </div>
          </div>

          {/* Relationships */}
          <div className="">
            <h4 className="text-base text-text-primary font-medium mb-4">
              Relationships to Other Events
            </h4>
            <div className="space-y-3  text-text-secondary text-xs">
              <div className="flex justify-between ">
                <span className="">Linked Incidents</span>
                <span className="">2 Days Ago</span>
              </div>
              <div className="flex justify-between  text-text-secondary text-xs">
                <span className="">Progression Risk</span>
                <span className="">3 Hours Ago</span>
              </div>
              <div className="flex justify-between  text-text-secondary text-xs">
                <span className="">Related Vulnerabilities</span>
                <span className="">5</span>
              </div>
              <div className="flex justify-between  text-text-secondary text-xs">
                <span className="">Connected Asset Group</span>
                <span className="">High</span>
              </div>
              <div className="flex justify-end">
                <button className="text-primary-hover text-xs underline">
                  View All Events from this IP
                </button>
              </div>
            </div>
          </div>

          {/* Analyst Actions */}
          <div>
            <h4 className="text-base text-text-primary font-normal mb-3">
              Analyst Actions
            </h4>
            <div className="flex flex-col gap-2 items-start text-primary-hover text-xs underline">
              <button className=" ">Block IP / Domain</button>
              <button className=" ">Create Investigation Case</button>
              <button className="">Mark as Resolved</button>
              <button className="">Run Playbook</button>
            </div>
          </div>
        </Drawer.Body>

        <Drawer.Footer className="border-t p-6 ">
          <button
            className=" cursor-pointer flex items-center gap-2.5 px-6 py-3 border-2 border-text-secondary rounded-xl font-bold text-text-secondary shadow-button-default"
            onClick={viewDetails}
          >
            <DetailsIcon />
            View Details
          </button>
        </Drawer.Footer>
      </Drawer>
    </>
  );
};

export default InprogressTable;
