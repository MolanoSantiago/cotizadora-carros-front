import { useState, createContext } from "react";
import axios from "axios";
import { CalculaMarca, CalculaPlan, formatearValor, YearDifference } from "../helpers";

const CotizadorContext = createContext();

const CotizadorProvider = ({ children }) => {
  const BASE_URL_API = import.meta.env.VITE_API_URL;
  const [marcas, setMarcas] = useState([]);
  const [años, setAños] = useState([]);
  const [planes, setPlanes] = useState([]);
  const [formulario, setFormulario] = useState({
    marca: "",
    año: "",
    plan: ""
  })
  const [error, setError] = useState("")
  const [cotizacion, setCotizacion] = useState(0)
  const [loading, setLoading] = useState(false)

  const getMarcas = async () => {
    await axios.get(`${BASE_URL_API}/marcas`).then(({ data }) => {
      setMarcas(data.marcas);
    });
  };

  const getAños = async () => {
    await axios.get(`${BASE_URL_API}/años`).then(({ data }) => {
      setAños(data.años);
    });
  };

  const getPlanes = async () => {
    await axios.get(`${BASE_URL_API}/planes`).then(({ data }) => {
      setPlanes(data.planes);
    });
  };

  const handleChangeData = (e) => {
    setFormulario({
        ...formulario,
        [e.target.name] : e.target.value
    })
  }

  const cotizarSeguro = () => {
    // Base de la aseguradora
    let base = 1000000

    // Diferencia de año
    const diferencia = YearDifference(formulario.año)
    // Restar 3% por cada año anterior al actual ejemplo:
    // 2023 0% - 2022 3% - 2021 6% - 2020 9%
    base -= ((diferencia*3) * base) / 100

    // Americano 15% || Europeo 30% || Asiatico
    base *= CalculaMarca(formulario.marca)
    // Plan: Básico 20% || Completo 50%
    base *= CalculaPlan(formulario.plan)
    base = base.toFixed(2)
    setLoading(true)
    setTimeout(() => {
        setCotizacion(+base)
        setLoading(false)
    }, 3000);
  }

  return (
    <CotizadorContext.Provider
      value={{ marcas, años, planes, getMarcas, getAños, getPlanes, handleChangeData, formulario, error, setError, cotizarSeguro, cotizacion, loading }}
    >
      {children}
    </CotizadorContext.Provider>
  );
};

export { CotizadorProvider };

export default CotizadorContext;
