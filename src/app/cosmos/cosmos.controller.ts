import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Param } from '@nestjs/common';
import { CosmosService } from './cosmos.service';
import { GetBlockDto, GetTransactionDto } from './cosmos.dto';


@ApiTags('Cosmos')
@Controller('cosmos')
export class CosmosController {
  constructor(
    private readonly cosmosService: CosmosService,
  ) {}

  @Get('last-block')
  @ApiOperation({
    summary: 'Получение последнего блока',
    description: 'Получение информации о полследнем блоке',
  })
  @ApiResponse({
    status: 200,
    description: 'Информация о блоке',
    // type:
  })
  async getLastBlock() {
    return await this.cosmosService.getLastBlock();
  }

  @Get('block/:height')
  @ApiOperation({
    summary: 'Получение информации о блоке',
    description: 'Получение информации о блоке по номеру блока',
  })
  @ApiResponse({
    status: 200,
    description: 'Информация о блоке',
    // type:
  })
  async getBlock(
    @Param() { height }: GetBlockDto
  ): Promise<any> {
    return await this.cosmosService.getBlock(height);
  }

  @Get('transactions/:hash')
  @ApiOperation({
    summary: 'Получение транзакции по хэшу',
  })
  @ApiResponse({
    status: 200,
    description: 'Информация транзакции',
    // type:
  })
  async getTransaction(
    @Param() { hash }: GetTransactionDto
  ) {
    return await this.cosmosService.getTransaction(hash);
  }
}