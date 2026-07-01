package com.tp.jpa.entities;

import jakarta.persistence.Column;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@ToString (exclude = "categoria")
@Entity

public class Producto extends Base {

    @Column(name="nombre_producto")
    private String nombre;

    private double precio;

    private String descripcion;

    private int stock;

    private String imagen;

    private boolean disponible;

    @ManyToOne
    @JoinColumn(name="categoria_id")
    private Categoria categoria;

}


