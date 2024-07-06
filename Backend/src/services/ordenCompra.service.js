const BaseService = require("./base.service");
let _ordenCompraRepository = null;

class OrdenCompraService extends BaseService {
  constructor({ OrdenCompraRepository }) {
    super(OrdenCompraRepository);
    _ordenCompraRepository = OrdenCompraRepository;
  }

  async getOrdenCompra(codigo) {
    return await _ordenCompraRepository.getOrdenCompra(codigo);
  }
  async createOrdenCompra(ordencomp){
    const {codigo} = ordencomp;
    const orden = await _ordenCompraRepository.getOrdenCompra(codigo);
    if(orden){
      const error = new Error();
      error.status = 404;
      error.message = "Orden de Compra ya existe";
      throw error;
    }
    return await _ordenCompraRepository.create(ordencomp);
  }
  async getPorAsignar(pageSize, pageNum) {
    return await _ordenCompraRepository.getPorAsignar(pageSize, pageNum);
  }
  async getByNom(nombre) {

    return await _ordenCompraRepository.getByNom(nombre);
  }

}

module.exports = OrdenCompraService;