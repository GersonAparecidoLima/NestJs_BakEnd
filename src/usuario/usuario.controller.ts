import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { AtualizaUsuarioDTO } from './dto/AtualizaUsuario.dto';
import { CriaUsuarioDTO } from './dto/CriaUsuario.dto';
import { ListaUsuarioDTO } from './dto/ListaUsuario.dto';
import { UsuarioEntity } from './usuario.entity';
import { UsuarioService } from './usuario.service';

@Controller('/usuarios')
export class UsuarioController {
  constructor(private usuarioService: UsuarioService) {}


  /*
  @Post()
  async criaUsuario(@Body() dadosDoUsuario: CriaUsuarioDTO) {
    const usuarioEntity = new UsuarioEntity();
    usuarioEntity.email = dadosDoUsuario.email;
    usuarioEntity.senha = dadosDoUsuario.senha;
    usuarioEntity.nome = dadosDoUsuario.nome;
    usuarioEntity.id = uuid();

    this.usuarioService.criaUsuario(usuarioEntity);

    return {
      usuario: new ListaUsuarioDTO(usuarioEntity.id, usuarioEntity.nome),
      messagem: 'usuário criado com sucesso',
    };
  }
*/

@Post()
async criaUsuario(@Body() dadosDoUsuario: CriaUsuarioDTO) {
  //chegada no backend
  //console.log('Dados recebidos no backend:', dadosDoUsuario); // Log dos dados recebidos

  const usuarioEntity = new UsuarioEntity();
  usuarioEntity.email = dadosDoUsuario.email;
  usuarioEntity.senha = dadosDoUsuario.senha;
  usuarioEntity.nome = dadosDoUsuario.nome;
  usuarioEntity.id = uuid();

  // Aguarde a operação de criação do usuário no banco
  await this.usuarioService.criaUsuario(usuarioEntity);

  return {
    usuario: new ListaUsuarioDTO(usuarioEntity.id, usuarioEntity.nome),
    messagem: 'usuário criado com sucesso',
  };
}



   // Endpoint para listar todos os usuários
   @Get()
   async listTodosUsuarios() {
     // Chama o método do serviço para listar todos os usuários
     const usuariosSalvos = await this.usuarioService.listTodosUsuarios();
     return usuariosSalvos;  // Retorna todos os usuários
   }
 
   // Endpoint para listar um usuário específico por ID
   @Get('/:id')
   async listUsuarioPorId(@Param('id') id: string) {
     // Chama o método do serviço para listar um usuário específico por ID
     const usuario = await this.usuarioService.listUsuarioPorId(id);
 
     if (!usuario) {
       return { message: 'Usuário não encontrado' };  // Retorna uma mensagem caso não encontre o usuário
     }
 
     return usuario;  // Retorna o usuário encontrado
   }


  @Put('/:id')
  async atualizaUsuario(
    @Param('id') id: string,
    @Body() novosDados: AtualizaUsuarioDTO,
  ) {
    const usuarioAtualizado = await this.usuarioService.atualizaUsuario(
      id,
      novosDados,
    );

    return {
      usuario: usuarioAtualizado,
      messagem: 'usuário atualizado com sucesso',
    };
  }

  @Delete('/:id')
  async removeUsuario(@Param('id') id: string) {
    const usuarioRemovido = await this.usuarioService.deletaUsuario(id);

    return {
      usuario: usuarioRemovido,
      messagem: 'usuário removido com suceso',
    };
  }
}
