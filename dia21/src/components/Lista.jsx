const Lista = ({ children }) => {
  return (
    <ul className="list-disc list-inside bg-white rounded-none border-2 border-[#b8942f] p-4 mb-4">
      {children}
    </ul>
  )
}

export default Lista