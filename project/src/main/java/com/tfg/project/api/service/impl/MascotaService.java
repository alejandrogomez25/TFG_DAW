
package com.tfg.project.api.service.impl;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tfg.project.api.model.Anuncio;
import com.tfg.project.api.model.Mascota;
import com.tfg.project.api.repository.MascRepo;
import com.tfg.project.api.service.IMascotaService;

@Service
public class MascotaService implements IMascotaService {
    @Autowired
    MascRepo mascRepo;

    @Override
    public List<Mascota> getMascota() {
		return (List<Mascota>) mascRepo.findAll();
    }

    @Override
    public Mascota saveMascota(Mascota masc) {
		return mascRepo.save(masc);
    }

    @Override
    public Optional<Mascota> getMascotaById(Integer id) {
        return mascRepo.findById(id);

    }

    @Override
    public Mascota updateMascotaById(Mascota request, Integer id) {
        Mascota masc = mascRepo.findById(id).orElse(null);
        if (masc != null) {
            masc.setNombre(request.getNombre());
            masc.setTipo_mascota(request.getTipo_mascota());
            masc.setRaza(request.getRaza());
            masc.setPeso(request.getPeso());
            masc.setFoto1(request.getFoto1());
            masc.setEdad(request.getEdad());
            masc.setSexo(request.getSexo());
            masc.setDescripcion(request.getDescripcion());
            masc.setCuidados(request.getCuidados());
            masc.setIdUsuario(request.getIdUsuario());
            return mascRepo.save(masc);
        } else {
            return null;
        }
    }
    

    @Override
    public Boolean deleteMascota(Integer id) {
		try {
			mascRepo.deleteById(id);
			return true;
		}catch(Exception e) {
			return false;
		}
	}



@Override
public List<Mascota> getMascotaByIdUsuario(Integer idUsuario) {
  return mascRepo.findByIdUsuario(idUsuario);
}

}
