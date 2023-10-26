import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogRespository } from "../../domain/repository/log.repository";

export class LogRespositoryImpl implements LogRespository {
  constructor(private readonly logoDataSource: LogDatasource) {}

  async saveLog(log: LogEntity): Promise<void> {
    return this.logoDataSource.saveLog(log);
  }

  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    return this.logoDataSource.getLogs(severityLevel);
  }
}
