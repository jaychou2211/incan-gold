import { Injectable } from '@nestjs/common';
import { IIncanGoldRepository } from '../interfaces/repository.interface';
import { Choice } from "../../domain/"
// import { Output } from '../Dto/UseCaseOutput';
// import { IEventDispatcher } from "../../../Shared/app/Interface/EventDispatcher";

@Injectable()
export default class MakeChoiceUseCase {
  constructor(
    private incanGoldRepository: IIncanGoldRepository,
    // private eventDispatcher: IEventDispatcher
  ) { }

  async execute(input: MakeChoiceInput): Promise<void> {
    const { gameId, explorerId, choice } = input;
    // 查
    const incanGold = await this.incanGoldRepository.getById(gameId);

    // 改
    const domainEvents = Array.from(incanGold.makeChoice(explorerId, choice as Choice));

    // 存
    return await this.incanGoldRepository.save(incanGold);

    // 推
    // this.eventDispatcher.emit('IncanGold', gameId, Output(incanGold, events))
  }
}

export interface MakeChoiceInput {
  gameId: string
  explorerId: string
  choice: string
}