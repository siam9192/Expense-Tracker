import UserTransactions from "../../components/sections/user-dashboard/UserTransactions";
import UserTransactionsMetadata from "../../components/sections/user-dashboard/UserTransactionsMetadata";

function TransactionPage() {
  return (
    <div>
      <UserTransactionsMetadata />
      <UserTransactions />
    </div>
  );
}

export default TransactionPage;
