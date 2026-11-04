import { useState } from 'react';

export default function Home() {
  const [form, setForm] = useState({ studentId: '', name: '', email: '' });
  const [msg, setMsg] = useState('');

  async function submit(e) {
    e.preventDefault();
    setMsg('');
    try {
      const res = await fetch('http://localhost:3001/enrollments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      if (res.status === 201) {
        const data = await res.json();
        setMsg('Enrollment created: ' + data.studentId);
      } else {
        const err = await res.text();
        setMsg('Error: ' + res.status + ' ' + err);
      }
    } catch (err) {
      setMsg('Request failed: ' + err.message);
    }
  }

  return (
    <div style={{ padding: 20, fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#0f766e' }}>Inscribir estudiante</h1>
      <form onSubmit={submit}>
        <div>
          <label>Student ID</label><br />
          <input value={form.studentId} onChange={e=>setForm({...form, studentId:e.target.value})} />
        </div>
        <div>
          <label>Nombre</label><br />
          <input value={form.name} onChange={e=>setForm({...form, name:e.target.value})} />
        </div>
        <div>
          <label>Email</label><br />
          <input value={form.email} onChange={e=>setForm({...form, email:e.target.value})} />
        </div>
        <button type="submit">Inscribir</button>
      </form>
      <p>{msg}</p>
      <p>Nota: El backend debe ejecutarse en <strong>http://localhost:3001</strong></p>
    </div>
  );
}
