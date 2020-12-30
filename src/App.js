import React, { useEffect, useState } from "react";
import Formulario from "./Components/Formulario";
import { clave } from "./Components/Key";
import ListadoImagenes from "./Components/ListadoImagenes";

const App = () => {
  const [busqueda, guardarBusqueda] = useState("");
  const [imagenes, guardarImagenes] = useState([]);
  const [paginaactual, guardarPaginaActual] = useState(1);
  const [totalpaginas, guardarTotalPaginas] = useState(1);

  useEffect(() => {
    const consultarApi = async () => {
      // Para que no busque la primera vez;
      if (busqueda === "") return;

      const imagenesPorPagina = 30;
      const key = clave;
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}`;

      const respuesta = await fetch(url);
      const resultado = await respuesta.json();

      guardarImagenes(resultado.hits);

      // Calcular total de páginas
      const calcularTotalPaginas = Math.ceil(
        resultado.totalHits / imagenesPorPagina
      );

      guardarTotalPaginas(calcularTotalPaginas);
    };

    consultarApi();
  }, [busqueda]);

  // definir la pagina anterior
  const paginaAnterior = () => {
    const nuevaPaginaActual = paginaactual - 1;

    if (nuevaPaginaActual === 0) return;

    guardarPaginaActual(nuevaPaginaActual);
  };

  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de Imágenes</p>
        <Formulario guardarBusqueda={guardarBusqueda} />
      </div>
      <div className="row justify-content-center">
        <ListadoImagenes imagenes={imagenes} />

        <button
          type="button"
          className="btn btn-info mr-1"
          onClick={paginaAnterior}
        >
          &laquo; Anterior
        </button>

        <button type="button" className="btn btn-info">
          Siguiente &raquo;
        </button>
      </div>
    </div>
  );
};

export default App;
