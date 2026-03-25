import { Info } from "lucide-react";
import { TrendingDown, TrendingUp } from "lucide-react"; // Or use your custom icons
import { InfoCIcon, ProgressIcon, ResolvedIcon } from "../../../utils/icons";

interface StatCardProps {
  title: string;
  count: number;
  change: string;
  colorClass: string;
  borderColor: string;
}

const StatCard = ({
  title,
  count,
  change,
  colorClass,
  borderColor,
}: StatCardProps) => {
  const isNegative = change.startsWith("-");

  return (
    <div
      className={`bg-default py-4 px-5 rounded-t-sm border-b-4 ${borderColor}  min-w-[280px]`}
    >
      <p className="text-text-secondary text-base font-medium mb-4">{title}</p>
      <div className="flex items-center gap-1">
        <span
          className={`text-[32px] font-semibold leading-10 tracking-[-0.5%] ${colorClass}`}
        >
          {count}
        </span>
        <span
          className={`text-xs font-bold ${isNegative ? "text-success" : "text-primary-hover"}`}
        >
          {change}{" "}
          <span className="text-text-primary text-xs font-normal">
            From last 24hr
          </span>
        </span>
      </div>
    </div>
  );
};

const IncidentStats = ({ activeTab }: { activeTab: string }) => {
  const isInProgress = activeTab === "inprogress";

  return (
    <div className="flex flex-col gap-4 bg-surface py-[27px] px-[30px] rounded-[18px]  relative ">
      {/* Breadcrumb style text */}
      <div className="text-text-muted text-base">
        Incidents & Alerts / <span className="text-text-primary">Queue</span>
      </div>

      <div className="flex flex-wrap gap-4">
        {/* Severity Cards */}
        <StatCard
          title="Critical Incidents & Alerts"
          count={12}
          change="+32"
          colorClass="text-primary-hover"
          borderColor="border-primary-hover"
        />

        {/* Only show High in 'In Progress' tab per your images */}
        {isInProgress && (
          <StatCard
            title="High Incidents & Alerts"
            count={8}
            change="+12"
            colorClass="text-error"
            borderColor="border-error"
          />
        )}

        <StatCard
          title="Medium Incidents & Alerts"
          count={65}
          change="-3"
          colorClass="text-warning"
          borderColor="border-warning"
        />

        <StatCard
          title="Low Incidents & Alerts"
          count={10}
          change="+16"
          colorClass="text-info"
          borderColor="border-info"
        />

        {/* Status Summary Card */}
        <div className="bg-default p-5 rounded-t-sm border-b-4 border-text-muted flex-[1.5] min-w-[300px] flex flex-col justify-between">
          <div className="flex items-center gap-1 mb-4">
            <p className="text-text-secondary text-base leading-6 font-medium">
              Alerts by Status
            </p>
            <InfoCIcon />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center border-r pr-4">
              <span className="text-text-secondary font-semibold text-[32px] leading-10 tracking-[-0.5%]">
                77
              </span>
              <div className="flex items-center">
                <ProgressIcon className="text-text-secondary w-4 h-4" />
                <span className="text-text-primary text-xs font-normal">
                  In Progress
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 border-r px-4">
              <span className="text-success font-semibold text-[32px] leading-10 tracking-[-0.5%]">
                92
              </span>
              <div className="flex items-center ">
                <ResolvedIcon className="text-success w-4 h-4" />
                <span className="text-text-primary text-xs">Resolved</span>
              </div>
            </div>

            <div className="pl-4">
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-orange-600">
                  2h 10m
                </span>
                <span className="text-[10px] text-gray-500 whitespace-nowrap">
                  Avg. triage time
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncidentStats;
