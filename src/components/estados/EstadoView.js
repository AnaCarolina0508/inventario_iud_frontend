import React, { useState, useEffect } from 'react';
import {
  getEstadosEquipos, crearEstadoEquipo,
  editEstadoEquipo, getEstadoporId
} from '../../services/estadoEquipoService';
import { useParams } from 'react-router-dom';


export const EstadoView = () => {

  const [valoresForm, setValoresForm] = useState({});
  const { nombre = '', estado = '' } = valoresForm;
  const [estados, setEstados] = useState([]);
  const { estadoId = '' } = useParams();


  const listarEstadoEquipos = async () => {
    try {
      const { data } = await getEstadosEquipos();
      setEstados(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    listarEstadoEquipos();
  }, []);


  useEffect(() => {
    setValoresForm({
      nombre: estados.nombre,
      estado: estados.estado,
    })
  }, [estados]);

  const handleOnChange = (e) => {
    console.log(e.target.name, e.target.value);
    setValoresForm({ ...valoresForm, [e.target.name]: e.target.value });
  }

  const handleCrearEstado = async (e) => {
    e.preventDefault();
    console.log(valoresForm);
    if (valoresForm.id) {
      await editEstadoEquipo(valoresForm.id, valoresForm)
      await listarEstadoEquipos();
      return
    }
    try {
      const resp = await crearEstadoEquipo(valoresForm);
      console.log(resp.data);
      setValoresForm({ nombre: '', estado: '' });

    } catch (error) {
      console.log(error);
    }
  }

  const handleUpdateEstado = async (e, estado) => {
    e.preventDefault();
    setValoresForm({ nombre: estado.nombre, estado: estado.estado, id: estado._id });
  }

  return (
    <div className='container-fluid mt-3 mb-2'>
      <div className='card'>
        <div className='card-header'>
          <h5 className='card-title'>Estados de Equipo</h5>
        </div>
        <div className='card-body'>
          <form onSubmit={(e) => handleCrearEstado(e)}>
            <div className='row'>
              <div className='col'>
                <div className="mb-3">
                  <label className="form-label">Nombre</label>
                  <input
                    name='nombre'
                    value={nombre}
                    required
                    type="text"
                    className="form-control"
                    onChange={(e) => handleOnChange(e)} />
                </div>
              </div>
              <div className='col'>
                <div className="mb-3">
                  <label className="form-label">Estado</label>
                  <select
                    name='estado'
                    value={estado}
                    required
                    className="form-select"
                    onChange={(e) => handleOnChange(e)}>
                    <option selected>--SELECCIONE--</option>
                    <option value="Activo">Activo</option>
                    <option value="Inactivo">Inactivo</option>
                  </select>
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col'>
                <button className="btn btn-primary">Guardar</button>
              </div>
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Nombre</th>
                  <th scope="col">Estado</th>
                </tr>
              </thead>
              <tbody>
                {
                  estados.map(estado => {
                    return <tr>
                      <td>{estado.nombre}</td>
                      <td>{estado.estado}</td>
                      <td><button className="btn btn-warning" onClick={(e) => handleUpdateEstado(e, estado)}>

                        Editar
                      </button></td>
                    </tr>
                  })
                }
              </tbody>
            </table>
          </form>
        </div>
      </div>
    </div>
  )
}
