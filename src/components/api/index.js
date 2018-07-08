import fetch from 'utils/service';
const host = "http://witnode.insurchain.org"
export default{
    //公共的方法
    blockMsg( data ){
        return fetch({
            method: 'post',
            url: host,
            data
        })
    },
    
    blockInfo( data ){
        return fetch({
            method: 'post',
            url: `${host}/wt`,
            data
        })
    }
}