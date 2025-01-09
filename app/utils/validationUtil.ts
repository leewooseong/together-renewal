export default function validationUtil(
  value: string,
  validateRange: readonly string[],
  name: string,
) {
  if (!validateRange.includes(value)) {
    throw new Error(`잘못된 ${name}값입니다.`);
  }
}
