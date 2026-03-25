import React from "react";
import Modal from "../../props/Modal";
import {
  AiChatIcon,
  CircleFilledCheckIcon,
  RoundXIcon,
  ShieldIcon,
  SquaredInfoIcon,
} from "../../../utils/icons";
import Button from "../../props/Button";
import { InfoRow, InfoSection } from "../../props/InfoSection";

interface RecommendContainAssetsModalProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const RecommendContainAssetsModal = ({
  isOpen,
  setIsOpen,
}: RecommendContainAssetsModalProps) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} maxWidth="990px">
        <Modal.Header title="Contain Asset" />
        <Modal.Body>
          <>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-warning mt-1 bg-default">
                <SquaredInfoIcon />
                <p className="font-fira-code text-xs">
                  This action will immediately isolate the affected asset from
                  the network.
                </p>
              </div>

              {/*  */}
              <div>
                <InfoRow
                  label="Asset Name"
                  value={
                    <div className="bg-text-muted text-default rounded-lg px-2 py-1 text-xs">
                      <p>finance-vm</p>
                    </div>
                  }
                />
                <InfoRow label="Asset Type:" value="Database Server" />
                <InfoRow label="IP Address" value="10.22.12.9" />
                <InfoRow label="Location" value="London Data Center" />
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
              </div>

              {/* Timeline of Events */}
              <>
                <div className="flex flex-col gap-2 pb-4">
                  <div className="flex flex-col gap-0.5 bg-toast text-text-primary border border-input-border rounded-xl p-3  tracking-[2%] leading-[29px] ">
                    <div className=" text-base font-bold ">
                      <p>Feed Summary:</p>
                    </div>
                    <ul className="list-disc pl-8">
                      <li>Type: Open Source</li>
                      <li>Integration Method: API Key Authentication</li>
                      <li>Sync Frequency: Every 5 minutes</li>
                      <li>Indicators Ingested (24h): 42,318</li>
                      <li>Total Indicators: 1,254,873</li>
                    </ul>
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
                    <CircleFilledCheckIcon className="w-6 h-6 text-success" />
                    <p>Trigger automatic forensics snapshot</p>
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <CircleFilledCheckIcon className="w-6 h-6 text-success" />
                    <p>Auto-Quarantine applied</p>
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <CircleFilledCheckIcon className="w-6 h-6 text-success" />
                    <p>Malicious process terminated</p>
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <CircleFilledCheckIcon className="w-6 h-6 text-success" />
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
            </div>
          </>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default RecommendContainAssetsModal;
