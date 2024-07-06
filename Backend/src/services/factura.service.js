const BaseService = require("./base.service");
let _facturaRepository = null,
_protesisRepository = null;

class FacturaService extends BaseService {
  constructor({ FacturaRepository, ProtesisRepository }) {
    super(FacturaRepository);
    _facturaRepository = FacturaRepository;
    _protesisRepository=ProtesisRepository;
  }

  async getFactura(codigo) {
    return await _facturaRepository.getFactura(codigo);
  }

  async createFactura(fact){
        const {codigo} = fact;
        
        const factur = await _facturaRepository.getFactura(codigo);
        if(factur){
          const error = new Error();
          error.status = 404;
          error.message = "factura ya existe";
          throw error;
        }
        return await _facturaRepository.create(fact);
    }

    async getPagada(pageSize, pageNum) {
      return await _facturaRepository.getPagada(pageSize, pageNum);
    }
    async getPorPagar(pageSize, pageNum) {
      return await _facturaRepository.getPorPagar(pageSize, pageNum);
    }
    async getByNom(nombre) {

      return await _facturaRepository.getByNom(nombre);
    }
}

module.exports = FacturaService;