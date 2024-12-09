package com.tfg.project.api.controller;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.tfg.project.api.model.Mascota;
import com.tfg.project.api.service.impl.MascotaService;

@RestController
@RequestMapping("/mascota")
public class MascotaController {

    @Autowired
    private MascotaService mascotaSrv;

    @GetMapping
    public List<Mascota> getMascota() {
        return mascotaSrv.getMascota();
    }

   /*@PostMapping
    public Mascota saveMascota(@Validated @RequestBody Mascota mascota) {
        return mascotaSrv.saveMascota(mascota);
    }*/

@PostMapping(path = "/createMascota")
public Mascota saveMascota(
        @RequestParam("nombre") String nombre,
        @RequestParam("tipo_mascota") String tipoMascota,
        @RequestParam("raza") String raza,
        @RequestParam("peso") Integer peso,
        @RequestParam("foto1") MultipartFile foto1,
        @RequestParam("edad") Integer edad,
        @RequestParam("sexo") String sexo,
        @RequestParam("descripcion") String descripcion,
        @RequestParam("cuidados") String cuidados,
        @RequestParam("id_usuario") Integer idUsuario) {

    Mascota mascota = new Mascota();
    mascota.setNombre(nombre);
    mascota.setTipo_mascota(tipoMascota);
    mascota.setRaza(raza);
    mascota.setPeso(peso);
    mascota.setEdad(edad);
    mascota.setSexo(sexo);
    mascota.setDescripcion(descripcion);
    mascota.setCuidados(cuidados);
    mascota.setIdUsuario(idUsuario);

    if (!foto1.isEmpty()) {
      Path dirImg = Paths.get("src/main/resources/static/img");
        String rutaAbs = dirImg.toFile().getAbsolutePath();
        try {
            byte[] bytesFile = foto1.getBytes();
            String nombreAleatorio = UUID.randomUUID().toString()+"_"+foto1.getOriginalFilename();
            Path rutaCompleta = Paths.get(rutaAbs + "/" + nombreAleatorio);
            Files.write(rutaCompleta, bytesFile);
            mascota.setFoto1(nombreAleatorio);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    System.out.println("Mascota: " + mascota.toString());
    return this.mascotaSrv.saveMascota(mascota);
}


    @GetMapping(path = "/{id}")
    public ResponseEntity<Mascota> getMascotaById(@PathVariable("id") Integer id) {
        Optional<Mascota> mascotaOptional = mascotaSrv.getMascotaById(id);
        if (mascotaOptional.isPresent()) {
            return ResponseEntity.ok(mascotaOptional.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping(path = "/{id}")
public ResponseEntity<Mascota> updateMascotaById(
        @RequestParam("nombre") String nombre,
        @RequestParam("tipo_mascota") String tipoMascota,
        @RequestParam("raza") String raza,
        @RequestParam("peso") Integer peso,
        @RequestParam(value = "foto", required = false) MultipartFile foto,
        @RequestParam("edad") Integer edad,
        @RequestParam("sexo") String sexo,
        @RequestParam("descripcion") String descripcion,
        @RequestParam("cuidados") String cuidados,
        @RequestParam("id_usuario") Integer idUsuario, @PathVariable("id") Integer id) {
    
        Optional<Mascota> mascotaOptional = mascotaSrv.getMascotaById(id);
        if (mascotaOptional.isPresent()) {
            Mascota mascota = mascotaOptional.get();
            mascota.setNombre(nombre);
            mascota.setTipo_mascota(tipoMascota);
            mascota.setRaza(raza);
            mascota.setPeso(peso);
            mascota.setEdad(edad);
            mascota.setSexo(sexo);
            mascota.setDescripcion(descripcion);
            mascota.setCuidados(cuidados);
            mascota.setIdUsuario(idUsuario);
    
            if (foto != null && !foto.isEmpty()) {
                Path dirImg = Paths.get("src/main/resources/static/img");
                String rutaAbs = dirImg.toFile().getAbsolutePath();
                try {
                    byte[] bytesFile = foto.getBytes();
                    String nombreAleatorio = UUID.randomUUID().toString() + "_" + foto.getOriginalFilename();
                    Path rutaCompleta = Paths.get(rutaAbs + "/" + nombreAleatorio);
                    Files.write(rutaCompleta, bytesFile);
                    mascota.setFoto1(nombreAleatorio);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
    
            mascotaSrv.updateMascotaById(mascota, id);
            return ResponseEntity.ok(mascota);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    

   /* @PutMapping(path = "/{id}")
    public Mascota updateMascotaById(@RequestBody Mascota request, @PathVariable Integer id) {
        return mascotaSrv.updateMascotaById(request, id);
    }*/

    @DeleteMapping(path = "/{id}")
    public String deleteMascota(@PathVariable("id") Integer id) {
        boolean deleted = mascotaSrv.deleteMascota(id);
        if (deleted) {
            return "Mascota con ID " + id + " eliminada con éxito";
        } else {
            return "No se pudo eliminar la mascota con ID " + id;
        }
    }

    @GetMapping("/mascotas/{idUsuario}")
    public List<Mascota> getMascotasByIdUsuario(@PathVariable Integer idUsuario) {
        return mascotaSrv.getMascotaByIdUsuario(idUsuario);
    }
}
