import UserFinancePieChart from "../../components/sections/user-dashboard/UserFinancePieChart";
import UserIncomeBarChart from "../../components/sections/user-dashboard/UserIncomeBarChart";
import UserRecentBalanceEdits from "../../components/sections/user-dashboard/UserRecentBalanceEdits";
import UserWalletMetadata from "../../components/sections/user-dashboard/UserWalletMetadata";
import UserWalletSettings from "./settings/UserWalletSettings";
import ArriveAnimationContainer from "../../components/ui/ArriveAnimationContainer";
import DashboardPageHeading from "../../components/ui/DashboardPageHeading";
import WalletPageProvider from "../../Provider/WalletPageProvider";

function WalletPage() {
  return (
   <WalletPageProvider>
     <div>
      <DashboardPageHeading heading="My Wallet" />
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 space-y-5">
        {/* Col-1 */}
        <div className="space-y-10">
          <ArriveAnimationContainer>
            <UserWalletMetadata />
          </ArriveAnimationContainer>
          <ArriveAnimationContainer delay={0.5}>
            <UserIncomeBarChart />
          </ArriveAnimationContainer>
        </div>
        {/* Col-2 */}
        <div className="space-y-10">
          <UserFinancePieChart />

          <ArriveAnimationContainer delay={0.9}>
            <UserRecentBalanceEdits />
          </ArriveAnimationContainer>
        </div>
      </div>
      <div className="mt-10">
        <ArriveAnimationContainer delay={1.1}>
          <UserWalletSettings />
        </ArriveAnimationContainer>
      </div>
    </div>
   </WalletPageProvider>
  );
}

export default WalletPage;
