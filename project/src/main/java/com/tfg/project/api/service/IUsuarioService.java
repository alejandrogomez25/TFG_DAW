package com.tfg.project.api.service;

import java.util.List;
import java.util.Optional;

import org.springframework.security.core.userdetails.UserDetails;

import com.tfg.project.api.model.Usuario;

public interface IUsuarioService {
	public List<Usuario> getUsers();
	public Usuario saveUser(Usuario usu) ;
	public Optional<Usuario> getUserById(Integer id);
	public Usuario updateUserById(Usuario request,Integer id) ;
	public Boolean deleteUser(Integer id) ;
	public UserDetails loadUserByUsername(String nombre);
	public Usuario getByEmail(String email);
	public Usuario getByName(String nombre);
		
}
