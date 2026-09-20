import { useLoaderData, useNavigate, useParams } from 'react-router-dom'

export const postLoader = async ({ params }) => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.id}`
  )

  if (!res.ok) {
    throw new Response('Post no encontrado', { status: 404 })
  }

  return res.json()
}

const Post = () => {
  const post = useLoaderData()
  const { id } = useParams()
  const navigate = useNavigate()

  return (
    <div className="bg-white border border-zinc-200">
      <div className="flex items-center justify-between px-8 pt-6">
        <span className="border border-indigo-200 bg-indigo-50 text-indigo-700 text-[11px] font-bold uppercase tracking-wide px-2 py-0.5">
          Post #{post.id}
        </span>
      </div>

      <div className="p-8 pt-4">
        <h1 className="text-2xl font-bold text-zinc-900 mb-4 capitalize tracking-tight">
          {post.title}
        </h1>

        <p className="text-zinc-600 leading-relaxed">
          {post.body}
        </p>
      </div>

      <div className="border-t border-zinc-200 p-6">
        <div className="flex gap-2">
          <button
            onClick={() => navigate(`/post/${Math.max(1, Number(id) - 1)}`)}
            className="border border-zinc-300 hover:bg-zinc-50 text-zinc-700 font-semibold px-4 py-2 cursor-pointer transition-colors"
          >
            ← Anterior
          </button>
          <button
            onClick={() => navigate(`/post/${Number(id) + 1}`)}
            className="border border-zinc-300 hover:bg-zinc-50 text-zinc-700 font-semibold px-4 py-2 cursor-pointer transition-colors"
          >
            Siguiente →
          </button>
          <button
            onClick={() => navigate('/post/999')}
            className="text-red-600 border border-red-200 hover:bg-red-50 font-semibold px-4 py-2 cursor-pointer transition-colors ml-auto"
          >
            Probar error
          </button>
        </div>
      </div>
    </div>
  )
}

export default Post