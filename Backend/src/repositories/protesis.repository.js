const BaseRepository = require("./base.repository");
let _protesis = null;
let _paciente = null;

class ProtesisRepository extends BaseRepository {
  constructor({ Protesis, Paciente}) {
    super(Protesis, Paciente);
    _protesis = Protesis;
    _paciente = Paciente;
  }

  async getPacienteProtesis(paciente) {
    return await _protesis.find( { paciente } );
  }

  async getPorFacturar(pageSize = 10, pageNum = 1) {
    const skips = pageSize * (pageNum - 1);
    return await _protesis.find({facturaId:null}).skip(skips)
    .limit(pageSize).distinct('pacienteId');
  }

 
}

module.exports = ProtesisRepository;
