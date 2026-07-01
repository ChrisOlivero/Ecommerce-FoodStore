package com.tp.jpa;

import com.tp.jpa.entities.Usuario;
import com.tp.jpa.enums.Rol;
import com.tp.jpa.repository.CategoriaRepository;
import com.tp.jpa.repository.PedidoRepository;
import com.tp.jpa.repository.ProductoRepository;
import com.tp.jpa.repository.UsuarioRepository;
import com.tp.jpa.entities.Categoria;
import com.tp.jpa.entities.Producto;
import java.util.Scanner;
import com.tp.jpa.entities.Usuario;
import com.tp.jpa.entities.Pedido;
import com.tp.jpa.entities.Producto;
import com.tp.jpa.enums.Estado;
import com.tp.jpa.enums.FormaPago;
import com.tp.jpa.entities.DetallePedido;
import java.util.Locale;

public class Main {

    private static final Scanner sc = new Scanner(System.in);

    private static final CategoriaRepository categoriaRepo =
            new CategoriaRepository();

    private static final ProductoRepository productoRepo =
            new ProductoRepository();

    private static final UsuarioRepository usuarioRepo =
            new UsuarioRepository();

    private static final PedidoRepository pedidoRepo =
            new PedidoRepository();




    public static void main(String[] args) {

        int opcion;

        do {

            System.out.println("\n===== MENU PRINCIPAL =====");
            System.out.println("1. Categorias");
            System.out.println("2. Productos");
            System.out.println("3. Usuarios");
            System.out.println("4. Pedidos");
            System.out.println("5. Reportes");
            System.out.println("0. Salir");
            System.out.print("Opcion: ");


            opcion = Integer.parseInt(sc.nextLine());

            switch (opcion) {

                case 1:
                    menuCategorias();
                    break;

                case 2:
                    menuProductos();
                    break;

                case 3:
                    menuUsuarios();
                    break;

                case 4:
                    menuPedidos();
                    break;

                case 5:
                    menuReportes();
                    break;

                case 0:
                    System.out.println("Fin del programa");
                    break;

                default:
                    System.out.println("Opcion invalida");
            }

        } while (opcion != 0);
    }





    private static void menuCategorias() {

        int opcion;

        do {

            System.out.println("\n\t ------- Submenú CATEGORIAS -------");
            System.out.println("\t\t\t1. Alta");
            System.out.println("\t\t\t2. Baja Logica");
            System.out.println("\t\t\t3. Modificacion");
            System.out.println("\t\t\t4. Listado");
            System.out.println("\t\t\t0. Volver");
            System.out.print("Opcion: ");

            opcion = Integer.parseInt(sc.nextLine());

            switch (opcion) {

                case 1:
                    altaCategoria();
                    break;

                case 2:
                    bajaCategoria();
                    break;

                case 3:
                    modificarCategoria();
                    break;

                case 4:
                    listarCategorias();
                    break;

                case 0:
                    break;

                default:
                    System.out.println("Opcion invalida");
            }

        } while (opcion != 0);

    }

    private static void altaCategoria() {

        System.out.println("\n=== ALTA CATEGORIA ===");

        System.out.print("Nombre: ");
        String nombre = sc.nextLine();

        if (nombre.isBlank()) {
            System.out.println("El nombre no puede estar vacio.");
            return;
        }

        System.out.print("Descripcion: ");
        String descripcion = sc.nextLine();

        Categoria categoria = new Categoria();

        categoria.setNombre(nombre);

        categoria.setDescripcion(descripcion);

        categoria.setEliminado(false);

        categoria = categoriaRepo.guardar(categoria);

        System.out.println(
                "Categoria guardada con ID: "
                        + categoria.getId()
        );
    }

    private static void bajaCategoria() {

        System.out.println("\n=== BAJA LOGICA CATEGORIA ===");

        System.out.print("Ingrese ID: ");
        Long id = Long.parseLong(sc.nextLine());

        boolean eliminada =
                categoriaRepo.eliminarLogico(id);

        if (eliminada) {

            System.out.println(
                    "Categoria eliminada correctamente."
            );

        } else {

            System.out.println(
                    "No existe una categoria con ese ID."
            );
        }
    }

