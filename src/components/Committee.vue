<template>
    <div>
        <Headers></Headers>
        <div class="block warp1000">
            <h2 class="title">
                {{ $t('committee.title') }}
            </h2>
            <div class="table_box">
                <table border="0" cellspacing="0" cellpadding="0">
                    <thead>
                        <tr>
                            <th>{{ $t('committee.tableHead.Committee') }}</th>
                            <th>{{ $t('committee.tableHead.Votes') }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr :class="{ trHover:index %2 == 0 }" v-for="( item,index ) in getCommitteeInfoData" :key=index>
                            <td>
                                <router-link :to="'/Account/'+item.name+'/1'">
                                    <a href="javaScript:;">{{ item.name }}</a>
                                </router-link>
                            </td>
                            <td>{{ item.total_votes }}</td>
                        </tr>
                     
                    </tbody>
                </table>
               
            </div>
        </div>
        <Foot></Foot>
    </div>
</template>
<script>
    import Headers from './public/Header'
    import Foot from './public/Foot';
    import ajax from './api/index.js'
    import client from './api/client.js'
    import { wsurl } from './api/bus.js'
    export default{
        data(){
            return{
                getCommitteeData:[],
                getCommitteeInfoData:[],
                ws:null
            }
        },
        components:{
            Headers,Foot
        },
        mounted(){
            this.ws = new WebSocket(wsurl);
             let _this = this;

            _this.ws.onopen = function(){
                _this.ws.send('{"id":1,"method":"call","params":[1,"login",["",""]]}');
                _this.ws.send('{"method":"call","params":[1,"history",[]],"id":4}');
            };
            _this.ws.onmessage = function ( evt ){
                if( typeof(JSON.parse(evt.data).result) == 'object'){
                    let WebSocketData = JSON.parse(evt.data).result;


                    _this.getCommitteeInfoData.forEach((item,index) => {
                        WebSocketData.forEach((item2,index2) =>{
                            if(item.committee_member_account = item2.id){

                                    _this.$set(_this.getCommitteeInfoData[index2],'name',item2.name); 
                            }
                        })
                    });

                }else{
                    
                }
            }
            this.getCommittee();
        },
        methods:{
            getCommittee(){
                ajax.blockMsg({"id":1,"method":"call","params":[0,"get_global_properties",[]]}).then( rs =>{
                    this.getCommitteeData  = rs.result.active_committee_members;   
                    this.getCommitteeInfo(this.getCommitteeData)
                }) 
            },
            getCommitteeInfo(getCommitteeData){
                ajax.blockMsg({"id":1, "method":"call", "params":[0,"get_committee_members",[getCommitteeData]]}).then( rs =>{

                    this.getCommitteeInfoData = rs.result;
                    let sendSocketStr = '';
                    this.getCommitteeInfoData.forEach((item,index) =>{
                        sendSocketStr += ',"'+item.committee_member_account+'"';

                    });
                    sendSocketStr = sendSocketStr.substring(1);
                    this.sendSocket=
                        '{"id":1, "method":"call", "params":[0,"get_accounts",[['+sendSocketStr+']]]}'

                    this.ws.send( this.sendSocket);

                }) 
            }

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
    .block{
        margin-top: 30px;
        padding-bottom: 180px;
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
