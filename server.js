const Koa = require('koa');
const app = new Koa();
const cors = require('koa-cors');
const protobuf = require("protobufjs/light");
const root = require("./src/proto/proto.js");
const getRawBody = require('raw-body');

const Router = require('koa-router');
const router = new Router();

app.use(cors());
const bodyParser = require('koa-bodyparser');
app.use(bodyParser());

const helloReq = root.lookupType('hellopackage.helloReq');
const helloRes = root.lookupType('hellopackage.helloRes');

// 全局监听抛出的异常
app.use(async (ctx, next) => {
    try {
        await next();
    } catch (e) {
        console.log(e)
        ctx.body = e;
    }
})

router.post('/api', async (ctx, next) => {
    // handle request payload
    const body = await getRawBody(ctx.req);
    const request = helloReq.decode(body);
    const req = helloReq.toObject(request);
    console.log(req);

    // handle business logic
    const res = {
        hello: `${req.name} is handsome`
    };

    // handle response body
    ctx.response.type = 'application/x-protobuf';
    ctx.body = helloRes.encode(res).finish()
});

app
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(3001);
