export interface FieldMapping {
  id: string;
  RawField: string;
  Normalized: string;
  Statuss?: "Success" | "Unmapped";
  Action?: string;
}

export const mockFieldMapping: FieldMapping[] = [
  {
    id: "1",
    RawField: "src_ip",
    Normalized: "source.ip",
    Statuss: "Success",
    Action: "-",
  },
  {
    id: "2",
    RawField: "dst_ip",
    Normalized: "destination.ip",
    Statuss: "Success",
    Action: "-",
  },
  {
    id: "3",
    RawField: "mac",
    Normalized: "--",
    Statuss: "Unmapped",
    Action: "Map Field",
  },
];

export const StatusBadges = ({
  Statuss,
}: {
  Statuss: FieldMapping["Statuss"];
}) => {
  const styles: Record<string, string> = {
    Success: "bg-success text-default",
    Unmapped: "bg-error text-surface",
  };

  return (
    <span
      className={`px-2 py-1 rounded-lg text-xs ${styles[Statuss || "New"]}`}
    >
      {Statuss}
    </span>
  );
};
