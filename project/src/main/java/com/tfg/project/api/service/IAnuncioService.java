package com.tfg.project.api.service;

import java.util.List;
import java.util.Optional;

import com.tfg.project.api.model.Anuncio;

public interface IAnuncioService {
	public List<Anuncio> getAnuncio();
	public Anuncio saveAnuncio(Anuncio anun) ;
	public Optional<Anuncio> getAnuncioById(Integer id);
	public Anuncio updateAnuncioById(Anuncio request,Integer id) ;
	public Boolean deleteAnuncio(Integer id) ;
	public List<Anuncio> getAnuncioByAutor(Integer id);
	public List<Anuncio> getAnuncioByUsuarioReserva(Integer id);
	public List<Anuncio> getAnuncioByTipo(String tipo);
}
