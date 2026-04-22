export interface DataNormalization {
  id: string;
  RawField: string;
  NormalizedField: string;
  DataSource: string;
  Confidence: string;
  Actions?: string;
  status?: "Mapped" | "Unmapped";
}

export const mockDataNormalization: DataNormalization[] = [
  {
    id: "1",
    RawField: "src_ip",
    NormalizedField: "source.ip",
    DataSource: "Palo Alto",
    Confidence: "97%",
    Actions: "View",
    status: "Mapped",
  },
  {
    id: "2",
    RawField: "requestId",
    NormalizedField: "cloud.request.id",
    DataSource: "AWS CloudTrail",
    Confidence: "99%",
    Actions: "Edit",
    status: "Mapped",
  },
  {
    id: "3",
    RawField: "from_addr",
    NormalizedField: "_",
    DataSource: "Proofpoint",
    Confidence: "100%",
    Actions: "Fix",
    status: "Unmapped",
  },
];

export const StatusBadge = ({
  status,
}: {
  status: DataNormalization["status"];
}) => {
  const styles: Record<string, string> = {
    Mapped: "bg-success text-default",
    Unmapped: "bg-error text-default",
  };

  return (
    <span className={`px-2 py-1 rounded-lg text-xs ${styles[status || "New"]}`}>
      {status}
    </span>
  );
};
