import { useState } from 'react';

export default function Home() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');

  async function submit(e: any) {
    e.preventDefault();
    setMsg('');
    try {
      const res = await fetch('http://localhost:4000/enrollments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      });

      if (res.status === 409) {
        setMsg('El estudiante ya está inscrito.');
        return;
      }

      if (!res.ok) throw new Error(await res.text());

      const json = await res.json();
      setMsg(`Inscripción creada (id=${json.id})`);
    } catch (err: any) {
      setMsg('Error: ' + err.message);
    }
  }

  return (
    <main style={{ padding: 20 }}>
      <h1>Inscribir estudiante</h1>
      <form onSubmit={submit} style={{ display: 'grid', gap: 8, maxWidth: 420 }}>
        <label>
          Nombre
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Email
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <button type="submit">Inscribir</button>
      </form>
      {msg && <p>{msg}</p>}
    </main>
  );
}
