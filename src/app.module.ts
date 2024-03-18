import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IncanGoldsModule } from './incan-golds/incan-golds.module';

@Module({
  imports: [IncanGoldsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
