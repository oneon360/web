function hexToBase64(hex) {
  const binary = Uint8Array.from(hex.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
  const base64 = btoa(String.fromCharCode(...binary));
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

var DRM_KEYS = {
  var1: [
    { kty: 'oct', kid: hexToBase64('b3b60e79989a5b2799fa3a2394b8749f'), k: hexToBase64('a25d21e333dad3d131f126b7b57730be') },
    { kty: 'oct', kid: hexToBase64('bfd8ff04a3625fcea8335c9575401697'), k: hexToBase64('769d61a2d6fd7030a5088df2e70c2654') },
    { kty: 'oct', kid: hexToBase64('5a86e42c58cf5d008546861c0f0fb22a'), k: hexToBase64('67b1172a05bcb38a91a304d7098ce7f5') }
  ],
  var10: [
    { kty: 'oct', kid: hexToBase64('87484c0b2a4c41b9b08249ef7817ad7f'), k: hexToBase64('ff4f3f232f747e5e7f616b4741fa5c32') }
  ],
  var11: [
    { kty: 'oct', kid: hexToBase64('0d3ff38c34985fdd81a37567646322b9'), k: hexToBase64('6b4504297769acefae2e50920b7c8a77') }
  ],
  var12: [
    { kty: 'oct', kid: hexToBase64('fdcb8ee4623458e5832a92801fc723b1'), k: hexToBase64('634a67c44b7b7030872043df95c1a55e') }
  ],
  var13: [
    { kty: 'oct', kid: hexToBase64('0c6212056d2f51fcbf569f9a1a8517d1'), k: hexToBase64('d07b404deb7c958347d742e6d1d2f3f9') }
  ]
};

