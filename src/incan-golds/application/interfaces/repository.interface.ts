import type { IncanGold } from "../../domain";
import { Repository } from "src/database/interfaces/repository.interface";
import { Transaction } from "src/database/interfaces/transaction.interface";

export abstract class IncanGoldRepository implements Repository {
  abstract create(id: string, explorerIds: string[], tx?: Transaction): Promise<IncanGold>;

  abstract getById(id: string, tx?: Transaction): Promise<IncanGold | undefined>;

  abstract save(incanGold: IncanGold, tx?: Transaction): Promise<void>;

  abstract deleteById(id: string, tx?: Transaction): Promise<number>;

  abstract getTransactionInstance(): Promise<Transaction>;
}
