import UserRecentPayments from "../../components/sections/user-dashboard/UserRecentPayments";
import ExpenseStatistics from "../../components/sections/user-dashboard/UserExpenseStatistics";
import MonthlyExpenses from "../../components/sections/user-dashboard/UserMonthlyExpenses";
import UserBalanceMetaData from "../../components/sections/user-dashboard/UserBalanceMetaData";
import UserMonthlyBudgetMetaData from "../../components/sections/user-dashboard/UserMonthlyBudgetMetaData";
import UserProfileAndSettings from "../../components/sections/user-dashboard/UserProfileAndSettings";
import ArriveAnimationContainer from "../../components/ui/ArriveAnimationContainer";
function HomePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-primary">Welcome back,Siam!!</h1>
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-20 space-y-5">
        {/* Col-1 */}
        <div className="space-y-10">
        <ArriveAnimationContainer delay={.1}>
            <UserBalanceMetaData />
        </ArriveAnimationContainer>
         <ArriveAnimationContainer delay={.3}>
           <UserMonthlyBudgetMetaData />
         </ArriveAnimationContainer>
         <ArriveAnimationContainer delay={.5}>
           <ExpenseStatistics />
         </ArriveAnimationContainer>
         <ArriveAnimationContainer delay={.7}>
           <UserRecentPayments />
         </ArriveAnimationContainer>
        </div>
        {/* Col-2 */}
        <div className="space-y-10">
        <ArriveAnimationContainer delay={.3}>
            <UserProfileAndSettings />
        </ArriveAnimationContainer>

         <ArriveAnimationContainer delay={.5}>
           <MonthlyExpenses />
         </ArriveAnimationContainer>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
