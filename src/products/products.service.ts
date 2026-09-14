import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';
import {v4 as uuid} from 'uuid';
import { NotFoundError } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity.js';
import { Repository } from 'typeorm';
@Injectable()
export class ProductsService {
  constructor(@InjectRepository(Product)
    private ProductRepository: Repository<Product>){

  }
  private products : CreateProductDto[] = [
    {
      producId:  uuid(),
      productName: 'sabritas 40g',
      price: 29,
      countSeal: 3,
      provider: uuid(),
    },
    {
      producId:  uuid(),
      productName: 'Coca Cola 600ml',
      price: 40,
      countSeal: 2,
      provider: uuid(),
    },
    {
      producId:  uuid(),
      productName: 'Agua Ciel 1L',
      price: 15,
      countSeal: 2,
      provider: uuid(),
    }
  ] 
  create(createProductDto: CreateProductDto) {  
    const product = this.ProductRepository.save(createProductDto)
      return product;
   
    }
  findAll() {
    return this.ProductRepository.find();
    
  }
async findOne(id: string) {
  const product = await this.ProductRepository.findOneBy({
    producId: id, // o producId, según cómo lo tengas en la entity
  });
  if (!product) throw new NotFoundException();
  return product;
}
  findByProvider(id: string){
    const productsFound = this.products.filter((product) => product.provider === id)
      if (productsFound.length === 0) throw new NotFoundException()
        return productsFound;
  }
  async update(id: string, updateProductDto: UpdateProductDto) {
  const productToUpdate = await this.ProductRepository.preload({
    producId: id,
    ...updateProductDto
  })
  if (!productToUpdate) throw new NotFoundException()
  this.ProductRepository.save(productToUpdate);
  return productToUpdate;
}
remove(id: string) {
  this.findOne(id)
  this.ProductRepository.delete({
    producId: id,
  })
  return {
    message: `Objeto con id ${id} eliminado`
  }
}
}