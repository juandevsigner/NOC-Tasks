import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDatasource } from "../infrastructure/file-system.datasource";
import { LogRespositoryImpl } from "../infrastructure/respositories/log.repository.impl";
import { CronService } from "./cron/cron-service";

const fileSystemLogRespository = new LogRespositoryImpl(
  new FileSystemDatasource()
);

export class ServerApp {
  public static start() {
    console.log("---------- SERVER START -------------");
    CronService.createJob("*/5 * * * * *", () => {
      const url = "https:localhost:3000";
      new CheckService(
        fileSystemLogRespository,
        () => console.log("SUCCESS ->", url),
        (error) => console.log(`${error.toUpperCase()}-> ${url}`)
      ).execute(url);
    });
  }
}
