const BASE_URL = "https://desafio-backend-jnku.onrender.com";

// Crear un nuevo post
const createPost = async (postObject) => {
  const response = await fetch(`${BASE_URL}/post`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
    body: JSON.stringify(postObject),
  });

  if (!response.ok) {
    throw new Error("Error al crear el post");
  }

  return await response.json();
};

// Obtener todos los posts, con opción de filtrar por título
async function getAllPosts() {
  try {
    const response = await fetch(`${BASE_URL}/post`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log(data); // <-- Verifica la estructura aquí
    return data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return []; // Devuelve un array vacío en caso de error
  }
}

// Obtener un post por ID
const getPostById = async (postId) => {
  const response = await fetch(`${BASE_URL}/post/${postId}`);

  if (!response.ok) {
    throw new Error("Error al obtener el post");
  }

  return await response.json();
};

// Actualizar los likes de un post
const updateLikes = async (postId, newLikes) => {
  const response = await fetch(`${BASE_URL}/post/${postId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
    body: JSON.stringify({ likes: newLikes }),
  });

  if (!response.ok) {
    throw new Error("Error al actualizar los likes");
  }

  return await response.json();
};

// Añadir un like a un post
const addLikeToPost = async (postId) => {
  try {
    let post = await getPostById(postId);
    let newLikes = (post.likes || 0) + 1;
    await updateLikes(postId, newLikes);
    console.log(`Likes actualizados para el post ${postId}.`);
  } catch (error) {
    console.error("Error al actualizar los likes:", error);
  }
};

// Añadir un comentario a un post
const addCommentToPost = async (postId, comment) => {
  try {
    let post = await getPostById(postId);
    if (!post.comments) {
      post.comments = [];
    }
    post.comments.push(comment);

    const response = await fetch(`${BASE_URL}/post/${postId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
      body: JSON.stringify({ comments: post.comments }),
    });

    if (!response.ok) {
      throw new Error("Error al agregar el comentario");
    }

    console.log(`Comentario agregado para el post ${postId}.`);
  } catch (error) {
    console.error("Error al agregar el comentario:", error);
  }
};

// Eliminar un post por ID
const deletePost = async (postId) => {
  const response = await fetch(`${BASE_URL}/post/${postId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error al eliminar el post");
  }

  console.log(`Post ${postId} eliminado.`);
};

export {
  createPost,
  getAllPosts,
  getPostById,
  updateLikes,
  addLikeToPost,
  addCommentToPost,
  deletePost,
};
