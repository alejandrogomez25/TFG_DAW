package com.tfg.project.api.service.impl;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tfg.project.api.model.Anuncio;
import com.tfg.project.api.model.Usuario;
import com.tfg.project.api.repository.AnuRepo;
import com.tfg.project.api.service.IAnuncioService;
@Service
public class AnuncioService implements IAnuncioService{

    @Autowired
    UsuarioService usuSrv;

    @Autowired
    AnuRepo anuncioRepo;

    @Override
    public List<Anuncio> getAnuncio() {
        return (List<Anuncio>) anuncioRepo.findAll();
    }

    @Override
    public Anuncio saveAnuncio(Anuncio anuncio) {
        return anuncioRepo.save(anuncio);
    }

    @Override
    public Optional<Anuncio> getAnuncioById(Integer id) {
        return anuncioRepo.findById(id);
    }

    @Override
    public Anuncio updateAnuncioById(Anuncio request, Integer id) {
        Anuncio anuncio = anuncioRepo.findById(id).orElse(null);
        if (anuncio != null) {
            anuncio.setTipo(request.getTipo());
            anuncio.setFecha(request.getFecha());
            anuncio.setHora_inicio(request.getHora_inicio());
            anuncio.setHora_fin(request.getHora_fin());
            anuncio.setDescripcion(request.getDescripcion());
            anuncio.setAutor(request.getAutor());
            anuncio.setUsuarioReserva(request.getUsuarioReserva());
            anuncio.setPrecio(request.getPrecio());

            return anuncioRepo.save(anuncio);
        } else {
            return null;
        }
    }


    
    @Override
    public Boolean deleteAnuncio(Integer id) {
        try {
            anuncioRepo.deleteById(id);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

  @Override
    public List<Anuncio> getAnuncioByAutor(Integer id) {
        Usuario autor = usuSrv.getUserById(id).orElse(null);
        if (autor != null) {
            return anuncioRepo.findByAutor(autor);
        } else {
            return new ArrayList<>();
        }
    }

    @Override
    public List<Anuncio> getAnuncioByUsuarioReserva(Integer id) {
        Usuario usuarioReserva = usuSrv.getUserById(id).orElse(null);
        if (usuarioReserva != null) {
            return anuncioRepo.findByUsuarioReserva(usuarioReserva);
        } else {
            return new ArrayList<>();
        }
    }


    public List<Anuncio> getAnuncioByTipo(String tipo) {
        return anuncioRepo.findByTipo(tipo);
    }
    
}
