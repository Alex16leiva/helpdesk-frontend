import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export const Categorias = () => {
    const [categorias, setCategorias] = useState([]);

    const ObtenerCategorias = async () => {
        setCategorias();
    }

    useEffect(() => {
        ObtenerCategorias();
    }, []);


    return (
        <div className="container">
            <h1>Categorías de Conocimiento</h1>
            <Link to="/categorias/crear" className="btn btn-primary">Nueva Categoría</Link>
            <table className="table mt-3">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {categorias.map(cat => (
                        <tr key={cat.id}>
                            <td>{cat.id}</td>
                            <td>{cat.nombre}</td>
                            <td>{cat.descripcion}</td>
                            <td>
                                <Link to={`/categorias/editar/${cat.id}`} className="btn btn-sm btn-warning">Editar</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
