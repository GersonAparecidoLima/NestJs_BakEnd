import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ListaUsuarioDTO } from './dto/ListaUsuario.dto';
import { UsuarioEntity } from './usuario.entity';
import { Repository } from 'typeorm';
import { AtualizaUsuarioDTO } from './dto/AtualizaUsuario.dto';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
  ) {}

  async criaUsuario(usuarioEntity: UsuarioEntity) {
    await this.usuarioRepository.save(usuarioEntity);
  }

  async listUsuarios() {
    const usuariosSalvos = await this.usuarioRepository.find();
    const usuariosLista = usuariosSalvos.map(
      (usuario) => new ListaUsuarioDTO(usuario.id, usuario.nome),
    );
    return usuariosLista;
  }

    // Método para listar todos os usuários
    async listTodosUsuarios() {
      const usuariosSalvos = await this.usuarioRepository.find();
      const usuariosLista = usuariosSalvos.map(
        (usuario) => new ListaUsuarioDTO(usuario.id, usuario.nome),
      );
      return usuariosLista;
    }
 

    async listUsuarioPorId(id: string) {
      // Passando o ID dentro de um objeto como critério de busca
      const usuario = await this.usuarioRepository.findOne({
        where: { id },  // Aqui estamos especificando que a busca será feita pelo campo 'id'
      });
    
      if (!usuario) {
        return null; // Retorna null caso o usuário não seja encontrado
      }
    
      // Mapeando o usuário para o DTO
      const usuarioDTO = new ListaUsuarioDTO(usuario.id, usuario.nome);
    
      return usuarioDTO;  // Retorna o DTO do usuário
    }
  
  




  async buscaPorEmail(email: string) {
    const checkEmail = await this.usuarioRepository.findOne({
      where: { email },
    });
    return checkEmail;
  }

  async atualizaUsuario(id: string, novosDados: AtualizaUsuarioDTO) {
    await this.usuarioRepository.update(id, novosDados);
  }

  async deletaUsuario(id: string) {
    await this.usuarioRepository.delete(id);
  }
}
