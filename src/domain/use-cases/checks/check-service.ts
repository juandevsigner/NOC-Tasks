import { LogRespository } from "../../repository/log.repository";
import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
interface CheckServiceUseCase {
  execute(url: string): Promise<boolean>;
}

type SuccesCallback = (() => void) | undefined;
type ErrorCallback = ((error: string) => void) | undefined;

export class CheckService implements CheckServiceUseCase {
  constructor(
    private readonly logRespository: LogRespository,
    private readonly succesCallback: SuccesCallback,
    private readonly errorCallback: ErrorCallback
  ) {}

  public async execute(url: string): Promise<boolean> {
    try {
      const req = await fetch(url);
      if (!req.ok) {
        throw new Error(`Error on check service: ${url}`);
      }

      const log = new LogEntity(`Service ${url} working`, LogSeverityLevel.low);
      this.logRespository.saveLog(log);
      this.succesCallback && this.succesCallback();
      return true;
    } catch (e) {
      const errorMessage = `${e}`;
      const log = new LogEntity(
        `${errorMessage} service ${url} NOT working`,
        LogSeverityLevel.high
      );
      this.logRespository.saveLog(log);
      this.errorCallback && this.errorCallback(`${errorMessage}`);
      return false;
    }
  }
}
