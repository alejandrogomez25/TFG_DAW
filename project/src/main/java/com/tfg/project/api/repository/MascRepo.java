package com.tfg.project.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tfg.project.api.model.Mascota;

public interface MascRepo extends JpaRepository<Mascota,Integer>{
    List<Mascota> findByIdUsuario(Integer idUsuario);

}
