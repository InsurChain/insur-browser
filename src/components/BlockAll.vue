<template>
    <div class="warp1000">
        <div class="block">
            <h2 class="title">
                {{ $t('Details.Block.title',{blockId:blockId}) }}
            </h2>
            <div class="list">
                <h3 class="list_title"><p>{{$t('Details.Block.Hashes')}}</p></h3>
                <ul>
                    <li class="clearfix">
                        <p class="fl">{{ $t('Details.Block.PreviousBlock') }} </p>
                        <p class="fr right">{{ blockData.previous }}</p>
                    </li>
                    <li class="clearfix active">
                        <p class="fl">{{ $t('Details.Block.MerkleRoot') }}</p>
                        <p class="fr right">{{ blockData.transaction_merkle_root }}</p>
                    </li>
                    <li class="clearfix">
                        <p class="fl">{{ $t('Details.Block.Witness') }}</p>
                        <p class="fr right">{{ blockData.witness }}</p>
                    </li>
                    <li class="clearfix active">
                        <p class="fl">{{ $t('Details.Block.Timestamp') }}</p>
                        <p  class="fr right">{{ moment(new Date(blockData.timestamp+'Z')).format('YYYY-MM-DD HH:mm:ss') }}</p>
                    </li>
                    <li class="clearfix" v-if="blockData.transactions">
                        <p class="fl">{{ $t('Details.Block.Transactions') }}</p>
                        <p class="fr right">{{ blockData.transactions.length }}</p>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import { bus } from './api/bus.js'
import moment from 'moment';
    export default{
        data(){
            return{
                blockData:{},
                moment:moment
            }
        },
        props:['blockId'],
        mounted(){
            bus.$on('blockDataJson', (text) => {
                if(text != null){
                    this.blockData = text;
                }
                
            })
        },
        methods:{
           
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
                color: #4398d3;
                font-weight: bold;
            }
        }
        .active{
            background: #eef0f3;
        }
    }
</style>
