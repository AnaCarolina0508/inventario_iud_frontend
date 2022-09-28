import React, { useState, useEffect } from 'react';
import { getUsuarios, crearUsuario, editUsuario } from '../../services/usuarioService';
import { useParams } from 'react-router-dom';


export const UsuarioView = () => {

  const [valoresForm, setValoresForm] = useState({});
  const { nombre = '', estado = '', email = '' } = valoresForm;
  const [usuarios, setUsuarios] = useState([]);
  const { usuarioId = '' } = useParams();

  const listarUsuarios = async () => {
    try {
      const { data } = await getUsuarios();
      setUsuarios(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    listarUsuarios();
  }, []);

  useEffect(() => {
    setValoresForm({
      nombre: usuarios.nombre,
      estado: usuarios.estado,
    })
  }, [usuarios]);

  const handleOnChange = (e) => {
    console.log(e.target.name, e.target.value);
    setValoresForm({ ...valoresForm, [e.target.name]: e.target.value });
  }

  const handleCrearUsuario = async (e) => {
    e.preventDefault();
    console.log(valoresForm);
    if (valoresForm.id) {
      await editUsuario(valoresForm.id, valoresForm)
      await listarUsuarios();
      return
    }
    try {
      const resp = await crearUsuario(valoresForm);
      console.log(resp.data);
      setValoresForm({ nombre: '', email: '', estado: '' });
    } catch (error) {
      console.log(error);
    }
  }

  const handleUpdateUsuario = async (e, usuario) => {
    e.preventDefault();
    setValoresForm({ nombre: usuario.nombre, email: usuario.email,
       estado: usuario.estado, id: usuario._id });
  }


  return (
    <div className='container-fluid mt-3 mb-2'>
      <div className='card'>
        <div className='card-header'>
          <h5 className='card-title'>Usuarios</h5>
        </div>
        <div className='card-body'>
          <form onSubmit={(e) => handleCrearUsuario(e)}>
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
                  <label className="form-label">Email</label>
                  <input
                    name='email'
                    value={email}
                    placeholder="xxxxxxxx@mail.com"
                    required
                    type="email"
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
                  <th scope="col">Email</th>
                  <th scope="col">Estado</th>
                </tr>
              </thead>
              <tbody>
                {
                  usuarios.map(usuario => {
                    return <tr>
                      <td>{usuario.nombre}</td>
                      <td>{usuario.email}</td>
                      <td>{usuario.estado}</td>
                      <td><button className="btn btn-warning" onClick={(e) => handleUpdateUsuario(e, usuario)}>
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
