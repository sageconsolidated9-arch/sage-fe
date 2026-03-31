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
      className={`bg-default py-4 px-5 rounded-t-sm border-b-4 ${borderColor}  w-[288px]`}
    >
      <p className="text-text-secondary text-base font-medium mb-2">{title}</p>
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

const StatusSummaryCard = () => {
  return (
    <div className="bg-default py-4 px-5 rounded-t-sm border-b-4 border-[#B08968] flex items-center gap-6 min-w-[500px]">
      {/* Title Section */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-1.5 text-text-secondary text-base font-medium">
          Alerts by Status <InfoCIcon className="text-info-hover" />
        </div>

        <div className="flex items-center gap-6">
          {/* In Progress */}
          <div className="flex items-center gap-2">
            <span className="text-[32px] font-semibold text-text-primary">
              77
            </span>
            <div className="flex items-center gap-1 text-text-secondary text-sm">
              <ProgressIcon className="text-text-secondary w-4 h-4 -rotate-180" />
              <span>In Progress</span>
            </div>
          </div>
          <div className="h-10 w-[1px] bg-gray-200" /> {/* Divider */}
          {/* Resolved */}
          <div className="flex items-center gap-2">
            <span className="text-[32px] font-semibold text-success">92</span>
            <div className="flex items-center gap-1 text-text-secondary text-sm">
              <ResolvedIcon className="text-success w-4 h-4 rotate-180" />
              <span>Resolved</span>
            </div>
          </div>
          <div className="h-10 w-[1px] bg-gray-200" /> {/* Divider */}
          {/* Avg Triage Time */}
          <div className="flex items-center gap-2">
            <span className="text-[32px] font-semibold text-primary-hover">
              2h 10m
            </span>
            <span className="text-text-secondary text-sm whitespace-nowrap">
              Avg. triage time
            </span>
          </div>
        </div>
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
        <StatusSummaryCard />
      </div>
    </div>
  );
};

export default IncidentStats;
