import React from "react";
import AiRecommendCard from "./AiRecommendCard";
import { AiChatIcon } from "../../../utils/icons";

const AiRecommended = () => {
  const playbooks = [
    {
      title: "Auto-Isolate Endpoint",
      description:
        "Automatically quarantine an endpoint when malware or suspicious activity is detected.",
      icon: <AiChatIcon />,
      actions: ["Isolate device", "Notify SOC", "Log to audit trail"],
      triggers: ["Malware alert", "Suspicious process"],
      buttonText: "Use Template",
    },
    {
      title: "Block Malicious IP",
      description:
        "Block external IPs with repeated failed login attempts or flagged in threat intel feeds.",
      icon: <AiChatIcon />,
      actions: ["Add IP to firewall blocklist", "Alert admin"],
      triggers: ["Multiple failed logins", "IoC feed match"],
      buttonText: "Deploy Playbook",
    },
    {
      title: "Reset Compromised Account",
      description:
        "Force password reset and notify user when suspicious account activity is detected.",
      icon: <AiChatIcon />,
      actions: [
        "Force password reset · Send notification · Create incident log",
      ],
      triggers: ["Unusual login patterns", "Multiple geo logins"],
      buttonText: "Add to Library",
    },
    {
      title: "Quarantine Suspicious Email",
      description:
        "Automatically move suspected phishing emails to quarantine and alert the target user.",
      icon: <AiChatIcon />,
      actions: ["Quarantine email · Notify user · Log event"],
      triggers: ["Phishing rule", "Suspicious attachment detected"],
      buttonText: "Enable",
    },
    {
      title: "Data Exfiltration Containment",
      description:
        "Block outbound connections and disable accounts when large data transfers are detected.",
      icon: <AiChatIcon />,
      actions: ["Block outbound domain/IP · Disable account · Notify SOC"],
      triggers: ["Unusual outbound traffic", "Data threshold exceeded"],
      buttonText: "Template",
    },
  ];
  return (
    <div>
      <div className="grid grid-cols-3 gap-4  ">
        {playbooks.map((pb, index) => (
          <AiRecommendCard
            key={index}
            {...pb}
            onCheckChange={(val) => console.log(`${pb.title} is now ${val}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default AiRecommended;
