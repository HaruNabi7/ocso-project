import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProviderDto } from './dto/create-provider.dto.js';
import { UpdateProviderDto } from './dto/update-provider.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Provider } from './entities/provider.entity.js';
import { Repository, Like } from 'typeorm';
import { Product } from '../products/entities/product.entity.js';

@Injectable()
export class ProvidersService {
  constructor(
    @InjectRepository(Provider)
    private providerRepository: Repository<Provider>
  ){}
  create(createProviderDto: CreateProviderDto) {
    return this.providerRepository.save(createProviderDto)
  }

  findAll() {
    return this.providerRepository.find()
  }

  findOne(id: string) {
    return this.providerRepository.findOneBy({
      providerId: id
    })
  }

  async update(id: string, updateProviderDto: UpdateProviderDto) {  
    const product = await this.providerRepository.preload({
      providerId: id,
      ...updateProviderDto
    }) 
    return this.providerRepository.save(product!  );
  }

  async findOneByName(name:string){
    const provider = await this.providerRepository.findBy({
      providerName: Like(`%${name}%`)
    })
    if (!provider) throw new NotFoundException
    return provider
  }

  remove(id: string) {
    this.providerRepository.delete({
      providerId: id
    })
  }
}
