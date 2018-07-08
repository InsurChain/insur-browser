<template>
    <div class="index">
        <Headers></Headers>
        <div class="warp1000">
           <div v-if="noUser">
                <div class="block" v-if="blockData">
                <h2 class="title">
                    {{ $t('account.title') }}
                </h2>
                <div class="list">
                    <h3 class="list_title"><p>{{$t('account.BasicInformation')}}</p></h3>
                    <ul>
                        <li class="clearfix">
                            <p class="fl">{{$t('account.AccountName')}} </p>
                            <p class="fr right">{{ blockData.name }}</p>
                        </li>
                    
                        <li class="clearfix active">
                            <p class="fl">{{$t('account.AccountID')}}</p>
                            <p class="fr right">{{ blockData.id }}</p>
                        </li>
                        <li class="clearfix">
                            <p class="fl">{{ $t('account.RegisterReferrer')}}</p>
                            <p class="fr right">{{ blockData.referrer }}</p>
                        </li>
                        <li class="clearfix active">
                            <p class="fl">{{$t('account.AccountType')}}</p>
                            <!-- <p class="fr right">{{   convertUTCTimeToLocalTime(blockData.membership_expiration_date) }}</p> -->
                            
                            <p class="fr right" v-if="blockData.membership_expiration_date">
                                {{blockData.membership_expiration_date.substring(0,4) == 1970 ? $t('account.type.Basic'): $t('account.type.Lifelong')}}
                            </p>
                        </li>
                        
                    </ul>
                </div>
                <div class="list">
                    <h3 class="list_title"><p>{{ $t('account.AccountBalance') }}</p></h3>
                    <ul>
                        <li class="clearfix">
                            <p class="fl">{{ $t('account.INSUR') }}</p>
                            <p class="fr right">{{ getAccontData.amount/100000 }}</p>
                        </li>
                    
                        <li class="clearfix active">
                            <p class="fl">{{ $t('account.ASSET')}}</p>
                            <p class="fr right">{{ getAccontData.asset_id }}</p>
                        </li>

                    </ul>
                </div>
            </div>
            
            <div class="transations">
                <h2 class="title">
                    {{ $t('account.Transactions.title') }}
                </h2>
                <ul class="list" v-if="Transactions.length > 0">
                    <li v-if="item.op[0] == 0 ||item.op[0] == 5 || item.op[0] == 8" v-for="(item,index) in Transactions" :key=index>
                        <div v-if="item.op[0] == 0">
                            <div class="clearfix list_title">
                                <p class="fl hash_id">{{item.transaction_ids}}</p>
                            </div>
                            <div class="list_data clearfix">
                                <div class="fl left clearfix">
                                    <div class="fl btn_box">
                                         <button >{{ $t('Details.transactions.transfer') }}</button>
                                    </div>
                                    <router-link :to="'/Account/'+item.op[1].formName+'/1'">
                                        <p>{{ item.op[1].formName }}</p>
                                    </router-link>
                                </div>
                                <img class="fl next" src="../assets/images/next.png" alt="">
                                <div class="fl center">
                                    <router-link :to="'/Account/'+item.op[1].toName+'/1'">
                                        <p>{{ item.op[1].toName }}</p>
                                    </router-link>
                                </div>
                                <div class="fr right cost">
                                    <p>{{ $t('account.Transactions.cost') }}: {{ item.op[1].fee.amount /100000 }} INSUR</p>
                                </div>
                                <div class="fr right amount">
                                    <!-- <button>{{ item.op[1].amount.amount /100000 }} INSUR</button> -->
                                    <p>{{$t('Details.transactions.amount')}}: {{item.op[1].amount.amount /100000}} INSUR</p>
                                </div>
                                
                            </div>
                        </div>
                        <div v-if="item.op[0] == 5">
                            <div class="clearfix list_title">
                                <p class="fl hash_id">{{item.transaction_ids}}</p>
                            </div>

                             <div class="list_data clearfix">
                                <div class="fl left">
                                    <div class="fl btn_box">
                                         <button>{{ $t('Details.transactions.create')}}</button>
                                    </div>
                                   
                                    <router-link :to="'/Account/'+item.op[1].Name+'/1'">
                                        <p>{{ item.op[1].Name }}</p>
                                    </router-link>
                                </div>
                                <img class="fl next" src="../assets/images/next.png" alt="">
                                <div class="fl center">
                                    <router-link :to="'/Account/'+item.op[1].name+'/1'">
                                        <p>{{ item.op[1].name }}</p>
                                    </router-link>
                                </div>
                                <div class="fr right cost">
                                    <p>{{ $t('account.Transactions.cost') }}: {{ item.op[1].fee.amount /100000 }} INSUR</p>
                                </div>
                              
                                
                            </div>

                        </div>
                        <div v-if="item.op[0] == 8 && item.op[1].policy_flag">
                            <div class="clearfix list_title">
                                <p class="fl hash_id">{{item.transaction_ids}}</p>
                            </div>

                             <div class="list_data clearfix">
                                <div class="fl left">
                                    <div class="fl btn_box">
                                        <button>{{ $t('Details.transactions.upstream')}}</button>
                                    </div>
                                    
                                    <router-link :to="'/Account/'+item.op[1].Name+'/1'">
                                        <p>{{ item.op[1].Name }}</p>
                                    </router-link>
                                </div>
                                <img class="fl next" src="../assets/images/next.png" alt="">
                                <div class="fl center">
                                    <p> {{ $t('Details.transactions.encrypted')}}：{{ item.op[1].policy_hash_code.substring(0,8)+ '...'}}{{item.op[1].policy_hash_code.substring(item.op[1].policy_hash_code.length - 8)}}</p>
                                </div>
                                <div class="fr right cost">
                                    <p>{{ $t('Details.transactions.amount') }}: 0 INSUR</p>
                                </div>  
                                
                                
                            </div>

                        </div>
                    </li>

                </ul>
            </div>
           </div>

            <div class="empty"  v-if="Transactions.length == 0 || isEmpty">
                <p>No such data</p>
            </div>
        </div>
        <Foot></Foot>
    </div>
