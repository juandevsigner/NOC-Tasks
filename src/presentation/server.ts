import { CheckService } from "../domain/use-cases/checks/check-service";
import { CronService } from "./cron/cron-service";

export class ServerApp {
  public static start() {
    console.log("---------- SERVER START -------------");
    CronService.createJob("*/5 * * * * *", () => {
      const url ="http://localhost:3000"
      new CheckService(()=> console.log('SUCCESS ------>', url), (error)=> console.log(`${error.toUpperCase()}------> ${url}`)).execute(url);
    });
  }
}
