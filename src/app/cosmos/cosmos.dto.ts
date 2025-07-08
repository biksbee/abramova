import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GetBlockDto {
  @ApiProperty({ example: '11144742', description: 'Block number' })
  @IsString()
  height: string;
}

export class GetTransactionDto {
  @ApiProperty({ example: '0xa52be92809541220ee0aaaede6047d9a6c5d0cd96a517c854d944ee70a0ebb44', description: 'Transaction'
  })
  @IsString()
  hash: string;
}