    private static void modificarCategoria() {

        System.out.println("\n=== MODIFICAR CATEGORIA ===");

        listarCategorias();
        System.out.print("Ingrese ID: ");
        Long id = Long.parseLong(sc.nextLine());

        var categoriaOpt = categoriaRepo.buscarPorId(id);

        if (categoriaOpt.isEmpty()) {
            System.out.println("No existe una categoria con ese ID.");
            return;
        }

        var categoria = categoriaOpt.get();

        System.out.println("Nombre actual: " + categoria.getNombre());
        System.out.println("Descripcion actual: " + categoria.getDescripcion());

        System.out.print("Nuevo nombre: ");
        String nuevoNombre = sc.nextLine();

        System.out.print("Nueva descripcion: ");
        String nuevaDescripcion = sc.nextLine();

        if (!nuevoNombre.isBlank()) {
            categoria.setNombre(nuevoNombre);
        }
        if (!nuevaDescripcion.isBlank()) {
            categoria.setDescripcion(nuevaDescripcion);
        }


        categoriaRepo.guardar(categoria);

        System.out.println("Categoria modificada correctamente.");
    }

    private static void listarCategorias() {

        System.out.println("\n=== LISTADO DE CATEGORIAS ===");

        var categorias = categoriaRepo.listarActivos();

        if (categorias.isEmpty()) {
            System.out.println("No hay categorias activas.");
            return;
        }

        for (var categoria : categorias) {

            System.out.println(
                    "ID: " + categoria.getId()
                            + " | Nombre: " + categoria.getNombre()
                            + " | Descripcion: " + categoria.getDescripcion()
            );
        }
    }





    private static void menuProductos() {

        int opcion;

        do {

            System.out.println("\n\t----- Submenú PRODUCTOS -----");
            System.out.println("\t\t\t1. Alta de Producto");
            System.out.println("\t\t\t2. Baja Logica de Producto");
            System.out.println("\t\t\t3. Modificacion de Producto");
            System.out.println("\t\t\t4. Listado de Producto");
            System.out.println("\t\t\t0. Volver");
            System.out.print("Opcion: ");

            opcion = Integer.parseInt(sc.nextLine());

            switch (opcion) {

                case 1:
                    altaProducto();
                    break;

                case 2:
                    bajaProducto();
                    break;

                case 3:
                    modificarProducto();
                    break;

                case 4:
                    listarProductos();
                    break;

                case 0:
                    break;

                default:
                    System.out.println("Opcion invalida");
            }

        } while (opcion != 0);
    }

    private static void altaProducto() {

        System.out.println("\n=== ALTA PRODUCTO ===");

        var categorias = categoriaRepo.listarActivos();

        if (categorias.isEmpty()) {
            System.out.println("No existen categorias activas.");
            return;
        }

        System.out.println("\nCategorias disponibles:");

        for (var categoria : categorias) {
            System.out.println(
                    categoria.getId()
                            + " - "
                            + categoria.getNombre()
            );
        }

        System.out.print("ID Categoria: ");
        Long categoriaId = Long.parseLong(sc.nextLine());

        var categoriaOpt =
                categoriaRepo.buscarPorId(categoriaId);

        if (categoriaOpt.isEmpty()) {
            System.out.println("Categoria inexistente.");
            return;
        }

        System.out.print("Nombre: ");
        String nombre = sc.nextLine();

        System.out.print("Precio: ");
        double precio = Double.parseDouble(sc.nextLine());
        if (precio <= 0) {
            System.out.println("Precio invalido");
            return;
        }

        System.out.print("Descripcion: ");
        String descripcion = sc.nextLine();

        System.out.print("Stock: ");
        int stock = Integer.parseInt(sc.nextLine());
        if (stock < 0) {
            System.out.println("Stock invalido");
            return;
        }
        Producto producto = new Producto();

        producto.setNombre(nombre);
        producto.setPrecio(precio);
        producto.setDescripcion(descripcion);
        producto.setStock(stock);
        producto.setCategoria(categoriaOpt.get());

        producto.setDisponible(true);
        producto.setEliminado(false);

        producto = productoRepo.guardar(producto);
        System.out.println(
                "Producto ID: " + producto.getId()
        );

        System.out.println(
                "Categoria: "
                        + producto.getCategoria().getNombre()
        );
    }

