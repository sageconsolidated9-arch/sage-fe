import { Settings, ShieldAlert } from "lucide-react";
import Table from "../../../shared/Table";
import {
  AiChatIcon,
  ChevronRight1Icon,
  ShieldIcon,
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
        width="600px"
      >
        <Drawer.Header title="Malicious Macro Doc" />

        <Drawer.Body>
          {/* Contextual Metadata Section */}
          <div className="mb-8">
            <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-4">
              Contextual Metadata
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-text-secondary">
                  First Seen
                </label>
                <p className="text-sm font-medium">2 Days ago</p>
              </div>
              <div>
                <label className="text-sm text-text-secondary">Source IP</label>
                <p className="text-sm font-medium">192.172.1.2</p>
              </div>
              <div>
                <label className="text-sm text-text-secondary">
                  Attack Stage
                </label>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                  High
                </span>
              </div>
            </div>
          </div>

          {/* Relationships Section */}
          <div className="mb-8">
            <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-4">
              Relationships to Other Events
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm">Linked Incident #492</span>
                <span className="text-xs text-text-secondary">2 Days ago</span>
              </div>
            </div>
          </div>

          {/* Analyst Actions */}
          <div>
            <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-4">
              Analyst Actions
            </h3>
            <div className="flex flex-wrap gap-2">
              <button className="text-sm text-red-600 hover:text-red-700 font-medium">
                Block IP / Domain
              </button>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                Create Investigation Case
              </button>
            </div>
          </div>
        </Drawer.Body>

        <Drawer.Footer>
          <button
            className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-dark flex items-center gap-2"
            onClick={viewDetails}
          >
            View Full Details
          </button>
        </Drawer.Footer>
      </Drawer>
    </>
  );
};

export default InprogressTable;
