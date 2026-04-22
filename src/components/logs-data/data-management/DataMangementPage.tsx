import React, { useState } from "react";
import DataMangementHeader from "../logs-dataComponents/DataManagementComponents/DataMangementHeader";
import DataManagementTableTabs from "../logs-dataComponents/DataManagementComponents/DataManagementTableTabs";

const DataMangementPage = () => {
  const [activeTab, setActiveTab] = useState("data");
  return (
    <div className=" bg-default py-[27px] px-[30px] rounded-[18px] relative ">
      <DataMangementHeader activeTab={activeTab} />
      <DataManagementTableTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </div>
  );
};

export default DataMangementPage;
