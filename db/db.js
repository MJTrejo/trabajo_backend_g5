//IMPORTACION, INSTANCIACION Y CONFIGURACION DEL MODULO mysql2
const mysql = require("mysql2");
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "080903",
    port: 3306
})

//CONECTAR
connection.connect((err)=>{
    //ERROR
    if(err){
        console.error("Error de conexion: "+err);
        return;
    }

    //MENSAJE DE EXITO
    console.log("Estado de conexion: CONECTADA");

    //SI NO EXISTE LA BASE DE DATOS SE CREA
    const sqlCreatedb = 'CREATE DATABASE IF NOT EXISTS marvel_db';

    connection.query(sqlCreatedb, (err, result)=>{
        //ERROR
        if(err){
            console.error("Error de conexion: "+err);
            return;
        }

        //EXITO
        console.log("Base de datos: CREADA/EXISTENTE");

        connection.changeUser({database:"marvel_db"}, (err)=>{
            //ERROR
            if(err){
                console.error("Error de conexion: "+err);
                return;
            }
                       
            //EXITO
            // Crear tabla cliente
const createClienteTableQuery = `
CREATE TABLE IF NOT EXISTS cliente (
    id_cliente INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(50) NOT NULL,
    nombre VARCHAR(20) NOT NULL,
    apellido VARCHAR(20) NOT NULL,
    telefono VARCHAR(50) NOT NULL

);
`;

connection.query(createClienteTableQuery, (err, result) => {
    if(err){
        console.error("Error al crear la tabla cliente: "+err);
        return;
    }
    console.log("Tabla cliente: CREADA/EXISTENTE");
});
            
            //SI NO EXISTEN LAS TABLAS SE CREAN
            const createTableQuery = `
                CREATE TABLE IF NOT EXISTS consulta (
                    id_consulta INT AUTO_INCREMENT PRIMARY KEY,
                    consulta VARCHAR(255) NOT NULL                    
                );
                `
               
                ; 
                //CREATE TABLE IF NOT EXISTS pais (
                //    id_pais INT AUTO_INCREMENT PRIMARY KEY,
                //    nombre VARCHAR(20) NOT NULL
                //);
            
                //id_pais INT NOT NULL,
                //FOREIGN KEY (id_pais) REFERENCES pais(id_pais)

            connection.query(createTableQuery, (err, result)=>{
                //ERROR
                if(err){
                console.error("Error al crear la tabla: "+err);
                return;
                }

                //EXITO
                console.log("Tabla: CREADA/EXISTENTE");
                 // Modificar tabla consulta para agregar clave foránea
const modifyConsultaTableQuery = `
ALTER TABLE consulta
ADD COLUMN id_cliente INT,
ADD FOREIGN KEY (id_cliente) REFERENCES cliente(id_cliente);
`;

connection.query(modifyConsultaTableQuery, (err, result) => {
   if(err){
        console.error("Error al modificar la tabla consulta: "+err);
       return;
 }
console.log("Tabla consulta: MODIFICADA para incluir clave foránea");
});
            });

            

        });
    });
});

//EXPORTACION DEL MODULO
module.exports = connection;