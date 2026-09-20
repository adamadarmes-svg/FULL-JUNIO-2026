import { useCounter } from '../context/CounterContext'
import { useLanguage } from '../context/LanguageContext'

const Display = () => {
  const { contador } = useCounter()
  return (
    <p className="my-auto py-4 text-center text-6xl font-bold tabular-nums">
      {contador}
    </p>
  )
}

const Controles = () => {
  const { incrementar, decrementar, resetear } = useCounter()
  return (
    <div className="grid grid-cols-3 gap-2">
      <button onClick={decrementar} className="btn-line">−</button>
      <button onClick={resetear} className="btn-line">Reset</button>
      <button onClick={incrementar} className="btn-solid">+</button>
    </div>
  )
}

const ContadorGlobal = () => {
  const { t } = useLanguage()

  return (
    <div className="card">
      <p className="card-tag">
        <span>{t('Contador')}</span>
      </p>
      
      <Display />
      <Controles />
    </div>
  )
}

export default ContadorGlobal
