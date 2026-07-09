/**
 * Paso 2 del login del panel (/admin) — recibe el código de GitHub, lo cambia
 * por un token de acceso y se lo entrega a Decap (la ventanita del panel).
 *
 * Necesita las variables de entorno (secretas) en Cloudflare Pages:
 *   - OAUTH_GITHUB_CLIENT_ID
 *   - OAUTH_GITHUB_CLIENT_SECRET
 */
export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const code = url.searchParams.get('code');

  if (!code) {
    return new Response('Falta el parámetro "code".', { status: 400 });
  }

  const tokenResponse = await fetch(
    'https://github.com/login/oauth/access_token',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'User-Agent': 'apuntes-de-sebas-cms',
      },
      body: JSON.stringify({
        client_id: env.OAUTH_GITHUB_CLIENT_ID,
        client_secret: env.OAUTH_GITHUB_CLIENT_SECRET,
        code,
      }),
    }
  );

  const data = await tokenResponse.json();
  const ok = Boolean(data.access_token);
  const status = ok ? 'success' : 'error';
  const payload = ok
    ? { token: data.access_token, provider: 'github' }
    : { error: data.error_description || 'No se pudo obtener el token.' };

  // Página que le devuelve el token a la ventana del panel (postMessage),
  // siguiendo el protocolo que espera Decap CMS.
  const html = `<!doctype html>
<html>
  <body>
    <script>
      (function () {
        function receiveMessage(e) {
          window.opener.postMessage(
            'authorization:github:${status}:' + JSON.stringify(${JSON.stringify(payload)}),
            e.origin
          );
          window.removeEventListener('message', receiveMessage, false);
        }
        window.addEventListener('message', receiveMessage, false);
        window.opener.postMessage('authorizing:github', '*');
      })();
    </script>
  </body>
</html>`;

  return new Response(html, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}
