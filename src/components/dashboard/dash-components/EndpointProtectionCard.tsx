import React from "react";
import Card from "../../props/Card";
import { getImageSrc } from "../../../utils/imageUtils";
import { TrendIcon } from "../../../utils/icons";
import { Link } from "react-router-dom";
import CoverageCount from "./CoverageCount";

const EndpointProtectionCard = () => {
  return (
    <>
      <Card className="flex flex-col gap-y-6">
        <Card.Header>
          <div className="flex items-center gap-1.5">
            <div>
              <img src={getImageSrc("sh.svg")} alt="shield image" />
            </div>
            <p className="text-[#030001] text-[20px]">
              Endpoint Protection Coverage
            </p>
          </div>

          <div className="flex items-center gap-1 bg-success text-white text-xs py-1 px-2 rounded-sm font-semibold">
            <TrendIcon />
            <p>77%</p>
          </div>
        </Card.Header>

        <Card.Body>
          <p className="text-sm">
            Unprotected assets are more likely to be compromised. Recommended
            coverage target is 95%+.
          </p>

          <div className="mt-7 flex flex-wrap">
            <CoverageCount
              text="Protected"
              textColor="text-success"
              borderColor="border-success"
            >
              1,110
            </CoverageCount>

            <CoverageCount
              text="Unprotected"
              textColor="text-warning"
              borderColor="border-warning"
            >
              24
            </CoverageCount>
          </div>
        </Card.Body>

        <Card.Footer>
          <Link to={""} className="text-sm underline text-text-secondary">
            View Asset Coverage
          </Link>
        </Card.Footer>
      </Card>
    </>
  );
};

export default EndpointProtectionCard;
