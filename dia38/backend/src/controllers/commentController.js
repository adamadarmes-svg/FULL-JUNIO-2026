import conectarDB from '../config/db.js';
import Post from '../models/Post.js';
import Comment from '../models/Comment.js';

const CAMPOS_AUTOR = 'nombre email';

const esAutorOAdmin = (comentario, usuario) =>
  comentario.autor.toString() === usuario.id || usuario.rol === 'admin';

const buscarComentario = (req) =>
  Comment.findOne({ _id: req.params.comentarioId, post: req.params.postId });

export const listarComentarios = async (req, res, next) => {
  try {
    await conectarDB();

    const comentarios = await Comment.find({ post: req.params.postId })
      .sort({ createdAt: 1 })
      .populate('autor', CAMPOS_AUTOR);

    res.json({ comentarios });
  } catch (error) {
    next(error);
  }
};

export const crearComentario = async (req, res, next) => {
  try {
    await conectarDB();

    const existePost = await Post.exists({ _id: req.params.postId });

    if (!existePost) {
      return res.status(404).json({ error: 'La publicación no existe' });
    }

    const comentario = await Comment.create({
      contenido: req.body.contenido,
      post: req.params.postId,
      autor: req.usuario.id,
    });
    await comentario.populate('autor', CAMPOS_AUTOR);

    res.status(201).json({ comentario });
  } catch (error) {
    next(error);
  }
};

export const actualizarComentario = async (req, res, next) => {
  try {
    await conectarDB();

    const comentario = await buscarComentario(req);

    if (!comentario) {
      return res.status(404).json({ error: 'Comentario no encontrado' });
    }

    if (!esAutorOAdmin(comentario, req.usuario)) {
      return res.status(403).json({ error: 'No tienes permiso para editar este comentario' });
    }

    comentario.contenido = req.body.contenido;
    await comentario.save();
    await comentario.populate('autor', CAMPOS_AUTOR);

    res.json({ comentario });
  } catch (error) {
    next(error);
  }
};

export const eliminarComentario = async (req, res, next) => {
  try {
    await conectarDB();

    const comentario = await buscarComentario(req);

    if (!comentario) {
      return res.status(404).json({ error: 'Comentario no encontrado' });
    }

    let permitido = esAutorOAdmin(comentario, req.usuario);

    if (!permitido) {
      const post = await Post.findById(comentario.post).select('autor');
      permitido = Boolean(post) && post.autor.toString() === req.usuario.id;
    }

    if (!permitido) {
      return res.status(403).json({ error: 'No tienes permiso para eliminar este comentario' });
    }

    await comentario.deleteOne();

    res.json({ mensaje: 'Comentario eliminado', id: comentario.id });
  } catch (error) {
    next(error);
  }
};
