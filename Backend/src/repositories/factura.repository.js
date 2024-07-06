const BaseRepository = require("./base.repository");

let _factura = null;

class FacturaRespository extends BaseRepository{
    constructor({ Factura }){
        super(Factura);
        _factura = Factura;
    }

    async getPagada(pageSize = 10, pageNum = 1){
        const skips = pageSize * ( pageNum - 1);
        return await _factura.find({ fechaPago: {$ne: ""}})
        .skip(skips)
        .limit(pageSize);
    }

    async getPorPagar(pageSize = 10, pageNum = 1){
        const skips = pageSize * ( pageNum - 1);
        return await _factura.find({ fechaPago: ""})
        .skip(skips)
        .limit(pageSize);
    }

    async getFactura(cod){
        return await _factura.find({ codigo: {$regex: cod, $options: "i"}});
    }
}

module.exports = FacturaRespository;