const API_URL = 'http://localhost:8000/users';

export async function fetchUsers() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Error al obtener la lista de usuarios');
  return res.json();
}

export async function fetchUserById(id) {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) {
    if (res.status === 404) throw new Error(`Usuario con ID #${id} no encontrado`);
    throw new Error('Error al buscar el usuario');
  }
  return res.json();
}

export async function createUser(userData) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.detail || errorData.error || 'Error al guardar el usuario');
  }

  return res.json();
}

export async function updateUser(id, userData) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.detail || errorData.error || 'Error al actualizar el usuario');
  }

  return res.json();
}

export async function deleteUser(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    throw new Error('Error al eliminar el usuario');
  }
}
