import { Navigate } from "react-router-dom";
import { useCurrentUserProviderContext } from "./CurrentUserProvider";
import type { ReactNode } from "react";

interface Props {
  /**
   * Determines which users can access this route
   * - "authenticated" → only logged-in users
   * - "guest" → only users who are NOT logged in
   */
  access: "authenticated" | "guest";
  children: ReactNode;
  redirectTo?: string;
}

/**
 * ProtectRouteProvider
 * Controls route access based on authentication state.
 */
export default function ProtectRouteProvider({ access, children, redirectTo }: Props) {
  const { user, isLoading } = useCurrentUserProviderContext();
  if (isLoading) {
    // Optional: Replace with your actual loading UI/spinner
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  // Authenticated routes (requires login)
  if (access === "authenticated") {
    if (!user) {
      return <Navigate to={redirectTo || "/intro"} replace />;
    }
    return <>{children}</>;
  }

  // Guest routes (requires user NOT to be logged in)
  if (access === "guest") {
    if (user) {
      return <Navigate to={redirectTo || "/"} replace />;
    }
    return <>{children}</>;
  }

  // Default fallback
  return null;
}
