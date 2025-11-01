import React from "react";
import CountUp from "react-countup";
import type { LucideIcon } from "lucide-react";

export interface MetaData {
  label: string;
  icon: LucideIcon;
  value: string | number;
  isCurrency?: boolean;
  isPercentage?: boolean;
  duration?: number; // optional: custom animation duration
}

interface MetaCardProps {
  data: MetaData;
}

const MetaCard: React.FC<MetaCardProps> = ({ data }) => {
  const {
    label,
    icon: Icon,
    value,
    isCurrency,
    isPercentage,
    duration = 1.8,
  } = data;

  const isNumeric = typeof value === "number";

  return (
    <div className="p-3 md:p-5 bg-base-100 min-h-52 rounded-xl shadow-lg flex flex-col items-center justify-center text-center space-y-3 transition-transform hover:scale-105 hover:shadow-xl">
      <div className="p-3 bg-base-100 rounded-full flex items-center justify-center shadow-inner">
        <Icon className="w-8 h-8 text-primary" />
      </div>

      <p className="md:text-lg font-medium text-neutral">{label}</p>

      <p className="text-xl md:text-2xl font-semibold font-secondary text-neutral-content px-4 py-2 bg-base-300 rounded-xl">
        {isNumeric ? (
          <CountUp
            end={Number(value)}
            duration={duration}
            prefix={isCurrency ? "$" : ""}
            suffix={isPercentage ? "%" : ""}
            separator=","
            decimals={isPercentage && value % 1 !== 0 ? 1 : 0}
          />
        ) : (
          value
        )}
      </p>
    </div>
  );
};

export default MetaCard;
