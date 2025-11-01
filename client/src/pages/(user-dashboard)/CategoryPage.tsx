import UserCategories from "../../components/sections/user-dashboard/UserCategories";
import UserTransactionsMetadata from "../../components/sections/user-dashboard/UserTransactionsMetadata";

function CategoryPage() {
  return (
    <div>
      <UserTransactionsMetadata />
      <UserCategories />
    </div>
  );
}

export default CategoryPage;
