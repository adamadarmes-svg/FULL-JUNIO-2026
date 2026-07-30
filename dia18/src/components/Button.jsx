function Button({ text, onClick, variant = 'primary', className = '', disabled = false }) {
  const styles = {
    primary: 'bg-ink text-paper border border-ink hover:bg-gold hover:border-gold hover:text-ink',
    secondary: 'bg-paper text-ink border border-ink hover:border-gold hover:text-gold',
    danger: 'bg-paper text-ink border border-gold hover:bg-gold hover:text-ink',
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 font-semibold uppercase tracking-wide text-sm transition-all duration-300 ease-out hover:scale-105 active:scale-95 disabled:opacity-40 disabled:pointer-events-none disabled:hover:scale-100 ${styles[variant]} ${className}`}
    >
      {text}
    </button>
  )
}

export default Button