import React from "react";
import EntityProfilesHeader from "../threat-Intelligence-component/entityProfile-Component/EntityProfilesHeader";
import EntityProfileList from "../threat-Intelligence-component/entityProfile-Component/EntityProfileList";
import EntityCoverageCount from "../threat-Intelligence-component/entityProfile-Component/EntityCoverageCount";

const EntityProfilesPage = () => {
  return (
    <div className="flex flex-col gap-6">
      <EntityProfilesHeader />
      <EntityCoverageCount />
      <EntityProfileList />
    </div>
  );
};

export default EntityProfilesPage;
