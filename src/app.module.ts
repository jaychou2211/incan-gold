import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IncanGoldsModule } from './incan-golds/incan-golds.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [IncanGoldsModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
