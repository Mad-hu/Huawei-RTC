/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-10-12 17:55:18
 * @LastEditTime: 2021-10-13 12:15:55
 * @LastEditors: Yandong Hu
 * @Description: 
 */
const express = require('express');
const app = express();
const port = 3050;
const bodyParser = require('body-parser');
const session = require("express-session");
const logger = require('./log');
const fsex = require('fs-extra');
const path = require('path');
const userListPath = path.join('./userList.json');
logger.info('start record server~!');

function getUserList() {
    return JSON.parse(fsex.readFileSync(userListPath, {encoding: 'utf-8'}).toString());
}
function saveUserList(data) {
    fsex.writeFileSync(userListPath, JSON.stringify(data));
}

app.use(bodyParser.json());
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}))

app.get('/getUser', (req, res, next) => {
    let { query } = req;
    if(!query.userId) {
        logger.error('userId not found, query userId', query.userId);
        res.status(200).json({code: 400, msg: '缺少必要参数 userId'});
        return;
    }
    logger.info('query userId:', query.userId);
    let userList = getUserList();
    
    const userExistItem = userList.find(item => item.userId == query.userId);
    if(userExistItem) {
        logger.info('user already exist.');
        res.status(200).json(userExistItem);
        return;
    }

    const userItem = userList.find(item => item.userId == '');
    if(userItem) {
        logger.info('userItem:', userItem);
        userItem.userId = query.userId;
        logger.info('userList:', userList);
        saveUserList(userList);
        res.status(200).json(userItem);
        return;
    }
    
    logger.error('user is full, query userId', query.userId);
    res.status(200).json({code: 400, msg: '用户已满，请联系管理员进行添加'});
})
app.use((err, req, res, next) => {
    logger.error(err.stack);
    res.status(500).json({
        success: false,
        err: err.message || 'generic error'
    })
})

app.listen(port)