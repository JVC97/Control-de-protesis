let _facturaService = null;
class FacturaController {
  constructor({ FacturaService }) {
    _facturaService = FacturaService;
  }

  async get(req, res) {
    const { _id}= req.params;
    const ordenCompra = await _facturaService.get(_id);
    return res.send(ordenCompra);
  }

  async getAll(req, res) {
    const { pageSize, pageNum } = req.query;
    const factura = await _facturaService.getAll(pageSize, pageNum);
    return res.send(factura);
  }

  async update(req, res) {
    const { body } = req;
    const { _id } = body;
    const updatedordenCompra = await _facturaService.update(_id, body);
    return res.send(updatedordenCompra);
  }

  async delete(req, res) {
    const { body } = req;
    const { _id } = body;
    const deletedordenCompra = await _facturaService.delete(_id);
    return res.send(deletedordenCompra);
  }
  async createFactura(req, res) {
    const { body } = req;
    const createdordenCompra = await _facturaService.createFactura(body);
    return res.status(201).send(createdordenCompra);
  }

  async getPagada(req, res) {
    const { pageSize, pageNum } = req.query;
    const factura = await _facturaService.getPagada(pageSize, pageNum);
    return res.send(factura);
  }
  async getPorPagar(req, res) {
    const { pageSize, pageNum } = req.query;
    const factura = await _facturaService.getPorPagar(pageSize, pageNum);
    return res.send(factura);
  }
  async getByNom(req, res) {
    const {codigo} = req.params;
    const paciente = await _facturaService.getByNom(codigo);
    return res.send(paciente);
  }
}

module.exports = FacturaController;