import { Module } from '@nestjs/common';
import { CosmosService } from './cosmos.service';
import { CosmosController } from './cosmos.controller';

@Module({
  providers: [CosmosService],
  controllers: [CosmosController],
  imports: [],
  exports: [CosmosService],
})
export class CosmosModule {}