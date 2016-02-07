import * as Koa from 'koa';
const app = new Koa();

app.use(ctx => {
  ctx.body = 'Hello? are yo';
});

app.listen(3000);
