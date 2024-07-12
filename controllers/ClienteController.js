//Importacion del módulo db
const db = require('../db/db');

//METODO PARA OBTENER TODAS LAS CLIENTES
const getAllClientes = (req, res) => {

    const sql = 'SELECT * FROM cliente';

    db.query(sql, (err, results) => {
        //ERROR
        if (err) {
            console.log(err);
            return;
        } 
        //RESULTADO EN JSON
        res.json(results);
    });
};

//METODO PARA OBTENER clientes PARAMETRIZADAS
const getCienteById = (req, res) => {

    const { id_cliente } = req.params;

    const sql = 'SELECT * FROM cliente WHERE id_cliente = ?';

    db.query(sql, [id_cliente], (err, result) => {
        //ERROR
        if (err) {
            console.log(err);
            return;
        } 
        //RESULTADO EN JSON
        res.json(result);
    });
};

//METODO PARA POSTEAR CONSULTA
const postCliente = (req, res) => {

    const {email, nombre, apellido, telefono} = req.body;

    const sql = 'INSERT INTO cliente (email, nombre, apellido, telefono ) VALUES (?, ?, ?, ?)';

    db.query(sql, [ email, nombre, apellido, telefono], (err, result) => {
        //ERROR
        if (err)  {
            console.log(err);
            return;
        } 
        //MENSAJE DE EXITO
        res.json({ message: 'Cliete creado con exito', id_cliente: result.insertId });
    });
};

//METODO PARA MODIFICAR CONSULTA
const updateCliente = (req, res)=>{

    const {id_cliente} = req.params;

    const { email, nombre, apellido, telefono} = req.body;
    
    const sql = 'UPDATE cliente SET email = ?, nombre = ?, apellido = ?, telefono = ? WHERE id_cliente = ?';

    db.query(sql, [ email, nombre, apellido, telefono, id_cliente], (err, result)=>{
        //ERROR
        if (err)  {
            console.log(err);
            return;
        }
        
        //MENSAJE DE EXITO
        res.json({mensaje: "Cliente actualizado"});
    })
}

//METODO PARA BORRAR CLIENTE
const deleteCliente = (req, res)=>{

    const {id_cliente} = req.params;

    const sql = 'DELETE FROM cliente WHERE id_cliente = ?';

    db.query(sql, [id_cliente], (err, result)=>{
        //ERROR
        if (err)  {
            console.log(err);
            return;
        }
        
        //MENSAJE DE EXITO
        res.json({mensaje: "Cliente borrado con exito"});
    })
}

//EXPORTACION DE LOS MODULOS
module.exports = {
    getAllClientes,
    getCienteById,
    postCliente,
    updateCliente,
    deleteCliente
};
