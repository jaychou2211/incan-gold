import { Transaction } from "./interfaces/transaction.interface";
import { QueryRunner } from "typeorm";

export class TypeormTransaction implements Transaction {
  constructor(
    private queryRunner: QueryRunner
  ) { }

  async start() {
    await this.queryRunner.connect();
    this.queryRunner.startTransaction();
  }

  async commit() {
    this.queryRunner.commitTransaction();
  }

  async rollback() {
    this.queryRunner.rollbackTransaction();
    return;
  }

  async release() {
    this.queryRunner.release();
  }

  getManager() {
    return this.queryRunner.manager;
  }
}