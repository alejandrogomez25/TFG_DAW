package com.tfg.project.api.repository;

import java.util.Optional;

import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.jpa.repository.JpaRepository;

import com.tfg.project.api.model.Usuario;

public interface UsuRepo extends JpaRepository<Usuario,Integer>{

    Optional<Usuario> findById(Integer id);

    
    void deleteById(Integer id);

	Usuario findByEmail(String email);


    Usuario findByNombre(String nombre);


}
