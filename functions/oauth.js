/**
 * Paso 1 del login del panel (/admin) — inicia la autorización con GitHub.
 *
 * Decap abre una ventanita a /oauth; aquí redirigimos a GitHub para que la
 * persona autorice. GitHub luego regresa a /callback.
 *
 * Necesita la variable de entorno (secreta) en Cloudflare Pages:
 *   - OAUTH_GITHUB_CLIENT_ID
 */
export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);

  const clientId = env.OAUTH_GITHUB_CLIENT_ID;
  if (!clientId) {
    return new Response(
      'Falta configurar OAUTH_GITHUB_CLIENT_ID en Cloudflare Pages.',
      { status: 500 }
    );
  }

  const redirectUri = `${url.origin}/callback`;
  const state = crypto.randomUUID();

  const authorize = new URL('https://github.com/login/oauth/authorize');
  authorize.searchParams.set('client_id', clientId);
  authorize.searchParams.set('redirect_uri', redirectUri);
  authorize.searchParams.set('scope', 'repo');
  authorize.searchParams.set('state', state);

  return Response.redirect(authorize.toString(), 302);
}
