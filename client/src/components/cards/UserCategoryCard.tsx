import { StretchHorizontal } from "lucide-react";

function TransactionInfoCard() {
  return (
    <div className="p-5 bg-base-200 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-base-300/40">
      {/* Icon */}
      <div className="flex items-center justify-between">
        <div className="text-primary bg-base-100 p-3 rounded-xl shadow-inner">
          <StretchHorizontal size={28} />
        </div>
        <span className="text-xs text-gray-500 font-medium">#TXN-90321</span>
      </div>

      {/* Title + Description */}
      <div className="mt-5 space-y-2">
        <p className="text-xl font-semibold text-neutral-content tracking-wide">Internet Bill</p>
        <p className="text-sm text-gray-500 leading-relaxed font-secondary">
          Payment for monthly home Wi-Fi service, due on the 5th of each month.
        </p>
      </div>

      {/* Divider */}
      <div className="my-4 border-t border-base-300"></div>

      {/* Amount & Info */}
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-600 font-medium">Transaction Amount</p>
        <p className="text-lg font-semibold text-primary">${(878989).toLocaleString()}</p>
      </div>
    </div>
  );
}

export default TransactionInfoCard;
