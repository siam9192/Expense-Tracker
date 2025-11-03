// types/express.d.ts

import { AuthUser } from "./modules/auth/auth.interface";

declare global {
  namespace Express {
    interface Request {
      user: AuthUser; // Add your custom field here
    }
  }
}
