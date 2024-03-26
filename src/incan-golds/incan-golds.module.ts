import { Module } from '@nestjs/common';
import { IncanGoldsController } from './controller/incan-golds.controller';
import StartGameUseCase from './application/use-cases/startGameUseCase';
import MakeChoiceUseCase from './application/use-cases/makeChoiceUseCase';
import { IncanGoldRepository as IIncanGoldRepository } from './application/interfaces/repository.interface';
import { IncanGoldRepository } from './infra/db/incan-gold.repository';
import { IncanGoldMapper } from './infra/incan-gold.mapper';
import { DatabaseModule } from 'src/database/database.module';

const repositoryProvider = {
  provide: IIncanGoldRepository,
  useClass: IncanGoldRepository,
}

@Module({
  providers: [
    StartGameUseCase,
    MakeChoiceUseCase,
    repositoryProvider,
    IncanGoldMapper,
  ],
  controllers: [IncanGoldsController],
  imports: [DatabaseModule],
  exports: []
})
export class IncanGoldsModule { }