    private static void listarProductos() {

        System.out.println("\n=== LISTADO DE PRODUCTOS ===");

        var productos = productoRepo.listarActivos();

        if (productos.isEmpty()) {
            System.out.println("No hay productos activos.");
            return;
        }

        for (var producto : productos) {

            System.out.println(
                    "ID: " + producto.getId()
                            + " | Nombre: " + producto.getNombre()
                            + " | Precio: " + producto.getPrecio()
                            + " | Stock: " + producto.getStock()
                            + " | Categoria: "
                            + producto.getCategoria().getNombre()
            );
        }
    }

    private static void modificarProducto() {

        System.out.println("\n=== MODIFICAR PRODUCTO ===");

        listarProductos();
        System.out.print("Ingrese ID: ");
        Long id = Long.parseLong(sc.nextLine());

        var productoOpt = productoRepo.buscarPorId(id);

        if (productoOpt.isEmpty()) {
            System.out.println("No existe un producto con ese ID.");
            return;
        }

        var producto = productoOpt.get();

        System.out.println("Nombre actual: " + producto.getNombre());
        System.out.println("Precio actual: " + producto.getPrecio());
        System.out.println("Stock actual: " + producto.getStock());

        System.out.print("Nuevo nombre: ");
        String nuevoNombre = sc.nextLine();

        if (!nuevoNombre.isBlank())
            producto.setNombre(nuevoNombre);

        System.out.print("Nuevo precio: ");
        String precioInput = sc.nextLine();

        if (!precioInput.isBlank()) {

            double nuevoPrecio = Double.parseDouble(precioInput);

            if (nuevoPrecio < 0) {
                System.out.println("Precio invalido");
                return;
            }

            producto.setPrecio(nuevoPrecio);
        }

        System.out.print("Nuevo stock: ");
        String stockInput = sc.nextLine();

        if (!stockInput.isBlank()) {

            int nuevoStock = Integer.parseInt(stockInput);

            if (nuevoStock < 0) {
                System.out.println("Stock invalido");
                return;
            }

            producto.setStock(nuevoStock);
        }

        productoRepo.guardar(producto);

        System.out.println("Producto modificado correctamente.");
    }

    private static void bajaProducto() {

        System.out.println("\n=== BAJA LOGICA PRODUCTO ===");

        System.out.print("Ingrese ID: ");
        Long id = Long.parseLong(sc.nextLine());

        var productoOpt = productoRepo.buscarPorId(id);

        if (productoOpt.isEmpty()) {
            System.out.println("No existe un producto con ese ID.");
            return;
        }

        var producto = productoOpt.get();

        if (producto.isEliminado()) {
            System.out.println("El producto ya fue dado de baja.");
            return;
        }

        productoRepo.eliminarLogico(id);

        System.out.println(
                "Producto eliminado: "
                        + producto.getNombre()
        );
    }





    private static void menuUsuarios() {

        int opcion;

        do {

            System.out.println("\n----- USUARIOS -----");
            System.out.println("1. Alta");
            System.out.println("2. Modificar");
            System.out.println("3. Baja Logica");
            System.out.println("4. Listado");
            System.out.println("5. Buscar por mail");
            System.out.println("0. Volver");
            System.out.print("Opcion: ");

            opcion = Integer.parseInt(sc.nextLine());

            switch (opcion) {

                case 1:
                    altaUsuario();
                    break;

                case 2:
                    modificarUsuario();
                    break;

                case 3:
                    bajaUsuario();
                    break;

                case 4:
                    listarUsuarios();
                    break;

                case 5:
                    buscarUsuarioPorMail();
                    break;
            }

        } while (opcion != 0);
    }

