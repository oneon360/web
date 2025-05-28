const DRM_KEYS = {
  var10: [{
    kty: 'oct',
    kid: base64urlEncode(hexToBytes('87484c0b2a4c41b9b08249ef7817ad7f')),
    k: base64urlEncode(hexToBytes('ff4f3f232f747e5e7f616b4741fa5c32'))
  }],
  var: [{
    kty: 'oct',
    kid: base64urlEncode(hexToBytes('9f327d24c66fbd84e15ab5c9ead7c7a4')),
    k: base64urlEncode(hexToBytes('83837185529c0c4048f81386c2d36426'))
  }]
};

// Gantilah dengan kunci rahasia yang kuat dan aman
const SECRET_KEY = 'lumayan';

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    const sig = url.searchParams.get('sig');

    const ua = (request.headers.get('user-agent') || '').toLowerCase();
    const accept = request.headers.get('accept') || '';
    const secFetchSite = (request.headers.get('sec-fetch-site') || '').toLowerCase();
    const referer = request.headers.get('referer') || '';

    // Deteksi permintaan dari browser dan agen buruk
    const isFromBrowser = accept.includes('text/html');
    const isBadAgent = /curl|wget|postman|insomnia|python|httpx|axios|selenium|scrapy|libwww-perl|aiohttp|java|okhttp|headless|phantom|node-fetch|powershell|http-client|bot|crawler|spider|mechanize|go-http|fetchlib|perl|ruby|php|masscan|nmap/i.test(ua);
    const isLikelyFakeBrowser = isFromBrowser && (!secFetchSite || secFetchSite === 'none' || (!referer && ua.includes('mozilla')));

    if (isFromBrowser || isBadAgent || isLikelyFakeBrowser) {
      return new Response('Forbidden', { status: 403 });
    }

    if (url.pathname === '/drmkey') {
      if (!id || !sig || !/^var\d+(_[a-z0-9]+)?$/.test(id)) {
        return new Response('Invalid ID or signature', { status: 400 });
      }

      const valid = await validateHMAC(id, sig, SECRET_KEY);
      if (!valid) {
        return new Response('Signature not valid', { status: 403 });
      }

      const drmData = DRM_KEYS[id.split('_')[0]];
      if (!drmData) {
        return new Response('DRM ID not found', { status: 404 });
      }

      return new Response(JSON.stringify({
        keys: drmData,
        type: 'temporary'
      }), {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }

    return new Response('Not Found', { status: 404 });
  }
}

// ------------------ Utility Functions ------------------

// Validasi HMAC base64url signature
async function validateHMAC(id, sig, secret) {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );

  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(id));
  const sigBase64url = base64urlEncode(new Uint8Array(signature));

  return sigBase64url === sig;
}

// Encode base64url dari Uint8Array
function base64urlEncode(buffer) {
  return btoa(String.fromCharCode(...buffer))
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

// Konversi HEX ke Uint8Array
function hexToBytes(hex) {
  return new Uint8Array(hex.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
}
