export default function Campo({
  etiqueta,
  nombre,
  tipo = 'text',
  placeholder,
  inputRef,
  textarea = false,
  filas = 4,
  maxLength,
  defaultValue,
  ayuda,
  error,
}) {
  const props = {
    id: nombre,
    name: nombre,
    ref: inputRef,
    placeholder,
    maxLength,
    defaultValue,
    'aria-invalid': Boolean(error),
    className: `w-full resize-none border bg-white px-3 py-2.5 outline-none transition-colors placeholder:text-stone-400 focus:border-stone-900 ${
      error ? 'border-red-600' : 'border-stone-300'
    }`,
  }

  return (
    <div className="flex flex-col gap-2">
      {etiqueta && (
        <label htmlFor={nombre} className="etiqueta text-stone-500">
          {etiqueta}
        </label>
      )}
      {textarea ? <textarea {...props} rows={filas} /> : <input {...props} type={tipo} />}
      {(error || ayuda) && <p className={`text-xs ${error ? 'text-red-600' : 'text-stone-500'}`}>{error || ayuda}</p>}
    </div>
  )
}
