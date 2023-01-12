import { useEffect, Fragment } from "react";
import useCotizador from "../hooks/useCotizador";
import Error from "./Error";

const Formulario = () => {
  const {
    marcas,
    años,
    planes,
    getMarcas,
    getAños,
    getPlanes,
    handleChangeData,
    formulario,
    error,
    setError,
    cotizarSeguro,
  } = useCotizador();

  useEffect(() => {
    getMarcas();
    getAños();
    getPlanes();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.values(formulario).includes("")) {
      setError("Todos los campos son requeridos.");
    } else {
      setError("");
      cotizarSeguro();
    }
  };
  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      {error && (
        <>
          <Error>{error}</Error>
        </>
      )}
      <div className="my-5">
        <label
          htmlFor="marca"
          className="block mb-3 font-bold text-zinc-400 uppercase"
        >
          Marca
        </label>
        <select
          name="marca"
          id="marca"
          className="w-full p-3 bg-white border border-zinc-200 text-center rounded-md"
          onChange={(e) => handleChangeData(e)}
          value={formulario.marca}
        >
          <option value="">-- Seleccionar marca --</option>
          {marcas.map((marca) => (
            <option key={marca.id} value={marca.id}>
              {marca.nombre}
            </option>
          ))}
        </select>
      </div>
      <div className="my-5">
        <label
          htmlFor="año"
          className="block mb-3 font-bold text-zinc-400 uppercase"
        >
          Año
        </label>
        <select
          name="año"
          id="año"
          className="w-full p-3 bg-white border border-zinc-200 text-center rounded-md"
          onChange={(e) => handleChangeData(e)}
          value={formulario.año}
        >
          <option value="">-- Seleccionar año --</option>
          {años.map((año) => (
            <option key={año.id} value={año.año}>
              {año.año}
            </option>
          ))}
        </select>
      </div>
      <div className="my-5">
        <label
          htmlFor="plan"
          className="block mb-3 font-bold text-zinc-400 uppercase"
        >
          Elige un plan
        </label>
        <div className="flex gap-3 items-center">
          {planes.map((plan) => (
            <Fragment key={plan.id}>
              <label htmlFor="plan">{plan.nombre}</label>
              <input
                type="radio"
                name="plan"
                value={plan.id}
                onChange={(e) => handleChangeData(e)}
              />
            </Fragment>
          ))}
        </div>
      </div>
      <div className="flex justify-end">
        <input
          type="submit"
          className="px-3 py-1 bg-sky-700 hover:bg-sky-900 hover:text-zinc-300 transition-colors p-3 uppercase font-bold text-white text-lg rounded-md"
          value="Cotizar"
        />
      </div>
    </form>
  );
};

export default Formulario;