    private static void listarUsuarios() {

        System.out.println("\n=== LISTADO DE USUARIOS ===");

        var usuarios = usuarioRepo.listarActivos();

        if (usuarios.isEmpty()) {
            System.out.println("No hay usuarios activos.");
            return;
        }

        for (var usuario : usuarios) {

            System.out.println(
                    "ID: " + usuario.getId()
                            + " | Nombre: " + usuario.getNombre()
                            + " " + usuario.getApellido()
                            + " | Mail: " + usuario.getMail()
                            + " | Rol: " + usuario.getRol()
            );
        }
    }

    private static void altaUsuario() {

        System.out.println("\n=== ALTA USUARIO ===");

        System.out.print("Nombre: ");
        String nombre = sc.nextLine();

        System.out.print("Apellido: ");
        String apellido = sc.nextLine();

        System.out.print("Mail: ");
        String mail = sc.nextLine();

        if (usuarioRepo.buscarPorMail(mail).isPresent()) {
            System.out.println("Ya existe un usuario activo con ese mail.");
            return;
        }

        System.out.print("Celular (opcional): ");
        String celular = sc.nextLine();

        System.out.print("Contraseña: ");
        String password = sc.nextLine();

        System.out.println("Roles disponibles:");
        System.out.println("1. ADMIN");
        System.out.println("2. USUARIO");

        System.out.print("Seleccione rol: ");

        int opcionRol = Integer.parseInt(sc.nextLine());

        Rol rol;

        switch (opcionRol) {
            case 1:
                rol = Rol.ADMIN;
                break;
            case 2:
                rol = Rol.USUARIO;
                break;
            default:
                System.out.println("Rol inválido.");
                return;
        }

        Usuario usuario = new Usuario();

        usuario.setNombre(nombre);
        usuario.setApellido(apellido);
        usuario.setMail(mail);
        usuario.setCelular(celular);
        usuario.setContraseña(password);
        usuario.setRol(rol);
        usuario.setEliminado(false);

        usuario = usuarioRepo.guardar(usuario);

        System.out.println(
                "Usuario guardado con ID: "
                        + usuario.getId()
        );
    }

    private static void buscarUsuarioPorMail() {

        System.out.println("\n=== BUSCAR USUARIO POR MAIL ===");

        System.out.print("Mail: ");
        String mail = sc.nextLine();

        var usuarioOpt = usuarioRepo.buscarPorMail(mail);

        if (usuarioOpt.isEmpty()) {
            System.out.println("No existe usuario activo con ese mail.");
            return;
        }

        var usuario = usuarioOpt.get();

        System.out.println(
                "ID: " + usuario.getId()
        );

        System.out.println(
                "Nombre: " + usuario.getNombre()
                        + " " + usuario.getApellido()
        );

        System.out.println(
                "Mail: " + usuario.getMail()
        );

        System.out.println(
                "Celular: " + usuario.getCelular()
        );

        System.out.println(
                "Rol: " + usuario.getRol()
        );
    }

    private static void bajaUsuario() {

        System.out.println("\n=== BAJA LOGICA USUARIO ===");

        listarUsuarios();

        System.out.print("Ingrese ID: ");
        Long id = Long.parseLong(sc.nextLine());

        var usuarioOpt = usuarioRepo.buscarPorId(id);

        if (usuarioOpt.isEmpty()) {
            System.out.println("No existe un usuario con ese ID.");
            return;
        }

        var usuario = usuarioOpt.get();

        if (usuario.isEliminado()) {
            System.out.println("El usuario ya fue dado de baja.");
            return;
        }

        usuarioRepo.eliminarLogico(id);

        System.out.println(
                "Usuario eliminado: "
                        + usuario.getNombre()
                        + " "
                        + usuario.getApellido()
        );
    }

