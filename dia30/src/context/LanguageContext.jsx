import { createContext, useContext, useState } from 'react'

const LanguageContext = createContext(null)

const ingles = {
  'Cambiar usuario': 'Switch user',
  'Nivel': 'Level',
  'Contador': 'Counter',
  'Idioma': 'Language',
  'Hola, bienvenido': 'Hello, welcome',
  'Idioma actual: Español': 'Current language: English',
  'Hasta luego': 'Goodbye',
  'Cambiar a inglés': 'Switch to Spanish',
  'Modo oscuro': 'Dark mode',
  'Modo claro': 'Light mode',
  'Cambiar a claro': 'Switch to light',
  'Cambiar a oscuro': 'Switch to dark',
  'Agregar': 'Add',
  'Añadir más': 'Add more',
  'lista de productos': 'product list',
  'Camiseta de algodón': 'Cotton T-shirt',
  'Zapatillas deportivas': 'Running shoes',
  'Chaqueta de invierno': 'Winter jacket',
  'Oso de peluche': 'Teddy bear',
  'Pistola de agua': 'Water gun',
  'Arco de tiro': 'Archery bow',
  'Cerrar sesión': 'Log out',
  'Mi carrito': 'My cart',
  'El carrito está vacío': 'Your cart is empty',
  'Añade productos desde la lista': 'Add products from the list',
  'Eliminar': 'Remove',
  'Confirmar pedido': 'Confirm order',
  'Crear cuenta': 'Create account',
  'Inicia sesión': 'Log in',
  'Nombre': 'Name',
  'Contraseña': 'Password',
  'Confirmar contraseña': 'Confirm password',
  'Registrarme': 'Sign up',
  'Entrar': 'Log in',
  'Regístrate': 'Sign up',
  '¿Ya tienes cuenta?': 'Already have an account?',
  '¿No tienes cuenta?': "Don't have an account?",
  'El email no tiene un formato válido': 'Invalid email format',
  'Las contraseñas no coinciden': 'Passwords do not match',
  'Email o contraseña incorrectos': 'Incorrect email or password',
  'Ese email ya está registrado': 'That email is already registered',
}

export const LanguageProvider = ({ children }) => {
  const [idioma, setIdioma] = useState('es')

  const alternarIdioma = () => {
    setIdioma(i => i === 'es' ? 'en' : 'es')
  }

  const t = (clave) => (idioma === 'en' && ingles[clave]) || clave

  return (
    <LanguageContext.Provider value={{ idioma, alternarIdioma, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => useContext(LanguageContext)

export default LanguageContext