</template>

<script>
import Headers from './public/Header'
// import Block from './BlockAll'
// import Transactions from './TransationsAll'
import Foot from './public/Foot'
import client from './api/client.js'
import ajax from './api/index.js'
import { bus,wsurl,wsurlWt } from './api/bus.js'
import moment from 'moment';

    export default{
        data() {
            return {
                userId:'',
                blockData:{},
                Transactions:[],
                getAccontData:{},
                sendSocket:[],
                sendSocket2:[],
                convertUTCTimeToLocalTime:client.convertUTCTimeToLocalTime,
                isEmpty:false,
                moment:moment,
                data:[],
                noUser:true,
                ws:null,
                wt:null,
                transaction_ids:[]
            }
        },
        created(){
            this.ws = new WebSocket(wsurl);
            this.wt = new WebSocket(wsurlWt);
            let _this = this;
          

            _this.ws.onopen = function(){
                _this.ws.send('{"id":1,"method":"call","params":[1,"login",["",""]]}');
                _this.ws.send('{"method":"call","params":[1,"history",[]],"id":4}');
                _this.blockInfo();
            };

            _this.wt.onopen = function(){
                //  _this.wt.send('{"id":"31455","method":"call","params":[0,"get_block",["31455"]]}');

            }
            _this.wt.onmessage = function( evt ){
                
                // _this.transaction_ids = JSON.parse(evt.data).result.transaction_ids;

                _this.Transactions.forEach( (item,index) =>{
                    if(item.block_num ==  JSON.parse(evt.data).id){
                         _this.$set(_this.Transactions[index],'transaction_ids',JSON.parse(evt.data).result.transaction_ids[item.trx_in_block]);
                       
                    }
                })
            }

            _this.ws.onmessage = function( evt ){
                if( typeof(JSON.parse(evt.data).result) == 'object'){

                    if( JSON.parse(evt.data).id == 999){

                        _this.Transactions = JSON.parse(evt.data).result;

                        _this.Transactions.forEach( (item,index) =>{

                             _this.wt.send('{"id":'+item.block_num+',"method":"call","params":[0,"get_block",["'+item.block_num+'"]]}');

                        if(  item.op[0] == 0 ){
                            let str = `"${item.op[1].from}","${item.op[1].to}"`;
                            _this.ws.send('{"id":'+index+', "method":"call", "params":[0,"get_accounts",[['+str+']]]}')

                        }else if( item.op[0] == 5 ){
                            let str = `"${item.op[1].referrer}"`;
                            
                             _this.ws.send('{"id":'+index+', "method":"call", "params":[0,"get_accounts",[['+str+']]]}')

                        }else{
                            let str = `"${item.op[1].account_to_upgrade}"`;
                          
                             _this.ws.send('{"id":'+index+', "method":"call", "params":[0,"get_accounts",[['+str+']]]}')
                            }
                        })
                        // alert(33)

                       
                       

                    }else{

                        if(JSON.parse(evt.data).result.length ==2){
                             _this.$set(_this.Transactions[JSON.parse(evt.data).id].op[1],'formName',JSON.parse(evt.data).result[0].name);
                            _this.$set(_this.Transactions[JSON.parse(evt.data).id].op[1],'toName',JSON.parse(evt.data).result[1].name);
                        }else if(JSON.parse(evt.data).result.length ==1){
                             _this.$set(_this.Transactions[JSON.parse(evt.data).id].op[1],'Name',JSON.parse(evt.data).result[0].name);
                           
                        }
                        

                    }

                }

            };

            this.userId = this.$route.params.id;
            this.getBlockInfoIds();
            bus.$on('searchAccount', (text) => {
                this.userId = text;
                
                this.searchFn();
            })
            
            
        },
        watch: {
            '$route' (to, from) {
                this.userId = this.$route.params.id;
                
                bus.$on('searchAccount', (text) => {
                   
                    this.userId = text;
                   
                    this.searchFn();
                })
                console.log(this.getStatus(this.$route.path))
                this.blockInfo(this.blockId);

            }
        },
        components:{
            Headers,
            Foot
        },
        methods:{
            
            getStatus (urlStr) {
                var urlStrArr = urlStr.split('/')
                return urlStrArr[urlStrArr.length - 1]
            },
            getBlockInfoIds( ){
               ajax.blockInfo( {"id":1, "method":"call", "params":[0,"get_account",[this.userId]]}).then( rs => {
                   
                    bus.$emit('blockDataJson', rs.result);
               })
            },
            searchFn(){
                let regx = /^\d+(\.\d+)?$/;
                // alert(this.$route.params.type)
                if(this.$route.params.type == 2){
                    ajax.blockMsg({"id":1, "method":"call", "params":[0,"get_accounts",[[this.userId]]]}).then( rs => {
                        if( rs.result ){
                            this.noUser = true;
                            this.isEmpty = false;
                            this.blockData = rs.result[0];
                        }else{
                            this.noUser = false;
                            this.isEmpty = true;
                        }
                        
                    });
                   
                    this.sendSocket = 
                        '{"id":999,"method":"call","params":[2,"get_account_history",["'+this.userId+'","1.11.0",100,"1.11.0"]]}'
                    this.ws.send(this.sendSocket);
                }else if(this.$route.params.type == 1){

                    ajax.blockMsg({"id":1, "method":"call", "params":[0,"get_account_by_name",[this.userId]]}).then( rs => {
                        if( rs.result ){
                            this.blockData = rs.result;
                            this.noUser = true;
                            this.isEmpty = false;
                        }else{
                            this.noUser = false;
                            this.isEmpty = true;
                        }
                       this.userId = rs.result.id;
                       
                       this.sendSocket = 
                        '{"id":999,"method":"call","params":[2,"get_account_history",["'+this.userId+'","1.11.0",100,"1.11.0"]]}'
                        this.ws.send(this.sendSocket);

                    });
                }
            },
            blockInfo(){
                if( this.$route.params.type == 1){
                    
                    ajax.blockMsg({"id":1, "method":"call", "params":[0,"get_account_by_name",[this.userId]]}).then( rs => {

                        if( !rs.result ){
                            this.noUser = false;
                            this.isEmpty = true;
                            return;
                        }else{
                            this.noUser = true;
                            this.isEmpty = false;
                        }
                        

                        this.blockData = rs.result;
                        this.userId = rs.result.id;
                        
                        this.getAccont();
                        this.sendSocket = 
                            '{"id":999,"method":"call","params":[2,"get_account_history",["'+this.userId+'","1.11.0",100,"1.11.0"]]}';
                            this.ws.send(this.sendSocket);

                    });
                }else{
                      ajax.blockMsg({"id":1, "method":"call", "params":[0,"get_accounts",[[this.userId]]]}).then( rs => {
                        if( !rs.result ){
                            this.noUser = false;
                            this.isEmpty = true;
                            return;
                        }else{
                            this.noUser = true;
                            this.isEmpty = false;
                        }
                        this.blockData = rs.result[0];
                        this.userId = rs.result[0].id;
                        this.getAccont(); 
                        this.sendSocket = 
                            '{"id":999,"method":"call","params":[2,"get_account_history",["'+this.userId+'","1.11.0",100,"1.11.0"]]}'
                        
                        this.ws.send(this.sendSocket);
            
                    });
                }

            },
            getAccont(){
               ajax.blockMsg({"id":1,"method":"call","params":[0,"get_account_balances",[this.userId,["1.3.0"]]]}).then( rs => {
                    this.getAccontData = rs.result[0];
               });
            }
        }
    }
