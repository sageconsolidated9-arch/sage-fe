import React from "react";
import PlayBookTableTabs from "../automation-components/PlayBookTableTabs";
import AllPlayBooks from "../automation-components/AllPlayBooks";

const PlayBooksPage = () => {
  const [activeTab, setActiveTab] = React.useState("my-playbook");
  return (
    <div className="flex flex-col gap-6 ">
      <AllPlayBooks />
      <PlayBookTableTabs activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default PlayBooksPage;
