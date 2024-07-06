const BaseService = require("./base.service");

let _protesisRepository = null,
_pacienteRepository = null,
_ordenCompraRepository=null,
_licitacionRepository=null,
_facturaRepository=null;
class ProtesisService extends BaseService {
  constructor({ ProtesisRepository , PacienteRepository, OrdenCompraRepository, LicitacionRepository, FacturaRepository}) {
    super(ProtesisRepository);
    _protesisRepository = ProtesisRepository;
    _pacienteRepository = PacienteRepository;
    _ordenCompraRepository=OrdenCompraRepository;
    _licitacionRepository=LicitacionRepository;
    _facturaRepository=FacturaRepository;
  }

  async getPacienteProtesis(pacienteId) {
    return await _protesisRepository.getPacienteProtesis(pacienteId);
  }


  async createProtesis(protesis) {
    
    const {pacienteId} = protesis;
    const pacient = await _pacienteRepository.get(pacienteId);
   
    if(!pacient){
      const error = new Error();
      error.status = 404;
      error.message = "Paciente no existe";
      throw error;
    }
    
    const createprotesis = await _protesisRepository.create(protesis);
    
    pacient.listprotesis.push(createprotesis);
    

    
    const pacien = _pacienteRepository.update(pacienteId, { listprotesis: pacient.listprotesis});
    return await  createprotesis;
  }

  async ordenCompra(orden){
    const {codigo, protesisId}=orden;
    const getprotesis = await _protesisRepository.get(protesisId);
    const ordencomp = await _ordenCompraRepository.getOrdenCompra(codigo);
    const val = await ordencomp.rev(getprotesis._id);
    console.log(val);
    if(!orden){
      const error = new Error();
      error.status = 404;
      error.message = "orden de comrpra no existe";
      throw error;
    }
    if(val){
      const error = new Error();
      error.status = 404;
      error.message = "orden de comrpra ya ingresada";
      throw error;
    }
    if(!getprotesis){
      const error = new Error();
      error.status = 404;
      error.message = "protesis no existe";
      throw error;
    }
    ordencomp.listprotesis.push(getprotesis);
    const act = _protesisRepository.update(protesisId,{ordenCompra: ordencomp});
    return await _ordenCompraRepository.update(ordencomp._id, {listprotesis: ordencomp.listprotesis});
  }

  async licitacion(licit){
    const {codigo, protesisId}=licit;
    const getprotesis = await _protesisRepository.get(protesisId);
    const licita = await _licitacionRepository.getLicitacion(codigo);
    const val = await licita.rev(getprotesis._id);
    console.log(val);
    if(!licita){
      const error = new Error();
      error.status = 404;
      error.message = "licitacion no existe";
      throw error;
    }
    if(val){
      const error = new Error();
      error.status = 404;
      error.message = "licitacion ya ingresada";
      throw error;
    }
    if(!getprotesis){
      const error = new Error();
      error.status = 404;
      error.message = "protesis no existe";
      throw error;
    }
    licita.listprotesis.push(getprotesis);
    const act = _protesisRepository.update(protesisId,{licitacionId: licita});
    return await _licitacionRepository.update(licita._id, {listprotesis: licita.listprotesis});
  }

  async factura(fact){
    const {codigo, protesisId}=fact;
    const getprotesis = await _protesisRepository.get(protesisId);
    console.log(getprotesis);
    const fac = await _facturaRepository.getFactura(codigo);
    console.log(fac);
    const val = await fac.rev(protesisId);
    
    console.log(val);
    
    if(!fac){
      const error = new Error();
      error.status = 404;
      error.message = "factura no existe";
      throw error;
    }
    if(val){
      const error = new Error();
      error.status = 404;
      error.message = "factura ya ingresada";
      throw error;
    }
    if(!getprotesis){
      const error = new Error();
      error.status = 404;
      error.message = "protesis no existe";
      throw error;
    }
    
    fac.listprotesis.push(getprotesis);
    const act = _protesisRepository.update(protesisId,{facturaId: fac});
    return await _facturaRepository.update(fac._id, {listprotesis: fac.listprotesis});
  }

  async getPorFacturar(pageSize, pageNum) {
    const prot= await _protesisRepository.getPorFacturar(pageSize, pageNum);
    console.log(prot);
    let i = 0;
    let array = []
    while(prot[i] != null){
      const {pacienteId} = prot[i];
      console.log(pacienteId);
      
      console.log( await _pacienteRepository.get(prot[i]));
      array.push( await _pacienteRepository.get(prot[i]));
      i=i+1;
      
    }
    return await array;
  }

  async eliminarOrdenCompra(protesisId){
    const protesis = await _protesisRepository.get(protesisId);
    if(!protesis){
      const error = new Error();
      error.status = 404;
      error.message = "protesis no existe";
      throw error;
    }
    const orden = await _ordenCompraRepository.get(protesis.ordenCompra);
    if(!orden){
      const error = new Error();
      error.status = 404;
      error.message = "protesis no tiene orden de compra";
      throw error;
    }
    const index = orden.listprotesis.findIndex(protesisId => protesisId === protesisId);
    console.log(index);
    if(index ===-1){
      const error = new Error();
      error.status = 404;
      error.message = "orden de compra no asociada";
      throw error;
    }
    orden.listprotesis.splice(index,1);
    const ordenup = await _ordenCompraRepository.update(orden._id, {listprotesis: orden.listprotesis})
    return await _protesisRepository.update(protesisId, {ordenCompra: null})
  }
  async eliminarLicitacion(protesisId){
    const protesis = await _protesisRepository.get(protesisId);
    if(!protesis){
      const error = new Error();
      error.status = 404;
      error.message = "protesis no existe";
      throw error;
    }
    const licitacion = await _licitacionRepository.get(protesis.licitacionId);
    if(!licitacion){
      const error = new Error();
      error.status = 404;
      error.message = "protesis no tiene licitacion";
      throw error;
    }
    const index = licitacion.listprotesis.findIndex(protesisId => protesisId === protesisId);
    console.log(index);
    if(index ===-1){
      const error = new Error();
      error.status = 404;
      error.message = "licitacion no asociada";
      throw error;
    }
    licitacion.listprotesis.splice(index,1);
    const licita = await _licitacionRepository.update(licitacion._id, {listprotesis: licitacion.listprotesis})
    return await _protesisRepository.update(protesisId, {licitacionId: null})
  }
  async eliminarFactura(protesisId){
    const protesis = await _protesisRepository.get(protesisId);
    if(!protesis){
      const error = new Error();
      error.status = 404;
      error.message = "protesis no existe";
      throw error;
    }
    const factura = await _facturaRepository.get(protesis.facturaId);
    if(!factura){
      const error = new Error();
      error.status = 404;
      error.message = "protesis no tiene factura";
      throw error;
    }
    const index = factura.listprotesis.findIndex(protesisId => protesisId === protesisId);
    console.log(index);
    if(index ===-1){
      const error = new Error();
      error.status = 404;
      error.message = "factura no asociada";
      throw error;
    }
    factura.listprotesis.splice(index,1);
    const fact = await _facturaRepository.update(factura._id, {listprotesis: factura.listprotesis})
    return await _protesisRepository.update(protesisId, {facturaId: null})
  }
  
}

module.exports = ProtesisService;
