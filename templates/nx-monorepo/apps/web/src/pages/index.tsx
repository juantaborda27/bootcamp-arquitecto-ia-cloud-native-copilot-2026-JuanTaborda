import React, { useState } from 'react';
import Head from 'next/head';
import { CreateEnrollmentDto, EnrollmentResponseDto } from '@enrollment-hub/contracts';

export default function EnrollmentPage() {
  const [studentId, setStudentId] = useState('');
  const [courseId, setCourseId] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<EnrollmentResponseDto | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const payload: CreateEnrollmentDto = { studentId, courseId };
      const res = await fetch('http://localhost:3000/api/enrollments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Error al procesar la inscripción');
      const data: EnrollmentResponseDto = await res.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      <Head>
        <title>Enrollment Hub - Nx Monorepo</title>
      </Head>

      <h1>Inscripción de Cursos (Monorepo Nx)</h1>
      <p>Frontend Next.js consumiendo contratos compartidos <code>@enrollment-hub/contracts</code></p>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input
          type="text"
          placeholder="ID de Estudiante (ej. STD-101)"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          required
          style={{ padding: '0.5rem' }}
        />
        <input
          type="text"
          placeholder="ID de Curso (ej. CRS-505)"
          value={courseId}
          onChange={(e) => setCourseId(e.target.value)}
          required
          style={{ padding: '0.5rem' }}
        />
        <button type="submit" disabled={loading} style={{ padding: '0.75rem', background: '#0070f3', color: '#fff', border: 'none', borderRadius: '4px' }}>
          {loading ? 'Procesando...' : 'Enviar Inscripción'}
        </button>
      </form>

      {error && <div style={{ color: 'red', marginTop: '1rem' }}>⚠️ {error}</div>}
      {result && (
        <div style={{ background: '#e6fffa', padding: '1rem', marginTop: '1rem', borderRadius: '4px' }}>
          ✅ Inscripción Confirmada (# {result.enrollmentId})<br />
          Estado: <strong>{result.status}</strong><br />
          Fecha: {result.createdAt}
        </div>
      )}
    </div>
  );
}
