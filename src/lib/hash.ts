const encoder = new TextEncoder();

export async function hash(input: any) {
  try {
    const string = JSON.stringify(input);
    const hash = await hashString(string);
    return hash;
  } catch {
    return '';
  }
}

export async function hashString(input: string) {
  if (input === '' || typeof window === 'undefined') return '';
  try {
    const inputBytes = encoder.encode(input);
    const hashBytes = await window.crypto.subtle.digest('SHA-1', inputBytes);
    const base64 = btoa(String.fromCharCode.apply(null, new Uint8Array(hashBytes) as unknown as number[]));
    return base64;
  } catch {
    return '';
  }
}
