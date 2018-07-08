<template>
    <div class="index">
        <div v-show="loading">
            <Headers></Headers>
            <div class="explorer warp1000 clearfix">
                <Latest class="fl"></Latest>
                <div class="fr">
                    <h2 class="title">{{ $t('index.history.title') }}</h2>
                    <History  :styles="styles" ref="simpleChart"></History>
                    <h2 class="previous">{{$t('index.history.last_updated_at', { seconds: previous })}}</h2>
                </div>
            </div>
            <Transations></Transations>
            <Block :ws="ws"></Block>
            <Foot></Foot>
        </div>
    </div>
</template>
<style>
   
</style>

<script>
import Headers from './public/Header'
import Loading from './public/Loading'
import Block from './public/Block'
import Transations from './public/Transations'
import Foot from './public/Foot';
import Latest from './public/Latest'
import History from './public/History'
import { bus,TransationsNum,wsurl } from './api/bus.js'
import ajax from './api/index.js'
import client from './api/client.js'
  

    export default{
        data() {
           return {
                received_msg:{},
                headerblock:'',
                previous:0,
                loading:true,
                styles:{
                    width:'400',
                    height:'150'
                },
                timer:null,
                ws:null
            }
        },

        mounted(){
          this.webSoketFn();
            
        },
        components:{
            Headers,
            Block,
            Transations,
            Latest,
            History,
            Loading,
            Foot
        },
        methods:{
            webSoketFn(){

            this.$router.afterEach(function () {
                _this.ws.close();
            });

            this.ws = new WebSocket(wsurl);
            var _this = this;
            clearInterval(_this.timer);
             _this.previous = 0;
            _this.ws.onopen = function(){
                client.heartCheck.start(_this.ws, _this.reconnect);
                _this.ws.send('{"method":"call","params":[1,"login",["",""]],"id":1}');
                _this.ws.send('{"method":"call","params":[1,"history",[]],"id":4}');
                _this.ws.send('{"method":"call","params":[0,"set_subscribe_callback",[8,true]],"id":8}');
                
            };
            _this.ws.onclose = function(){
            //    _this.webSoketFn();
            };
            _this.ws.onmessage = function ( evt ){
                client.heartCheck.reset(_this.ws, _this.reconnect);
                _this.received_msg = JSON.parse(evt.data);

                if( _this.received_msg.method == 'notice' && _this.received_msg.id !=1){
                    let blockData = _this.received_msg.params[1][0];
                    for( var i = 0; i< blockData.length;i++){
                        if( blockData[i].id == '2.1.0'){
                            if( blockData[i].head_block_number != _this.headerblock){
                                _this.headerblock = blockData[i].head_block_number;
                                let current_witness = blockData[i].current_witness;
                                _this.ws.send('{"id":1,"method":"call","params":[1,"login",["",""]]}');
                                _this.ws.send('{"method":"call","params":[1,"history",[]],"id":4}')
                                blockData.forEach((item,index) =>{
                                    if(item.id == blockData[i].current_witness){
                                        
                                        let sendSocket=
                                            '{"id":1, "method":"call", "params":[0,"get_accounts",[["'+item.witness_account+'"]]]}';
                                            _this.ws.send( sendSocket);
                                        bus.$emit('blockData',
                                        {
                                            received_msg:_this.received_msg,
                                            head_block_number:blockData[i].head_block_number,
                                            witness_account:item.witness_account
                                        }
                                    );

                                    }
                                })
                                ajax.blockMsg( {"id":1, "method":"call", "params":[0,"get_block",[_this.headerblock]]}).then( rs =>  {
                                    _this.previous = 0;
                                    _this.timer = null; 
                                    TransationsNum.$emit('Transations',  rs.result.transactions.length);
                                })
                            }
                            
                            break;
                        }
                    }
                        
                    }else if( _this.received_msg.id ==1 && typeof(JSON.parse(evt.data).result) == 'object'){
                        //块信息
                        _this.received_msg.result[0].current_witness = JSON.parse(evt.data).result[0].name;
                      
                        bus.$emit('blockDataWitness',
                           {
                            received_msg:_this.received_msg,
                            
                           }
                        );

                    }
                  
            }
          
            _this.timer = setInterval(() =>{
                _this.previous ++;
            },1000)
            },
            reconnect(){
                this.ws.close();
                clearInterval(this.timer);
                this.previous = 0;
                this.webSoketFn();
            }
        }
    }
</script>
<style lang="less" scoped>
    @import '~assets/style/base.less';
    .index{
        padding-bottom: 180px;
    }
    .explorer{
        margin-top:60px;
        overflow: hidden;
    }
    .title{
        font-size: 14px;
        color: #7690a4;
        font-weight: bold;
    }
    .previous{
        text-align: center;
        font-size: 14px;
        color: #7690a4;
        font-weight: bold;
        margin-top: 20px;
    }
</style>
