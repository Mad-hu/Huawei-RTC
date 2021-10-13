<!--
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-10-12 17:55:18
 * @LastEditTime: 2021-10-13 13:46:17
 * @LastEditors: Yandong Hu
 * @Description: 
--> 
# nodejs 网易云信账号管理接口服务
Java后台还没有准备好，demo必要服务。主要是提供网易云信IM预制账号管理。
使用网易云信IM，请切换内网，外网服务没有发布线上，外网请切换为声网RTM SDK。
## Start
``` linux shell
	nohup node servier.js &
```
## Interface 
用一次请求一次，返回的内容请勿本地存储。
```
get: http://172.25.2.110:3050/getUser?userId=123
res: 
{"name":"a11111","pass":"a11111","userId":"123"}
```

## Error 
res status code 200, body message error.
```
{code: 400, msg: '缺少必要参数 userId'}
{code: 400, msg: '用户已满，请联系管理员进行添加'}
```
res status 500
```
{
	success: false,
	err: err.message || 'generic error'
}
```