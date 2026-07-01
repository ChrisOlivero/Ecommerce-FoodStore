package com.tp.jpa.entities;

import java.time.LocalDateTime;
import lombok.*;
import lombok.experimental.SuperBuilder;
import jakarta.persistence.*;

@Getter
@Setter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
@ToString
@MappedSuperclass

public abstract class Base {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected Long id;

    protected boolean eliminado;

    protected LocalDateTime createdAt;

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
    }

}