    private static void modificarUsuario() {

        System.out.println("\n=== MODIFICAR USUARIO ===");

        listarUsuarios();

        System.out.print("Ingrese ID: ");
        Long id = Long.parseLong(sc.nextLine());

        var usuarioOpt = usuarioRepo.buscarPorId(id);

        if (usuarioOpt.isEmpty()) {
            System.out.println("No existe usuario con ese ID.");
            return;
        }

        var usuario = usuarioOpt.get();

        System.out.println("Nombre actual: " + usuario.getNombre());
        System.out.println("Apellido actual: " + usuario.getApellido());
        System.out.println("Mail actual: " + usuario.getMail());
        System.out.println("Celular actual: " + usuario.getCelular());

        System.out.print("Nuevo nombre: ");
        String nombre = sc.nextLine();

        System.out.print("Nuevo apellido: ");
        String apellido = sc.nextLine();

        System.out.print("Nuevo mail: ");
        String mail = sc.nextLine();

        System.out.print("Nuevo celular: ");
        String celular = sc.nextLine();

        System.out.print("Nueva contraseña: ");
        String password = sc.nextLine();

        if (!mail.isBlank()) {

            var existente = usuarioRepo.buscarPorMail(mail);

            if (existente.isPresent()
                    && !existente.get().getId().equals(usuario.getId())) {

                System.out.println("Ese mail ya pertenece a otro usuario.");
                return;
            }

            usuario.setMail(mail);
        }

        if (!nombre.isBlank())
            usuario.setNombre(nombre);

        if (!apellido.isBlank())
            usuario.setApellido(apellido);

        if (!celular.isBlank())
            usuario.setCelular(celular);

        if (!password.isBlank())
            usuario.setContraseña(password);

        usuarioRepo.guardar(usuario);

        System.out.println("Usuario modificado correctamente.");
    }





    private static void menuPedidos() {

        int opcion;

        do {

            System.out.println("\n----- PEDIDOS -----");
            System.out.println("1. Alta");
            System.out.println("2. Modificar Estado");
            System.out.println("3. Baja Logica");
            System.out.println("4. Listado");
            System.out.println("5. Buscar por Usuario");
            System.out.println("6. Buscar por Estado");
            System.out.println("0. Volver");
            System.out.print("Opcion: ");

            opcion = Integer.parseInt(sc.nextLine());

            switch (opcion) {

                case 1:
                    altaPedido();
                    break;

                case 2:
                    modificarEstadoPedido();
                    break;

                case 3:
                    bajaPedido();
                    break;

                case 4:
                    listarPedidos();
                    break;

                case 5:
                    buscarPedidosPorUsuario();
                    break;

                case 6:
                    buscarPedidosPorEstado();
                    break;

                case 0:
                    break;
            }

        } while (opcion != 0);
    }

