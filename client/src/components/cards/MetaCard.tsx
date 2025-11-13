import React from "react";
import CountUp from "react-countup";
import type { LucideIcon } from "lucide-react";
import { ArrowUp, ArrowDown } from "lucide-react";

export interface MetaData {
  label: string;
  icon: LucideIcon;
  value: string | number;
  isCurrency?: boolean;
  isPercentage?: boolean;
  isGrowth?: boolean;
  duration?: number;
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
    isGrowth,
    duration = 1.8,
  } = data;

  const isNumeric = typeof value === "number";
  const numValue = isNumeric ? Number(value) : 0;

  // 🔼 Automatically determine direction
  const growthDirection =
    isGrowth && isNumeric
      ? numValue > 0
        ? "up"
        : numValue < 0
        ? "down"
        : "neutral"
      : null;

  // 🎨 Determine text color
  const textColor =
    isGrowth && growthDirection === "up"
      ? "text-success"
      : isGrowth && growthDirection === "down"
      ? "text-error"
      : "text-neutral-content";

  // 📈 Determine growth icon
  const GrowthIcon =
    growthDirection === "up"
      ? ArrowUp
      : growthDirection === "down"
      ? ArrowDown
      : null;

  return (
    <div className="p-3 md:p-5 bg-base-100 min-h-52 rounded-xl shadow-lg flex flex-col items-center justify-center text-center space-y-3 transition-transform hover:scale-105 hover:shadow-xl">
      <div className="p-3 bg-base-100 rounded-full flex items-center justify-center shadow-inner">
        <Icon className="w-8 h-8 text-primary" />
      </div>

      <p className="md:text-lg font-medium text-neutral">{label}</p>

      <div
        className={`text-xl md:text-2xl font-semibold font-secondary ${textColor} px-4 py-2 bg-base-300 rounded-xl flex items-center gap-2`}
      >
        {isNumeric ? (
          <>
            <CountUp
              end={Math.abs(numValue)} // Show absolute value for growth percentages
              duration={duration}
              prefix={isCurrency ? "$" : ""}
              suffix={isPercentage ? "%" : ""}
              separator=","
              decimals={isPercentage && numValue % 1 !== 0 ? 1 : 0}
            />
            {GrowthIcon && (
              <GrowthIcon
                className={`w-5 h-5 ${
                  growthDirection === "up" ? "text-success" : "text-error"
                }`}
              />
            )}
          </>
        ) : (
          value
        )}
      </div>
    </div>
  );
};

export default MetaCard;
