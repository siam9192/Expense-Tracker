import ArriveAnimationContainer from "../../ui/ArriveAnimationContainer";

function MonthlyExpenses() {
  const monthlyExpenses = [
    { categoryName: "Food", amount: 320 },
    { categoryName: "Transport", amount: 180 },
    { categoryName: "Rent", amount: 750 },
    { categoryName: "Utilities", amount: 210 },
    { categoryName: "Entertainment", amount: 130 },
    { categoryName: "Shopping", amount: 290 },
  ];

  return (
    <ArriveAnimationContainer>
      <div className="w-full p-8  rounded-2xl ">
        <div className="flex flex-col md:flex-row  justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-primary">Monthly Expenses</h2>
          <p className="text-sm text-gray-500">October 2025</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {monthlyExpenses.concat(monthlyExpenses).map((expense, index) => (
            <div
              key={index}
              className="p-5  from-indigo-50 to-indigo-100 border border-indigo-200 rounded-2xl shadow hover:shadow-md transition-all duration-300"
            >
              <p className="text-gray-600 text-center font-medium">{expense.categoryName}</p>
              <p className="text-indigo-600 text-xl font-semibold font-secondary text-center mt-2">
                ${expense.amount}
              </p>
            </div>
          ))}
        </div>
      </div>
    </ArriveAnimationContainer>
  );
}

export default MonthlyExpenses;
