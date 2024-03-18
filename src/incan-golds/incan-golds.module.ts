import { Module } from '@nestjs/common';
import { IncanGoldsController } from './incan-golds.controller';

@Module({
  controllers: [IncanGoldsController]
})
export class IncanGoldsModule {}
