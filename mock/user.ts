import { Request, Response } from 'express';

function getFakeCaptcha(req: Request, res: Response) {
  return res.json('captcha-xxx');
}
// 代码中会兼容本地 service mock 以及部署站点的静态数据
export default {
  // 支持值为 Object 和 Array
  'GET /api/currentUser': {
    name: 'epanel',
    avatar: 'https://www.easyicon.net/api/resizeApi.php?id=1249927&size=24',
    userid: '00000001',
    email: 'test@epanel.cn',
    signature: '益派云调查',
    title: '调查专家',
    group: '益派－云调查部－UED',
    tags: [
      {
        key: '0',
        label: '专业性',
      },
      {
        key: '1',
        label: '调查系统',
      },
      {
        key: '2',
        label: '逻辑性强',
      },
      {
        key: '3',
        label: '全面',
      },
      {
        key: '4',
        label: '执着',
      },
      {
        key: '5',
        label: '认真',
      },
    ],
    notifyCount: 12,
    unreadCount: 11,
    country: 'China',
    geographic: {
      province: {
        label: '北京市',
        key: '100000',
      },
      city: {
        label: '朝阳区',
        key: '110105',
      },
    },
    address: '北京市朝阳区',
    phone: '010-57510088',
  },
  // GET POST 可省略
  'GET /api/users': [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
  ],
  'POST /api/login/account': (req: Request, res: Response) => {
    const { password, userName, type } = req.body;
    if (password === 'welcome' && userName === 'admin') {
      res.send({
        status: 'ok',
        message: {data : {type}},
        currentAuthority: 'admin',
      });
      return;
    }
    if (password === 'welcome' && userName === 'user') {
      res.send({
        status: 'ok',
        message: {data : {type}},
        currentAuthority: 'user',
      });
      return;
    }
    if (type === 'mobile') {
      res.send({
        status: 'ok',
        message: {data : {type}},
        currentAuthority: 'admin',
      });
      return;
    }

    res.send({
      status: 'error',
      message: {data : {type}},
      currentAuthority: 'guest',
    });
  },
  'POST /api/register': (req: Request, res: Response) => {
    res.send({ status: 'ok', currentAuthority: 'user' });
  },
  'GET /api/500': (req: Request, res: Response) => {
    res.status(500).send({
      timestamp: 1513932555104,
      status: 500,
      error: 'error',
      message: 'error',
      path: '/base/category/list',
    });
  },
  'GET /api/404': (req: Request, res: Response) => {
    res.status(404).send({
      timestamp: 1513932643431,
      status: 404,
      error: 'Not Found',
      message: 'No message available',
      path: '/base/category/list/2121212',
    });
  },
  'GET /api/403': (req: Request, res: Response) => {
    res.status(403).send({
      timestamp: 1513932555104,
      status: 403,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },
  'GET /api/401': (req: Request, res: Response) => {
    res.status(401).send({
      timestamp: 1513932555104,
      status: 401,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },

  'GET  /api/login/captcha': getFakeCaptcha,
};
