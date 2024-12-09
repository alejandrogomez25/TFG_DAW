
package com.tfg.project.api.model;

import java.io.Serializable;
import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Entity
@Table(name="anuncio")
@AllArgsConstructor
@NoArgsConstructor
public class Anuncio  implements Serializable{
private static final long serialVersionUID = 1L;
    
@Id
@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "anuncio_seq")
@SequenceGenerator(name = "anuncio_seq", sequenceName = "sec_anuncio", allocationSize = 1)
@Column(name = "id_anuncio")
private Integer idAnuncio;

    @Column(name = "tipo_anuncio")
    private String tipo;

    @Column(name = "fecha")
    private Date fecha;

    @Column(name = "hora_inicio")
    private String hora_inicio;

    @Column(name = "hora_fin")
    private String hora_fin;

    @Column(name = "descripcion")
    private String descripcion;

    @ManyToOne
    @JoinColumn(name = "id_usu_autor", referencedColumnName = "id_usuario")
    @JsonIgnoreProperties("anunciosAutor")
    private Usuario autor;

    @ManyToOne
    @JoinColumn(name = "id_usu_reserva", referencedColumnName = "id_usuario")
    @JsonIgnoreProperties("anunciosReservados")
    private Usuario usuarioReserva;

    @Column(name = "precio")
    private Integer precio;

    

    public Integer getPrecio() {
        return precio;
    }

    public void setPrecio(Integer precio) {
        this.precio = precio;
    }

    public Integer getIdAnuncio() {
        return idAnuncio;
    }

    public void setIdAnuncio(Integer idAnuncio) {
        this.idAnuncio = idAnuncio;
    }


    public Date getFecha() {
        return fecha;
    }

    public void setFecha(Date fecha) {
        this.fecha = fecha;
    }

    public String getHora_inicio() {
        return hora_inicio;
    }

    public void setHora_inicio(String hora_inicio) {
        this.hora_inicio = hora_inicio;
    }

    public String getHora_fin() {
        return hora_fin;
    }

    public void setHora_fin(String hora_fin) {
        this.hora_fin = hora_fin;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Usuario getAutor() {
        return autor;
    }

    public void setAutor(Usuario autor) {
        this.autor = autor;
    }

    public Usuario getUsuarioReserva() {
        return usuarioReserva;
    }

    public void setUsuarioReserva(Usuario usuarioReserva) {
        this.usuarioReserva = usuarioReserva;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    @Override
    public String toString() {
        return "Anuncio [idAnuncio=" + idAnuncio + ", tipo=" + tipo + ", fecha=" + fecha + ", hora_inicio="
                + hora_inicio + ", hora_fin=" + hora_fin + ", descripcion=" + descripcion + ", autor=" + autor
                + ", usuarioReserva=" + usuarioReserva + ", precio=" + precio + "]";
    }

 
  
}
