<template>
   <div class="warp1000">
        <div class="block">
            <h2 class="title">{{ $t('index.transations.title')}}</h2>
            <div class="table_box">
                <table border="0" cellspacing="0" cellpadding="0">
                    <thead>
                        <tr>
                            <th width="10%;">{{ $t('index.transations.tableHead.BlockNum')}}</th>
                            <th>{{ $t('index.transations.tableHead.TrxID')}}</th>
                            <th>{{ $t('index.transations.tableHead.Cost')}}</th>
                            <th>{{ $t('index.transations.tableHead.Type')}}</th>
                            <th>{{ $t('index.transations.tableHead.Time')}}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr :class="{trHover:index %2 == 0}" v-if="index < showLength" v-for="(item,index) in blockDataArr" :key=index>
                            <td>
                                <router-link :to="'/Details/'+item.headerblock">
                                    <a href="javaScript:;">{{ item.headerblock }}</a>
                                 </router-link>
                            </td>
                            <td>
                                {{ item.trx_id }}
                            </td>
                           
                            <td>
                                {{ item.trx.operations[0][1].fee.amount/100000 }}
                            </td>
                            <td>
                                {{ getType(item.trx.operations[0][0]) }}
                            </td>
                            <td>{{moment(new Date(item.trx.expiration+'Z')).format('YYYY-MM-DD HH:mm:ss')}}</td>
                        </tr>

                    </tbody>
                </table>
                <div v-if="blockDataArr.length == 0" class="empty">
                    <p>No such data</p>
                </div>
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
import moment from 'moment';
export default{
    data(){
        return {
            headerblock: '',
            blockDataArr: [],
            showLength: 10,
            moment:moment
        }
    },
    mounted(){
        bus.$on('blockData', (text) => {
            let  blockData = text.received_msg.params[1][0];
            let bFlag = false;
            for(var i = 0;i < blockData.length;i++){
                
                if(new RegExp("^2.7.*$").test( blockData[i].id)) {
                    this.blockDataArr.unshift(blockData[i]);
                    if(this.showLength >10){
                        this.showLength = this.blockDataArr.length;
                    }
                    this.blockDataArr[0].headerblock = text.head_block_number;   

                    bFlag = true;
                }
               
            }
           
        })
    },
    methods: {
        getAllData(){
            this.showLength = this.blockDataArr.length;
        },
        packUp(){
            this.showLength = 10;
        },
        getType( type ){
            if( type == 0 ){
                return this.$t('index.transations.type.transfer')
            }
            else if( type == 5 ){
                return this.$t('index.transations.type.createUsers')
            }else{
                return this.$t('index.transations.type.upstream')
            }
        }
    }
}
</script>
<style lang="less" scoped>
    @import '~assets/style/base.less';
    .empty p{
        font-size: 16px;
    }
    .block{
        margin-bottom: 40px;
        margin-top: 60px;
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

