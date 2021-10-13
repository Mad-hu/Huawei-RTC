const axios = require('axios');
const logger = require('../log.js');
let sesseion = '';
const backUrl = 'http://test-admin.tedus.cn';  // dev
// const backUrl = 'https://api.aicoders.cn'; // prod
async function post(apis,params,callback,errorback=(err)=>{}){
    let setParams = {data:{}};
    setParams.data = params;
    let loginMsg = await login();
    if(!loginMsg.loginState){
        errorback({code:404,msg:'login failes!',err:loginMsg});
        return;
    }
    const tmpTokenRes = await getTokenKey(apis);
    let headerParams = {
        'Content-Type': 'application/json',
        'Cookie': sesseion
    };
    console.log('获取的tmpTokenRes：：',tmpTokenRes);
    if(tmpTokenRes.code == 200){
        headerParams.token = tmpTokenRes.token;
    }else{
        //获取token失败的一些处理。
        return;
    }
    const tmpUrl = backUrl + apis.url;
    console.log('访问接口的url:',tmpUrl,setParams);
    console.log('访问的params:',setParams);
    console.log('访问的header:',{headers:headerParams});
    axios.post(tmpUrl, setParams,{headers:headerParams}).then(res => {
        let data = res.data;
        if(data){
            if(data.code == '0'){
                callback({code:200,data:data.data})
            }else{
                logger.error('Java post error:',data);
                errorback({code:500,msg:'服务器数据错误',data:data});
            }
        }else{
            logger.error('Java post error:',data);
            errorback({code:500,msg:'服务器错误',data:data})
        }
    }).catch(err => {
        console.error(err);
        logger.error('Java post error:',err);
        errorback({code:404,msg:'链接错误',err:err});
    });
}


function getTokenKey(api){
    let t = new Promise(function(resolve, reject){
        console.log('token url:',backUrl + '/ui/' + api.key + '/app');
        let headerParams = {headers:{'Cookie': sesseion}};
        axios.post(backUrl + '/ui/' + api.key + '/app', {},headerParams).then(res => {
            console.log('token的数据：', res.data);
            let data = res.data;
            if(data){
                if(data.code == '0'){
                    resolve({code:200,token:data.token.items[api.tokenKey]}); 
                }else{
                    logger.error('Java getTokenKey error:',data);
                    reject({code:500,msg:'token服务器数据错误',data:data}); 
                }
            }else{
                logger.error('Java getTokenKey error:',data);
                reject({code:500,msg:'token服务器错误',data:data}); 
            }
        }).catch(err => {
            console.error(err);
            logger.error('Java getTokenKey error:',err);
            reject({code:404,msg:'token链接错误',err:err}); 
        });
    });
    return t;
}


/**
 * 控制访问用户登录。1小时以上自动重新登录。
 *
 * @returns
 * @memberof HTTP
 */
function login(){
    let t =  new Promise(function(resolve, reject){
            console.log('start loginning~!!!')
            axios.post(backUrl + '/login', {"data":{"password":"123qaz!","userName":"VideoRecordServer"}}).then(res => {
                console.log('登录的数据：', res.headers['set-cookie']);
                let data = res.data;
                if(data){
                    if(data.code == '0'){
                        sesseion = res.headers['set-cookie'];
                        resolve({code:200,loginState:true}); 
                    }else{
                        logger.error('Java Login error:',data);
                        reject({code:200,loginState:false}); 
                    }
                }else{
                    logger.error('Java Login error:',data);
                    reject({code:200,loginState:false}); 
                }
            }).catch(err => {
                logger.error('Java Login error:',err);
                reject({code:500,loginState:false}); 
            });
    });
    return t;
}

module.exports = post;