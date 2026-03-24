interface InfoSectionProps {
  title: string;
  children: React.ReactNode;
}

export const InfoSection = ({ title, children }: InfoSectionProps) => (
  <div className="flex flex-col">
    <h3 className="text-text-primary">{title}</h3>
    <div className="flex flex-col gap-y-2">{children}</div>
  </div>
);

export const InfoRow = ({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) => (
  <div className="flex justify-between items-center group">
    <span className="text-text-secondary text-xs font-normal">{label}:</span>
    <span className="text-text-secondary text-xs">{value}</span>
  </div>
);
