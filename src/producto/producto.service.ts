import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { PrismaClient } from 'generated/prisma';
import { PaginationDto } from 'src/common';

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
//PARAMETROS POR QUERY PARA LA PAGINACION
   async findAll(paginationDto : PaginationDto) {
    const { limit  , page} = paginationDto;
    const totalPages = await this.product.count();
    
     if(limit && page){
      return {
        data : await  this.product.findMany({
          skip : ( page -1 ) * limit,
          take : limit
        }), 
        meta : {
          page : page,
          totalPages : totalPages
        }
      }
     }

     return this.product.findMany({})
  }

  findOne(id: number) {
    return `This action returns a #${id} producto`;
  }

  async update(id: number, updateProductoDto: UpdateProductoDto) {
    const { id : _, ...data} = updateProductoDto;
    await this.findOne(id);
    return this.product.update({
      where : {id},
      data : data
    })
  }

  remove(id: number) {
    return `This action removes a #${id} producto`;
  }
}
