import { axiosInstance, AxiosInstance } from '../helpers/axios-config';

const getTiposEquipos = () => {
    return axiosInstance.get('tipo-Equipo', {
        headers: {
            'Content-type': 'application/json'
        }
    })
}

const crearTipoEquipo =(data) => {
    return axiosInstance.post ('tipo-Equipo', data, {
        headers: {
            'Content-type': 'application/json'
        }
    })
}

const editTipoEquipo = (tipoId, data) => {
    return axiosInstance.put(`tipo-Equipo/${tipoId}`, data, {
        headers: {
            'Content-type': 'application/json'

        }
    });
}

export {
    getTiposEquipos, crearTipoEquipo, editTipoEquipo
}