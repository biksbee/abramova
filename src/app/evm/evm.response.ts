import { ApiProperty } from '@nestjs/swagger';

export class GetBlockResponse {
  @ApiProperty({})
  height: string;

  @ApiProperty({})
  hash: string;

  @ApiProperty({})
  parentHash: string;

  @ApiProperty({})
  gasLimit: number;

  @ApiProperty({})
  gasUsed: number;

  @ApiProperty({})
  size: number;
}

export class GetTransactionResponse {
  @ApiProperty({})
  hash: string;

  @ApiProperty({})
  to: string;

  @ApiProperty({})
  from: string;

  @ApiProperty({})
  value: number;

  @ApiProperty({})
  input: string;

  @ApiProperty({})
  maxFeePerGas: number;

  @ApiProperty({})
  maxPriotityFeePerGas: number;

  @ApiProperty({})
  gasPrice: number;
}