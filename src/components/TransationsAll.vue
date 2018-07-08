<template>
    <div class="warp1000">
        <div class="transations">
             <h2 class="title">
                {{ $t('Details.transactions.title')}}
            </h2>
            <ul class="list" v-if="transactions.length > 0">
                <li v-for="(item,index) in transactions" :key=index >
                    <div v-if="item.operations[0][0] == 0">
                        <div class="clearfix list_title">
                            <p class="fl hash_id">{{ transactionsIds[index] }}</p>
                            <p class="fr">{{moment(new Date(item.expiration+'Z')).format('YYYY-MM-DD HH:mm:ss')}}</p>
                        </div>
                        <div class="list_data clearfix">
                            <div class="fl left clearfix">
                                 <div class="fl btn_box">
                                     <button>{{ $t('Details.transactions.transfer') }}</button>
                                 </div>
                                 
                                <router-link :to="'/Account/'+item.operations[0][1].formName+'/1'">
                                    <p>{{ item.operations[0][1].formName }}</p>
                                </router-link>
                            </div>
                            <img class="fl next" src="../assets/images/next.png" alt="">
                            <div class="fl center">
                                <router-link :to="'/Account/'+item.operations[0][1].toName+'/1'">
                                    <p>{{ item.operations[0][1].toName }}</p>
                                </router-link>
                            </div>
                            <div class="fr right">
                                <p>{{$t('Details.transactions.cost')}}: {{item.operations[0][1].fee.amount /100000}} INSUR</p>
                            </div>  
                            
                            <div class="fr right amount">

                                <p>{{$t('Details.transactions.amount')}}: {{item.operations[0][1].amount.amount /100000}} INSUR</p>

                            </div>
                        
                        </div>
                    </div>
                    <div v-else-if="item.operations[0][0] == 5">
                         <div class="clearfix list_title">
                            <p class="fl hash_id">{{ transactionsIds[index] }}</p>
                            <p class="fr">{{ moment(new Date(item.expiration+'Z')).format('YYYY-MM-DD HH:mm:ss') }}</p>
                        </div>
                        
                        <div class="list_data clearfix">
                            
                            <div class="fl left clearfix">
                                <div class="fl btn_box">
                                    <button>{{ $t('Details.transactions.create')}}</button>
                                </div>
                                
                                <router-link :to="'/Account/'+item.operations[0][1].referrerName+'/1'">
                                    <p>{{ item.operations[0][1].referrerName }}</p>
                                </router-link>
                            </div>
                            <img class="fl next" src="../assets/images/next.png" alt="">
                            <div class="fl center">
                                <router-link :to="'/Account/'+item.operations[0][1].name+'/1'">
                                    <p>{{ item.operations[0][1].name }}</p>
                                </router-link>
                            </div>
                            <div class="fr right">
                                <p>{{ $t('Details.transactions.cost') }}: {{item.operations[0][1].fee.amount /100000 }} INSUR</p>
                            </div>  
                            
                       
                        </div>
                    </div>
                    <div v-else-if="item.operations[0][0] == 8 && item.operations[0][1].policy_flag">
                        
                         <div class="clearfix list_title">
                            <p class="fl hash_id">{{ transactionsIds[index] }}</p>
                            <p class="fr">{{ moment(new Date(item.expiration+'Z')).format('YYYY-MM-DD HH:mm:ss') }}</p>
                        </div>
                        
                        <div class="list_data clearfix">
                            
                            <div class="fl left clearfix">
                                <div class="fl btn_box">
                                    <button class="fl">{{ $t('Details.transactions.upstream')}}</button>
                                </div>
                                 <router-link :to="'/Account/'+item.operations[0][1].userName+'/1'">
                                    <p>{{ item.operations[0][1].userName }}</p>
                                </router-link>
                            </div>
                            <img class="fl next" src="../assets/images/next.png" alt="">
                            <div class="fl center">
                                <p> {{ $t('Details.transactions.encrypted')}}：{{ item.operations[0][1].policy_hash_code.substring(0,8)+ '...' + item.operations[0][1].policy_hash_code.substring(item.operations[0][1].policy_hash_code.length - 8)}}</p>
                            </div>
                            <div class="fr right">
                                <p>{{ $t('Details.transactions.cost') }}: 0INSUR</p>
                            </div>  
                            
                       
                        </div>
                    </div>
                </li>
                
            </ul>
             <div class="empty" v-else>
                <p>No such data</p>
            </div>
        </div>
    </div>
</template>

