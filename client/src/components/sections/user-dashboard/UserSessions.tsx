import { MonitorSmartphone, MapPin, Clock } from "lucide-react";
import { useGetUserSessionsQuery } from "../../../redux/api/user.api";
import RevokeSingleSessionModal from "../../ui/RevokeSingleSessionModal";
import RevokeAllSessionModal from "../../ui/RevokeAllSessionModal";

function UserSessions() {
  const { data } = useGetUserSessionsQuery(undefined);
  const sessions = data?.data || [];

  return (
    <div className=" mt-10 p-6 md:p-10 bg-base-300 rounded-2xl shadow-xl min-h-[50vh]">
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-3 lg:gap-0 lg:items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-semibold">Active Sessions</h2>
          <p className="text-sm text-neutral-content">
            Manage your logged-in devices and revoke access to inactive sessions.
          </p>
        </div>
        <RevokeAllSessionModal />
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
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div
                className={`p-3 rounded-xl size-fit ${
                  session.current
                    ? "bg-primary/10 text-primary"
                    : "bg-base-200 text-neutral-content"
                }`}
              >
                <MonitorSmartphone size={22} />
              </div>
              <div>
                <p className="font-semibold">{session.device_name}</p>
                <div className="flex flex-wrap items-center gap-2 text-sm text-neutral-content">
                  <span className="flex items-center gap-1">
                    <MapPin size={14} /> {session.address}
                  </span>
                  <span>•</span>
                  <span>IP: {session.ip}</span>
                </div>
              </div>
            </div>

            {/* Right */}
            <div className="flex items-center gap-4 mt-3 md:mt-0">
              <div className="flex items-center gap-1 text-sm text-neutral-content">
                <Clock size={14} /> {new Date(session.created_at).toDateString()},
                {new Date(session.created_at).toLocaleTimeString()}
              </div>
              {session.current ? (
                <span className="badge badge-primary badge-outline">Current</span>
              ) : (
                <RevokeSingleSessionModal sessionId={session.id} />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserSessions;
