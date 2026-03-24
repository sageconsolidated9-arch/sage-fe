import React from "react";
import Modal from "../../props/Modal";
import { InfoRow, InfoSection } from "../../props/InfoSection";
import { SeverityIndicator } from "../../../utils/incident";
import {
  AiChatIcon,
  CircleFilledCheckIcon,
  DeviceIcon,
  RoundXIcon,
  ShieldIcon,
} from "../../../utils/icons";
import Button from "../../props/Button";

interface ViewSummaryModalProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const ViewSummaryModal = ({ isOpen, setIsOpen }: ViewSummaryModalProps) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} maxWidth="990px">
        <Modal.Header title="Summary of Suspicious Login from Unusual Location" />

        <Modal.Body>
          <>
            {/* Incident Overview */}
            <InfoSection title="Incident Overview">
              <InfoRow
                label="Incident Name"
                value="Summary of Suspicious Login from Unusual Location"
              />
              <InfoRow
                label="Severity"
                value={<SeverityIndicator level={1} />}
              />
              <InfoRow label="Detection Source" value="IDS Alert" />
              <InfoRow label="Time Taken to Resolve" value="22 minutes" />
              <InfoRow label="Resolution Time" value="2 minutes ago" />
              <InfoRow
                label="Current Status"
                value={
                  <div className="bg-success py-1 px-2 text-white text-xs rounded-lg">
                    Active
                  </div>
                }
              />
              <InfoRow label="Threat Type" value="Malware" />
              <InfoRow label="Category" value="Endpoint Infection" />

              <InfoRow
                label="Playbook Used"
                value={
                  <div className="bg-[#FA4F1933] py-1 px-2 text-primary text-xs rounded-lg flex items-center gap-2.5">
                    Quarantine Device
                    <DeviceIcon className="w-4 h-4" />
                  </div>
                }
              />
            </InfoSection>

            {/* Timeline of Events */}
            <>
              <div className="flex flex-col gap-2 pb-4">
                <div className="text-base ">
                  <p>Timeline of Events</p>
                </div>
                <div className="flex flex-col gap-0.5 bg-toast text-text-primary border border-input-border rounded-xl p-3 font-fira-code text-sm leading-[22px] tracking-[0.5%] ">
                  <p>12:03 AM – Suspicious executable downloaded</p>
                  <p>12:04 AM – EDR flagged ransomware-like behavior</p>
                  <p>12:06 AM – File encryption attempts detected</p>
                  <p>12:07 AM – Asset automatically quarantined</p>
                  <p>12:14 AM – Analyst reviewed and resolved incident</p>
                </div>
              </div>
            </>

            {/* Affected Assets */}
            <>
              <div className="flex flex-col gap-2 pb-4">
                <div className="text-base text-text-primary">
                  <p>Affected Assets</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-text-muted text-default rounded-lg px-2 py-1 text-xs">
                    <p>workstation</p>
                  </div>

                  <div className="bg-text-muted text-default rounded-lg px-2 py-1 text-xs">
                    <p>finance-vm</p>
                  </div>
                </div>
              </div>
            </>

            {/* Indicators of Compromise (IOC) */}
            <InfoSection title="Indicators of Compromise (IOC)">
              <InfoRow label="Files" value="/users/appdata/temp/tmp123.exe" />

              <InfoRow label="Hashes" value="8a7f28cd786943" />
              <InfoRow label="IPs Contacted" value="45.83.129.29" />
              <InfoRow label="Domains" value="malware-checkpoint.net" />
            </InfoSection>

            {/* Response Actions Taken / AI Recommendations */}
            <div className="flex justify-between mb-4 pr-16">
              {/* Response Actions Taken */}
              <div className="flex flex-col gap-2">
                <div className="text-base text-text-primary">
                  <p>Response Actions Taken</p>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <CircleFilledCheckIcon className="w-5 h-5 text-white" />
                  <p>Trigger automatic forensics snapshot</p>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <CircleFilledCheckIcon className="w-5 h-5 text-white" />
                  <p>Auto-Quarantine applied</p>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <CircleFilledCheckIcon className="w-5 h-5 text-white" />
                  <p>Malicious process terminated</p>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <CircleFilledCheckIcon className="w-5 h-5 text-white" />
                  <p>Connection to external IP blocked</p>
                </div>
              </div>
              {/* AI Recommendations */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-1.5">
                  <AiChatIcon className="w-6 h-6 text-primary-hover" />
                  <p className="text-base text-text-primary">
                    AI Recommendations
                  </p>
                </div>
                <div className="text-primary text-sm underline decoration-solid flex flex-col gap-2.5">
                  <p>Enable EDR real-time protection</p>
                  <p>Block unknown executable downloads for this group</p>
                  <p>Enforce MFA on associated identity</p>
                </div>
              </div>
            </div>
          </>
        </Modal.Body>

        <Modal.Footer>
          <div>
            <Button icon={<ShieldIcon className="w-6 h-6 text-white" />}>
              Export Report
            </Button>
          </div>
          <div>
            <Button
              icon={<RoundXIcon className="w-6 h-6 text-text-secondary" />}
              paddingX="px-6"
              paddingY="py-3"
              onClick={() => setIsOpen(false)}
              variant="white"
            >
              Cancel
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ViewSummaryModal;
