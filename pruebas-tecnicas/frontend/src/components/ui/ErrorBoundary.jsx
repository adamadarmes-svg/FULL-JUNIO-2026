import { Component } from 'react'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error, info) {
    console.error('Error capturado por ErrorBoundary:', error)
    console.error(info.componentStack)
  }

  render() {
    if (this.state.error) {
      return (
        <div
          role="alert"
          className="fixed inset-0 flex flex-col items-center justify-center gap-6 bg-white p-6 text-center"
        >
          <h1 className="text-2xl text-black">Algo ha salido mal</h1>
          <p className="max-w-md text-sm text-neutral-600">{this.state.error.message}</p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="border border-black px-6 py-2 text-sm uppercase tracking-widest transition-colors hover:bg-black hover:text-white"
          >
            Recargar página
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
