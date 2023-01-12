import React, { useContext } from 'react'
import Formulario from './Formulario'
import useCotizador from '../hooks/useCotizador'
import Spinner from './Spinner'
import Cotizacion from './Cotizacion'

const AppSeguro = () => {
    const { loading } = useCotizador()
  return (
    <>
    <header className='my-10'>
        <h1 className='text-white text-center text-5xl font-bold'>
            Aseguradora de Carros
        </h1>
    </header>
    <main className='bg-white md:w-2/3 lg:w-2/4 shadow rounded-lg p-10 mx-auto'>
        <Formulario />
        <div className='flex justify-center items-center '>
            {loading ? <Spinner /> : <Cotizacion />}
        </div>
    </main>
    </>
  )
}

export default AppSeguro