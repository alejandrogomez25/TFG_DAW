package com.tfg.project.api.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.tfg.project.api.model.Anuncio;
import com.tfg.project.api.service.impl.AnuncioService;

@RestController
@RequestMapping("/anuncio")
public class AnuncioController {

    @Autowired
    private AnuncioService anuncioSrv;

    @GetMapping
    public List<Anuncio> getAnuncios() {
        return anuncioSrv.getAnuncio();
    }

    @PostMapping(path = "/createAnuncio")
    public Anuncio saveAnuncio(@Validated @RequestBody Anuncio anuncio) {
        return anuncioSrv.saveAnuncio(anuncio);
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<Anuncio> getAnuncioById(@PathVariable("id") Integer id) {
        Optional<Anuncio> anuncioOptional = anuncioSrv.getAnuncioById(id);
        if (anuncioOptional.isPresent()) {
            return ResponseEntity.ok(anuncioOptional.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping(path = "/tipo/{tipo}")
    public List<Anuncio> getAnuncioByTipo(@PathVariable("tipo") String tipo) {
        return anuncioSrv.getAnuncioByTipo(tipo);
    }
    
    

    @PutMapping(path = "/update/{id}")
    public Anuncio updateAnuncioById(@RequestBody Anuncio request, @PathVariable Integer id) {
        return anuncioSrv.updateAnuncioById(request, id);
    }

    @DeleteMapping(path = "/{id}")
    public String deleteAnuncio(@PathVariable("id") Integer id) {
        boolean deleted = anuncioSrv.deleteAnuncio(id);
        if (deleted) {
            return "Anuncio con ID " + id + " eliminado con éxito";
        } else {
            return "No se pudo eliminar el anuncio con ID " + id;
        }
    }
    @GetMapping(path = "/autor/{id}")
    public List<Anuncio> getAnuncioByAutor(@PathVariable("id") Integer id) {
        return anuncioSrv.getAnuncioByAutor(id);
    }

    @GetMapping(path = "/usuarioReserva/{id}")
    public List<Anuncio> getAnuncioByUsuarioReserva(@PathVariable("id") Integer id) {
        return anuncioSrv.getAnuncioByUsuarioReserva(id);
    }

}
