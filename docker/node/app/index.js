const Koa = require('koa');
const app = new Koa();
const db = require('./db.js')
const Router = require('koa-router');
const router = new Router();
const json = require('koa-json');


router.get('viewUpdate', '/view/update/:key', async (ctx, next) => {
  let params = ctx.params
  let data = await db.createOrUpdateViewNumber(params.key)
  ctx.body = data.views;
});

router.get('viewCount', '/view/count/:key', async (ctx, next) => {
  let params = ctx.params
  let view = await db.find(params.key)
  ctx.body = view.views || 0;
});

router.get('/', (ctx, next) => {
  ctx.body = 'Hello World';
});

app
  .use(router.routes())
  .use(router.allowedMethods())
  .use(json());

app.listen(3000);