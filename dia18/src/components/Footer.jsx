function Footer({ message }) {
  return (
    <footer className="bg-ink text-paper-70 text-center py-5 text-xs uppercase tracking-widest border-t-2 border-gold">
      <p>{message}</p>
    </footer>
  )
}

export default Footer