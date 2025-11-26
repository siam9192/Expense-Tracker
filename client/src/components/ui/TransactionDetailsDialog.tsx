import { X, ArrowDownCircle, ArrowUpCircle, Wallet } from "lucide-react";
import { Fragment, useEffect } from "react";
import { useGetUserTransactionByIdQuery } from "../../redux/api/transaction.api";

interface Props {
  onClose?(): void;
  id: number;
}

function TransactionDetailsDialog({ onClose, id }: Props) {
  const modal_id = "transaction_details_dialog";

  const open = () => {
    (document?.getElementById(modal_id) as any)?.showModal();
  };

  const close = () => {
    (document?.getElementById(modal_id) as any)?.close();
    onClose && onClose();
  };

  useEffect(() => {
    open();
  }, []);

  const { data, isLoading } = useGetUserTransactionByIdQuery(id);
  const t = data?.data;

  const getTypeBadge = (type?: string) => {
    switch (type) {
      case "INCOME":
        return (
          <span className="badge badge-success gap-1">
            <ArrowUpCircle size={14} />
            Income
          </span>
        );
      case "EXPENSE":
        return (
          <span className="badge badge-error gap-1">
            <ArrowDownCircle size={14} />
            Expense
          </span>
        );
      case "GOAL_DEPOSIT":
        return (
          <span className="badge badge-info gap-1">
            <Wallet size={14} />
            Goal Deposit
          </span>
        );
      case "GOAL_WITHDRAW":
        return (
          <span className="badge badge-warning gap-1">
            <Wallet size={14} />
            Goal Withdraw
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <Fragment>
      <dialog id={modal_id} className="modal">
        <div className="modal-box w-[90%] max-w-md relative p-6 space-y-4">
          {/* Close Icon */}
          <button
            onClick={close}
            className="bg-base-300 hover:bg-base-200 absolute top-2 right-2 p-2 rounded-xl"
          >
            <X size={18} />
          </button>

          <h3 className="text-xl font-bold mb-3">Transaction Details</h3>

          {isLoading ? (
            <div className="flex justify-center py-6">
              <span className="loading loading-spinner loading-md"></span>
            </div>
          ) : t ? (
            <div className="text-left space-y-4">
              {/* Title */}
              <div>
                {getTypeBadge(t.type)}
                <p className="mt-2 text-lg font-semibold">{t.title}</p>
              </div>

              {/* Amount */}
              <div className="p-4 bg-base-200 rounded-xl">
                <p className="text-sm opacity-70">Amount</p>
                <p className="text-2xl font-bold">
                  {t.currency?.symbol}
                  {t.amount.toFixed(2)}
                </p>

                {t.base_currency && (
                  <p className="text-xs mt-1 opacity-70">
                    Converted: {t.base_currency?.symbol}
                    {t.conversion_amount?.toFixed(2)} (rate: {t.conversion_rate})
                  </p>
                )}
              </div>

              {/* Category */}
              <div className="flex justify-between">
                <p className="opacity-70">Category</p>
                <p className="font-medium">{t.category?.name}</p>
              </div>

              {/* Date */}
              <div className="flex justify-between">
                <p className="opacity-70">Date</p>
                <p className="font-medium">{new Date(t.date).toLocaleString()}</p>
              </div>

              {/* Notes */}
              {t.note && (
                <div>
                  <p className="opacity-70 mb-1">Note</p>
                  <div className="p-3 rounded-lg bg-base-200 text-sm">{t.note}</div>
                </div>
              )}
            </div>
          ) : (
            <p className="text-center text-error">Transaction not found.</p>
          )}

          <div className="modal-action">
            <button onClick={close} className="btn btn-primary w-full">
              Close
            </button>
          </div>
        </div>
      </dialog>
    </Fragment>
  );
}

export default TransactionDetailsDialog;
