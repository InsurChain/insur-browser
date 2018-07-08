<template>
   <div class="warp1000">
        <div class="block">
            <h2 class="title">{{ $t('index.block.title') }}</h2>

            <div class="table_box">
                <table border="0" cellspacing="0" cellpadding="0">
                    <thead>
                        <tr>
                            <th>{{ $t('index.block.tableHead.BlockNum') }}</th>
                            <th>{{ $t('index.block.tableHead.CreateTime') }}</th>
                            <th>{{ $t('index.block.tableHead.Witness') }}</th>
                            <th>{{ $t('index.block.tableHead.Transactions') }}</th>
                            <th>{{ $t('index.block.tableHead.IrreversibleBlock') }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr :class="{ trHover:index %2 == 0 }" v-for="( item,index ) in blockDataArr" :key=index v-if="index < showLength">
                            <td>
                                 <router-link :to="'/Details/'+item.head_block_number">
                                    <a href="javaScript:;">{{ item.head_block_number }}</a>
                                 </router-link>
                            </td>

                            <td>{{ moment(new Date(item.time+'Z')).format('YYYY-MM-DD HH:mm:ss') }}</td>
                            <td>
                                <router-link :to="'/Account/'+item.name+'/1'">
                                    <a href="javaScript:;">{{ item.name }}</a>
                                 </router-link>
                            </td>
                            <td>
                                <a href="javaScript:;">{{ item.Transactions }}</a>
                            </td>
                            <td>
                                <router-link :to="'/Details/'+item.head_block_number">
                                    <a href="javaScript:;">{{ item.last_irreversible_block_num }}</a>
                                 </router-link>
                            </td>
                        </tr>
                     
                    </tbody>
                </table>
                <div class="more clearfix"  v-if="blockDataArr.length > showLength">
                   <p class="fr" @click="getAllData"> more...</p>
                </div>

                <div class="more clearfix" v-if="blockDataArr.length == showLength && blockDataArr.length !=10">
                   <p class="fr" @click="packUp">pack up</p>
                </div>
            </div>
        </div>
   </div>
</template>
<script>
import { bus } from '../api/bus.js'
import client from '../api/client.js'
import moment from 'moment';
    export default{
        data(){
            return {
                blockDataArr:[],
                blockData:[],
                headerblock:'',
                irreversible:'',
                time:'',
                Transactions:0,
                current_witness:'',
                convertUTCTimeToLocalTime:client.convertUTCTimeToLocalTime,
                showLength:10,
                sendSocket: [],
                moment:moment
            }
        },
        props:['ws'],
        mounted(){
           
            bus.$on('blockData', ( text )=>{
                let blockDataItem = {};
                let blockData = text.received_msg.params[1][0];
                
                blockData.forEach(((item,index) =>{
                    if(! item.id.match(/^(?!2.7).*/)){
                        this.Transactions++;
                    }

                    if(! item.id.match(/^(?!2.8).*/)){
                        blockData.forEach((item2,index2) =>{
                             if( item2.id == '2.1.0'){
                                blockDataItem = item2;
                                blockDataItem.witness_account = text.witness_account;
                               
                            }
                        })
                    }
                }))

                blockDataItem.Transactions = this.Transactions;
                this.blockData.unshift(blockDataItem);
                this.Transactions = 0;

            })

            bus.$on('blockDataWitness', (text) => {
                 
             
                this.blockData.forEach((item,index) =>{
                    if(item.witness_account == text.received_msg.result[0].id){

                        this.$set(this.blockData[index],'name',text.received_msg.result[0].current_witness); 
                        this.blockDataArr = this.blockData;
                        if(this.showLength >10){
                            this.showLength = this.blockDataArr.length;
                        }
                        
                    }
                })

            })
        },
        methods: {
            getAllData(){
                this.showLength = this.blockDataArr.length;
            },
            packUp(){
                this.showLength = 10;
            },
            WebSocketTest(){
                		let _this = this;

		var heartCheck = {
			timeout: 60000,//60ms
			timeoutObj: null,
			serverTimeoutObj: null,
			reset: function(){
				// alert(this.timeoutObj)
				clearTimeout(this.timeoutObj);
				clearTimeout(this.serverTimeoutObj);
		　　　　 this.start();
			},
			start: function(){
				var self = this;
				self.timeoutObj = setTimeout(function(){
					ws.send("HeartBeat");
					self.serverTimeoutObj = setTimeout(function(){
						// alert(1111)
						ws.close();//如果onclose会执行reconnect，我们执行ws.close()就行了.如果直接执行reconnect 会触发onclose导致重连两次
						
					}, self.timeout)
				}, self.timeout)
			},
		}

		if ("WebSocket" in window) {
			try{
				// var ws = new WebSocket(wsurl);
				let _this = this;  

				ws.onopen = function() {
					heartCheck.start();
					for (var i = 0; i < sendSocket.length; i++){
						ws.send( sendSocket[i]);
					}
				};
			   
				ws.onmessage = function (evt)  { 
					heartCheck.reset();
					callback(evt);
				};
				ws.onclose = function () {
					_this.WebSocketTest( callback,sendSocket,router )
					
				};
				ws.onerror = function () {
					heartCheck.timeoutObj = null;
					heartCheck.serverTimeoutObj = null;
					clearTimeout(heartCheck.timeoutObj);
					clearTimeout(heartCheck.serverTimeoutObj);
					_this.WebSocketTest( callback,sendSocket,router )
					
				};
				router.afterEach(function () {
				   ws.close();
				})
			}catch( err){
				
			}
			
		}else {
			alert("您的浏览器不支持 WebSocket!");
		}
      
            }
            
        }
    }
</script>

<style lang="less" scoped>
    @import '~assets/style/base.less';
    .block{
        margin-bottom: 30px;
    }
    .title{
        font-size: 14px;
        color: #7690a4;
        font-weight: bold;
    }
    .table_box{
        table{
            width: 100%;
        }
        margin-top: 24px;
        font-size: 12px;
        a{
            color: #4398d3;
        }
        thead{
            background: #fafbfc;
            color: #585858;
            font-weight: bold;
        }
        tr{
             background: #fafbfc;
             line-height: 32px;
             height: 32px;
             text-align: center;
             font-weight: bold;
        }
        .trHover{
            background: #eef0f3;
        }
        .more{
            font-size: 14px;
            color: #4398d3;
            margin-top: 20px;
            p{
                font-weight: bold;
                cursor: pointer;
            }
        }
    }
</style>

