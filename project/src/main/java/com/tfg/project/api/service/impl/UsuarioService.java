package com.tfg.project.api.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.tfg.project.api.model.Usuario;
import com.tfg.project.api.repository.UsuRepo;
import com.tfg.project.api.service.IUsuarioService;

@Service
public class UsuarioService implements IUsuarioService{

    @Autowired
    UsuRepo usuRepo;

   
   
    
    @Override
    public List<Usuario> getUsers() {
		return (List<Usuario>) usuRepo.findAll();
    }

    @Override
    public Usuario saveUser(Usuario usu) {
        Usuario existeEmail = usuRepo.findByEmail(usu.getEmail());
        if (existeEmail != null) {
            throw new RuntimeException("Email ya asociado");
        }
        return usuRepo.save(usu);
    }

    @Override
    public Optional<Usuario> getUserById(Integer id) {
        return usuRepo.findById(id);

    }

   @Override
public Usuario updateUserById(Usuario request, Integer id) {
    Usuario usuario = usuRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Usuario not found"));
    
    if(usuario!=null){
        usuario.setNombre(request.getNombre());
        usuario.setApellido1(request.getApellido1());
        usuario.setApellido2(request.getApellido2());
        usuario.setDireccion(request.getDireccion());
        usuario.setCiudad(request.getCiudad());
        usuario.setCp(request.getCp());
        usuario.setEmail(request.getEmail());
        usuario.setFecha_nacimiento(request.getFecha_nacimiento());
        usuario.setTelefono(request.getTelefono());
        usuario.setBiografia(request.getBiografia());
        usuario.setFoto_perfil(request.getFoto_perfil());
        usuario.setRol(request.getRol());
        return usuRepo.save(usuario);
    }else{
        return null;
    }
       
    } 


    public Usuario getByEmail(String email){
		return usuRepo.findByEmail(email);
	}
	
    public Usuario getByName(String nombre){
	    return usuRepo.findByNombre(nombre);
	}

    @Override
    public Boolean deleteUser(Integer id) {
		try {
			usuRepo.deleteById(id);
			return true;
		}catch(Exception e) {
			return false;
		}
	}

@Override
public UserDetails loadUserByUsername(String email) {
    Usuario user = getByEmail(email);
 if (user == null) {
        throw new UsernameNotFoundException("User not found with email: " + email);
    }    List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
    authorities.add(new SimpleGrantedAuthority("ADMIN"));
    authorities.add(new SimpleGrantedAuthority("USER"));
    return new User(user.getEmail(),user.getPassword(),authorities);
}

}
