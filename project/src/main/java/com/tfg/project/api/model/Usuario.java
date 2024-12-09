package com.tfg.project.api.model;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "usuario")
@AllArgsConstructor
@NoArgsConstructor
public class Usuario implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "usuario_seq")
    @SequenceGenerator(name = "usuario_seq", sequenceName = "sec_usuarios", allocationSize = 1)
    @Column(name = "id_usuario")
    private Integer idUsuario;
    

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "apellido1")
    private String apellido1;

    @Column(name = "apellido2")
    private String apellido2;

    @Column(name = "direccion")
    private String direccion;

    @Column(name = "ciudad")
    private String ciudad;

    @Column(name = "cp")
    private Integer cp;

    @Column(name = "email")
    private String email;

    @Column(name = "fecha_nacimiento")
    private Date fecha_nacimiento;

    @Column(name = "telefono")
    private String telefono;

    
    @Column(name = "biografia")
    private String biografia;

    @Column(name = "pwd")
    private String password;

    @Column(name = "foto_perfil")
    private String  foto_perfil;


    @JoinColumn(name="rol")
    private String rol;


    @OneToMany(mappedBy = "autor")
    private List<Anuncio> anunciosAutor;

    @OneToMany(mappedBy = "usuarioReserva")
    private List<Anuncio> anunciosReservados;

    public Integer getIdUsuario() {
        return idUsuario;
    }


    public void setIdUsuario(Integer idUsuario) {
        this.idUsuario = idUsuario;
    }


    public String getNombre() {
        return nombre;
    }


    public void setNombre(String nombre) {
        this.nombre = nombre;
    }


    public String getApellido1() {
        return apellido1;
    }


    public void setApellido1(String apellido1) {
        this.apellido1 = apellido1;
    }


    public String getApellido2() {
        return apellido2;
    }


    public void setApellido2(String apellido2) {
        this.apellido2 = apellido2;
    }


    public String getDireccion() {
        return direccion;
    }


    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }


    public String getCiudad() {
        return ciudad;
    }


    public void setCiudad(String ciudad) {
        this.ciudad = ciudad;
    }


    public Integer getCp() {
        return cp;
    }


    public void setCp(Integer cp) {
        this.cp = cp;
    }


    public String getEmail() {
        return email;
    }


    public void setEmail(String email) {
        this.email = email;
    }


    public Date getFecha_nacimiento() {
        return fecha_nacimiento;
    }


    public void setFecha_nacimiento(Date fecha_nacimiento) {
        this.fecha_nacimiento = fecha_nacimiento;
    }


    public String getTelefono() {
        return telefono;
    }


    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }


    public String getBiografia() {
        return biografia;
    }


    public void setBiografia(String biografia) {
        this.biografia = biografia;
    }


 


    public String getFoto_perfil() {
        return foto_perfil;
    }


    public void setFoto_perfil(String foto_perfil) {
        this.foto_perfil = foto_perfil;
    }


    public String getRol() {
        return rol;
    }


    public void setRol(String rol) {
        this.rol = rol;
    }


    public String getPassword() {
        return password;
    }


    public void setPassword(String password) {
        this.password = password;
    }


    @Override
    public String toString() {
        return "Usuario [idUsuario=" + idUsuario + ", nombre=" + nombre + ", apellido1=" + apellido1 + ", apellido2="
                + apellido2 + ", direccion=" + direccion + ", ciudad=" + ciudad + ", cp=" + cp + ", email=" + email
                + ", fecha_nacimiento=" + fecha_nacimiento + ", telefono=" + telefono + ", biografia=" + biografia
                + ", pwd=" + password + ", foto_perfil=" + foto_perfil + ", rol=" + rol + "]";
    }



    
    

   

}
