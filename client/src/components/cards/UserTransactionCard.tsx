import { ArrowDownCircle, ArrowUpCircle, FileText, PiggyBank, Wallet } from "lucide-react";

import { TransactionType } from "../../types/transaction.type";
import type { Transaction } from "../../types/transaction.type";
import { useUserCurrency } from "../../Provider/CurrentUserProvider";

interface Props {
  transaction: Transaction;
}

// Icon for each transaction type
const IconMap = {
  [TransactionType.INCOME]: ArrowUpCircle,
  [TransactionType.EXPENSE]: ArrowDownCircle,
  [TransactionType.GOAL_DEPOSIT]: PiggyBank,
  [TransactionType.GOAL_WITHDRAW]: Wallet,
};

// Color for each type
const ColorMap = {
  [TransactionType.INCOME]: "text-success", // green
  [TransactionType.EXPENSE]: "text-error", // red
  [TransactionType.GOAL_DEPOSIT]: "text-primary", // blue (saving)
  [TransactionType.GOAL_WITHDRAW]: "text-warning", // yellow/orange
};

function UserTransactionCard({ transaction }: Props) {
  const currency = useUserCurrency();

  const Icon = IconMap[transaction.type];
  const colorClass = ColorMap[transaction.type];

  // Amount sign
  const signMap = {
    [TransactionType.INCOME]: "+",
    [TransactionType.EXPENSE]: "-",
    [TransactionType.GOAL_DEPOSIT]: "+", // money going into goal
    [TransactionType.GOAL_WITHDRAW]: "-", // money taken out of goal
  };

  const sign = signMap[transaction.type];

  return (
    <div className="p-4 bg-base-100 rounded-xl hover:shadow-md transition-all duration-300">
      <div className=" flex flex-col md:flex-row md:items-center justify-between">
        {/* Left: Icon + Info */}
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          {/* Icon */}
          <div className={`p-3 rounded-lg size-fit ${colorClass}`}>
            <Icon size={24} />
          </div>

          {/* Category + Note */}
          <div>
            <p className="text-base font-semibold capitalize">
              {transaction.category?.name || "Unknown"}
            </p>

            {transaction.note && (
              <p className="text-sm text-gray-500 flex items-center gap-1">
                <FileText size={14} /> {transaction.note}
              </p>
            )}
          </div>
        </div>

        {/* Right: Amount */}
        <div className="text-right">
          <p className={`text-lg font-bold ${colorClass}`}>
            {sign} {transaction.amount.toLocaleString()} {transaction.currency.code}
          </p>

          {/* Converted currency */}
          {transaction.conversion_rate && transaction.base_currency && (
            <p className="text-xs text-gray-500">
              ≈ {(transaction.amount * transaction.conversion_rate).toLocaleString()}{" "}
              {transaction.base_currency.code}
            </p>
          )}

          {/* Date */}
          <p className="text-xs text-gray-500 mt-1 text-end">
            {new Date(transaction.date).toDateString()},{" "}
            {new Date(transaction.date).toLocaleTimeString()}
          </p>
        </div>
      </div>
      <div className=" mt-4 text-center">
        <button className="btn  min-w-full md:min-w-48">View Details</button>
      </div>
    </div>
  );
}

export default UserTransactionCard;
