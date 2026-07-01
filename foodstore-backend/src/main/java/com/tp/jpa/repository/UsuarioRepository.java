package com.tp.jpa.repository;

import com.tp.jpa.entities.Usuario;
import jakarta.persistence.EntityManager;

import java.util.List;
import java.util.Optional;

public class UsuarioRepository extends BaseRepository<Usuario> {

    public UsuarioRepository() {
        super(Usuario.class);
    }

    public Optional<Usuario> buscarPorMail(String mail) {

        EntityManager em = emf.createEntityManager();

        try {

            // Busca un usuario activo por mail
            List<Usuario> usuarios = em.createQuery(
                            "SELECT u FROM Usuario u " +
                                    "WHERE u.mail = :mail " +
                                    "AND u.eliminado = false",
                            Usuario.class)
                    .setParameter("mail", mail)
                    .getResultList();

            return usuarios.isEmpty()
                    ? Optional.empty()
                    : Optional.of(usuarios.get(0));

        } finally {
            em.close();
        }
    }
}