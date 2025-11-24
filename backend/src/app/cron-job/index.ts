import cron from "node-cron";
import prisma from "../prisma-client";
import { GoalStatus, OTPVerificationStatus } from "@prisma/client";

export default async function runCronJob() {
  cron.schedule("* * * * *", async () => {
    await prisma.goal.updateMany({
      where: {
        status: GoalStatus.ACTIVE,
        deadline: {
          lt: new Date(),
        },
      },
      data: {
        status: GoalStatus.FAILED,
      },
    });
    await prisma.otpVerification.updateMany({
      where: {
        status: OTPVerificationStatus.PENDING,
      },
      data: {
        status: OTPVerificationStatus.EXPIRED,
      },
    });
  });
}
