import { useTranslation } from "react-i18next";
import { useWalletPageProviderContext } from "../../../Provider/WalletPageProvider";
import { DEFAULT_ERROR_MESSAGE } from "../../../utils/constant";
import { useUserCurrency } from "../../../Provider/CurrentUserProvider";

function UserRecentBalanceEdits() {
  const { t } = useTranslation();
  const currency = useUserCurrency();

  const { latestBalanceUpdatesQuery } = useWalletPageProviderContext();
  const { data: resData, isError } = latestBalanceUpdatesQuery;
  const updates = resData?.data!;
  if (isError) return <p>{DEFAULT_ERROR_MESSAGE}</p>;
  return (
    <div className="p-4 md:p-8 bg-base-300 rounded-2xl shadow-lg space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-primary">{t("recentBalanceEdits")}</h2>
      </div>

      {updates.length ? (
        <div className="space-y-4">
          {updates.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center py-4 hover:bg-base-200 rounded-xl transition-all px-4 bg-base-100"
            >
              {/* Left */}
              <div>
                <p className="text-sm">Reason:</p>
                <p className="font-semibold">{item.reason}</p>
              </div>

              {/* Right */}
              <div className="text-right">
                <p className="font-semibold text-lg text-primary">
                  {currency?.symbol}
                  {item.new_balance}
                </p>

                <p className="text-xs text-neutral-content">
                  {new Date(item.created_at).toDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="min-h-80 flex justify-center items-center text-center">
          <p className="text-base-content ">{t("noResults")}</p>
        </div>
      )}
    </div>
  );
}

export default UserRecentBalanceEdits;
