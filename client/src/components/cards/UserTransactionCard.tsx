import { ArrowDownCircle, ArrowUpCircle, Calendar, FileText } from "lucide-react";

// 💡 Demo data
const demoTransaction = {
  id: "txn_001",
  user_id: "usr_123",
  category_id: "freelance_income",
  amount: 1200,
  currency: "USD",
  converted_currency: "BDT",
  conversion_rate: 118.5,
  type: "income",
  note: "Client payment for web project",
  date: "2025-10-25T00:00:00Z",
  created_at: "2025-10-25T00:00:00Z",
  updated_at: "2025-10-25T00:00:00Z",
};

function UserTransactionCard() {
  const transaction = demoTransaction;
  const isIncome = transaction.type === "income";
  const Icon = isIncome ? ArrowUpCircle : ArrowDownCircle;

  return (
    <div className="p-4 bg-base-100 rounded-xl  hover:shadow-md transition-all duration-300 flex flex-col md:flex-row  md:items-center justify-between">
      {/* Left: Icon + Info */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
        <div
          className={`p-3 rounded-lg  bg-base-100 size-fit ${
            isIncome ? " text-success" : " text-red-600"
          }`}
        >
          <Icon size={24} />
        </div>

        <div>
          <p className="text-base font-semibold  capitalize">
            {transaction.category_id.replaceAll("_", " ")}
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
        <p className={`text-lg font-bold ${isIncome ? "text-success" : "text-error"}`}>
          {isIncome ? "+" : "-"} {transaction.amount.toLocaleString()} {transaction.currency}
        </p>

        {transaction.converted_currency && transaction.conversion_rate && (
          <p className="text-xs text-gray-500">
            ≈ {(transaction.amount * transaction.conversion_rate).toLocaleString()}{" "}
            {transaction.converted_currency}
          </p>
        )}
        <p className="text-xs text-gray-500  mt-1 text-end">
          {new Date(transaction.date).toDateString()},
          {new Date(transaction.date).toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
}
export default UserTransactionCard;
