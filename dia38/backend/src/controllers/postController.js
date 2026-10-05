import conectarDB from '../config/db.js';
import Post from '../models/Post.js';
import Comment from '../models/Comment.js';
import { esImagenBase64, tamanoBase64EnMB, LIMITES } from '../utils/validaciones.js';

const CAMPOS_AUTOR = 'nombre email';

const errorImagen = (imagen) => {
  if (!esImagenBase64(imagen)) {
    return { estado: 400, error: 'La imagen es obligatoria y debe estar en formato Base64' };
  }

  if (tamanoBase64EnMB(imagen) > LIMITES.IMAGEN_MAX_MB) {
    return { estado: 413, error: 'La imagen supera el tamaño máximo permitido' };
  }

  return null;
};

const puedeModificar = (post, usuario) =>
  post.autor.toString() === usuario.id || usuario.rol === 'admin';

export const listarPosts = async (req, res, next) => {
  try {
    await conectarDB();

    const pagina = Math.max(parseInt(req.query.page, 10) || 1, 1);
    const limite = Math.min(Math.max(parseInt(req.query.limit, 10) || 6, 1), 50);
    const filtro = req.query.autor ? { autor: req.query.autor } : {};

    const [total, posts] = await Promise.all([
      Post.countDocuments(filtro),
      Post.find(filtro)
        .sort({ createdAt: -1 })
        .skip((pagina - 1) * limite)
        .limit(limite)
        .populate('autor', CAMPOS_AUTOR),
    ]);

    const postsConComentarios = await Promise.all(
      posts.map(async (post) => ({
        ...post.toJSON(),
        totalComentarios: await Comment.countDocuments({ post: post._id }),
      }))
    );

    res.json({
      posts: postsConComentarios,
      paginacion: {
        pagina,
        totalPaginas: Math.ceil(total / limite),
        total,
        limite,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const obtenerPost = async (req, res, next) => {
  try {
    await conectarDB();

    const post = await Post.findById(req.params.id).populate('autor', CAMPOS_AUTOR);

    if (!post) {
      return res.status(404).json({ error: 'Publicación no encontrada' });
    }

    res.json({ post });
  } catch (error) {
    next(error);
  }
};

export const crearPost = async (req, res, next) => {
  try {
    await conectarDB();

    const { titulo, contenido, imagen } = req.body;
    const fallo = errorImagen(imagen);

    if (fallo) {
      return res.status(fallo.estado).json({ error: fallo.error });
    }

    const post = await Post.create({ titulo, contenido, imagen, autor: req.usuario.id });
    await post.populate('autor', CAMPOS_AUTOR);

    res.status(201).json({ post });
  } catch (error) {
    next(error);
  }
};

export const actualizarPost = async (req, res, next) => {
  try {
    await conectarDB();

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ error: 'Publicación no encontrada' });
    }

    if (!puedeModificar(post, req.usuario)) {
      return res.status(403).json({ error: 'No tienes permiso para editar esta publicación' });
    }

    const { titulo, contenido, imagen } = req.body;

    if (imagen !== undefined) {
      const fallo = errorImagen(imagen);

      if (fallo) {
        return res.status(fallo.estado).json({ error: fallo.error });
      }

      post.imagen = imagen;
    }

    post.titulo = titulo;
    post.contenido = contenido;

    await post.save();
    await post.populate('autor', CAMPOS_AUTOR);

    res.json({ post });
  } catch (error) {
    next(error);
  }
};

export const eliminarPost = async (req, res, next) => {
  try {
    await conectarDB();

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ error: 'Publicación no encontrada' });
    }

    if (!puedeModificar(post, req.usuario)) {
      return res.status(403).json({ error: 'No tienes permiso para eliminar esta publicación' });
    }

    await Comment.deleteMany({ post: post._id });
    await post.deleteOne();

    res.json({ mensaje: 'Publicación eliminada', id: post.id });
  } catch (error) {
    next(error);
  }
};