    private static void altaPedido() {

        System.out.println("\n=== ALTA PEDIDO ===");

        var usuarios = usuarioRepo.listarActivos();

        if (usuarios.isEmpty()) {
            System.out.println("No existen usuarios.");
            return;
        }

        System.out.println("\nUsuarios disponibles:");

        for (var usuario : usuarios) {

            System.out.println(
                    usuario.getId()
                            + " - "
                            + usuario.getNombre()
                            + " "
                            + usuario.getApellido()
            );
        }

        System.out.print("Seleccione ID usuario: ");

        Long usuarioId =
                Long.parseLong(sc.nextLine());

        var usuarioOpt =
                usuarioRepo.buscarPorId(usuarioId);

        if (usuarioOpt.isEmpty()) {

            System.out.println("Usuario inexistente.");
            return;
        }

        Pedido pedido = new Pedido();

        pedido.setUsuario(usuarioOpt.get());

        pedido.setFecha(java.time.LocalDate.now());

        pedido.setEstado(Estado.PENDIENTE);

        pedido.setEliminado(false);

        seleccionarFormaPago(pedido);

        agregarProductosPedido(pedido);

        pedido.calcularTotal();

        System.out.println("\nDETALLES:");

        for (DetallePedido d : pedido.getDetalles()) {

            System.out.println(
                    d.getProducto().getNombre()
                            + " x "
                            + d.getCantidad()
                            + " = "
                            + d.getSubtotal()
            );
        }

        System.out.println(
                "TOTAL CALCULADO = "
                        + pedido.getTotal()
        );

        pedido = pedidoRepo.guardar(pedido);

        System.out.println(
                "\nPedido generado correctamente."
        );

        System.out.println(
                "ID Pedido: "
                        + pedido.getId()
        );

        System.out.println(
                "Total: $"
                        + pedido.getTotal()
        );
    }
    private static void seleccionarFormaPago(Pedido pedido) {

        System.out.println("\nForma de Pago:");

        System.out.println("1. EFECTIVO");
        System.out.println("2. TARJETA");
        System.out.println("3. TRANSFERENCIA");

        System.out.print("Opcion: ");

        int opcion =
                Integer.parseInt(sc.nextLine());

        switch (opcion) {

            case 1:
                pedido.setFormaPago(
                        FormaPago.EFECTIVO
                );
                break;

            case 2:
                pedido.setFormaPago(
                        FormaPago.TARJETA
                );
                break;

            case 3:
                pedido.setFormaPago(
                        FormaPago.TRANSFERENCIA
                );
                break;

            default:
                System.out.println(
                        "Opcion invalida."
                );

                pedido.setFormaPago(
                        FormaPago.EFECTIVO
                );
        }
    }
    private static void agregarProductosPedido(Pedido pedido) {

        boolean continuar = true;

        while (continuar) {

            listarProductos();

            System.out.print(
                    "\nID Producto: "
            );

            Long productoId =
                    Long.parseLong(sc.nextLine());

            var productoOpt =
                    productoRepo.buscarPorId(productoId);

            if (productoOpt.isEmpty()) {

                System.out.println(
                        "Producto inexistente."
                );

                continue;
            }

            Producto producto =
                    productoOpt.get();

            System.out.print(
                    "Cantidad: "
            );

            int cantidad =
                    Integer.parseInt(sc.nextLine());

            if (cantidad <= 0) {

                System.out.println(
                        "Cantidad invalida."
                );

                continue;
            }

            if (cantidad > producto.getStock()) {

                System.out.println(
                        "Stock insuficiente."
                );

                continue;
            }

            pedido.addDetallePedido(
                    producto,
                    cantidad
            );

            producto.setStock(
                    producto.getStock()
                            - cantidad
            );

            productoRepo.guardar(producto);

            System.out.print(
                    "\nAgregar otro producto? (S/N): "
            );

            continuar =
                    sc.nextLine()
                            .equalsIgnoreCase("S");
        }
    }

    private static void bajaPedido() {

        System.out.println("\n=== BAJA LOGICA PEDIDO ===");

        listarPedidos();

        System.out.print("Ingrese ID del pedido a eliminar: ");
        Long id = Long.parseLong(sc.nextLine());

        boolean eliminado = pedidoRepo.eliminarLogico(id);

        if (eliminado) {
            System.out.println("Pedido eliminado correctamente.");
        } else {
            System.out.println("No existe un pedido con ese ID.");
        }
    }

    private static void modificarEstadoPedido() {

        System.out.println("\n=== MODIFICAR ESTADO PEDIDO ===");

        listarPedidos();

        System.out.print("Ingrese ID del pedido: ");
        Long idPedido = Long.parseLong(sc.nextLine());

        var pedidoOpt = pedidoRepo.buscarPorId(idPedido);

        if (pedidoOpt.isEmpty()) {
            System.out.println("Pedido no encontrado.");
            return;
        }

        Pedido pedido = pedidoOpt.get();

        System.out.println("Estado actual: " + pedido.getEstado());

        System.out.println("\nNuevo Estado:");
        System.out.println("1. PENDIENTE");
        System.out.println("2. CONFIRMADO");
        System.out.println("3. TERMINADO");
        System.out.println("4. CANCELADO");

        System.out.print("Opcion: ");
        int opcion = Integer.parseInt(sc.nextLine());

        Estado nuevoEstado;

        switch (opcion) {
            case 1 -> nuevoEstado = Estado.PENDIENTE;
            case 2 -> nuevoEstado = Estado.CONFIRMADO;
            case 3 -> nuevoEstado = Estado.TERMINADO;
            case 4 -> nuevoEstado = Estado.CANCELADO;
            default -> {
                System.out.println("Opcion invalida.");
                return;
            }
        }

        pedido.setEstado(nuevoEstado);

        pedidoRepo.guardar(pedido);

        System.out.println("Estado actualizado correctamente.");
    }

