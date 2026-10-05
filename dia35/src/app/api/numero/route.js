export async function GET() {
  return Response.json({
    numero: Math.random(),
    entero: Math.floor(Math.random() * 100) + 1,
  })
}