import { Controller, Get, Post, Patch, Param, Body } from '@nestjs/common';
import MakeChoiceUseCase from '../application/use-cases/makeChoiceUseCase';
import StartGameUseCase from '../application/use-cases/startGameUseCase';
@Controller('incan-golds')
export class IncanGoldsController {

  constructor(
    private makeChoiceUseCase: MakeChoiceUseCase,
    private startGameUseCase: StartGameUseCase,
  ) { }

  @Get()
  helloHansen() {
    return 'Hansen, you are handsome!';
  }

  @Post()
  async startGame(
    @Body() startGameDto: StartGameDto
  ) {
    return this.startGameUseCase.execute(startGameDto);
  }

  @Patch(':gameId')
  async makeChoice(
    @Param('gameId') gameId: string,
    @Body() makeChoiceDto: MakeChoiceDto
  ) {
    return this.makeChoiceUseCase.execute({
      gameId,
      ...makeChoiceDto
    });
  }
}


interface MakeChoiceDto {
  explorerId: string;
  choice: string;
}

interface StartGameDto {
  gameId: string;
  playerIds: string[];
}