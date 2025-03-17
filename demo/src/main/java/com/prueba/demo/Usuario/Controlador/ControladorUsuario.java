package com.prueba.demo.Usuario.Controlador;

import com.prueba.demo.Configuracion.Seguridad.JwUtil;
import com.prueba.demo.Usuario.DTO.LoginDTO;
import com.prueba.demo.Usuario.DTO.UsuarioDTO;
import com.prueba.demo.Usuario.Modelo.Usuario;
import com.prueba.demo.Usuario.Servicio.ServicioUsuario;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/usuario")
public class ControladorUsuario {
    private final ServicioUsuario servicioUsuario;
    private final JwUtil jwUtil;
    private final BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

    public ControladorUsuario(ServicioUsuario servicioUsuario, JwUtil jwUtil){
        this.servicioUsuario = servicioUsuario;
        this.jwUtil = jwUtil;
    }
    @PostMapping("/Guardar")
    public ResponseEntity<?> guardarUsuario(@RequestBody UsuarioDTO usuarioDTO){
        servicioUsuario.registroUsuario(usuarioDTO);
        return ResponseEntity.ok().body("registrado");
    }
    @PostMapping("/Login")
    public ResponseEntity<?> login(@RequestBody LoginDTO loginDTO){
        try {
            Optional<UsuarioDTO> usuarioDTOOptional = servicioUsuario.buscarPorCorreo(loginDTO.getCorreo());
            if(usuarioDTOOptional.isEmpty()){
                return ResponseEntity.badRequest().body("no se pudo iniciar sesion");
            }
            UsuarioDTO usuarioDTO = usuarioDTOOptional.get();
            boolean validar = bCryptPasswordEncoder.matches(loginDTO.getContrasena(), usuarioDTO.getContrasenaDto());
            if(validar){
                String token = jwUtil.generarToken(usuarioDTO.getCorreoDto(),usuarioDTO.getIdDto(), usuarioDTO.getRolDto().getNombreRol());
                usuarioDTO.setToken(token);
                return ResponseEntity.ok(usuarioDTO);
            }
            return ResponseEntity.badRequest().body("hubo un problema con la token");

        }catch (Exception e){
            return ResponseEntity.badRequest().body(e);
        }
    }
    @GetMapping("/Consultar")
    public ResponseEntity<?> consultarUsuario(){
        try {
            List<UsuarioDTO> usuarioDTOList = servicioUsuario.consultarUsuarios();
            return ResponseEntity.ok(usuarioDTOList);
        }
        catch (Exception e){
            return ResponseEntity.badRequest().body(e);
        }
    }

}
