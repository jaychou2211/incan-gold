import { IncanGoldRepository as IIncanGoldRepository } from "../../application/interfaces/repository.interface";
import type { DataSource, QueryRunner } from "typeorm";
import { TypeormRepository } from "src/database/typeorm.repository";
import { Transaction } from "src/database/interfaces/transaction.interface";
import { IncanGoldMapper } from "../incan-gold.mapper";
import { IncanGold as IncanGoldData } from "./entities/incan-gold.entity";
import { Explorer as ExplorerData } from "./entities/explorer.entity";
import { Card } from "./entities/card";
import { IncanGold, CardInfo, Choice } from "../../domain";
import { Injectable, Inject } from "@nestjs/common";
import { TypeormTransaction } from "src/database/typeorm.transaction";
const { treasureCards, hazardCards } = CardInfo;


@Injectable()
export class IncanGoldRepository extends TypeormRepository implements IIncanGoldRepository {
  constructor(
    @Inject('DATA_SOURCE')
    dataSource: DataSource,
    private mapper: IncanGoldMapper,
  ) {
    super(dataSource);
  }

  private getManager(tx: Transaction) {
    return tx
      ? (tx as TypeormTransaction).getManager()
      : this.dataSource.manager;
  }

  async deleteById(id: string, tx?: Transaction): Promise<number> {
    const manager = this.getManager(tx);
    const { affected } = await manager.getRepository(IncanGoldData).delete({ id });
    return affected;
  }

  async create(id: string, explorerIDs: string[], tx?: Transaction): Promise<IncanGold> {
    const manager = this.getManager(tx);
    const { explorers, ...incanGold } = this.createIncanGoldData(explorerIDs, id);
    const createdExplorers = await manager.getRepository(ExplorerData).save(explorers);
    const createdIncanGold = await manager.getRepository(IncanGoldData).save(incanGold);
    return this.mapper.toDomain(createdIncanGold, createdExplorers);
  }

  async getById(id: string, tx?: Transaction): Promise<IncanGold | undefined> {
    const manager = this.getManager(tx);
    const incanGoldData = await manager.getRepository(IncanGoldData)
      .findOne({
        where: { id },
        lock: { mode: "pessimistic_write" },
      });

    const explorers = await manager.getRepository(ExplorerData)
      .find({
        where: { incanGold: id },
      });

    return this.mapper.toDomain(incanGoldData, explorers);
  }

  async save(incanGold: IncanGold, tx?: Transaction): Promise<void> {
    const incanGoldData = this.mapper.toData(incanGold);
    const transactionInstance = tx ?? new TypeormTransaction(this.dataSource.createQueryRunner());
    try {
      await this.updateExplorers(tx)(incanGoldData.explorers);
      await this.updateGame(tx)(incanGoldData);
      // const data =  await this.getById(incanGoldData.id);
      // return this.mapper.toDomain(data);
      if (!tx) await transactionInstance.commit();
    } catch (err) {
      if (!tx) await transactionInstance.rollback();
      throw err;
    } finally {
      if (!tx) await transactionInstance.release();
    }
  }

  private updateGame = (
    tx: Transaction
  ) => async (
    incanGoldData: IncanGoldData
  ) => {
      const manager = this.getManager(tx);
      const { id, round, turn, tunnel, deck, trashDeck } = incanGoldData;
      manager.createQueryBuilder()
        .update(IncanGoldData)
        .set({ round, turn, tunnel, deck, trashDeck })
        .where("id = :id", { id })
        .execute();
    }

  private updateExplorers = (
    tx: Transaction
  ) => async (
    explorers: ExplorerData[]
  ) => {
      const manager = this.getManager(tx);
      const explorerPromise = explorers.map(explorer => {
        const { id, choice, inTent, gemsInBag, gemsInTent, totalPoints, artifacts } = explorer;

        manager.createQueryBuilder()
          .update(ExplorerData)
          .set({ choice, inTent, gemsInBag, gemsInTent, totalPoints, artifacts })
          .where("id = :id", { id })
          .execute();
      });
      Promise.all(explorerPromise);
    }

  private async createQueryRunner() {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    return queryRunner;
  }

  private createIncanGoldData(explorerIds: string[], incanGoldId: string) {
    const explorers = this.createExplorers(explorerIds, incanGoldId);
    const deck = this.createDeck();
    const trashDeck: Record<number, Card[]> = {};
    [1, 2, 3, 4, 5].forEach(round => {
      trashDeck[round] = [];
    })

    return {
      id: incanGoldId, round: 0, turn: 0,
      tunnel: [],
      deck, trashDeck,
      explorers
    };
  }

  private createExplorers = (
    explorerIds: string[],
    incanGoldId: string,
  ) =>
    explorerIds.map(id => ({
      id,
      choice: Choice.NotSelected,
      inTent: true,
      gemsInBag: 0, gemsInTent: 0, totalPoints: 0, artifacts: [],
      incanGold: incanGoldId,
    }));


  private createDeck = () =>
    Object.entries({ ...treasureCards, ...hazardCards })
      .map(([id]) => Card(id));
}