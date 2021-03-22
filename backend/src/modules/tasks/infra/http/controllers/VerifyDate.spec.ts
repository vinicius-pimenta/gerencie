import VerifyDate from './VerifyDate';

describe('VerifyDate', () => {
  it('Não deve permitir designar uma tarefa com uma data passada', async () => {
    const oldDate = new Date('2021-03-15');

    const result = VerifyDate(oldDate);

    expect(result).toEqual(false);
  });

  it('Deve permitir designar uma tarefa com uma data superior a data atual', async () => {
    const futureDate = new Date('2021-03-30');

    const result = VerifyDate(futureDate);

    expect(result).toEqual(true);
  });
});
