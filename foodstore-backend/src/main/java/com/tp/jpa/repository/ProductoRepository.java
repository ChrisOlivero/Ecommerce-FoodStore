package com.tp.jpa.repository;

import com.tp.jpa.entities.Producto;
import jakarta.persistence.EntityManager;

import java.util.List;

public class ProductoRepository extends BaseRepository<Producto> {

    public ProductoRepository() {
        super(Producto.class);
    }

    public List<Producto> buscarPorCategoria(Long idCategoria) {

        EntityManager em = emf.createEntityManager();

        try {

            String jpql =
                    "SELECT p " +
                            "FROM Producto p " +
                            "WHERE p.categoria.id = :id " +
                            "AND p.eliminado = false";

            return em.createQuery(jpql, Producto.class)
                    .setParameter("id", idCategoria)
                    .getResultList();

        } finally {
            em.close();
        }
    }
}