import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion, type Variants } from "motion/react";
import {
  ChevronLeft1Icon,
  InfoFillIcon,
  XIcon,
  ShieldIcon,
  SquaredInfoIcon,
  NodeIcon,
  RoundXIcon,
  AiChatIcon,
  LockIcon,
} from "../../utils/icons";
import { InfoRow, InfoSection } from "../props/InfoSection";
import { SeverityIndicator } from "../../utils/incident";
import Button from "../props/Button";
import { useState } from "react";
import BlockIpModal from "./incident-modals/BlockIpModal";
import DisableAccountModal from "./incident-modals/DisableAccountModal";
import RecommendContainAssetsModal from "./incident-modals/RecommendContainAssetsModal";

const IncidentDetailPage = () => {
  const navigate = useNavigate();
  const handleBack = () => navigate(-1);
  const [activeTab, setActiveTab] = useState("Evidence");
  const [activeModal, setActiveModal] = useState<
    "CONTAIN_ASSETS" | "BLOCK_IP" | "DISABLE_ACCOUNT" | "INVESTIGATE" | null
  >(null);

  const timelineEvents = [
    "10:42 AM - Multiple failed logins from IP 45.83.12.99",
    "10:45 AM - Privilege escalation attempt detected",
    "10:46 AM - Suspicious file download blocked",
    "10:42 AM - Multiple failed logins from IP 45.83.12.99",
    "10:45 AM - Privilege escalation attempt detected",
    "10:46 AM - Suspicious file download blocked",
  ];

  const evidenceData = [
    {
      type: "IP Address",
      value: "45.83.12.99",
      first: "Aug 13, 2025 10:42 am",
      last: "Aug 13, 2025 10:46 am",
      source: "Firewall Logs",
    },
    {
      type: "File Hash",
      value: "f3a9b8c92f4 ...",
      first: "Aug 13, 2025 10:42 am",
      last: "Aug 13, 2025 10:46 am",
      source: "EDR Agent Logs",
    },
    {
      type: "Domain",
      value: "malicious-login.com",
      first: "Aug 13, 2025 10:42 am",
      last: "Aug 13, 2025 10:46 am",
      source: "Threat Intel Feed",
    },
    {
      type: "Username",
      value: "admin_jdoe",
      first: "Aug 13, 2025 10:42 am",
      last: "Aug 13, 2025 10:46 am",
      source: "AD Logs",
    },
  ];

  const assetsData = [
    {
      name: "finance-db-server",
      type: "Database Server",
      risk: "High",
      status: "Online, Monitored",
      statusColor: "bg-info text-text-primary",
    },
    {
      name: "hr-portal",
      type: "Web Application",
      risk: "High",
      status: "Online, Vulnerable",
      statusColor: "bg-warning text-white",
    },
    {
      name: "ceo-laptop",
      type: "Endpoint Device",
      risk: "Low",
      status: "Offline, Needs Scan",
      statusColor: "bg-error text-white",
    },
    {
      name: "vpn-gateway-01",
      type: "Network Device",
      risk: "Low",
      status: "Online, Healthy",
      statusColor: "bg-success text-white",
    },
  ];

  const rulesData = [
    {
      name: "Multiple Failed Admin Login Attempts",
      severity: "Critical",
      source: "Multiple Failed Admin Login Attempts",
    },
    {
      name: "Suspicious File Download",
      severity: "Critical",
      source: "EDR Agent",
    },
    {
      name: "External Login from Unusual Location",
      severity: "High",
      source: "AD Logs",
    },
  ];

  const playbookData = [
    {
      name: "Block Malicious IP",
      action: "Added 45.83.12.99 to firewall",
      status: "Success",
      time: "Aug 13, 2025 10:46 am",
    },
    {
      name: "Disable Compromised User",
      action: "Disabled account admin_jdoe",
      status: "Success",
      time: "Aug 13, 2025 10:46 am",
    },
    {
      name: "Quarantine Endpoint",
      action: "Isolated ceo-laptop",
      status: "Partial",
      time: "Aug 13, 2025 10:46 am",
    },
  ];

  const tabVariants: Variants = {
    initial: { opacity: 0, y: 10, filter: "blur(4px)" },
    enter: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.3, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      y: -10,
      filter: "blur(4px)",
      transition: { duration: 0.2, ease: "easeIn" },
    },
  };

  const renderTabContent = () => {
    // We wrap the specific tables in a common motion.div for the transition
    return (
      <motion.div
        key={activeTab} // Crucial for AnimatePresence to track switches
        variants={tabVariants}
        initial="initial"
        animate="enter"
        exit="exit"
      >
        {activeTab === "Evidence" && (
          <>
            <p className="text-xs mb-4">
              Indicators of Compromise (IOCs) identified during detection and
              investigation.
            </p>
            <table className="w-full text-left text-base">
              <thead className="bg-surface uppercase">
                <tr>
                  <th className="p-3 font-normal">Type</th>
                  <th className="p-3 font-normal">Value</th>
                  <th className="p-3 font-normal">First Seen</th>
                  <th className="p-3 font-normal">Last Seen</th>
                  <th className="p-3 font-normal">Source</th>
                </tr>
              </thead>
              <tbody>
                {evidenceData.map((row, i) => (
                  <tr
                    key={i}
                    className=" border-border transition-colors text-sm"
                  >
                    <td className="p-3 underline">{row.type}</td>
                    <td className="p-3 font-fira-code">{row.value}</td>
                    <td className="p-3">{row.first}</td>
                    <td className="p-3">{row.last}</td>
                    <td className="p-3">{row.source}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {activeTab === "Assets" && (
          <>
            <p className="text-xs mb-4">
              Systems, endpoints, and user accounts directly affected.
            </p>
            <table className="w-full text-left text-base">
              <thead className="bg-surface">
                <tr>
                  <th className="p-3 font-normal">Asset name</th>
                  <th className="p-3 font-normal">Asset type</th>
                  <th className="p-3 font-normal">Risk Level</th>
                  <th className="p-3 font-normal">Status</th>
                </tr>
              </thead>
              <tbody>
                {assetsData.map((row, i) => (
                  <tr key={i} className=" border-border">
                    <td className="p-3 underline text-sm">{row.name}</td>
                    <td className="p-3 text-sm">{row.type}</td>
                    <td className="p-3 flex items-center gap-1 text-sm">
                      <SeverityIndicator level={row.risk === "High" ? 3 : 1} />
                      {row.risk}
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded-lg text-xs ${row.statusColor}`}
                      >
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {activeTab === "Rules Triggered" && (
          <>
            <p className="text-xs mb-4">
              Detection rules that generated alerts linked to this incident.
            </p>
            <table className="w-full text-left text-base">
              <thead className="bg-surface">
                <tr>
                  <th className="p-3 font-normal">Rule Name</th>
                  <th className="p-3 font-normal">Severity</th>
                  <th className="p-3 font-normal">Detection Source</th>
                </tr>
              </thead>
              <tbody>
                {rulesData.map((row, i) => (
                  <tr key={i} className=" border-border">
                    <td className="p-3 underline cursor-pointer text-sm">
                      {row.name}
                    </td>
                    <td className="p-3 flex items-center gap-1 text-sm">
                      <SeverityIndicator
                        level={row.severity === "Critical" ? 4 : 3}
                      />{" "}
                      {row.severity}
                    </td>
                    <td className="p-3 text-sm">{row.source}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {activeTab === "Playbook Runs" && (
          <>
            <p className="text-xs mb-4">
              Automated actions executed in response to this incident.
            </p>
            <table className="w-full text-left text-base">
              <thead className="bg-surface">
                <tr>
                  <th className="p-3 font-normal">Playbook Name</th>
                  <th className="p-3 font-normal">Action Taken</th>
                  <th className="p-3 font-normal">Status</th>
                  <th className="p-3 font-normal">Run Time</th>
                </tr>
              </thead>
              <tbody>
                {playbookData.map((row, i) => (
                  <tr key={i} className=" border-border">
                    <td className="p-3 underline cursor-pointer text-sm">
                      {row.name}
                    </td>
                    <td className="p-3 text-sm">{row.action}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded-lg text-white text-xs ${row.status === "Success" ? "bg-success" : "bg-warning"}`}
                      >
                        {row.status}
                      </span>
                    </td>
                    <td className="p-3 text-sm">{row.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </motion.div>
    );
  };

  return (
    <div className="bg-surface rounded-xl py-[27px] px-[30px] flex flex-col gap-8 text-text-secondary min-h-screen">
      {/* Navigation */}
      <button
        onClick={handleBack}
        className="flex items-center gap-2 text-[18px] hover:opacity-80 transition-all"
      >
        <ChevronLeft1Icon /> Back to Queue
      </button>

      {/* Main Container */}
      <div className="border border-border rounded-[18px] p-6 flex flex-col gap-8 bg-white">
        {/* Header Section */}
        <section>
          <div className="flex items-center justify-between border-b border-border pb-4 mb-4">
            <h1 className="text-2xl text-text-primary">
              Multiple Failed Login Attempts Details
            </h1>
            <div className="flex items-center gap-2 text-sm ">
              <span>SOC Tier 1</span>
              <XIcon className="cursor-pointer" />
            </div>
          </div>

          <div className="grid grid-cols-1 llg:grid-cols-2 gap-8">
            <div className="w-full pb-4 llg:pr-8 border-b llg:border-r border-text-muted">
              <div className="">
                <InfoSection title="">
                  <InfoRow label="Incident ID" value="INC-2-25-0831" />
                  <InfoRow
                    label="Severity"
                    value={<SeverityIndicator level={3} />}
                  />
                  <InfoRow label="Status" value="Investigating" />
                  <InfoRow
                    label="Timestamp (First Detection)"
                    value="Aug 13, 2025 10:42 am"
                  />
                </InfoSection>

                <div className="flex items-center gap-2 text-warning mt-4">
                  <SquaredInfoIcon />
                  <p className="font-fira-code text-xs">
                    Detected by Firewall Log Parser at 10:42 AM — last event 2
                    minutes ago.
                  </p>
                </div>
              </div>
            </div>

            <div className="">
              {/* side 2 */}
              <div className="w-full">
                <div className="grid grid-cols-[auto_auto_auto] gap-x-8 gap-y-4 items-center text-xs">
                  {/* Row 1: Related Alerts */}
                  <span className="text-text-secondary whitespace-nowrap">
                    Related Alerts
                  </span>
                  <span className="text-text-primary ">12</span>
                  <span className="pl-4">
                    Individual detections linked to this incident
                  </span>

                  {/* Row 2: Affected Assets */}
                  <span className=" whitespace-nowrap">Affected Assets</span>
                  <span className="">3</span>
                  <span className="pl-4">
                    Servers, endpoints, or accounts involved
                  </span>

                  {/* Row 3: Attack Stage */}
                  <span className=" whitespace-nowrap">Attack Stage</span>
                  <span className="  ">Credential Access</span>
                  <span className="pl-4">MITRE ATT&CK stage of activity</span>

                  {/* Row 4: Risk Score */}
                  <span className=" whitespace-nowrap">Risk Score</span>
                  <span className="">92/100</span>
                  <span className="pl-4">
                    Calculated based on asset value & threat severity
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <h2 className="text-2xl text-text-primary">
              Incident Narrative / Timeline
            </h2>
            <InfoFillIcon className="text-info" />
          </div>

          <div className="border border-input-border rounded-xl p-3">
            <div className="flex items-center justify-between">
              <p className="text-xs">
                All events are displayed in the order they occurred for easier
                investigation.
              </p>
              <button className="flex items-center gap-1 text-text-primary">
                <NodeIcon className="" />
                <p className="underline text-xs">View Attack path</p>
              </button>
            </div>

            {/* event logs */}
            <div className="relative border border-input-border rounded-xl bg-toast p-4 mt-2.5">
              <div className="font-fira-code text-sm leading-[22px] tracking-[0.5%] text-text-primary">
                {timelineEvents.map((event, i) => (
                  <p key={i}>{event}</p>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Evidence Table Section */}
        <section>
          <h2 className="text-xl text-text-primary font-medium mb-4">
            Evidence & Related Data
          </h2>

          <div className="flex text-sm text-text-primary relative">
            {["Evidence", "Assets", "Rules Triggered", "Playbook Runs"].map(
              (tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative py-[9px] px-6 cursor-pointer transition-colors duration-200 z-10 ${
                    activeTab === tab
                      ? "text-text-primary"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 border-l border-r border-t border-border bg-default rounded-t-xl -z-10"
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}
                </button>
              ),
            )}
          </div>

          <div
            className={`border border-input-border bg-default p-[18px] rounded-tr-xl rounded-b-xl overflow-hidden ${activeTab === "Evidence" ? "" : "rounded-tl-xl"}`}
          >
            <AnimatePresence mode="wait">{renderTabContent()}</AnimatePresence>
          </div>
        </section>

        {/* Footer Actions */}
        <section className="">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl text-text-primary">Recommended Actions</h1>
            <p className="text-xs">
              Run recommended actions to respond faster and contain the threat.
            </p>
          </div>
          <div className="flex items-center gap-4 pt-4">
            <div>
              <Button
                onClick={() => setActiveModal("CONTAIN_ASSETS")}
                paddingX="py-3"
                paddingY="px-6"
                icon={<ShieldIcon className="text-white" />}
              >
                Contain Asset
              </Button>
            </div>
            <div>
              <Button
                onClick={() => setActiveModal("BLOCK_IP")}
                paddingX="py-3"
                paddingY="px-6"
                variant="white"
                icon={<RoundXIcon className="text-text-secondary" />}
              >
                Block IP
              </Button>
            </div>
            <div>
              <Button
                onClick={() => setActiveModal("DISABLE_ACCOUNT")}
                paddingX="py-3"
                paddingY="px-6"
                variant="white"
                icon={<LockIcon className="text-text-secondary" />}
              >
                DISABLE ACCOUNT
              </Button>
            </div>
            <div>
              <Button
                paddingX="py-3"
                paddingY="px-6"
                variant="white"
                icon={<AiChatIcon className="text-text-secondary" />}
              >
                INVESTIGATE
              </Button>
            </div>
          </div>
        </section>
      </div>

      {activeModal === "CONTAIN_ASSETS" && (
        <RecommendContainAssetsModal
          isOpen={true}
          setIsOpen={() => setActiveModal(null)}
        />
      )}
      {activeModal === "BLOCK_IP" && (
        <BlockIpModal isOpen={true} setIsOpen={() => setActiveModal(null)} />
      )}

      {activeModal === "DISABLE_ACCOUNT" && (
        <DisableAccountModal
          isOpen={true}
          setIsOpen={() => setActiveModal(null)}
        />
      )}
    </div>
  );
};

export default IncidentDetailPage;
