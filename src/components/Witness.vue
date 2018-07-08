<template>
    <div>
        <Headers></Headers>
        <div class="block warp1000">
            <h2 class="title">
                {{ $t('witness.title')}}
            </h2>
            

            <div class="witness">
                <img  width="100%" src="../assets/images/witness.jpg" alt="">
                
                <p class="pos">
                   <div v-for=" (item,index) in location" :key="index" @mouseover="showTips(index)" @mouseout="hideTips(index)">
                      
                       <transition
                        v-bind:css="false"
                        v-on:before-enter="beforeEnter"
                        v-on:enter="enter"
                        v-on:leave="leave">

                         <div v-if="show" class="breathe-btn" :style="item.position">
                         
                       </div>
                    </transition>
                        <div class="tips" :style="item.details.position" v-show="item.details.isShow">
                            <p>{{$t('witness.nodeType')}}: {{item.details.type}}</p>
                            <p>{{$t('witness.nodeRegion')}}: {{item.details.region}}</p>
                            <p>{{$t('witness.organization')}}: {{item.details.organization}}</p>
                        </div>
                   </div>

                </p>
            </div>
            
            <div class="table_box">
                <table border="0" cellspacing="0" cellpadding="0">
                    <thead>
                        <tr>
                            <th>{{$t('witness.tableHead.Witnsss')}}</th>
                            <th>{{$t('witness.tableHead.ConfirmedBlock')}}</th>
                            <th>{{$t('witness.tableHead.Votes')}}</th>
                            <th>{{$t('witness.tableHead.Missed')}}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr ref="mybox" :class="{trHover:index %2 == 0,trChange:index == changeItem}"  v-for="( item,index ) in getWitnessInfoData" :key=index>
                            <td>
                                <router-link :to="'/Account/'+item.name+'/1'">
                                    <a href="javaScript:;">{{ item.name }}</a>
                                </router-link>
                            </td>
                            <td>{{ item.last_confirmed_block_num }}</td>
                            <td>
                                <a href="javaScript:;">{{ item.total_votes }}</a>
                            </td>
                            <td>
                                <a href="javaScript:;">{{item.total_missed}}</a>
                            </td>
                            
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
    import { wsurl,bus } from './api/bus.js'
    import location from './api/location'
    export default{
        mixins: [location],
        data(){
            return{
                getWitnessData:[],
                getWitnessInfoData:[],
                received_msg:{},
                current_witness:'',
                current_witness_Info:{},
                changeItem:0,
                sendSocket:[],
                show: true,
                fadeInDuration: 500,
                fadeOutDuration: 500,
                maxFadeDuration: 1500,
                stop: false,
                ws:null
            }
        },
        components:{
            Headers,Foot
        },
        mounted(){
            this.show = false;
            this.ws = new WebSocket(wsurl);
            this.getWitness();
            let _this = this;

            _this.ws.onopen = function(){
                _this.ws.send('{"method":"call","params":[1,"login",["",""]],"id":1}');
                _this.ws.send('{"method":"call","params":[1,"history",[]],"id":4}');
                _this.ws.send('{"method":"call","params":[0,"set_subscribe_callback",[8,true]],"id":8}');
            };

            _this.ws.onmessage = function( evt ){
                _this.previous = 0;
                
                _this.received_msg = JSON.parse(evt.data);

                if( _this.received_msg.method == 'notice'){
                   
                    let blockData = _this.received_msg.params[1][0];
                        
                    for( var i = 0; i< blockData.length;i++){
                        for( var j = 0; j< _this.getWitnessInfoData.length;j++){
                            
                            if(blockData[i].id == _this.getWitnessInfoData[j].id){
                            
                                _this.changeItem = j;
                                _this.getWitnessInfoData[j].last_confirmed_block_num = blockData[i].last_confirmed_block_num;

                                _this.getWitnessInfoData[j].total_missed = blockData[i].total_missed;
                                break;
                            }

                        }
                    }
                }else if( _this.received_msg.id ==1 && typeof(_this.received_msg.result) == 'object'){
                     let WebSocketData = JSON.parse(evt.data).result;

                    _this.getWitnessInfoData.forEach((item,index) => {
                        WebSocketData.forEach((item2,index2) =>{
                            if(item.witness_account = item2.id){
                                
                                _this.getWitnessInfoData[index2].name = item2.name;
                            }
                        })
                    });
                }
            }

            setInterval(() =>{
                _this.previous ++;
            },1000)
        },
        methods:{

            beforeEnter: function (el) {
                el.style.opacity = 0
            },
            enter: function (el, done) {
                var vm = this
                Velocity(el,
                    { opacity: 1 },
                    {
                    duration: this.fadeInDuration,
                    complete: function () {
                        done()
                        if (!vm.stop) vm.show = false
                    }
                    }
                )
            },
            leave: function (el, done) {
                var vm = this
                Velocity(el,
                    { opacity: 0 },
                    {
                    duration: this.fadeOutDuration,
                    complete: function () {
                        done()
                        vm.show = true
                    }
                    }
                )
            },
           showTips(index){

               this.location[index].details.isShow = true;

           },
           hideTips(index){
               this.location[index].details.isShow = false;
           },

           getWitness(){
                ajax.blockMsg({"id":1,"method":"call","params":[0,"get_global_properties",[]]}).then( rs =>{
                    
                    this.getWitnessData  = rs.result.active_witnesses;   
                    this.getWitnessInfo(this.getWitnessData);
                       
                }) 
           },

           addClass(obj, cls){
                var obj_class = obj.className,
                    blank = (obj_class != '') ? ' ' : '';
                added = obj_class + blank + cls;
                obj.className = added;
            },
           getWitnessInfo(getWitnessData){
                let _this = this;
                ajax.blockMsg({"id":1, "method":"call", "params":[0,"get_witnesses",[getWitnessData]]}).then( rs => {

                    _this.getWitnessInfoData = rs.result;
                    let sendSocketStr = '';
                    _this.getWitnessInfoData.forEach((item,index) =>{
                        sendSocketStr += ',"'+item.witness_account+'"';

                    });
                    sendSocketStr = sendSocketStr.substring(1);
                    this.sendSocket=[
                        '{"id":1,"method":"call","params":[1,"login",["",""]]}',
                        '{"method":"call","params":[1,"history",[]],"id":4}',
                        '{"id":1, "method":"call", "params":[0,"get_accounts",[['+sendSocketStr+']]]}'

                    ];

                    this.ws.send('{"id":1, "method":"call", "params":[0,"get_accounts",[['+sendSocketStr+']]]}');

                }) 
           }
        
        }
    }
