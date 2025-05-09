-- Crear base de datos y usarla
CREATE DATABASE sistematickets;
USE sistematickets;

-- Tabla cliente
CREATE TABLE cliente (
    cliente_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    direccion VARCHAR(100) NOT NULL,
    correo VARCHAR(100) NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    activo TINYINT(1) NOT NULL DEFAULT 1,
    CONSTRAINT checa_cliente_activo CHECK (activo IN (0, 1))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabla marca
CREATE TABLE marca (
    marca_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    activo TINYINT(1) NOT NULL DEFAULT 1,
    CONSTRAINT checa_marca_activo CHECK (activo IN (0, 1))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabla modelo
CREATE TABLE modelo (
    modelo_id INT AUTO_INCREMENT PRIMARY KEY,
    marca_id INT NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    activo TINYINT(1) NOT NULL DEFAULT 1,
    CONSTRAINT fk_modelo_marca FOREIGN KEY (marca_id) REFERENCES marca(marca_id),
    CONSTRAINT checa_modelo_activo CHECK (activo IN (0, 1))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabla estado_articulo
CREATE TABLE estado_articulo (
    estado_articulo_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(30) NOT NULL,
    activo TINYINT(1) NOT NULL DEFAULT 1,
    CONSTRAINT checa_estado_articulo_activo CHECK (activo IN (0, 1))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabla articulo
CREATE TABLE articulo (
    articulo_id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT NOT NULL,
    modelo_id INT NOT NULL,
    serie VARCHAR(50) NOT NULL,
    descripcion TEXT NOT NULL,
    fecha_ingreso DATE NOT NULL,
    estado_articulo_id INT NOT NULL,
    UNIQUE (cliente_id, serie),
    CONSTRAINT fk_articulo_cliente FOREIGN KEY (cliente_id) REFERENCES cliente(cliente_id),
    CONSTRAINT fk_articulo_modelo FOREIGN KEY (modelo_id) REFERENCES modelo(modelo_id),
    CONSTRAINT fk_articulo_estado FOREIGN KEY (estado_articulo_id) REFERENCES estado_articulo(estado_articulo_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabla tecnico
CREATE TABLE tecnico (
    tecnico_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    especialidad VARCHAR(100) NOT NULL,
    correo VARCHAR(100) NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    activo TINYINT(1) NOT NULL DEFAULT 1,
    CONSTRAINT checa_tecnico_activo CHECK (activo IN (0, 1))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabla estado_ticket
CREATE TABLE estado_ticket (
    estado_ticket_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(30) NOT NULL,
    activo TINYINT(1) NOT NULL DEFAULT 1,
    CONSTRAINT checa_estado_ticket_activo CHECK (activo IN (0, 1))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabla prioridad
CREATE TABLE prioridad (
    prioridad_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(20) NOT NULL,
    activo TINYINT(1) NOT NULL DEFAULT 1,
    CONSTRAINT checa_prioridad_activo CHECK (activo IN (0, 1))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabla ticket
CREATE TABLE ticket (
    ticket_id INT AUTO_INCREMENT PRIMARY KEY,
    articulo_id INT NOT NULL,
    tecnico_id INT NOT NULL,
    fecha DATE NOT NULL,
    estado_ticket_id INT NOT NULL,
    prioridad_id INT NOT NULL,
    descripcion TEXT NOT NULL,
    diagnostico TEXT NOT NULL,
    CONSTRAINT fk_ticket_articulo FOREIGN KEY (articulo_id) REFERENCES articulo(articulo_id),
    CONSTRAINT fk_ticket_tecnico FOREIGN KEY (tecnico_id) REFERENCES tecnico(tecnico_id),
    CONSTRAINT fk_ticket_estado FOREIGN KEY (estado_ticket_id) REFERENCES estado_ticket(estado_ticket_id),
    CONSTRAINT fk_ticket_prioridad FOREIGN KEY (prioridad_id) REFERENCES prioridad(prioridad_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabla reparacion
CREATE TABLE reparacion (
    reparacion_id INT AUTO_INCREMENT PRIMARY KEY,
    ticket_id INT NOT NULL,
    fecha DATE NOT NULL,
    descripcion TEXT NOT NULL,
    costo DECIMAL(10,2) NOT NULL,
    CONSTRAINT fk_reparacion_ticket FOREIGN KEY (ticket_id) REFERENCES ticket(ticket_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabla componente
CREATE TABLE componente (
    componente_id INT AUTO_INCREMENT PRIMARY KEY,
    modelo_id INT NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    marca VARCHAR(50) NOT NULL,
    precio_unitario DECIMAL(10,2) NOT NULL,
    stock INT NOT NULL,
    activo TINYINT(1) NOT NULL DEFAULT 1,
    CONSTRAINT fk_componente_modelo FOREIGN KEY (modelo_id) REFERENCES modelo(modelo_id),
    CONSTRAINT checa_componente_activo CHECK (activo IN (0, 1))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- Insertar datos de ejemplo

-- Marcas
INSERT INTO marca (nombre) VALUES 
    ('asus'), 
    ('hp');

-- Modelos
INSERT INTO modelo (marca_id, nombre) VALUES 
    (1, 'rog flow x13'), 
    (2, 'pavilion 14');

-- Estados de artículo
INSERT INTO estado_articulo (nombre) VALUES 
    ('nuevo'), 
    ('en revisión');

-- Clientes
INSERT INTO cliente (nombre, apellido, direccion, correo, telefono) VALUES 
    ('luis', 'hernández', 'calle 1', 'luis.h@example.com', '5551112233'),
    ('maría', 'rodríguez', 'avenida 5', 'maria.r@example.com', '5554445566');

-- Artículos
INSERT INTO articulo (cliente_id, modelo_id, serie, descripcion, fecha_ingreso, estado_articulo_id) VALUES 
    (1, 1, 'ROG123456', 'portátil asus no enciende', '2025-04-28', 2),
    (2, 2, 'HP654321', 'pavilion con pantalla dañada', '2025-04-29', 2);

-- Técnicos
INSERT INTO tecnico (nombre, apellido, especialidad, correo, telefono) VALUES 
    ('pedro', 'lópez', 'pantallas', 'pedro.l@example.com', '5559990000'),
    ('ana', 'guzmán', 'hardware', 'ana.g@example.com', '5558887777');

-- Estados de ticket
INSERT INTO estado_ticket (nombre) VALUES 
    ('abierto'), 
    ('en proceso');

-- Prioridades
INSERT INTO prioridad (nombre) VALUES 
    ('alta'), 
    ('media');

-- Tickets
INSERT INTO ticket (articulo_id, tecnico_id, fecha, estado_ticket_id, prioridad_id, descripcion, diagnostico) VALUES 
    (1, 1, '2025-04-28', 1, 1, 'el equipo no enciende', 'posible fallo de placa madre'),
    (2, 2, '2025-04-29', 2, 2, 'pantalla rota', 'necesita reemplazo de pantalla');

-- Reparaciones
INSERT INTO reparacion (ticket_id, fecha, descripcion, costo) VALUES 
    (1, '2025-04-29', 'cambio de placa base', 2500.00),
    (2, '2025-04-30', 'reemplazo de pantalla', 1800.00);

-- Componentes
INSERT INTO componente (modelo_id, nombre, marca, precio_unitario, stock) VALUES 
    (1, 'placa base rog', 'asus', 1200.00, 3),
    (2, 'pantalla 14 pulgadas', 'hp', 950.00, 5);
