export interface Transaction {
  start(): Promise<void>;
  rollback(): Promise<void>;
  commit(): Promise<void>;
  release(): Promise<void>;
}