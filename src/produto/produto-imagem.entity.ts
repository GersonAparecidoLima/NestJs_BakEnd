import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { ProdutoEntity } from './produto.entity';

@Entity('produto_imagens')
export class ProdutoImagemEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  url: string;

  @Column({ length: 255 })
  descricao: string;

  @ManyToOne(() => ProdutoEntity, (produto) => produto.imagens, {
    cascade: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    eager: false,
  })
  produto: ProdutoEntity;
}
