import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EvmModule } from './app/evm/evm.module';
import { CosmosModule } from './app/cosmos/cosmos.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    EvmModule,
    CosmosModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
