import { useLanguage } from '../context/LanguageContext'

const SelectorIdioma = () => {
  const { idioma, alternarIdioma, t } = useLanguage()

  return (
    <div className="card">
      <p className="card-tag">
        <span>{t('Idioma')}</span>
      </p>

      <div className="mb-5 flex items-center gap-4">
        <span className="tile size-14 text-3xl">{idioma === 'es' ? '🇪🇸' : '🇬🇧'}</span>
        <div className="min-w-0">
          <p className="truncate text-lg font-bold">{t('Hola, bienvenido')}</p>
          <p className="truncate text-sm text-mute">{t('Idioma actual: Español')}</p>
          <p className="truncate text-sm text-mute">{t('Hasta luego')}</p>
        </div>
      </div>
      <button onClick={alternarIdioma} className="btn-solid mt-auto w-full">
        {t('Cambiar a inglés')}
      </button>
    </div>
  )
}

export default SelectorIdioma
