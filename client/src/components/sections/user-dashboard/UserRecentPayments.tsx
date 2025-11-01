import { CreditCard, ShoppingBag, Utensils, Wifi, MoreHorizontal } from "lucide-react";
import DashboardSectionHeading from "../../ui/DashboardSectionHeading";


const recentPayments = [
  {
    id: 1,
    name: "Spotify Subscription",
    category: "Entertainment",
    amount: 9.99,
    date: "Oct 28, 2025",
    icon: <Wifi className="text-success" />,
  },
  {
    id: 2,
    name: "Groceries - Walmart",
    category: "Food & Essentials",
    amount: 124.75,
    date: "Oct 25, 2025",
    icon: <ShoppingBag className="text-primary" />,
  },
  {
    id: 3,
    name: "Restaurant - Bella Italia",
    category: "Dining",
    amount: 56.4,
    date: "Oct 24, 2025",
    icon: <Utensils className="text-warning" />,
  },
  {
    id: 4,
    name: "Netflix Subscription",
    category: "Entertainment",
    amount: 15.99,
    date: "Oct 22, 2025",
    icon: <CreditCard className="text-error" />,
  },
];

function UserRecentPayments() {
  return (
   
      <div className="p-4 md:p-8 bg-base-300 rounded-2xl shadow-lg space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <DashboardSectionHeading heading="Recent Payments"/>
          <button className="btn btn-sm btn-outline btn-neutral gap-1">
            <MoreHorizontal size={16} /> View All
          </button>
        </div>

        {/* List */}
        <div className="space-y-6">
          {recentPayments.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center py-4 hover:bg-base-200 rounded-xl transition-all px-2 bg-base-100"
            >
              {/* Left */}
              <div className="flex items-center gap-4">
                <div className="p-3 bg-base-200 rounded-xl">{item.icon}</div>
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-neutral">{item.category}</p>
                </div>
              </div>

              {/* Right */}
              <div className="text-right">
                <p className="font-semibold text-error">-${item.amount.toFixed(2)}</p>
                <p className="text-xs text-neutral-content">{item.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
   
  );
}

export default UserRecentPayments;
