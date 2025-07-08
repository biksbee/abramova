import { EvmService } from './evm.service';
import { Module } from '@nestjs/common';
import { EvmController } from './evm.controller';

@Module({
  providers: [EvmService],
  controllers: [EvmController],
  imports: [],
  exports: [EvmService],
})
export class EvmModule {}