
import crypto from 'crypto'

export default {
    sign( options ){
        let option=options;
        let token = localStorage.getItem('token') || 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJsb2dpblRpbWUiOiIyMDE4LTA0LTA0IDE0OjE5OjE2Ljg5NDg5NCIsInVzZXJfaWQiOjExNH0.vxd-ehCR5oRoi9R_UlqtZdPYcdxMokaRQlbTUfSpSGk';
        
        // option.timestamp = parseInt(new Date().getTime()/1000);

        let timestamp = option.timestamp.toString().substring(option.timestamp.toString().length-4);
        var key = '';
        for (var i=0 ;i< timestamp.length; i++){
            // alert(token.charAt(timestamp.charAt(i)))
            key += token.charAt(timestamp.charAt(i));
        }



        var sortKeys = this.sortObjectKeys( option );
        let newSort = ''; 
        for( var name in sortKeys){
            newSort+=name+'='+sortKeys[name]+'&';
        }
        // newSort = newSort.substring(0,newSort.length-1);
        // option.key = key;
        newSort +='key='+key;
        // alert(newSort)
        // for(var i=0, len = sortKeys.length; i<len; i++) {

        //     if( i >= sortKeys.length -1){
        //         newSort+=sortKeys[i]+'='+option[sortKeys[i]];
        //     }else{
        //         newSort+=sortKeys[i]+'='+option[sortKeys[i]]+'&';
        //     }
           
        // }

        // alert( newSort );
        // alert(this.getmd5( newSort ).toUpperCase())
        // alert(this.getmd5( newSort ).toUpperCase())
        console.log(newSort)
        return this.getmd5( newSort ).toUpperCase();
       
    },
    getmd5( newSort ){
        var a;
        var md5 = crypto.createHash("md5");
        md5.update( newSort );
        var a = md5.digest('hex');
        return a;
        //47bce5c74f589f4867dbd57e9ca9f808 
    },
    getJsonLength(json){
        var jsonLength=0;
        for (var i in json) {
            jsonLength++;
        }
        return jsonLength;
    },
    sortObjectKeys(obj){
        var tmp={};
        Object.keys(obj).sort().forEach(function(k){tmp[k]=obj[k]});
        return tmp;
    }

}

