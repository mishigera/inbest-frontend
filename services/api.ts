const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5050/api';



const apiFetch = async (input: RequestInfo, init?: RequestInit) => {
  const res = await fetch(input, init);

  // Si está sin autorización, redirigimos al login
  if (res.status === 401) {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    throw new Error('No autorizado');
  }

  return res;
};


export const login = async (email: string, password: string) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  return res.json();
};

export const register = async (email: string, password: string) => {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  return res.json();
};

export const uploadImage = async (token: string, formData: FormData) => {
  const res = await apiFetch(`${API_URL}/images/upload`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: formData
  });


  // Verificamos si la respuesta no fue exitosa (ej. 400, 500)
  const data = await res.json();

  

  if (!res.ok) {
    // Retornamos el error que viene del backend (ej. { error: 'Formato no soportado' })
    return { error: data.error || 'Error al subir imagen' };
  }
  // Si la respuesta fue exitosa, retornamos los datos
  return data;

}
export const fetchImages = async (token: string) => {
  const res = await apiFetch(`${API_URL}/images`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.json();
};
