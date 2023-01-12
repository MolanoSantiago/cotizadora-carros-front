import { formatearValor } from "../helpers";
import useCotizador from "../hooks/useCotizador";
import { useCallback, useRef } from "react";

const Cotizacion = () => {
  const { cotizacion, formulario, marcas, planes } = useCotizador();
  const { marca, año, plan } = formulario;

  const [nombreMarca] = useCallback(
    marcas.filter((m) => m.id === Number(marca)),
    [cotizacion]
  );

  const [nombrePlan] = useCallback(
    planes.filter((p) => p.id === Number(plan)),
    [cotizacion]
  );

  const añoRef = useRef(año)

  if (cotizacion === 0) return null;

  return (
    <div className="bg-zinc-100 mt-5 p-5 shadow rounded-md w-full">
      <h2 className="text-sky-800 font-bold text-3xl text-center">Resumen</h2>

      <p className="my-2">
        <span className="font-bold">Marca: </span>
        {nombreMarca.nombre}
      </p>

      <p className="my-2">
        <span className="font-bold">Año del Carro: </span>
        {añoRef.current}
      </p>

      <p className="my-2">
        <span className="font-bold">Plan: </span>
        {nombrePlan.nombre}
      </p>

      <p className="my-2 text-2xl">
        <span className="font-bold">Total de Cotización: </span>
        {formatearValor(cotizacion)}
      </p>
    </div>
  );
};

export default Cotizacion;