</script>
<style lang="less" scoped>
    @import '~assets/style/base.less';
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }
     .title{
        font-size: 24px;
        font-weight: bold;
        margin-top:30px;
    }
    .tips{
        line-height: 30px;
        font-size: 14px;
        background: #eee;
        border-radius: 10px;
        padding: 10px 15px;
        box-sizing: border-box;
        position: absolute;
        z-index: 100;
    }
    .witness{
        margin-top: 20px;
        position: relative;
        height: 100%;;
        .pos{
            width: 100%;
            height: 100%;
            position: absolute;
            left: 0;
            top: 0;
            background: #fff;
            opacity: 0;
            .breathe-btn{
                position: absolute;
            }
        }
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
        .trChange{
             background: #d9edf7;
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

.breathe-btn{ 
    position: absolute; 
    width:16px; 
    height:16px;
    border:1px solid #0bf608; 
    border-radius: 50%; 
    color:#fff; 
    font-size:20px; 
    text-align:center;
    cursor:pointer; 
    background-image: -webkit-gradient(linear, left top, left bottom, from(#0bf608), to(#0bf608));
   
}

.spot{
    width: 3px;
    height: 3px;
    margin-top: 8px;
    margin-left: 8px;
    background: #19638e;
    display: block;
    border-radius: 50%;
    // -webkit-animation-name: spotMove;
    // -webkit-animation-duration: 1000ms;
    // margin-top: 8px;
    // margin-left: 8px;
    // -webkit-animation-iteration-count: infinite;

}
@-webkit-keyframes spotMove {
    0%{
       width: 0;
       height: 0;
       margin-left: 0;
       margin-top: 0;
    }
    49%{
       width: 0;
       height: 0;
    }
    50%{
       width: 4px;
       height: 4px;
       margin-top: 8px;
       margin-left: 8px;
    }
    51%{
        width: 0;
        height: 0;
    }
    100%{
        width: 0;
        height: 0;
    }
}

@-webkit-keyframes breathe {
    0% { 
        opacity: .2;  
        width: 10px; 
        height: 10px; 
        margin-left:-5px; 
        margin-top: -5px
    }
    50%{
        opacity: 1; 
        width:20px;
        height: 20px;
        box-shadow:0 1px 30px rgba(11,246,8,.5);
        margin-left: -10px;
        margin-top: -10px;
    }
    100% { 
        opacity: .2; 
        border:1px solid #0bf608; 
        box-shadow:0 1px 30px rgba(11,246,8,.5);
        width: 10px; 
        height: 10px;
        margin-left: -5px; 
        margin-top: -5px;
    }
}

</style>
