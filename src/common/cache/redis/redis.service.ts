import { CACHE_MANAGER, Inject, Injectable, Logger } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisService {
  constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {
    // console.log('this.cache: ', this.cache);
  }

  async get(key) {
    const result = await this.cache.get(key);
    Logger.debug('Redis: get [' + key + ']');
    console.log('result: ', result);
    return result;
  }

  async set(key, value) {
    Logger.debug('Redis: set [' + key + ']');
    await this.cache.set(key, value, 22);
  }
}
