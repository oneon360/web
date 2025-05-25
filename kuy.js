// drmkey.js

// Fungsi konversi hex ke base64 (tanpa padding, URL-safe)
function hexToBase64(hex) {
  const binary = Uint8Array.from(hex.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
  const base64 = btoa(String.fromCharCode(...binary));
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

// Objek DRM_KEYS
const DRM_KEYS = {
  var1: [
    {kty: 'oct', kid: hexToBase64('b3b60e79989a5b2799fa3a2394b8749f'), k: hexToBase64('a25d21e333dad3d131f126b7b57730be')},
    {kty: 'oct', kid: hexToBase64('bfd8ff04a3625fcea8335c9575401697'), k: hexToBase64('769d61a2d6fd7030a5088df2e70c2654')},
    {kty: 'oct', kid: hexToBase64('5a86e42c58cf5d008546861c0f0fb22a'), k: hexToBase64('67b1172a05bcb38a91a304d7098ce7f5')}
  ],
  // ...lanjutan var lainnya (copas dari kode asli)
  var10: [{kty: 'oct', kid: hexToBase64('87484c0b2a4c41b9b08249ef7817ad7f'), k: hexToBase64('ff4f3f232f747e5e7f616b4741fa5c32')}],
  var: [{kty: 'oct', kid: hexToBase64('9f327d24c66fbd84e15ab5c9ead7c7a4'), k: hexToBase64('83837185529c0c4048f81386c2d36426')}]
};

export { DRM_KEYS };
