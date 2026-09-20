const Avatar = ({ url }) => {
  return (
    <img
      src={url}
      alt="Avatar"
      className="w-24 h-24 rounded-none object-cover border-4 border-double border-[#b8942f] mb-4 mx-auto"
    />
  )
}

export default Avatar