import UserTransactions from "../../components/sections/user-dashboard/UserTransactions";
import UserTransactionsMetadata from "../../components/sections/user-dashboard/UserTransactionsMetadata";
import TransactionPageProvider from "../../Provider/TransactionPageProvider";

function TransactionPage() {
  return (
    <TransactionPageProvider>
      <div>
      <UserTransactionsMetadata />
      <UserTransactions />
    </div>
    </TransactionPageProvider>
  );
}

export default TransactionPage;
