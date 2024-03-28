import { Hono } from 'hono';

const app = new Hono();

const scrapboxURL = 'https://scrapbox.io';

app.get('*', async (c) => {
  const url = new URL(c.req.url);
  const proxyURL = new URL(scrapboxURL);

  const path = url.pathname;
  proxyURL.pathname = path;

  const response = await fetch(proxyURL.toString());
  return new Response(response.body, response);
});

export default app;
