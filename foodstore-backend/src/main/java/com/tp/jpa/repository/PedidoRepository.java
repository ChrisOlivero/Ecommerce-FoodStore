package com.tp.jpa.repository;

import com.tp.jpa.entities.Pedido;
import com.tp.jpa.enums.Estado;
import jakarta.persistence.EntityManager;

import java.util.List;

public class PedidoRepository extends BaseRepository<Pedido> {

    public PedidoRepository() {
        super(Pedido.class);
    }

    public List<Pedido> buscarPorUsuario(Long idUsuario) {

        EntityManager em = emf.createEntityManager();

        try {

            // Obtiene los pedidos activos de un usuario
            return em.createQuery(
                            "SELECT p FROM Usuario u " +
                                    "JOIN u.pedidos p " +
                                    "WHERE u.id = :uid " +
                                    "AND p.eliminado = false",
                            Pedido.class)
                    .setParameter("uid", idUsuario)
                    .getResultList();

        } finally {
            em.close();
        }
    }

    public List<Pedido> buscarPorEstado(Estado estado) {

        EntityManager em = emf.createEntityManager();

        try {

            // Obtiene pedidos activos filtrados por estado
            return em.createQuery(
                            "SELECT p FROM Pedido p " +
                                    "WHERE p.estado = :estado " +
                                    "AND p.eliminado = false",
                            Pedido.class)
                    .setParameter("estado", estado)
                    .getResultList();

        } finally {
            em.close();
        }
    }

    public boolean cambiarEstado(Long idPedido, Estado nuevoEstado) {

        EntityManager em = emf.createEntityManager();

        try {

            Pedido pedido = em.find(Pedido.class, idPedido);

            if (pedido == null) {
                return false;
            }

            em.getTransaction().begin();

            pedido.setEstado(nuevoEstado);

            em.getTransaction().commit();

            return true;

        } catch (Exception e) {

            if (em.getTransaction().isActive()) {
                em.getTransaction().rollback();
            }

            throw e;

        } finally {
            em.close();
        }
    }
}