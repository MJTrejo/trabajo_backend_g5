//Importacion del módulo db
const db = require('../db/db');

//METODO PARA OBTENER TODAS LAS CONSULTAS
const getAllConsultas = (req, res) => {

    const sql = 'SELECT * FROM consulta';

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

//METODO PARA OBTENER CONSULTAS PARAMETRIZADAS
const getConsultaById = (req, res) => {

    const { id_consulta } = req.params;

    const sql = 'SELECT * FROM consulta WHERE id_consulta = ?';

    db.query(sql, [id_consulta], (err, result) => {
        //ERROR
        if (err) {
            console.log(err);
            return;
        } 
        //RESULTADO EN JSON
        res.json(result);
    });
};

//METODO PARA OBTENER CONSULTAS SEGUN CLIENTE
const getConsultaByIdCliente = (req, res) => {

    const { id_cliente } = req.params;

    const sql = 'SELECT * FROM consulta WHERE id_cliente = ?';

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
const postConsulta = (req, res) => {

    const { consulta, id_cliente} = req.body;

    const sql = 'INSERT INTO consulta (consulta, id_cliente) VALUES (?, ?)';

    db.query(sql, [consulta, id_cliente], (err, result) => {
        //ERROR
        if (err)  {
            console.log(err);
            return;
        } 
        //MENSAJE DE EXITO
        res.json({ message: 'Consulta creada', id_consulta: result.insertId });
    });
};

//METODO PARA MODIFICAR CONSULTA
const updateConsulta = (req, res)=>{

    const {id_consulta} = req.params;

    const {consulta, id_cliente} = req.body;
    
    const sql = 'UPDATE consulta SET consulta = ?, id_cliente = ? WHERE id_consulta = ?';

    db.query(sql, [ consulta, id_cliente, id_consulta], (err, result)=>{
        //ERROR
        if (err)  {
            console.log(err);
            return;
        }
        
        //MENSAJE DE EXITO
        res.json({mensaje: "Consulta actualizada"});
    })
}

//METODO PARA BORRAR CONSULTA
const deleteConsulta = (req, res)=>{

    const {id_consulta} = req.params;

    const sql = 'DELETE FROM consulta WHERE id_consulta = ?';

    db.query(sql, [id_consulta], (err, result)=>{
        //ERROR
        if (err)  {
            console.log(err);
            return;
        }
        
        //MENSAJE DE EXITO
        res.json({mensaje: "Consulta borrada con exito"});
    })
}

//EXPORTACION DE LOS MODULOS
module.exports = {
    getAllConsultas,
    getConsultaById,
    getConsultaByIdCliente,
    postConsulta,
    updateConsulta,
    deleteConsulta
};