    private static void listarPedidos() {

        System.out.println("\n=== LISTADO DE PEDIDOS ===");

        var pedidos = pedidoRepo.listarActivos();

        if (pedidos.isEmpty()) {
            System.out.println("No hay pedidos registrados.");
            return;
        }

        for (var pedido : pedidos) {

            System.out.println("\n------------------------");

            System.out.println(
                    "ID: " + pedido.getId()
            );

            System.out.println(
                    "Usuario: "
                            + pedido.getUsuario().getNombre()
                            + " "
                            + pedido.getUsuario().getApellido()
            );

            System.out.println(
                    "Fecha: "
                            + pedido.getFecha()
            );

            System.out.println(
                    "Estado: "
                            + pedido.getEstado()
            );

            System.out.println(
                    "Forma Pago: "
                            + pedido.getFormaPago()
            );

            System.out.println(
                    "Total: $"
                            + pedido.getTotal()
            );

            System.out.println("Detalles:");

            for (var detalle : pedido.getDetalles()) {

                System.out.println(
                        detalle.getProducto().getNombre()
                                + " x "
                                + detalle.getCantidad()
                                + " = $"
                                + detalle.getSubtotal()
                );
            }
        }
    }

    private static void buscarPedidosPorUsuario() {

        System.out.println("\n=== PEDIDOS POR USUARIO ===");

        listarUsuarios();

        System.out.print("Ingrese ID usuario: ");
        Long idUsuario = Long.parseLong(sc.nextLine());

        var pedidos = pedidoRepo.buscarPorUsuario(idUsuario);

        if (pedidos.isEmpty()) {
            System.out.println("No existen pedidos para ese usuario.");
            return;
        }

        for (var pedido : pedidos) {

            System.out.println("\n------------------------");

            System.out.println("ID: " + pedido.getId());
            System.out.println("Fecha: " + pedido.getFecha());
            System.out.println("Estado: " + pedido.getEstado());
            System.out.println("Forma Pago: " + pedido.getFormaPago());
            System.out.println("Total: $" + pedido.getTotal());
        }
    }

    private static void buscarPedidosPorEstado() {

        System.out.println("\n=== PEDIDOS POR ESTADO ===");

        System.out.println("1. PENDIENTE");
        System.out.println("2. CONFIRMADO");
        System.out.println("3. TERMINADO");
        System.out.println("4. CANCELADO");

        int opcion = Integer.parseInt(sc.nextLine());

        Estado estado = switch (opcion) {
            case 1 -> Estado.PENDIENTE;
            case 2 -> Estado.CONFIRMADO;
            case 3 -> Estado.TERMINADO;
            case 4 -> Estado.CANCELADO;
            default -> null;
        };

        if (estado == null) {
            System.out.println("Estado inválido.");
            return;
        }

        var pedidos = pedidoRepo.buscarPorEstado(estado);

        if (pedidos.isEmpty()) {
            System.out.println("No existen pedidos.");
            return;
        }

        for (var pedido : pedidos) {

            System.out.println("\n------------------------");
            System.out.println("ID: " + pedido.getId());
            System.out.println("Usuario: " + pedido.getUsuario().getNombre());
            System.out.println("Fecha: " + pedido.getFecha());
            System.out.println("Total: $" + pedido.getTotal());
        }
    }





    private static void menuReportes() {

        int opcion;

        do {

            System.out.println("\n\t----- REPORTES -----");
            System.out.println("\t\t\t1. Productos por Categoria");
            System.out.println("\t\t\t2. Pedidos por Usuario");
            System.out.println("\t\t\t3. Pedidos por Estado");
            System.out.println("\t\t\t4. Total Facturado");
            System.out.println("\t\t\t0. Volver");
            System.out.print("Opcion: ");

            opcion = Integer.parseInt(sc.nextLine());

            switch (opcion) {

                case 1:
                    productosPorCategoria();
                    break;

                case 2:
                    pedidosPorUsuario();
                    break;

                case 3:
                    pedidosPorEstado();
                    break;

                case 4:
                    totalFacturado();
                    break;

                case 0:
                    break;

                default:
                    System.out.println("Opcion invalida");
            }

        } while (opcion != 0);
    }

