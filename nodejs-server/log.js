var log4js = require('log4js');
const moment = require('moment') ;
log4js.configure({
  appenders: {
    console:{ type: 'console' },
    appLogs:{ type: 'file', filename: 'logs/log-'+moment().format('YYYYMMDD')+'.log', category: 'app' }
  },
     categories: {

        default: {appenders: ['console', 'appLogs'], level: 'info'}

    }
});
var logger = log4js.getLogger('app');

module.exports = logger;