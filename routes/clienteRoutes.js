//IMPORTACION E INSTANCIADO DE EXPRESS
const express = require("express");
const router = express.Router();

//IMPORTACION DE Controller
const clienteController = require('../controllers/ClienteController')
//RUTAS
router.get('/', clienteController.getAllClientes);
router.get('/:id_cliente', clienteController.getCienteById);
router.post('/create', clienteController.postCliente);
router.put('/:id_cliente', clienteController.updateCliente);
router.delete('/:id_cliente', clienteController.deleteCliente);

//EXPORTACION DEL MODULO
module.exports = router;