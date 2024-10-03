import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { CreateProductDto } from 'src/common/dto/create-product.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { UpdateProductDto } from 'src/common/dto/update-product.dto';
import { NATS_SERVICE } from 'src/config';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy
  ) { }


  @Post()
  async createProduct(@Body() createProductDto: CreateProductDto) {
    try {
      const product = await firstValueFrom(
        this.client.send({ cmd: 'create_product' }, createProductDto)
      )

      return product
    } catch (error) {
      throw new RpcException(error)
    }
  }

  @Get()
  async findAllProducts(@Query() paginationDto: PaginationDto) {
    try {
      const products = await firstValueFrom(
        this.client.send({ cmd: 'get_products' }, paginationDto)
      );

      return products

    } catch (error) {
      throw new RpcException(error)
    }
  }

  @Get(':id')
  async findProduct(@Param('id') id: number) {

    try {

      const product = await firstValueFrom(
        this.client.send({ cmd: 'get_one_product' }, { id })
      );
      return product;

    } catch (error) {

      throw new RpcException(error);
    }
  }

  @Patch(':id')
  async updateProduct(@Param('id', ParseIntPipe) id: number, @Body() updateProductDto: UpdateProductDto) {

    try {
      
      const product = await firstValueFrom(
        this.client.send({ cmd: 'update_product' }, {
          id,
          ...updateProductDto
        })
      );
      return product;

    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: number) {
    try {
      return await firstValueFrom(
        this.client.send({ cmd: 'delete_product' }, { id })
      )
    } catch (error) {
      throw new RpcException(error)
    }
  }


}
