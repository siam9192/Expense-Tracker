import UserCategories from "../../components/sections/user-dashboard/UserCategories";
import UserCategoriesMetadata from "../../components/sections/user-dashboard/UserCategoriesMetadata";
import CategoriesPageProvider from "../../Provider/CategoriesPageProvider";

function CategoryPage() {
  return (
    <CategoriesPageProvider>
      <div>
        <UserCategoriesMetadata />
        <UserCategories />
      </div>
    </CategoriesPageProvider>
  );
}

export default CategoryPage;
