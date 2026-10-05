export async function GET() {
  return Response.json({
    mensaje: 'Hola desde la API',
    timestamp: new Date().toLocaleTimeString('es-ES'),
  })
}