<script>
import { bus,wsurl } from './api/bus.js'
import moment from 'moment';
import client from './api/client'
    export default{
        data(){
            return {
               transactions:[],
               moment:moment,
               sendSocket:[],
               transactionsIds:[],
               ws:null
            }
        },
        mounted(){
            this.ws = new WebSocket(wsurl);
            let _this = this;
            
            _this.ws.onopen = function(){
                _this.ws.send('{"id":1,"method":"call","params":[1,"login",["",""]]}');
                _this.ws.send('{"method":"call","params":[1,"history",[]],"id":4}');
                
            };

            _this.ws.onmessage = function( evt ){
                if( typeof(JSON.parse(evt.data).result) == 'object'){
                    if( JSON.parse(evt.data).id == 0) {
                        let WebSocketData = JSON.parse(evt.data).result;
                        _this.transactions.forEach( (item,index) =>{
                            WebSocketData.forEach( (item) =>{
                                if(item.id == _this.transactions[index].operations[0][1].from){
                                    _this.$set(_this.transactions[index].operations[0][1],'formName',item.name); 
                                }else if( item.id ==  _this.transactions[index].operations[0][1].to){
                                    _this.$set(_this.transactions[index].operations[0][1],'toName',item.name); 
                                }
                            })
                        })
                   
                    }else if(JSON.parse(evt.data).id == 5){
                         _this.transactions.forEach( (item,index) =>{
                            if( typeof(JSON.parse(evt.data).result) == 'object'){
                                let WebSocketData = JSON.parse(evt.data).result;
                                WebSocketData.forEach( (item) =>{
                                    if(item.id == _this.transactions[index].operations[0][1].referrer){
                                        _this.$set(_this.transactions[index].operations[0][1],'referrerName',item.name); 
                                    }
                                    
                                })
                                
                            }
                         })
                        
                    }else{
                        _this.transactions.forEach( (item,index) =>{
                            if( typeof(JSON.parse(evt.data).result) == 'object'){
                                let WebSocketData = JSON.parse(evt.data).result;
                                
                                WebSocketData.forEach( (item) =>{
                                    
                                    if(item.id == _this.transactions[index].operations[0][1].account_to_upgrade){
                                        _this.$set(_this.transactions[index].operations[0][1],'userName',item.name); 

                                    }
                                    
                                })
                                
                            }
                        })
                    }
                }
            }

            bus.$on('blockDataJson', (text) => {
                this.transactions = text.transactions;
                this.transactionsIds = text.transaction_ids;
                this.transactions.forEach( (item,index) =>{
                    
                    if( item.operations[0][0] == 0 ){
                        let str = `"${item.operations[0][1].from}","${item.operations[0][1].to}"`;
                        this.sendSocket = 
                            '{"id":0, "method":"call", "params":[0,"get_accounts",[['+str+']]]}';

                        _this.ws.send(_this.sendSocket);
                        
                    }
                    else if( item.operations[0][0] == 5 ){
                       
                        let str = `"${item.operations[0][1].referrer}"`;
                        this.sendSocket= '{"id":5, "method":"call", "params":[0,"get_accounts",[['+str+']]]}'

                        let _this = this;   
                        _this.ws.send(_this.sendSocket);
                    }
                    else if( item.operations[0][0] == 8 ){
                        let str = `"${item.operations[0][1].account_to_upgrade}"`;
                        this.sendSocket=
                            '{"id":8, "method":"call", "params":[0,"get_accounts",[['+str+']]]}'
                     
                        this.ws.send(this.sendSocket);
                        let _this = this;   
                    }
                   
                });
            })
        }
    }
</script>

<style lang="less" scoped>
    @import '~assets/style/base.less';
    .title{
        font-size: 24px;
        font-weight: bold;
        margin-top:30px;
    }
    .transations{
        padding-bottom: 180px;
    }
    li{
        margin-bottom: 10px;
    }
    .next{
        margin: 10px 40px;
        height: 22px;
    }
    .list{
        font-size: 14px;
        line-height: 50px;
        .list_data{
            padding-top: 15px;
            
        }
        .list_title{
            line-height: 33px;  
            background: #eef0f3;
            padding: 0 10px;
            box-sizing: border-box; 
            font-size: 12px;
            p{
                font-weight: bold;
                line-height: 30px;
            }
            .hash_id{
                color: #4398d3;
               
            }
        }
      
        .left{
            width: 25%;
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
                margin-top: 10px;
            }
        }
        p{
            font-weight: bold;
            margin-bottom: 5px;
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
        margin-top: 15px;
        margin-right: 90px;
    }

    .list .amount{
        // margin-right: 100px;
    }
    .list li .right {
        color: #666;
        font-weight: bold;
    }
    a{
        color: #4398d3;
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
</style>