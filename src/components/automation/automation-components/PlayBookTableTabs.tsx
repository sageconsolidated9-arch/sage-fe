import React from "react";
import Tabs from "../../props/Tabs";
import {
  ChevronLeft1Icon,
  ChevronRight1Icon,
  CloneIcon,
  DeleteIcon,
  DisableIcon,
  EditIcon,
  RunIcon,
} from "../../../utils/icons";
import MyPlayBookTable from "./MyPlayBookTable";

import AiRecommended from "./AiRecommended";
import { useNavigate } from "react-router-dom";

interface PlayBookTableTabsProps {
  activeTab: string;
  setActiveTab: (id: string) => void;
}

const PlayBookTableTabs = ({
  activeTab,
  setActiveTab,
}: PlayBookTableTabsProps) => {
  const navigate = useNavigate();

  const tabs = [
    { id: "my-playbook", label: "My Playbook" },
    { id: "ai-recommended", label: "AI Recommended" },
  ];

  const handleEditClick = () => {
    navigate("/automation/playbook-editor");
  };

  return (
    <div className="bg-surface py-[27px] px-[30px] rounded-[18px] shadow-card relative ">
      <div className="flex justify-between gap-6 flex-wrap items-start mb-6">
        <div className="flex items-start gap-5">
          <Tabs
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            variant="underline"
            className="p-2"
          />

          {/* Conditional Toolbar Section */}
          <div className="text-sm gap-6 flex items-center font-normal">
            {activeTab === "my-playbook" ? (
              <>
                {[
                  { Icon: RunIcon, label: "Run Now" },
                  { Icon: EditIcon, label: "Edit", onClick: handleEditClick },
                  { Icon: CloneIcon, label: "Clone" },
                  { Icon: DisableIcon, label: "Disable" },
                ].map(({ Icon, label, onClick }) => (
                  <div
                    key={label}
                    className={`flex items-center gap-1 ${onClick ? "cursor-pointer hover:opacity-80" : ""}`}
                    onClick={onClick}
                  >
                    <Icon className="text-primary-hover" />
                    <p>{label}</p>
                  </div>
                ))}
              </>
            ) : (
              <>
                {[
                  {
                    Icon: EditIcon,
                    label: "Use Template",
                    onClick: "",
                  },
                  { Icon: DeleteIcon, label: "Delete" },
                ].map(({ Icon, label, onClick }) => (
                  <div
                    key={label}
                    className={`flex items-center gap-1 ${onClick ? "cursor-pointer hover:opacity-80" : ""}`}
                  >
                    <Icon className="text-primary-hover" />
                    <p>{label}</p>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 text-input-border">
            <ChevronLeft1Icon />
            <ChevronRight1Icon />
          </div>
          <div>
            <p>Showing 1-4 of 1</p>
          </div>
        </div>
      </div>

      <div className="mt-4">
        {activeTab === "my-playbook" ? (
          <div className="h-[50vh]">
            <MyPlayBookTable />
          </div>
        ) : (
          <div className="h-fit">
            <AiRecommended />
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayBookTableTabs;
