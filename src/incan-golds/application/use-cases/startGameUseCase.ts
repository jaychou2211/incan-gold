import { IIncanGoldRepository } from "../interfaces/repository.interface";
import { Injectable } from "@nestjs/common";
import { IncanGold } from "../../domain";
// import { Output } from '../Dto/UseCaseOutput';
// import { IEventDispatcher } from "../../../Shared/app/Interface/EventDispatcher";

// Create a game entity using the room ID and the explorers' IDs 
// (the game entity's ID will be the room ID), 
// and start the game until the first round's first turn, which is the "selection" phase.
@Injectable()
export default class StartGameUseCase {
  constructor(
    private incanGoldRepository: IIncanGoldRepository,
    // private eventDispatcher: IEventDispatcher
  ) { }

  async execute(input: StartGameInput): Promise<IncanGold> {
    const { gameId, playerIds } = input;

    // 創(沒得查，因為還沒有game)
    const incanGold = await this.incanGoldRepository.create(gameId, playerIds);

    // 改
    const domainEvents = Array.from(incanGold.start());
    console.log(24,StartGameUseCase,domainEvents)

    // 存
    await this.incanGoldRepository.save(incanGold);

    return incanGold;
    // 推
    // this.eventDispatcher.emit('IncanGold', roomId, Output(incanGold, domainEvents))
  }
}

export interface StartGameInput {
  gameId: string;
  playerIds: string[];
}
