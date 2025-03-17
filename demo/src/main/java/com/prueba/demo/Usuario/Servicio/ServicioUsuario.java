package com.prueba.demo.Usuario.Servicio;

import com.prueba.demo.Usuario.DTO.UsuarioDTO;
import com.prueba.demo.Usuario.Modelo.Estado;
import com.prueba.demo.Usuario.Modelo.Rol;
import com.prueba.demo.Usuario.Modelo.Usuario;
import com.prueba.demo.Usuario.Repositorio.RepositorioEstado;
import com.prueba.demo.Usuario.Repositorio.RepositorioRol;
import com.prueba.demo.Usuario.Repositorio.RepositorioUsuario;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ServicioUsuario implements ServicioUsuarioMinimal {
    private final RepositorioUsuario repositorioUsuario;
    private final BCryptPasswordEncoder bCryptPasswordEncoder ;
    private final RepositorioRol repositorioRol;
    private final RepositorioEstado repositorioEstado;

    public ServicioUsuario (RepositorioEstado repositorioEstado,RepositorioUsuario repositorioUsuario, BCryptPasswordEncoder bCryptPasswordEncoder, RepositorioRol repositorioRol){
        this.repositorioUsuario = repositorioUsuario;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.repositorioRol = repositorioRol;
        this.repositorioEstado = repositorioEstado;
    }

    public void registroUsuario(UsuarioDTO usuarioDTO){

        Usuario usuario = new Usuario();
        Rol rol = repositorioRol.findById(usuarioDTO.getRolDto().getIdDto());
        Estado estado = repositorioEstado.findById(usuarioDTO.getIdDto());
        String contrasenaEncriptada = bCryptPasswordEncoder.encode(usuarioDTO.getContrasenaDto());
        usuarioDTO.setContrasenaDto(contrasenaEncriptada);
        usuarioDTOToEntity(usuarioDTO, usuario, rol, estado);
        repositorioUsuario.save(usuario);
    }

    public List<UsuarioDTO> consultarUsuarios(){
        return repositorioUsuario.findAll().stream().map(this::usuarioEntityToDTO).toList();
    }
    @Override
    public Optional<UsuarioDTO> buscarPorCorreo(String correo){
        return repositorioUsuario.findByCorreo(correo).map(this::usuarioEntityToDTO);
    }

    public UsuarioDTO usuarioEntityToDTO(Usuario usuario){
        UsuarioDTO usuarioDTO = new UsuarioDTO();
        usuarioDTO.setIdDto(usuario.getId());
        usuarioDTO.setCorreoDto(usuario.getCorreo());
        usuarioDTO.setContrasenaDto(usuario.getContrasena());
        usuarioDTO.setEstadoDto(usuario.getEstado().getId());
        usuarioDTO.setDireccionDto(usuario.getDireccion());
        usuarioDTO.setApellidoDto(usuario.getApellido());
        usuarioDTO.setNombreDto(usuario.getNombre());
        usuarioDTO.setDocumentoDto(usuario.getDocumento());
        usuarioDTO.setProfesionDto(usuario.getProfesion());
        usuarioDTO.setEspecialidadDto(usuario.getEspecialidad());
        UsuarioDTO.RolDto rolDto = new UsuarioDTO.RolDto();
        rolDto.setIdDto(usuario.getRol().getId());
        rolDto.setNombreRol(usuario.getRol().getNombreRol());
        usuarioDTO.setRolDto(rolDto);
        return usuarioDTO;
    }

    public void usuarioDTOToEntity(UsuarioDTO usuarioDTO, Usuario usuario, Rol rol, Estado estado){
        usuario.setNombre(usuarioDTO.getNombreDto());
        usuario.setApellido(usuarioDTO.getApellidoDto());
        usuario.setContrasena(usuarioDTO.getContrasenaDto());
        usuario.setCorreo(usuarioDTO.getCorreoDto());
        usuario.setEstado(estado);
        usuario.setDireccion(usuarioDTO.getDireccionDto());
        usuario.setDocumento(usuarioDTO.getDocumentoDto());
        usuario.setEspecialidad(usuarioDTO.getEspecialidadDto());
        usuario.setProfesion(usuarioDTO.getProfesionDto());
        usuario.setFechaNacimiento(usuarioDTO.getFechaNacimientoDto());
        usuario.setRol(rol);


    }
}
