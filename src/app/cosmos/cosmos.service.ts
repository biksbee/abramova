import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance } from 'axios';

@Injectable()
export class CosmosService {
  private readonly axios: AxiosInstance;

  constructor(
    private readonly configService: ConfigService,
  ) {
    this.axios = axios.create({
      baseURL: this.configService.get<string>('COSMOS_URL'),
      timeout: 5000,
    })
  }

  async getLastBlock() {
    try {
      const { data } = await this.axios.get(`/status`);
      return {
        height: data.sync_info.latest_block_height,
      }
    } catch (error) {
      console.error(error);
    }
  }

  async getBlock(height: string): Promise<any> {
    try {
      const { data } = await this.axios.get(`/block?height=${height}`);

      return {
        height: Number(data.block.header.height),
        time: data.block.header.time,
        hash: data.block_id.hash,
        proposedAddress: data.block.header.proposer_address,
      }
    } catch (error) {
      console.error(error);
    }
  }

  async getTransaction(hash: string): Promise<any> {
    try {
      const { data } = await this.axios.get(`/tx?hash=${hash}`);
      console.log(data);
      return {
        // hash,
        // height,
        // time,
        // gasUsed,
        // gasWanted,
        // fee,
        // sender
      }
    } catch (error) {
      console.error(error);
    }
  }
}