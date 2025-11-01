import UserCategoryCard from "../../cards/UserCategoryCard";
import ArriveAnimationContainer from "../../ui/ArriveAnimationContainer";
import CreateUserCategoryModal from "../../ui/CreateUserCategoryModal";
import DashboardSectionHeading from "../../ui/DashboardSectionHeading";

function UserCategories() {
  return (
    <ArriveAnimationContainer delay={0.5}>
      <div className="mt-10">
           <div className="text-center mb-5">
          <CreateUserCategoryModal />
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0 ">
         <DashboardSectionHeading heading="Your Categories"/>
          <div role="tablist" className="tabs tabs-box">
            <a role="tab" className="tab tab-active">
              All
            </a>
            <a role="tab" className="tab">
              Top
            </a>
            <a role="tab" className="tab">
              New
            </a>
          </div>
        </div>

    <div className="mt-5 p-4 md:p-8 bg-base-300 rounded-2xl shadow-lg space-y-6">
          <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-5 ">
          {Array.from({ length: 14 }).map((_, index) => (
            <UserCategoryCard key={index} />
          ))}
        </div>
      </div>
        <div className="mt-10 text-center">
          <button className="btn  btn-secondary">Load more</button>
        </div>
      </div>
    </ArriveAnimationContainer>
  );
}

export default UserCategories;
