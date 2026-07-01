package com.tp.jpa.entities;

import com.tp.jpa.enums.Estado;
import com.tp.jpa.enums.FormaPago;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;


@Getter
@Setter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = {"usuario", "detalles"})
@Entity

public class Pedido extends Base implements Calculable {

    @Transient
    private static long contadorDetalle = 1;

    private LocalDate fecha;

    private double total;

    @Enumerated(EnumType.STRING)
    private Estado estado;

    @Enumerated(EnumType.STRING)
    private FormaPago formaPago;

    @ManyToOne (fetch = FetchType.EAGER)
    @JoinColumn(name="usuario_id")
    private Usuario usuario;

    @OneToMany(mappedBy = "pedido", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @Builder.Default
    private List<DetallePedido> detalles = new ArrayList<>();


    public void addDetallePedido(Producto producto, int cantidad) {

        if (producto == null || cantidad <= 0) {
            throw new IllegalArgumentException("Datos inválidos");
        }

        DetallePedido existente = findDetallePedidoByProducto(producto);

        if (existente != null) {
            existente.setCantidad(existente.getCantidad() + cantidad);
            existente.setSubtotal(existente.getProducto().getPrecio() * existente.getCantidad());
        } else {
            DetallePedido nuevo = DetallePedido.builder()
                    .producto(producto)
                    .cantidad(cantidad)
                    .pedido(this)
                    .subtotal(producto.getPrecio() * cantidad)
                    .build();
            detalles.add(nuevo);
        }
        calcularTotal();
    }

    public DetallePedido findDetallePedidoByProducto(Producto producto) {
        return detalles.stream()
                .filter(d -> d.getProducto().equals(producto))
                .findFirst()
                .orElse(null);
    }

    public void deleteDetallePedidoByProducto(Producto producto) {
        detalles.removeIf(detalle -> detalle.getProducto().equals(producto));
        calcularTotal();
    }

    public int calcularCantidadItems() {
        return detalles.stream()
                .mapToInt(DetallePedido::getCantidad)
                .sum();
    }

    @Override
    public void calcularTotal() {
        this.total = detalles.stream()
                .mapToDouble(DetallePedido::getSubtotal)
                .sum();

    }
}