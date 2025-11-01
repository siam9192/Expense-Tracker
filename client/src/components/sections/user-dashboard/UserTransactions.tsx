import { Link } from "react-router-dom";
import UserTransactionCard from "../../cards/UserTransactionCard";
import ArriveAnimationContainer from "../../ui/ArriveAnimationContainer";
import DashboardSectionHeading from "../../ui/DashboardSectionHeading";

function UserTransactions() {
  return (
    <ArriveAnimationContainer delay={0.5}>
      <div className="mt-10">
          <div className="text-center mb-5">
          <Link to='create'>
          <button
       
        className="text-primary hover:text-secondary font-semibold bg-base-100 btn md:btn-lg "
      >
        Create Transaction
      </button>
          </Link>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0 ">
           <DashboardSectionHeading heading="Your Transactions"/>
          <div role="tablist" className="tabs tabs-box">
            <a role="tab" className="tab tab-active">
              All
            </a>
            <a role="tab" className="tab">
              Income
            </a>
            <a role="tab" className="tab">
              Expense
            </a>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 md:grid-cols-2  gap-5 p-10 rounded-xl bg-base-300">
          {Array.from({ length: 14 }).map((_, index) => (
            <UserTransactionCard key={index} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <button className="btn  btn-secondary">Load more</button>
        </div>
      </div>
    </ArriveAnimationContainer>
  );
}

export default UserTransactions;
