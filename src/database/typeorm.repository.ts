import { Repository } from "./interfaces/repository.interface"
import { Transaction } from "./interfaces/transaction.interface"
import { DataSource } from "typeorm"
import { TypeormTransaction } from "./typeorm.transaction";

export abstract class TypeormRepository implements Repository {
  constructor(
    public readonly dataSource: DataSource
  ) { }

  async getTransactionInstance(): Promise<Transaction> {
    const runner = this.dataSource.createQueryRunner();
    return new TypeormTransaction(runner);
  }
}