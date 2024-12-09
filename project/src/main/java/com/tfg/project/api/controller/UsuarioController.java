package com.tfg.project.api.controller;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.jersey.JerseyProperties.Servlet;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.tfg.project.api.model.Anuncio;
import com.tfg.project.api.model.LoginRequest;
import com.tfg.project.api.model.Mascota;
import com.tfg.project.api.model.Usuario;
import com.tfg.project.api.repository.AnuRepo;
import com.tfg.project.api.service.StorageService;
import com.tfg.project.api.service.impl.MascotaService;
import com.tfg.project.api.service.impl.UsuarioService;
import com.tfg.project.security.TokenUtils;


@RestController
@RequestMapping("/usuario")
@EnableMethodSecurity(prePostEnabled = true)
public class UsuarioController {

    @Autowired
    AnuRepo anuncioRepository;

    @Autowired
    UsuarioService usuSrv;

    @Autowired 
    MascotaService mascotaSrv;
   
@GetMapping 
   public List<Usuario> getUsers(){
	   return this.usuSrv.getUsers();
   }


   @PostMapping("/login") 
   public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
       Usuario usuario = usuSrv.getByEmail(loginRequest.getEmail());
       if (usuario == null) {
           return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("No estás autorizado");
       } else {
           BCryptPasswordEncoder bcrypt = new BCryptPasswordEncoder();
           if (bcrypt.matches(loginRequest.getPassword(), usuario.getPassword())) {
               String token = TokenUtils.createToken(usuario.getEmail());
               return ResponseEntity.ok(Map.of("token", token, "usuario", usuario));
           } else {
               return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Contraseña incorrecta");
           }
       }
   }
   
   @PostMapping(path = "/createUser")
   public Usuario saveUser(
           @RequestParam("nombre") String nombre,
           @RequestParam("apellido1") String apellido1,
           @RequestParam("apellido2") String apellido2,
           @RequestParam("direccion") String direccion,
           @RequestParam("ciudad") String ciudad,
           @RequestParam("cp") Integer cp,
           @RequestParam("email") String email,
           @RequestParam("fecha_nacimiento") @DateTimeFormat(pattern = "yyyy-MM-dd") Date fechaNacimiento,
           @RequestParam("telefono") String telefono,
           @RequestParam("biografia") String biografia,
           @RequestParam("password") String password,
           @RequestParam("file") MultipartFile file) {
   
       BCryptPasswordEncoder bcrypt = new BCryptPasswordEncoder();
       String encryptedPwd = bcrypt.encode(password);
   
       Usuario user = new Usuario();
       user.setNombre(nombre);
       user.setApellido1(apellido1);
       user.setApellido2(apellido2);
       user.setDireccion(direccion);
       user.setCiudad(ciudad);
       user.setCp(cp);
       user.setEmail(email);
       user.setFecha_nacimiento(fechaNacimiento);
       user.setTelefono(telefono);
       user.setBiografia(biografia);
       user.setPassword(encryptedPwd);
       user.setRol("usuario"); 
       if (!file.isEmpty()) {
        Path dirImg = Paths.get("src/main/resources/static/img");
        String rutaAbs = dirImg.toFile().getAbsolutePath();
        try {
            byte[] bytesFile = file.getBytes();
            String nombreAleatorio = UUID.randomUUID().toString()+"_"+file.getOriginalFilename();
            Path rutaCompleta = Paths.get(rutaAbs + "/" + nombreAleatorio);
            Files.write(rutaCompleta, bytesFile);
            user.setFoto_perfil(nombreAleatorio);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
   
       System.out.println("Usuario: " + user.toString());
       return this.usuSrv.saveUser(user);
   }
   
    
   /*@PostMapping(path ="/createUser")
public Usuario saveUser(@Validated @RequestBody Usuario user, @RequestParam("file") MultipartFile file) {
    BCryptPasswordEncoder bcrypt = new BCryptPasswordEncoder();
    String encryptedPwd = bcrypt.encode(user.getPassword());
    user.setPassword(encryptedPwd);

    System.out.println("Usuario: " + user.toString());
    return this.usuSrv.saveUser(user);
}*/

   
   
   @GetMapping(path="/{id}")
   public ResponseEntity<Usuario> getUserById(@PathVariable("id") Integer id){
       Optional<Usuario> usuarioOptional = this.usuSrv.getUserById(id);
       if(usuarioOptional.isPresent()) {
           return ResponseEntity.ok(usuarioOptional.get());
       } else {
           return ResponseEntity.notFound().build();
       }
   }


   @PutMapping("/{id}")
public ResponseEntity<Usuario> updateUserById(
        @RequestParam("nombre") String nombre,
        @RequestParam(value = "apellido1", required = false) String apellido1,
        @RequestParam(value = "apellido2", required = false) String apellido2,
        @RequestParam(value = "direccion", required = false) String direccion,
        @RequestParam(value = "ciudad", required = false) String ciudad,
        @RequestParam(value = "cp", required = false) Integer cp,
        @RequestParam("email") String email,
        @RequestParam("fecha_nacimiento") @DateTimeFormat(pattern = "yyyy-MM-dd") Date fechaNacimiento,
        @RequestParam(value = "telefono", required = false) String telefono,
        @RequestParam(value = "biografia", required = false) String biografia,
        @RequestParam(value = "password", required = false) String password,
        @RequestParam(value = "foto_perfil", required = false) MultipartFile foto_perfil,
        @PathVariable("id") Integer id) {

    Optional<Usuario> usuarioOptional = usuSrv.getUserById(id);
    if (usuarioOptional.isPresent()) {
        Usuario usuario = usuarioOptional.get();
        usuario.setNombre(nombre);
        usuario.setApellido1(apellido1);
        usuario.setApellido2(apellido2);
        usuario.setDireccion(direccion);
        usuario.setCiudad(ciudad);
        usuario.setCp(cp);
        usuario.setEmail(email);
        usuario.setFecha_nacimiento(fechaNacimiento);
        usuario.setTelefono(telefono);
        usuario.setBiografia(biografia);

        BCryptPasswordEncoder bcrypt = new BCryptPasswordEncoder();
        
        if (password != null && !password.isEmpty()) {
            if (password.startsWith("$2a$") && password.length() == 60) {
                System.out.println("Contraseña proporcionada ya está cifrada.");
            } else {
                String encryptedPwd = bcrypt.encode(password);
                usuario.setPassword(encryptedPwd);
                System.out.println("Contraseña actualizada. Nueva contraseña cifrada: " + encryptedPwd);
            }
        } else {
            System.out.println("No se proporcionó nueva contraseña. Manteniendo la contraseña existente.");
        }

        if (foto_perfil != null && !foto_perfil.isEmpty()) {
            Path dirImg = Paths.get("src/main/resources/static/img");
            String rutaAbs = dirImg.toFile().getAbsolutePath();
            try {
                byte[] bytesFile = foto_perfil.getBytes();
                String nombreAleatorio = UUID.randomUUID().toString() + "_" + foto_perfil.getOriginalFilename();
                Path rutaCompleta = Paths.get(rutaAbs + "/" + nombreAleatorio);
                Files.write(rutaCompleta, bytesFile);
                usuario.setFoto_perfil(nombreAleatorio);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        usuSrv.updateUserById(usuario, id);
        return ResponseEntity.ok(usuario);
    } else {
        return ResponseEntity.notFound().build();
    }
}


    /*@DeleteMapping("/{id}")
    public String deleteUsuario(@PathVariable Integer id) {
        Usuario usuario = usuSrv.getUserById(id).orElseThrow(() -> new ResourceNotFoundException("Usuario not found"));

        List<Anuncio> anunciosAutor = anuncioRepository.findByAutor(usuario);
        anuncioRepository.deleteAll(anunciosAutor);

        List<Anuncio> anunciosReservados = anuncioRepository.findByUsuarioReserva(usuario);
        for (Anuncio anuncio : anunciosReservados) {
            anuncio.setUsuarioReserva(null);
            anuncioRepository.save(anuncio);
        }

        boolean ok = this.usuSrv.deleteUser(id);
        if(ok) {
            return "Usuario con ID "+id+" borrado con éxito";
        }else {
            return "Error";
        }    
    
    }*/
       @DeleteMapping("/{id}")
    public String deleteUsuario(@PathVariable Integer id) {
        Usuario usuario = usuSrv.getUserById(id).orElseThrow(() -> new ResourceNotFoundException("Usuario not found"));

        // Eliminar anuncios del autor
        List<Anuncio> anunciosAutor = anuncioRepository.findByAutor(usuario);
        anuncioRepository.deleteAll(anunciosAutor);

        // Eliminar anuncios reservados
        List<Anuncio> anunciosReservados = anuncioRepository.findByUsuarioReserva(usuario);
        for (Anuncio anuncio : anunciosReservados) {
            anuncio.setUsuarioReserva(null);
            anuncioRepository.save(anuncio);
        }

        // Obtener y eliminar mascotas asociadas al usuario
        List<Mascota> mascotas = mascotaSrv.getMascotaByIdUsuario(usuario.getIdUsuario());
        for (Mascota mascota : mascotas) {
            mascotaSrv.deleteMascota(mascota.getIdMascota());
        }

        // Eliminar el usuario
        boolean ok = this.usuSrv.deleteUser(id);
        if(ok) {
            return "Usuario con ID "+id+" borrado con éxito, junto con sus mascotas";
        }else {
            return "Error al borrar el usuario con ID "+id;
        }
    }

}


