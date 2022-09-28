import React, { useState, useEffect } from 'react';
import { getTiposEquipos, crearTipoEquipo, editTipoEquipo } from '../../services/tipoEquipoService';
import { useParams } from 'react-router-dom';


export const TipoView = () => {

  const [valoresForm, setValoresForm] = useState({});
  const { nombre = '', estado = '' } = valoresForm;
  const [tipos, setTipos] = useState([]);
  const { tipoId = '' } = useParams();


  const listarTipoEquipos = async () => {
    try {
      const { data } = await getTiposEquipos();
      setTipos(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    listarTipoEquipos();
  }, []);

  useEffect(() => {
    setValoresForm({
      nombre: tipos.nombre,
      estado: tipos.estado,
    })
  }, [tipos]);

  const handleOnChange = (e) => {
    console.log(e.target.name, e.target.value);
    setValoresForm({ ...valoresForm, [e.target.name]: e.target.value });
  }

  const handleCrearTipo = async (e) => {
    e.preventDefault();
    console.log(valoresForm);
    if (valoresForm.id) {
      await editTipoEquipo(valoresForm.id, valoresForm)
      await listarTipoEquipos();
      return
    }
    try {
      const resp = await crearTipoEquipo(valoresForm);
      console.log(resp.data);
      setValoresForm({ nombre: '', estado: '' });
    } catch (error) {
      console.log(error);
    }
  }

  const handleUpdateTipo = async (e, tipo) => {
    e.preventDefault();
    setValoresForm({ nombre: tipo.nombre, estado: tipo.estado, id: tipo._id });
  }

  return (
    <div className='container-fluid mt-3 mb-2'>
      <div className='card'>
        <div className='card-header'>
          <h5 className='card-title'>Tipos de Equipos</h5>
        </div>
        <div className='card-body'>
          <form onSubmit={(e) => handleCrearTipo(e)}>
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
                  tipos.map(tipo => {
                    return <tr>
                      <td>{tipo.nombre}</td>
                      <td>{tipo.estado}</td>
                      <td><button className="btn btn-warning" onClick={(e) => handleUpdateTipo(e, tipo)}>
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