    private static void productosPorCategoria() {

        System.out.println("\n=== PRODUCTOS POR CATEGORIA ===");

        var categorias = categoriaRepo.listarActivos();

        if (categorias.isEmpty()) {
            System.out.println("No existen categorias activas.");
            return;
        }

        System.out.println("\nCategorias:");

        for (var categoria : categorias) {

            System.out.println(
                    categoria.getId()
                            + " - "
                            + categoria.getNombre()
            );
        }

        System.out.print("Seleccione ID de categoria: ");

        Long categoriaId =
                Long.parseLong(sc.nextLine());

        var productos =
                productoRepo.buscarPorCategoria(categoriaId);

        if (productos.isEmpty()) {

            System.out.println(
                    "No hay productos para esa categoria."
            );

            return;
        }

        System.out.println("\nProductos encontrados:");

        for (var producto : productos) {

            System.out.println(
                    "ID: " + producto.getId()
                            + " | Nombre: " + producto.getNombre()
                            + " | Precio: " + producto.getPrecio()
                            + " | Stock: " + producto.getStock()
            );
        }
    }

    private static void pedidosPorUsuario() {

        System.out.println("\n//////// PEDIDOS POR USUARIO ////////");

        listarUsuarios();

        System.out.print("Ingrese ID usuario: ");
        Long idUsuario = Long.parseLong(sc.nextLine());

        var pedidos = pedidoRepo.buscarPorUsuario(idUsuario);

        if (pedidos.isEmpty()) {
            System.out.println("No hay pedidos para ese usuario.");
            return;
        }

        for (var pedido : pedidos) {

            System.out.println("\n------------------------");
            System.out.println("ID: " + pedido.getId());
            System.out.println("Fecha: " + pedido.getFecha());
            System.out.println("Estado: " + pedido.getEstado());
            System.out.println("Forma Pago: " + pedido.getFormaPago());
            System.out.println("Total: $" + pedido.getTotal());
        }
    }

    private static void pedidosPorEstado() {

        System.out.println("\n=== PEDIDOS POR ESTADO ===");

        System.out.println("1. PENDIENTE");
        System.out.println("2. CONFIRMADO");
        System.out.println("3. TERMINADO");
        System.out.println("4. CANCELADO");

        System.out.print("Opcion: ");

        int opcion = Integer.parseInt(sc.nextLine());

        Estado estado;

        switch (opcion) {
            case 1 -> estado = Estado.PENDIENTE;
            case 2 -> estado = Estado.CONFIRMADO;
            case 3 -> estado = Estado.TERMINADO;
            case 4 -> estado = Estado.CANCELADO;
            default -> {
                System.out.println("Opcion invalida");
                return;
            }
        }

        var pedidos = pedidoRepo.buscarPorEstado(estado);

        if (pedidos.isEmpty()) {
            System.out.println("No existen pedidos con ese estado.");
            return;
        }

        for (var pedido : pedidos) {

            System.out.println("\n------------------------");
            System.out.println("ID: " + pedido.getId());
            System.out.println("Fecha: " + pedido.getFecha());
            System.out.println("Usuario: " +
                    pedido.getUsuario().getNombre() +
                    " " +
                    pedido.getUsuario().getApellido());
            System.out.println("Total: $" + pedido.getTotal());
        }
    }

    private static void totalFacturado() {

        System.out.println("\n=== TOTAL FACTURADO ===");

        var pedidos =
                pedidoRepo.buscarPorEstado(
                        Estado.TERMINADO
                );

        double total = pedidos.stream()
                .mapToDouble(Pedido::getTotal)
                .sum();

        System.out.println(
                "Total facturado: "
                        + String.format(
                        Locale.US,
                        "$%.2f",
                        total
                )
        );
    }

}