export function isClosedUtil(
  registrationEnd: string,
  participantCount: number,
  capacity: number,
): boolean {
  const closeTime = new Date(registrationEnd).toISOString().split('.')[0];
  const getNow = new Date().toISOString().split('.')[0];

  if (participantCount >= capacity) {
    return true;
  }
  return getNow >= closeTime;
}
