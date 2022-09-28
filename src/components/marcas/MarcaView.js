import React, { useState, useEffect } from 'react';
import { getMarcas, crearMarca, editMarca } from '../../services/marcaService';
import { useParams } from 'react-router-dom';

export const MarcaView = () => {

  const [valoresForm, setValoresForm] = useState({});
  const [marcas, setMarcas] = useState({});
  const { nombre = '', estado = '' } = valoresForm;
  const { marcaId = '' } = useParams();

  const listarMarcas = async () => {
    try {
      const { data } = await getMarcas();
      setMarcas(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    listarMarcas();
  }, []);

  useEffect(() => {
    setValoresForm({
      nombre: marcas.nombre,
      estado: marcas.estado,
    })
  }, [marcas]);

  const handleOnChange = (e) => {
    console.log(e.target.name, e.target.value);
    setValoresForm({ ...valoresForm, [e.target.name]: e.target.value });
  }

  const handleCrearMarca = async (e) => {
    e.preventDefault();
    console.log(valoresForm);
    if (valoresForm.id) {
      await editMarca(valoresForm.id, valoresForm)
      await listarMarcas();
      return
    }
    try {
      const resp = await crearMarca(valoresForm);
      console.log(resp.data);
      setValoresForm({ nombre: '', estado: '' });
    } catch (error) {
      console.log(error);
    }
  }
  const handleUpdateMarca = async (e, marca) => {
    e.preventDefault();
    setValoresForm({
      nombre: marca.nombre,
      estado: marca.estado, id: marca._id
    });
  }


  return (
    <div className='container-fluid mt-3 mb-2'>
      <div className='card'>
        <div className='card-header'>
          <h5 className='card-title'>Marcas</h5>
        </div>
        <div className='card-body'>
          <form onSubmit={(e) => handleCrearMarca(e)} >
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
                <button className="btn btn-primary">
                  Guardar</button>
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
                  marcas.length > 0 && marcas.map(marca => {
                    return <tr>
                      <td>{marca.nombre}</td>
                      <td>{marca.estado}</td>
                      <td><button className="btn btn-warning" onClick={(e) => handleUpdateMarca(e, marca)}>
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
