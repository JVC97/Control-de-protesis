const BaseService = require("./base.service");

let _protesisRepository = null;
let _pacienteRepository = null;
let _ordenCompraRepository = null;
let _licitacionRepository = null;
let _facturaRepository = null;

class ProtesisService extends BaseService{
    constructor({ ProtesisRepository, PacienteRepository, OrdenCompraRepository, LicitacionRepository, FacturaRepository}){
        super(ProtesisRepository);
        _protesisRepository = ProtesisRepository;
        _pacienteRepository = PacienteRepository;
        _ordenCompraRepository = OrdenCompraRepository;
        _licitacionRepository = LicitacionRepository;
        _facturaRepository = FacturaRepository;
    }

    async getPacienteProtesis(pacienteId){
        return await _protesisRepository.getPacienteProtesis(pacienteId);
    }

    async createProtesis(protesis){
        const {pacienteId} = protesis;
        const paciente = await _pacienteRepository.get(pacienteId);

        if(!paciente){
            const error = new Error();
            error.status = 404;
            error.message = "Paciente no exite";
            throw error;
        }

        const createprotesis = await _protesisRepository.create(protesis);

        paciente.listprotesis.push(createprotesis);

        const paci = _pacienteRepository.update(pacienteId, {listprotesis: paciente.listprotesis});
        return await createprotesis;
    }

    async ordenCompra(orden){
        const { codigo, protesisId } = orden;
        const getprotesis = await _protesisRepository.get(protesisId);
        const ordencompra = await _ordenCompraRepository.get(codigo);
        const val = await ordencompra.rev(getprotesis._id);

        if(!orden){
            const error = new Error();
            error.status = 404;
            error.message = "Orden de compra no existe";
            throw error;
        }
        if(val){
            const error = new Error();
            error.status = 404;
            error.message = "Orden de compra ya ingresada";
            throw error;
        }
        if(!getprotesis){
            const error = new Error();
            error.status = 404;
            error.message = "Protesis no existe";
            throw error;
        }
        ordencompra.listprotesis.push(getprotesis);
        const act = _protesisRepository.update(ordencompra._id, {listprotesis: ordencompra.listprotesis});
        return await _ordenCompraRepository.update(ordencompra._id, {listprotesis: ordencompra.listprotesis});
    }

    async licitacion(licitacion){
        const { codigo, protesisId } = licitacion;
        const getprotesis = await _protesisRepository.get(protesisId);
        const licita = await _licitacionRepository.getLicitacion(codigo);
        const val = await licita.rev(getprotesis._id);

        if(!licita){
            const error = new Error();
            error.status = 404;
            error.message = "Licitacion no existe";
            throw error;
        }

        if(!getprotesis){
            const error = new Error();
            error.status = 404;
            error.message = "Protesis no existe";
            throw error;
        }

        if(val){
            const error = new Error();
            error.status = 404;
            error.message = "Licitacion ya ingresada";
            throw error;
        }

        licita.listprotesis.push(getprotesis);
        const act = _protesisRepository.update(protesisId, {licitacionId: licita});
        return await _licitacionRepository.update(licita._id, {listprotesis: licita.listprotesis});
    }

    async factura(factura){
        const { codigo, protesisId } = factura;
        const getprotesis = await _protesisRepository.get(protesisId);
        const fact = await _facturaRepository.getFactura(codigo);
        const val = await fact.rev(protesisId);

        if(!fact){
            const error = new Error();
            error.status = 404;
            error.message = "Factura no existe";
            throw error;
        }

        if(!getprotesis){
            const error = new Error();
            error.status = 404;
            error.message = "Protesis no existe";
            throw error;
        }

        if(val){
            const error = new Error();
            error.status = 404;
            error.message = "Factura ya ingresada";
            throw error;
        }

        fact.listprotesis.push(getprotesis);
        const act = _protesisRepository.update(protesisId, {facturaId: fact});
        return await _facturaRepository.update(fact._id, {listprotesis: fact.listprotesis});
    }

    async getPorFacturar(pageSize, pageNum){
        const prot = await _pacienteRepository.getPorFacturar(pageSize,pageNum);
        let i = 0;
        let array = [];
        while(prot[i] != null){
            const { pacienteId } = prot[i];
            array.push( await _pacienteRepository.get(prot[i]));
            i = i + 1;
        }

        return await array;
    }

    async eliminarOrdenCompra(protesisId){
        const protesis = await _protesisRepository.get(protesisId);
        if(!protesis){
            const error = new Error();
            error.status = 404;
            error.message = "Protesis no existe";
            throw error;
        }

        const orden = _ordenCompraRepository.get(protesis.ordenCompra);
        if(!orden){
            const error = new Error();
            error.status = 404;
            error.message = "Protesis no tiene orden de compra";
            throw error;
        }

        const index = orden.listprotesis.findIndex(protesis => protesisId === protesisId);
        if(index === -1){
            const error = new Error();
            error.status = 404;
            error.message = "Orden de compra no asociada";
            throw error;
        }

        orden.listprotesis.splice(index, 1);
        const ordenup = await _ordenCompraRepository.update(orden._id, {listprotesis: orden.listprotesis});
        return await _protesisRepository.update(protesisId, {ordenCompra: null});
    }

    async eliminarLicitacion(protesisId){
        const protesis = _protesisRepository.get(protesisId);
        if(!protesis){
            const error = new Error();
            error.status = 404;
            error.message = "Protesis no existe";
            throw error;
        }

        const licitacion = await _licitacionRepository.get(protesis.licitacionId);
        if(!licitacion){
            const error = new Error();
            error.status = 404;
            error.message = "Protesis no tiene licitacion";
            throw error;
        }

        const index = await _licitacionRepository.listprotesis.findIndex(protesisId => protesisId === protesisId);
        if(index === -1){
            const error = new Error();
            error.status = 404;
            error.message = "Licitación no asociada";
            throw error;
        }

        licitacion.listprotesis.splice(index, 1);
        const licita = await _licitacionRepository.update(licitacion._id, {listprotesis: licitacion.listprotesis});
        return await _protesisRepository.update(protesisId, { licitacionId : null});
    }

    async eliminarFactura(protesisId){
        const protesis = await _protesisRepository.get(protesisId);
        if(!protesis){
            const error = new Error();
            error.status = 404;
            error.message = "Protesis no existe";
            throw error;
        }

        const factura = await _facturaRepository.get(protesis.facturaId);
        if(!factura){
            const error = new Error();
            error.status = 404;
            error.message = "Protesis no tiene factura";
            throw error;
        }

        const index = await _facturaRepository.listprotesis.findIndex(protesisId => protesisId === protesisId);
        if(index === -1){
            const error = new Error();
            error.status = 404;
            error.message = "Factura no asociada";
            throw error;
        }

        factura.listprotesis.splice(index, 1);
        const factu = await _facturaRepository.update(factura._id, {listprotesis: factura.listprotesis});
        return await _protesisRepository.update(protesisId, {facturaId: null});
    }
}

module.exports = ProtesisService; 