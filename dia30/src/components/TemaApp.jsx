import { useTheme } from '../context/ThemeContext'
import { useLanguage } from '../context/LanguageContext'

const TemaApp = () => {
  const { tema, alternarTema } = useTheme()
  const { t } = useLanguage()
  const oscuro = tema === 'dark'

  return (
    <div className="card">
      <p className="card-tag">
        <span>{t('Nivel')} 1</span>
      </p>
      <div className="mb-5 flex items-center gap-4">
        <span className="tile size-14 text-3xl">{oscuro ? '🛸' : '☄️'}</span>
        <div>
          <p className="text-lg font-bold">{t(oscuro ? 'Modo oscuro' : 'Modo claro')}</p>
        </div>
      </div>
      <button onClick={alternarTema} className="btn-solid mt-auto w-full">
        {t(oscuro ? 'Cambiar a claro' : 'Cambiar a oscuro')}
      </button>
    </div>
  )
}

export default TemaApp
