package com.tfg.project.api.model;

import java.io.File;
import java.io.Serializable;
import java.nio.file.Files;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name="mascota")
public class Mascota  implements Serializable{
    private static final long serialVersionUID = 1L;

    @Id
@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "mascota_seq")
@SequenceGenerator(name = "mascota_seq", sequenceName = "sec_mascota", allocationSize = 1)
    @Column(name = "id_mascota")
    private Integer idMascota;

    @Column(name="nombre")
    private String nombre;

    @Column(name="tipo_mascota")
    private String tipo_mascota;

    @Column(name="raza")
    private String raza;


    @Column(name="peso")
    private Integer peso;

    @Column(name="foto1")
    private String foto1;


    @Column(name="edad")
    private Integer edad;

    @Column(name="sexo")
    private String sexo;

    @Column(name="descripcion")
    private String descripcion;

    @Column(name="cuidados")
    private String cuidados;

    @Column(name="id_usuario")
    private Integer idUsuario;

    public Mascota(){
        
    }

  


    public Mascota(Integer idMascota, String nombre, String tipo_mascota, String raza, Integer peso, String foto1, Integer edad,
            String sexo, String descripcion, String cuidados, Integer idUsuario) {
        this.idMascota = idMascota;
        this.nombre = nombre;
        this.tipo_mascota = tipo_mascota;
        this.raza = raza;
        this.peso = peso;
        this.foto1 = foto1;
        this.edad = edad;
        this.sexo = sexo;
        this.descripcion = descripcion;
        this.cuidados = cuidados;
        this.idUsuario = idUsuario;
    }




    public void setIdMascota(Integer idMascota) {
        this.idMascota = idMascota;
    }




    public Integer getIdMascota() {
        return idMascota;
    }

  

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getTipo_mascota() {
        return tipo_mascota;
    }

    public void setTipo_mascota(String tipo_mascota) {
        this.tipo_mascota = tipo_mascota;
    }

    public String getRaza() {
        return raza;
    }

    public void setRaza(String raza) {
        this.raza = raza;
    }

    public Integer getPeso() {
        return peso;
    }

    public void setPeso(Integer peso) {
        this.peso = peso;
    }

    

    public String getFoto1() {
        return foto1;
    }



    public void setFoto1(String foto1) {
        this.foto1 = foto1;
    }




    public Integer getEdad() {
        return edad;
    }

    public void setEdad(Integer edad) {
        this.edad = edad;
    }

    public String getSexo() {
        return sexo;
    }

    public void setSexo(String sexo) {
        this.sexo = sexo;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getCuidados() {
        return cuidados;
    }

    public void setCuidados(String cuidados) {
        this.cuidados = cuidados;
    }

    public Integer getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(Integer idUsuario) {
        this.idUsuario = idUsuario;
    }




    @Override
    public String toString() {
        return "Mascota [idMascota=" + idMascota + ", nombre=" + nombre + ", tipo_mascota=" + tipo_mascota + ", raza="
                + raza + ", peso=" + peso + ", foto1=" + foto1 + ", edad=" + edad + ", sexo=" + sexo + ", descripcion="
                + descripcion + ", cuidados=" + cuidados + ", idUsuario=" + idUsuario + "]";
    }

}
