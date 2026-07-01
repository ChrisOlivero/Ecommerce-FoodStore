package com.tp.jpa.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import java.util.HashSet;
import java.util.Set;
import lombok.*;

@Getter
@Setter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = "productos")
@Entity

public class Categoria extends Base {

    @Column(name = "Categoría")
    private String nombre;

    private String descripcion;

    @OneToMany(mappedBy = "categoria")
    @Builder.Default
    private Set<Producto> productos = new HashSet<>();

    public void addProducto(Producto producto){
        productos.add(producto);
        producto.setCategoria(this);
    }



}
