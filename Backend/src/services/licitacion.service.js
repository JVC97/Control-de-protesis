const BaseService = require("./base.service");
let _licitacionRepository = null;

class LicitacionService extends BaseService{
    constructor({ LicitacionRepository }){
        super(LicitacionRepository);
        _licitacionRepository = LicitacionRepository;
    }

    async getLicitacion(codigo){
        return await _licitacionRepository.getLicitacion(codigo);
    }

    async createLicitacion(licitacion){
        const { codigo } = licitacion;

        const licita = await _licitacionRepository.getLicitacion(codigo);
        if(licita){
            const error = new Error();
            error.status = 404;
            error.message = "Licitacion ya existe";
            throw error;
        }

        return await _licitacionRepository.create(licitacion);
    }

    async getPorAsignar(pageSize, pageNum){
        return await _licitacionRepository.getPorAsignar(pageSize, pageNum);
    }

    async getByNom(nombre){
        return await _licitacionRepository.getByNom(nombre);
    }
}

module.exports = LicitacionService;