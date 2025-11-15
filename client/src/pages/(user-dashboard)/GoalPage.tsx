import UserGoals from "../../components/sections/user-dashboard/UserGoals";
import UserGoalsMetadata from "../../components/sections/user-dashboard/UserGoalsMetadata";
import GoalPageProvider from "../../Provider/GoalPageProvider";

function GoalPage() {
  return (
  <GoalPageProvider>
      <div>
      <UserGoalsMetadata />
      <UserGoals />
    </div>
  </GoalPageProvider>
  );
}

export default GoalPage;
