// 接口请求
import axios from 'axios'
import jsonp from 'jsonp'
import qs from 'qs'
import util from './util'
// import { Indicator,Toast } from 'mint-ui';
// import NProgress from 'nprogress'
// import utils from 'utils/utils';

let baseURL = '';
let api = '';
// let api = '/api';
// let api = 'https://dev-wallet.jiaoyinhudong.com/api';
// process.env.NODE_ENV !== 'development' ? baseURL = process.env.BASE_API : api = '/api';

export default function ( opt ) {
    if( opt.isAll ){
        return axios.all( opt.data )
        .then(axios.spread(function (acct, perms) {
            // 两个请求现在都执行完成
        }));
        
    }
    let ContentType = 'application/json;charset=UTF-8';
    if (opt.ContentType==='form') {
        ContentType = 'application/x-www-form-urlencoded';
    } else if (opt.ContentType==='form-data'){
        ContentType = 'multipart/form-data';
    }

    // alert(`${api}${opt.url}`)
    var dataList = {
        method: opt.method,
        url: `${api}${opt.url}`,
        timeout: 10000,
        baseURL: baseURL
    }
    if (['post', 'put'].includes(opt.method)) {
        opt.ContentType==='form' ? dataList.data = qs.stringify(opt.data) : dataList.data = JSON.stringify(opt.data);

        
    } else {
       
        dataList.params =opt.data;
    }

    return new Promise((resolve, reject) => {

        axios(dataList)
            .then(res => {
                resolve(res.data)
            })
            .catch(error => {
                reject(error.data)
            })
    })
}

// 发送请求前处理数据
axios.interceptors.request.use( config => {
    // console.log(config);
    // alert(config.url)
    let Config = config;

    // Indicator.open();
    // if( Config.method == 'get' ){
    //     if( Config.params ){
    //         //加签
    //         Config.params.timestamp = parseInt(new Date().getTime()/1000);
    //         Config.params.sign = util.sign( Config.params );
    //         return Config;
    //     }else{
    //         return Config;
    //     }
    // }else{
    //     // alert(Config.url)
    //     return Config;
    // }
    return Config;
   
}, error => {

    return Promise.reject(error);
});

// 返回响应请求后处理数据
axios.interceptors.response.use( res => {
    // Indicator.close();
    if(res.data.state !=0){
        // Toast(res.data.msg);
    }
    return res;
}, error => {
    
    let errorCode = error.response.status;
    if (errorCode === 401) {

    } else if ([404, 405, 500, 504].includes(errorCode)) {
        error.response.data = {
            msg: '网络错误,请稍后重试!'
        };
    }
    return Promise.reject(error.response)
});



