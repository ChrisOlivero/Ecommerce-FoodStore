package com.tp.jpa.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@ToString (exclude = {"producto", "pedido"})
@Entity

public class DetallePedido extends Base {

    private int cantidad;

    private double subtotal;

    @ManyToOne
    @JoinColumn(name = "producto_id")
    private Producto producto;

    @ManyToOne
    @JoinColumn(name = "pedido_id")
    private Pedido pedido;

    public void calcularSubtotal() {

        if(producto != null)
            this.subtotal = producto.getPrecio() * cantidad;
    }

}
