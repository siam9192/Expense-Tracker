import { StretchHorizontal } from "lucide-react";
import type { Category } from "../../types/category.type";
import { CategoryType } from "../../types/category.type";
import { useUserCurrency } from "../../Provider/CurrentUserProvider";

interface Props {
  category: Category;
}

function CategoryCard({ category }: Props) {
  const currency = useUserCurrency();
  const getBadgeStyle = () => {
    switch (category.type) {
      case CategoryType.INCOME:
        return "bg-success/20 text-success"; // green
      case CategoryType.EXPENSE:
        return "bg-error/20 text-error"; // red
      case CategoryType.SAVING:
        return "bg-primary/20 text-primary"; // blue/purple
      default:
        return "bg-base-300 text-neutral";
    }
  };

  return (
    <div className="p-6 bg-base-100 rounded-2xl border border-base-300 shadow-sm hover:shadow-md hover:border-primary/40 transition-all duration-300 relative">
      {/* Top Section */}
      <div className="flex items-start justify-between mb-4">
        {/* Icon */}
        <div className="p-3 rounded-xl bg-primary/10 text-primary shadow-inner">
          <StretchHorizontal size={30} />
        </div>

        {/* Type Badge */}
        <span
          className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize ${getBadgeStyle()}`}
        >
          {category.type.toLowerCase()}
        </span>
      </div>

      {/* Title */}
      <h2 className="text-xl font-semibold text-neutral mb-2 tracking-wide">{category.name}</h2>

      {/* Description */}
      <p className="text-sm leading-relaxed text-gray-500 line-clamp-3">
        {category.description || "No description available."}
      </p>

      {/* Divider */}
      <div className="my-5 border-t border-base-300"></div>

      {/* Amount Section */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600 font-medium">Transaction Amount</p>
        <p className="text-xl font-bold text-primary">
          {currency?.symbol}
          {category.transaction_amount.toLocaleString()}
        </p>
      </div>
    </div>
  );
}

export default CategoryCard;
