import app from "./app";
import runCronJob from "./cron-job";
import transactionService from "./modules/transaction/transaction.service";

async function main() {
  try {
    app.listen(5000, async () => {
      runCronJob();
      console.log("Server is connected" + ":" + 5000);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
