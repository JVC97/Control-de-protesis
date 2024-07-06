let _ordenCompraService = null;
class OrdenCompraControllers {
  constructor({ OrdenCompraService }) {
    _ordenCompraService = OrdenCompraService;
  }

  async get(req, res) {
    const { _id}= req.params;
    const ordenCompra = await _ordenCompraService.get(_id);
    return res.send(ordenCompra);
  }
  async get2(req, res) {
    const{ body } = req;
    const ordenCompra = await _ordenCompraService.get2(body);
    return res.send(ordenCompra);
  }

  async getAll(req, res) {
    const { pageSize, pageNum } = req.query;
    const ordenCompras = await _ordenCompraService.getAll(pageSize, pageNum);
    return res.send(ordenCompras);
  }

  async update(req, res) {
    const { body } = req;
    const { _id } = body;
    const updatedordenCompra = await _ordenCompraService.update(_id, body);
    return res.send(updatedordenCompra);
  }

  async delete(req, res) {
    const { body } = req;
    const { _id } = body;
    const deletedordenCompra = await _ordenCompraService.delete(_id);
    return res.send(deletedordenCompra);
  }
  async createordenCompra(req, res) {
    const { body } = req;
    const createdordenCompra = await _ordenCompraService.createOrdenCompra(body);
    return res.status(201).send(createdordenCompra);
  }
  async getPorAsignar(req, res) {
    const { pageSize, pageNum } = req.query;
    const licitacion = await _ordenCompraService.getPorAsignar(pageSize, pageNum);
    return res.send(licitacion);
  }
  async getByNom(req, res) {
    const {codigo} = req.params;
    const paciente = await _ordenCompraService.getByNom(codigo);
    return res.send(paciente);
  }
}

module.exports = OrdenCompraControllers;