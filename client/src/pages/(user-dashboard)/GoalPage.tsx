import UserGoals from "../../components/sections/user-dashboard/UserGoals";
import UserGoalsMetadata from "../../components/sections/user-dashboard/UserGoalsMetadata";

function GoalPage() {
  return (
    <div>
      <UserGoalsMetadata />
      <UserGoals />
    </div>
  );
}

export default GoalPage;
