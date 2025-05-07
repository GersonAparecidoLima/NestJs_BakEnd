import { Module } from '@nestjs/common';
import { ProdutoController } from './produto.controller';
import { ProdutoEntity } from './produto.entity';
import { ProdutoImagemEntity } from './produto-imagem.entity';
import { ProdutoCaracteristicaEntity } from './produto-caracteristica.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdutoService } from './produto.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProdutoEntity,
      ProdutoImagemEntity,
      ProdutoCaracteristicaEntity,
    ]),
  ],
  controllers: [ProdutoController],
  providers: [ProdutoService],
})
export class ProdutoModule {}
