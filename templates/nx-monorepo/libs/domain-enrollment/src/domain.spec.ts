import { EnrollmentDomainService } from './index';

describe('EnrollmentDomainService', () => {
  it('debe crear una inscripción correctamente y retornar la respuesta y el evento', () => {
    const dto = { studentId: 'STD-101', courseId: 'CRS-505' };
    const { response, event } = EnrollmentDomainService.createEnrollment(dto);

    assert(response.studentId === 'STD-101');
    assert(response.courseId === 'CRS-505');
    assert(response.status === 'CONFIRMED');
    assert(event.studentId === 'STD-101');
    assert(event.eventId.startsWith('EVT-'));
  });

  it('debe lanzar un error si falta studentId o courseId', () => {
    try {
      EnrollmentDomainService.createEnrollment({ studentId: '', courseId: '' });
      assert(false, 'Debe haber lanzado una excepción');
    } catch (err: any) {
      assert(err.message.includes('studentId y courseId son requeridos'));
    }
  });
});

function assert(condition: boolean, message?: string) {
  if (!condition) throw new Error(message || 'Assertion failed');
}
