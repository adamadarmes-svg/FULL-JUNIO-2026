import Calculator from './Calculator'
import Section from './Section'
import Card from './Card'

function Main() {
    return (
        <main className="flex-1 bg-paper p-8 flex flex-col gap-6 max-w-3xl mx-auto w-full">
            <p className="text-3xl font-light uppercase tracking-0-15em">dia 18</p>
            <Calculator className="shadow-sm" />
            <Section
                title="Componentes"
                content="reutilización."
            />
            <div className="grid grid-cols-1 md-grid-cols-2 gap-4">
                <Card title="React" content="Biblioteca." className="hover-shadow-xl" />
                <Card title="Vite" content="Herramientas." style={{ borderStyle: 'dashed' }} />
            </div>
        </main>
    )
}

export default Main