</script>
<style lang="less" scoped>
    @import '~assets/style/base.less';
    .empty p{
        font-size: 30px;
        color: #676767;
        text-align: center;
        margin-top: 30px;
    }
    .title{
        font-size: 24px;
        font-weight: bold;
        margin-top:30px;
    }
    .warp1000{
        padding-bottom: 300px;
    }
    .list{
        margin-top: 30px;
       
        h3{
            font-size: 14px ;
            background: #fafbfc;
            padding-left: 10px;
            height: 33px;
            overflow: hidden;
            box-sizing: border-box;
            p{
                
                line-height: 14px;
                color: #676767;
                font-weight: bold;
                border-left: 4px solid #1b5c87;
                margin-top: 9px;
                padding-left: 5px;
            }
        }
        li{
            
            background: #fafbfc;
            line-height: 33px;
            padding:0 10px;
            box-sizing: border-box;
            p{
                font-size: 12px;
                 font-weight: bold;
            }
            .right{
                color: #666;
                font-weight: bold;
            }
        }
        .active{
            background: #eef0f3;
        }
    }
    
    button{
        line-height: 32px;
        background: #23c181;
        color: #fff;
        border-radius: 5px;
        padding: 0 20px;
        margin-top: 10px;
    }
    .color4398d3{
        color: #4398d3;
    }
    .next{
        margin-top: 10px;
        margin-right: 50px;
    }

    .list{
        font-size: 12px;
        .list_data{
            padding-top: 15px;
        }
        .list_title{
            line-height: 33px;  
            background: #eef0f3;
            padding: 0 10px;
            box-sizing: border-box; 
            font-size: 12px;
           
            .hash_id{
                color: #4398d3;
            }
        }
        .left{
            width: 30%;
            text-align: center;
        }
        .right{
            text-align: right;
            margin-right: 10px;
            button{
                line-height: 32px;
                background: #23c181;
                color: #fff;
                border-radius: 5px;
                padding: 0 20px;
            }
        }
        p{
            font-weight: bold;
            margin-bottom: 5px;
        }
    }
    .color4398d3{
        color: #4398d3;
    }
    a{
        color: #4398d3;
    }
    .transations p{
        line-height: 50px;
    }
    .list .amount{
        // margin-right: 100px;
        width: 240px;
        text-align: left;
    }
    .btn_box{
        width: 150px;
        text-align: left;
        padding-left: 10px;
    }
    .cost{
        width: 180px;
    }
    .transations{
        li{
            padding-bottom: 10px;
        }
    }
</style>
