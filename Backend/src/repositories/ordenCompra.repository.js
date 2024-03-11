const BaseRepository = require("./base.repository");

let _ordenCompra = null;

class OrdenCompraRepository extends BaseRepository{
    constructor({OrdenCompra}){
        super(OrdenCompra);
        _ordenCompra = OrdenCompra;
    }

    async getOrdenCompra(codigo){
        return await _ordenCompra.findOne({ codigo });
    }

    async getrev(ordenCompraId, protesisId){
        const orden = _ordenCompra.findById({ ordenCompraId });
        return await orden.rev(protesisId);
    }

    async getPorAsignar(pageSize = 10, pageNum = 1){
        const skips = pageSize * (pageNum - 1);
        return await _ordenCompra
        .find({listprotesis: {$size: 0}})
        .skip(skips)
        .limit(pageSize);
    }
}

module.exports = OrdenCompraRepository;