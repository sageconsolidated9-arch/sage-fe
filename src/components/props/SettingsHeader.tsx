interface SettingsHeaderProps {
  title: string;
  desc?: string;
  rside?: React.ReactNode;
}
const SettingsHeader = ({ title, desc, rside }: SettingsHeaderProps) => {
  return (
    <div className="flex items-center justify-between gap-6 text-text-primary border-b border-border py-4">
      <div>
        <h2 className="text-xl font-bold">{title}</h2>
        {desc && <p className="text-xs">{desc}</p>}
      </div>
      {rside && <div className="">{rside}</div>}
    </div>
  );
};

export default SettingsHeader;
