import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { GetBlockResponse, GetTransactionResponse } from './evm.response';
import { v4 as uuid } from 'uuid';

@Injectable()
export class EvmService {
  private readonly axios: AxiosInstance;

  constructor(
    private readonly configService: ConfigService,
  ) {
    this.axios = axios.create({
      baseURL: this.configService.get<string>('RPC_URL'),
      timeout: 5000,
    })
  }

  async getLastBlock(): Promise<GetBlockResponse> {
    try {
      const id = uuid();
      const { data: { result } } = await this.axios.post('', {
        jsonrpc: '2.0',
        method: 'eth_getBlockByNumber',
        params: ['latest', false],
        id,
      });

      return {
        height: result.number,
        hash: result.hash,
        parentHash: result.parentHash,
        gasLimit: parseInt(result.gasLimit, 16),
        gasUsed: parseInt(result.gasUsed, 16),
        size: parseInt(result.size, 16),
      }
    } catch (error) {
      console.error(error);
    }
  }

  async getBlockByNumber(height: string): Promise<GetBlockResponse> {
    const hexHeight = '0x' + parseInt(height, 10).toString(16);
    const id = uuid();
    try {
      const { data: { result } } = await this.axios.post('', {
        jsonrpc: '2.0',
        method: 'eth_getBlockByNumber',
        params: [height, false],
        id,
      });

      console.log(result.transactions);

      return {
        height: result.number,
        hash: result.hash,
        parentHash: result.parentHash,
        gasLimit: parseInt(result.gasLimit, 16),
        gasUsed: parseInt(result.gasUsed, 16),
        size: parseInt(result.size, 16),
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getTransactionsByHash(hash: string): Promise<GetTransactionResponse> {

    try {
      const { data: {
        result: {
          to, from, value, input,
          maxFeePerGas,
          maxPriotityFeePerGas,
          gasPrice
        }
      } } = await this.axios.post('', {
        jsonrpc: '2.0',
        method: 'eth_getTransactionByHash',
        params: [hash],
        id: 1,
      });
      return {
        hash,
        to,
        from,
        value: parseInt(value, 16),
        input,
        maxFeePerGas: maxFeePerGas ? parseInt(maxFeePerGas, 16) : null,
        maxPriotityFeePerGas: maxPriotityFeePerGas ? parseInt(maxPriotityFeePerGas, 16) : null,
        gasPrice: gasPrice ? parseInt(gasPrice, 16) : null,
      }
    } catch (error) {
      console.log(error);
    }
  }
}