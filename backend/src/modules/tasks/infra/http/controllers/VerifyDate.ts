// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function isFutureDate(date: Date) {
  const currentDate = new Date();
  const createDate = new Date(date);

  return createDate.getTime() > currentDate.getTime();
}
