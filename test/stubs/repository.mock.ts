import { Injectable } from '@nestjs/common'
import {
  DeepPartial,
  FindOneOptions,
  UpdateResult,
  Repository,
} from 'typeorm'

@Injectable()
export class MockRepository<Entity> extends Repository<Entity> {
  private items: Entity[] = []

  public async find(): Promise<Entity[]> {
    return this.items
  }

  public async findOne(options: FindOneOptions): Promise<Entity | undefined> {
    const obj = this.items.find((item: Entity) => {
      const whereKeys = Object.keys(options.where || {})

      return whereKeys.every((key: string) => item[key] === options.where[key])
    })

    return obj
  }

  public async save<T extends DeepPartial<Entity>>(item: T): Promise<T & Entity> {
    this.items.push(item as Entity)
    return item as T & Entity
  }

  // public async update(id: number, item: Entity): Promise<void> {
  //   const index = this.items.findIndex((i: any) => i.id === id)
  //   if (index !== -1) {
  //     this.items[index] = item
  //   }
  // }

  public async delete(id: number): Promise<UpdateResult> {
    const index = this.items.findIndex((item: any) => item.id === id)
    const elem = this.items[index]
    if (index !== -1) {
      this.items.splice(index, 1)
    }

    return {
      raw: elem,
      generatedMaps: [],
    }
  }
}
