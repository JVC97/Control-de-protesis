const { ProtesisService } = require("../services");

let _protesisService = null;
class ProtesisController {
  constructor({ ProtesisService }) {
    _protesisService = ProtesisService;
  }

  async get(req, res) {
    const { body }= req;
    const { protesisId } = body;
    const protesis = await _protesisService.get(protesisId);
    return res.send(protesis);
  }

  async getAll(req, res) {
    const { pageSize, pageNum } = req.query;
    const protesis = await _protesisService.getAll(pageSize, pageNum);
    return res.send(protesis);
  }

  async create(req, res) {
    const { body} = req.params;
    console.log(body);
    const createdprotesis = await _protesisService.create(body);
    return res.status(201).send(createdprotesis);
  }

  async update(req, res) {
    const { body } = req;
    const { _id } = body;
    const updatedprotesis = await _protesisService.update(_id, body);
    return res.send(updatedprotesis);
  }

  async delete(req, res) {
    const { body } = req;
    const { _id } = body;
    const deletedprotesis = await _protesisService.delete(_id);
    return res.send(deletedprotesis);
  }

  async getPacienteProtesis(req, res) {
    const { body } = req;
    const { _id } = body;
    const protesis = await _protesisService.getPacienteProtesis(_id);
    return res.send(protesis);
  }
  async createProtesis(req, res) {
    const {body} =req;

    const createdprotesis = await _protesisService.createProtesis(body);
    return res.status(201).send(createdprotesis);
  }
  async ordenCompra(req, res) {
    const {body} =req;

    const ordenCompra = await _protesisService.ordenCompra(body);
    return res.status(201).send(ordenCompra);
  }
  async licitacion(req, res) {
    const {body} =req;

    const licitacion = await _protesisService.licitacion(body);
    return res.status(201).send(licitacion);
  }
  async factura(req, res) {
    const {body} =req;
    console.log(body);
    const factura = await _protesisService.factura(body);
    return res.status(201).send(factura);
  }
  async getPorFacturar(req, res) {
    const { pageSize, pageNum } = req.query;
    const licitacion = await _protesisService.getPorFacturar(pageSize, pageNum);
    return res.send(licitacion);
  }
  async eliminarOrdenCompra(req, res) {
    const {body} =req;
    const {protesisId} =body;
    const factura = await _protesisService.eliminarOrdenCompra(protesisId);
    return res.status(201).send(factura);
  }
  
  async eliminarLicitacion(req, res) {
    const {body} =req;
    const {protesisId} =body;
    const factura = await _protesisService.eliminarLicitacion(protesisId);
    return res.status(201).send(factura);
  }
  async eliminarFactura(req, res) {
    const {body} =req;
    const {protesisId} =body;
    const factura = await _protesisService.eliminarFactura(protesisId);
    return res.status(201).send(factura);
  }
  
}

module.exports = ProtesisController;
