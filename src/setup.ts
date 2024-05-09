import Koa from 'koa';
import koaBody from 'koa-body';
import conditional from 'koa-conditional-get';
import etag from 'koa-etag';
import staticService from 'koa-static';

import { catchErrorMiddle, corsMiddle } from '@/app/app.middleware';
import errorHandler from '@/app/handler/error-handle';
import { apiBeforeVerify } from '@/app/verify.middleware';
import { connectWebSocket } from '@/config/websocket';
import {
  PROJECT_ENV,
  PROJECT_ENV_ENUM,
  STATIC_DIR,
  UPLOAD_DIR,
} from '@/constant';
import { initMonit } from '@/init/monit';
import { CustomError } from '@/model/customError.model';
import { loadAllRoutes } from '@/router';

export async function setupKoa({ port }) {
  const app = new Koa();
  // app.proxyIpHeader 代理 ip 消息头, 默认为 X-Forwarded-For
  // app.proxyIpHeader = 'X-Real-IP';
  app.proxy = true;

  app.use(catchErrorMiddle); // 全局错误处理

  app.use(
    koaBody({
      multipart: true,
      formidable: {
        // 上传目录
        uploadDir: UPLOAD_DIR, // 默认os.tmpdir()
        // 保留文件扩展名
        keepExtensions: true,
        maxFileSize: 1024 * 1024 * 300, // 300m
        // onFileBegin(name, file) {
        //   file.filepath = '可覆盖地址';
        // },
      },
      onError(err) {
        console.log('koaBody错误', err);
        throw new CustomError(err.message, 500, 500);
      },
      // parsedMethods: ['POST', 'PUT', 'PATCH', 'GET', 'HEAD', 'DELETE'], // 声明将解析正文的 HTTP 方法，默认值['POST', 'PUT', 'PATCH']。替换strict选项。
      // strict: true, // 废弃了。如果启用，则不解析 GET、HEAD、DELETE 请求，默认true。即delete不会解析data数据
    })
  ); // 解析参数

  app.use(
    staticService(STATIC_DIR, {
      maxage: 60 * 1000, // 缓存时间：1分钟
    })
  ); // 静态文件目录

  app.use(conditional()); // 接口缓存
  app.use(etag()); // 接口缓存

  app.use(corsMiddle); // 设置允许跨域

  app.on('error', errorHandler); // 接收全局错误，位置必须得放在最开头？
  initMonit(); // 初始化监控
  // initDb('alert', sequelize); // 加载sequelize的relation表关联
  app.use(apiBeforeVerify); // 注意：需要在所有路由加载前使用这个中间件
  loadAllRoutes(app); // 加载所有路由
  await new Promise((resolve) => {
    // 语法糖, 等同于http.createServer(app.callback()).listen(3000);
    const httpServer = app.listen(port, () => {
      resolve('ok');
    });
    if (PROJECT_ENV !== PROJECT_ENV_ENUM.beta) {
      connectWebSocket(httpServer); // 初始化websocket
    }
  }); // http接口服务
}
