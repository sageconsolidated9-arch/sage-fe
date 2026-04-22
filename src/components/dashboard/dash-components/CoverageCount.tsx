import type { ReactNode } from "react";

interface CoverageProps {
  textColor: string;
  borderColor: string;
  text: string;
  children: ReactNode;
}

const CoverageCount = ({
  textColor,
  borderColor,
  text,
  children,
}: CoverageProps) => {
  return (
    <div className={`border-l-5 ${borderColor} w-fit px-4`}>
      <p className="text-[20px] text-text-primary">{text}</p>

      <p
        className={`${textColor} font-bold text-[40px] leading-10 tracking-[-0.5%] mt-2`}
      >
        {children}
      </p>
    </div>
  );
};

export default CoverageCount;
