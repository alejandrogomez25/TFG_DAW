package com.tfg.project.api.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tfg.project.api.model.Anuncio;
import com.tfg.project.api.model.Usuario;

public interface AnuRepo extends JpaRepository<Anuncio,Integer>{
    List<Anuncio> findByAutor(Usuario autor);

    List<Anuncio> findByUsuarioReserva(Usuario usuarioReserva);

    List<Anuncio> findByTipo(String tipo);


}
