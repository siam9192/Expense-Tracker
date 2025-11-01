import React from "react";
import { MonitorSmartphone, MapPin, Clock, LogOut } from "lucide-react";
import ArriveAnimationContainer from "../../ui/ArriveAnimationContainer";

// Example session data (you’d fetch from your backend in real use)
const sessions = [
  {
    id: 1,
    device: "Windows 10 • Chrome",
    location: "Dhaka, Bangladesh",
    ip: "103.55.33.17",
    lastActive: "2 minutes ago",
    current: true,
  },
  {
    id: 2,
    device: "iPhone 14 • Safari",
    location: "Chittagong, Bangladesh",
    ip: "103.102.19.66",
    lastActive: "3 hours ago",
    current: false,
  },
  {
    id: 3,
    device: "Macbook Pro • Firefox",
    location: "New York, USA",
    ip: "192.168.1.55",
    lastActive: "Yesterday, 10:45 PM",
    current: false,
  },
];

function UserSessions() {
  return (
    <div className="p-6 md:p-10 bg-base-200 rounded-2xl shadow-xl min-h-[85vh]">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-semibold">Active Sessions</h2>
          <p className="text-sm text-neutral-content">
            Manage your logged-in devices and revoke access to inactive sessions.
          </p>
        </div>
        <button className="btn btn-sm btn-outline btn-error gap-2">
          <LogOut size={16} /> Log out of all devices
        </button>
      </div>

      {/* Sessions List */}
      <div className="space-y-5">
        {sessions.map((session) => (
          <div
            key={session.id}
            className={`flex flex-col md:flex-row md:items-center md:justify-between bg-base-100 p-5 rounded-2xl border transition-all ${
              session.current ? "border-primary shadow-md" : "border-base-300 hover:shadow-sm"
            }`}
          >
            {/* Left */}
            <div className="flex items-center gap-4">
              <div
                className={`p-3 rounded-xl ${
                  session.current
                    ? "bg-primary/10 text-primary"
                    : "bg-base-200 text-neutral-content"
                }`}
              >
                <MonitorSmartphone size={22} />
              </div>
              <div>
                <p className="font-semibold">{session.device}</p>
                <div className="flex flex-wrap items-center gap-2 text-sm text-neutral-content">
                  <span className="flex items-center gap-1">
                    <MapPin size={14} /> {session.location}
                  </span>
                  <span>•</span>
                  <span>IP: {session.ip}</span>
                </div>
              </div>
            </div>

            {/* Right */}
            <div className="flex items-center gap-4 mt-3 md:mt-0">
              <div className="flex items-center gap-1 text-sm text-neutral-content">
                <Clock size={14} /> {session.lastActive}
              </div>
              {session.current ? (
                <span className="badge badge-primary badge-outline">Current</span>
              ) : (
                <button className="btn btn-sm btn-outline btn-error gap-1">
                  <LogOut size={14} /> Revoke
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserSessions;
