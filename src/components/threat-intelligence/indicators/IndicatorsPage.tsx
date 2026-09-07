import React from "react";
import IndicatorCoverage from "../threat-Intelligence-component/indicator-Component/IndicatorCoverage";
import IndicatorHeaderr from "../threat-Intelligence-component/indicator-Component/IndicatorHeaderr";
import IndicatorIocView from "../threat-Intelligence-component/indicator-Component/IndicatorIocView";

const IndicatorsPage = () => {
  return (
    <div className="flex flex-col gap-6">
      <IndicatorHeaderr />
      <IndicatorCoverage />
      <IndicatorIocView />
    </div>
  );
};

export default IndicatorsPage;
