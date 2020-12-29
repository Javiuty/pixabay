import React, { useEffect, useState } from "react";
import Formulario from "./Components/Formulario";

const App = () => {
  const [busqueda, guardarBusqueda] = useState("");

  useEffect(() => {
    if (busqueda === "") return;

    const imagenesPorPagina = 30;
    const key = process.env.API_KEY;

    console.log(key);
  }, [busqueda]);

  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de Imágenes</p>
        <Formulario guardarBusqueda={guardarBusqueda} />
      </div>
    </div>
  );
};

export default App;
