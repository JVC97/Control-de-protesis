const { PacienteService } = require("../services");

let _pacienteService = null;
class PacienteController {
  constructor({ PacienteService }) {
    _pacienteService = PacienteService;
  }

  async get(req, res) {
    const { body } = req;
    const { _id } = body;
    const paciente = await _pacienteService.get(_id);
    return res.send(paciente);
  }

  async getAll(req, res) {
    const { pageSize, pageNum } = req.query;
    const pacientes = await _pacienteService.getAll(pageSize, pageNum);
    return res.send(pacientes);
  }

  async update(req, res) {
    const { body } = req;
    const { _id } = body;
    const updatedpaciente = await _pacienteService.update(_id, body);
    return res.send(updatedpaciente);
  }

  async delete(req, res) {
    const { body }= req;
    const {_id}=body;
    const deletedpaciente = await _pacienteService.delete(_id);
    return res.send(deletedpaciente);
  }
  async createPaciente(req, res) {
    const { body } = req;
    const createdPaciente = await _pacienteService.createPaciente(body);
    return res.status(201).send(createdPaciente);
  }

  async getByNom(req, res) {
    const {nombre} = req.params;
    const paciente = await _pacienteService.getByNom(nombre);
    return res.send(paciente);
  }
 

}

module.exports = PacienteController;