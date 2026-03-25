import React, { useState } from "react";
import Modal from "../../props/Modal";
import { RoundXIcon, ShieldIcon, SquaredInfoIcon } from "../../../utils/icons";
import Button from "../../props/Button";
import { InfoRow, InfoSection } from "../../props/InfoSection";
import Checkbox from "../../props/Checkbox";
import Radio from "../../props/Radio";
import Input from "../../props/Input";

interface BlockIpModalProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const BlockIpModal = ({ isOpen, setIsOpen }: BlockIpModalProps) => {
  const [duration, setDuration] = useState("permanent");

  const durations = [
    { id: "permanent", label: "Permanent block" },
    { id: "1h", label: "1 hour" },
    { id: "24h", label: "24 hours" },
    { id: "7d", label: "7 days" },
    { id: "30d", label: "30 days" },
  ];

  return (
    <>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} maxWidth="990px">
        <Modal.Header title="Block IP Address" />

        <Modal.Body>
          <div className="flex flex-col gap-6">
            <InfoSection title="Prevent traffic from a suspicious IP by blocking it across selected enforcement points.">
              <InfoRow label="Blocked IP" value="185.221.45.19" />
              <InfoRow
                label="Current Risk Score"
                value={
                  <div className="flex items-center gap-3">
                    <p>89/100</p>
                    <p className="bg-error py-1 px-2 text-white text-xs rounded-lg">
                      Critical
                    </p>
                  </div>
                }
              />
              <InfoRow
                label="Detection"
                value="Suspicious brute-force attempt"
              />
              <InfoRow label="Incident ID" value="INC-2025-0831" />
              <InfoRow label="Geo" value="Russia" />
              <InfoRow label="Reputation" value="Known botnet" />
              <InfoRow label="Last Seen" value="12 mins ago" />
            </InfoSection>

            {/* Block Scope */}
            <div className="flex flex-col gap-2">
              <p className="text-text-primary text-[16px] font-medium">
                Block Scope
              </p>
              <div className="flex gap-6">
                <Checkbox label="Network Firewall" />
                <Checkbox label="Endpoint Agents" />
                <Checkbox label="Cloud WAF" />
                <Checkbox label="VPN / Gateway" />
              </div>
              <div className="flex items-center gap-2 text-warning mt-1">
                <SquaredInfoIcon />
                <p className="font-fira-code text-xs">
                  Choose where this IP should be blocked. Availability depends
                  on active integrations.
                </p>
              </div>
            </div>

            {/* Block Duration Section */}
            <div className="flex flex-col gap-3">
              <p className="text-text-primary text-base font-medium">
                Block Duration
              </p>
              <div className="flex justify-between items-center text-sm gap-3 pr-16">
                {durations.map((item) => (
                  <Radio
                    key={item.id}
                    id={item.id}
                    name="block-duration"
                    label={item.label}
                    checked={duration === item.id}
                    onChange={() => setDuration(item.id)}
                  />
                ))}
              </div>
            </div>

            {/* Enforcement Mode */}
            <div className="flex flex-col gap-3">
              <p className="text-text-primary text-[16px] font-medium">
                Enforcement Mode
              </p>
              <div className="flex gap-6">
                <Checkbox label="Drop traffic immediately" />
                <Checkbox label="Log attempts only" />
              </div>
            </div>

            {/*  Automation & Playbooks*/}
            <div className="flex flex-col gap-3">
              <p className="text-text-primary text-[16px] font-medium">
                Automation & Playbooks
              </p>
              <div className="flex gap-6">
                <Checkbox label="Notify SOC Channel (Slack)" />
                <Checkbox label="Enrich IP with Threat Intel" />
                <Checkbox label="Create Investigation Case" />
              </div>
              <div className="flex items-center gap-2 text-warning mt-1">
                <SquaredInfoIcon />
                <p className="font-fira-code text-xs">
                  Playbooks run automatically after the IP is blocked.
                </p>
              </div>
            </div>

            {/* Reason for Block*/}
            <div className="flex flex-col gap-3">
              <p className="text-text-primary text-[16px] font-medium">
                Reason for Block
              </p>

              <Input
                type="text"
                name=""
                placeholder="Blocked due to repeated failed admin login attempts…"
                className="w-full p-4 bg-surface border text-input-border border-border rounded-xl text-sm "
              />
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <div>
            <Button icon={<ShieldIcon className="w-6 h-6 text-white" />}>
              Block IP
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

export default BlockIpModal;
