package com.tp.jpa.util;

import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;

public class JPAUtil {

    private static final EntityManagerFactory emf =
            Persistence.createEntityManagerFactory("Parcial2");

    public static EntityManagerFactory getEntityManagerFactory() {
        return emf;
    }
}