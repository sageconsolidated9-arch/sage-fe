import React, { useState } from "react";
import Modal from "../../props/Modal";
import {
  RoundXIcon,
  ShieldIcon,
  SquaredInfoIcon,
} from "../../../utils/icons";
import Button from "../../props/Button";
import { InfoRow, InfoSection } from "../../props/InfoSection";
import Radio from "../../props/Radio";
import Checkbox from "../../props/Checkbox";
import Input from "../../props/Input";

interface DisableAccountModalProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const DisableAccountModal = ({
  isOpen,
  setIsOpen,
}: DisableAccountModalProps) => {
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
        <Modal.Header title="Disable User Account" />

        <Modal.Body>
          <>
            <div className="flex flex-col gap-6">
              {/* Incident Overview */}
              <InfoSection title="Immediately prevent this user from signing in while preserving account data and activity history.">
                <InfoRow label="Name" value="John Okafor" />
                <InfoRow label="Email" value="john.okafor@company.com" />
                <InfoRow label="Role" value="Finance Admin" />
                <InfoRow
                  label="Status"
                  value={
                    <div className="bg-success py-1 px-2 text-white text-xs rounded-lg">
                      Active
                    </div>
                  }
                />
                <InfoRow
                  label="Risk Signals"
                  value={
                    <div className="flex items-center gap-2.5">
                      <div className="bg-[#FA4F1933] py-1 px-2 text-primary text-xs rounded-lg">
                        Quarantine Device
                      </div>
                      <div className="bg-[#4A3F3C14] py-1 px-2 text-text-secondary text-xs rounded-lg">
                        Unusual Location
                      </div>
                    </div>
                  }
                />
                <InfoRow label="Triggered from Incident" value="INC-4892" />
                <InfoRow label="Detection" value="Endpoint Infection" />
              </InfoSection>

              {/* Disable DurationSection */}
              <div className="flex flex-col gap-3">
                <p className="text-text-primary text-base font-medium">
                  Disable Duration
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
                <div className="flex items-center gap-2 text-warning mt-1">
                  <SquaredInfoIcon />
                  <p className="font-fira-code text-xs">
                    For temporary disables, the account will be automatically
                    re-enabled after the selected duration. Permanent disables
                    require admin approval to restore.
                  </p>
                </div>
              </div>

              {/* Enforcement Targets */}
              <div className="flex flex-col gap-2">
                <p className="text-text-primary text-[16px] font-medium">
                  Enforcement Targets
                </p>
                <div className="flex gap-6">
                  <Checkbox label="Identity Provider (Azure AD / Okta)" />
                  <Checkbox label="VPN Access" />
                  <Checkbox label="Cloud Apps" />
                  <Checkbox label="Email Access" />
                </div>
                <div className="flex items-center gap-2 text-warning mt-1">
                  <SquaredInfoIcon />
                  <p className="font-fira-code text-xs">
                    Availability depends on connected identity integrations.
                  </p>
                </div>
              </div>

              {/* Additional Actions */}
              <div className="flex flex-col gap-3">
                <p className="text-text-primary text-[16px] font-medium">
                  Additional Actions
                </p>
                <div className="flex gap-6">
                  <Checkbox label="Force password reset" />
                  <Checkbox label="Revoke active sessions" />
                  <Checkbox label="Notify HR / Security" />
                  <Checkbox label="Open investigation case" />
                </div>
              </div>

              {/* Reason for Disable*/}
              <div className="flex flex-col gap-3">
                <p className="text-text-primary text-[16px] font-medium">
                  Reason for Disable
                </p>

                <Input
                  type="text"
                  name=""
                  placeholder="Account disabled due to suspected credential compromise…"
                  className="w-full p-4 bg-surface border text-input-border border-border rounded-xl text-sm "
                />
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

export default DisableAccountModal;
