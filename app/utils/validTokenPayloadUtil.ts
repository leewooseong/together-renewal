export default function isValidTokenPayloadUtil(payload: ITokenPayload) {
  return (
    typeof payload === 'object' &&
    typeof payload.userId === 'string' &&
    typeof payload.email === 'string' &&
    typeof payload.exp === 'number'
  );
}
