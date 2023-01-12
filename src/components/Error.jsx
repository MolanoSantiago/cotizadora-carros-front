const Error = ({children}) => {
  return (
    <p className="border bg-red-100 border-red-400 text-red-800 py-3 text-center my-4 font-bold rounded-md">
        {children}
    </p>
  )
}

export default Error