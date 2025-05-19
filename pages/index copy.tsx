import { useState } from 'react';
import { useRouter } from 'next/router';
import { login } from '../services/api';


export default function LoginPage() {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await login(email, password);
    if (res.token) {
      localStorage.setItem('token', res.token);
      router.push('/dashboard');
    } else {
      alert(res.error || 'Error al iniciar sesión');
    }
  };

  return (
   
     
    
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
      <button type="submit">Entrar</button>
    </form>
      
  );
}
