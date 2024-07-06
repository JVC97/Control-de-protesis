const BaseService = require("./base.service");
let _ordenCompraRepository = null;

class OrdenCompraService extends BaseService{
    constructor({ OrdencompraRepository}){
        super(OrdenCompraService);
        _ordenCompraRepository = OrdencompraRepository;
    }

    async getOrdenComra(codigo){
        return await _ordenCompraRepository.getOrdenComra(codigo);
    }

    async createOrdenCompra(ordenCompra){
        const {codigo} = ordenCompra;
        const orden = await _ordenCompraRepository.getOrdenComra(codigo);
        if(orden){
            const error = new Error();
            error.status = 404;
            error.message = "Orden de compra ya existe";
            throw error;
        }

        return await _ordenCompraRepository.create(ordenCompra);
    }
}

module.exports = OrdenCompraService;