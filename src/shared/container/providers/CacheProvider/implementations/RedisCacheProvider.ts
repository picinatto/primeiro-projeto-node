import Redis, { Redis as RedisClient } from 'ioredis';
import cacheConfig from '@config/cache';
import ICacheProvider from '../models/ICacheProvider';

export default class RedisCacheProvider implements ICacheProvider {
  private client: RedisClient;

  constructor() {
    this.client = new Redis(cacheConfig.config.redis);
  }

  public async save(key: string, value: string): Promise<void> {
    this.client.set(key, JSON.stringify(value));
  }

  public async recover<T>(key: string): Promise<T | null> {
    const data = await this.client.get(key);

    if (!data) {
      return null;
    }

    const parsedData = JSON.parse(data) as T;

    return parsedData;
  }

  public async invalidate(key: string): Promise<void> {}

  public async invalidatePrefix(prefix: string): Promise<void> {
    // Search for all the caches that start with the prefix in the cache db
    const keys = await this.client.keys(`${prefix}:*`);
    // Pipeline is more recommended for bulk operations
    const pipeline = this.client.pipeline();
    // Iterate each key and create a delete instruction
    keys.forEach(key => {
      pipeline.del(key);
    });
    // Run the pipeline
    await pipeline.exec();
  }
}
