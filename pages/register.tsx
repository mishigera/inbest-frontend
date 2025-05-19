import { useState } from 'react';
import { useRouter } from 'next/router';
import { register } from '../services/api';
import { toast } from 'react-hot-toast';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await register(email, password);
      if (res.token) {
        localStorage.setItem('token', res.token);
        router.push('/dashboard');
      } else {
        if (res.message === 'Usuario registrado con éxito') {
          toast.success(res.message);
          router.push('/');
        } else {
          toast.error(res.message || 'Error al registrarse');
        }

      }
    } catch {
      alert('Error al conectar con el servidor');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 py-6 w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Registrarse</h2>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded px-3 py-2 mb-4"
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded px-3 py-2 mb-4"
          required
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Crear cuenta
        </button>
        <p className="text-sm text-center mt-4">
          ¿Ya tienes cuenta?{' '}
          <a href="/" className="text-blue-600 hover:underline">
            Inicia sesión
          </a>
        </p>
      </form>
    </div>
  );
}
