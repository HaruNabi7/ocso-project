import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';
import {v4 as uuid} from 'uuid';
import { NotFoundError } from 'rxjs';
@Injectable()
export class ProductsService {
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
    if(!createProductDto.producId) createProductDto.producId = uuid()
    createProductDto.producId = uuid();
    this.products.push(createProductDto)
      return createProductDto;
    }
  findAll() {
    return this.products;
    
  }

  findOne(id: string) {
    const productFound = this.products.filter((product) => product.producId === id)[0]
    if (!productFound) throw new NotFoundException()
      return productFound;
  }
  findByProvider(id: string){
    const productsFound = this.products.filter((product) => product.provider === id)
      if (productsFound.length === 0) throw new NotFoundException()
        return productsFound;
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    let product = this.findOne(id)
    this.products = this.products.map((product) => {
     if (product.producId === id) return{
      ...product,
      ...updateProductDto
     }
    return product;
  })
  return {
    ...product,
    ...updateProductDto
  }
}

  remove(id: string ) {
    const {producId} = this.findOne(id)
    this.products = this.products.filter((product) => product.producId != producId)
    return this.products;
  }
}
