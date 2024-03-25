import { Transaction } from "./transaction.interface"

export interface Repository {
  getTransactionInstance(): Promise<Transaction>
}