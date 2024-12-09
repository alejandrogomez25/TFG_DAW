package com.tfg.project.api.service;

import java.util.List;
import java.util.Optional;

import com.tfg.project.api.model.Mascota;

public interface IMascotaService {
	public List<Mascota> getMascota();
	public Mascota saveMascota(Mascota masc) ;
	public Optional<Mascota> getMascotaById(Integer id);
	public Mascota updateMascotaById(Mascota request,Integer id) ;
	public Boolean deleteMascota(Integer id) ;
	public List<Mascota> getMascotaByIdUsuario(Integer id);
}
