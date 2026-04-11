import React, { useState } from "react";
import CustomParsers from "../logs-dataComponents/CustomParsers";
import ParsersTableTabs from "../logs-dataComponents/ParsersTableTabs";

const ParserTransformationPage = () => {
  const [activeTab, setActiveTab] = useState("parsers");
  return (
    <div className=" bg-default py-[27px] px-[30px] rounded-[18px] relative ">
      <CustomParsers activeTab={activeTab} />
      <ParsersTableTabs activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default ParserTransformationPage;
