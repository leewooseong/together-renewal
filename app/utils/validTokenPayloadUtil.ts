export default function isValidTokenPayloadUtil(payload: ITokenPayload) {
  return (
    typeof payload === 'object' &&
    typeof payload.teamId === 'string' &&
    typeof payload.userId === 'string' &&
    typeof payload.iat === 'number' &&
    typeof payload.exp === 'number'
  );
}
