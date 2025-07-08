import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Param } from '@nestjs/common';
import { EvmService } from './evm.service';
import { GetBlockDto, GetTransactionDto } from './evm.dto';
import { GetBlockResponse, GetTransactionResponse } from './evm.response';

@ApiTags('Evm')
@Controller('evm')
export class EvmController {
  constructor(private readonly evmService: EvmService) {}

  @Get('last-block')
  @ApiOperation({
    summary: 'Получение информации последнего блока',
    description: 'Получение информации о последнем блоке',
  })
  @ApiResponse({
    status: 200,
    description: 'Информация о блоке',
    type: GetBlockResponse
  })
  async getLastBlock() {
    return await this.evmService.getLastBlock();
  }

  @Get('block/:height')
  @ApiOperation({
    summary: 'Получение информации о блоке',
    description: 'Получение информации о блоке по номеру блока',
  })
  @ApiResponse({
    status: 200,
    description: 'Информация о блоке',
    type: GetBlockResponse
  })
  async getBlockByNumber(@Param() { height }: GetBlockDto): Promise<GetBlockResponse> {
    return await this.evmService.getBlockByNumber(height);
  }

  @Get('transactions/:hash')
  @ApiOperation({
    summary: 'Получение транзакции по хэшу',
  })
  @ApiResponse({
    status: 200,
    description: 'Информация транзакции',
    type: GetTransactionResponse
  })
  async getTransactionsByHash(
    @Param() { hash }: GetTransactionDto,
  ): Promise<GetTransactionResponse> {
    return await this.evmService.getTransactionsByHash(hash);
  }
}