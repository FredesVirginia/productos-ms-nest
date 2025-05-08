import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { PrismaClient } from 'generated/prisma';

@Injectable()
export class ProductoService extends PrismaClient implements OnModuleInit {
  
  private readonly logger = new Logger('Producto servicio')
  onModuleInit() {
      this.$connect();
      this.logger.log("BASE DE DATOS CONECTADA")
  }
  
  create(createProductoDto: CreateProductoDto) {
    return this.product.create({
      data: createProductoDto
    })
  }

  findAll() {
    return this.product.findMany({})
  }

  findOne(id: number) {
    return `This action returns a #${id} producto`;
  }

  update(id: number, updateProductoDto: UpdateProductoDto) {
    return `This action updates a #${id} producto`;
  }

  remove(id: number) {
    return `This action removes a #${id} producto`;
  }
}
