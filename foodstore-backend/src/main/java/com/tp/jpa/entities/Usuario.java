package com.tp.jpa.entities;

import com.tp.jpa.dtos.UsuarioDTO;
import com.tp.jpa.enums.Rol;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@ToString (exclude = {"contraseña","pedidos"})
@Entity

public class Usuario extends Base {

    private String nombre ;

    private String apellido;

    private String mail;

    private String celular;

    private String contraseña;

    @Enumerated(EnumType.STRING)
    private Rol rol;

    @OneToMany(mappedBy = "usuario")
    @Builder.Default
    private Set<Pedido> pedidos = new HashSet<>();


    public void addPedido(Pedido pedido) {

        if (pedido == null) {
            throw new IllegalArgumentException("El pedido no puede ser null");
        }

        pedidos.add(pedido);
        pedido.setUsuario(this);
    }

    public UsuarioDTO toDTO() {
        return new UsuarioDTO(
                this.getId(),
                this.getNombre(),
                this.getApellido(),
                this.getMail(),
                this.getCelular()
        );
    }
}

