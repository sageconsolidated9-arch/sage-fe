import { useState } from "react";
import { RoundXIcon, ShieldIcon } from "../../../utils/icons";
import { SeverityIndicator } from "../../../utils/incident";
import Button from "../../props/Button";
import Checkbox from "../../props/Checkbox";
import ContainmentOptionCard from "../../props/ContainmentOptionCard";
import { InfoRow, InfoSection } from "../../props/InfoSection";
import Modal from "../../props/Modal";

interface ContainAssetsModalProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const ContainAssetsModal = ({ isOpen, setIsOpen }: ContainAssetsModalProps) => {
  const [selectedOption, setSelectedOption] = useState("network_isolation");
  const CONTAINMENT_OPTIONS = [
    {
      id: "network_isolation",
      title: "Network Isolation",
      recommended: true,
      descriptions: [
        "Disconnect asset from all network",
        "Only SOC/IP allowed for investigation",
      ],
    },
    {
      id: "kill_processes",
      title: "Kill Suspicious Processes Only",
      descriptions: [
        "Stops malicious processes",
        "Keeps normal operations alive",
      ],
    },
    {
      id: "block_external",
      title: "Block External Communications",
      descriptions: [
        "Blocks outbound IPs, domains, and ports",
        "Asset remains internally reachable",
      ],
    },
    {
      id: "quarantine_edr",
      title: "Quarantine via EDR",
      descriptions: [
        "Move asset to EDR's restricted network",
        "Full monitoring and restricted privileges",
      ],
    },
  ];
  return (
    <>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} maxWidth="990px">
        <Modal.Header title="Contain Asset – finance-vm" />

        <Modal.Body>
          <>
            {/* Asset Overview Section */}
            <InfoSection title="Asset Overview">
              <InfoRow label="Asset Name" value="finance-vm" />
              <InfoRow label="Type" value="Virtual Machine" />
              <InfoRow label="IP Address" value="192.172.1.2" />
              <InfoRow label="Owner" value="Finance Team" />
              <InfoRow
                label="Current Status"
                value={
                  <div className="bg-success py-1 px-2 text-white text-xs rounded-[8px]">
                    Active
                  </div>
                }
              />
              <InfoRow label="Last Seen" value="2 mins ago" />
            </InfoSection>

            {/* Incident Context Section */}
            <InfoSection title="Incident Context">
              <InfoRow label="Triggered By" value="Malicious Macro Doc" />
              <InfoRow
                label="Severity"
                value={<SeverityIndicator level={2} />}
              />
              <InfoRow label="Detection Source" value="IDS Alert" />
              <InfoRow label="Time Detected" value="14 minutes ago" />
            </InfoSection>
          </>

          {/* Containment Options */}
          <>
            <div className="mt-6 mb-8">
              <p className="text-text-primary pb-3 text-[16px] font-medium">
                Containment Options
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {CONTAINMENT_OPTIONS.map((opt) => (
                  <ContainmentOptionCard
                    key={opt.id}
                    option={opt}
                    isSelected={selectedOption === opt.id}
                    onSelect={setSelectedOption}
                  />
                ))}
              </div>
            </div>
          </>

          {/* Optional Additional Actions */}
          <>
            <div className="gap-2 flex flex-col">
              <p className="text-text-primary pb-1.5 text-[16px] font-normal">
                Optional Additional Actions
              </p>
              <Checkbox label="Notify asset owner" />
              <Checkbox label="Trigger automatic forensics snapshot" />
              <Checkbox label="Flag asset for re-image after investigation" />
              <Checkbox label="Require admin approval before uncontainment" />
            </div>
          </>
        </Modal.Body>

        <Modal.Footer>
          <div>
            <Button icon={<ShieldIcon className="w-6 h-6 text-white" />}>
              Save Changes
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

export default ContainAssetsModal;
