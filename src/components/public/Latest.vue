<template>
    <div class="latest">
        <h2 class="title">{{ $t('index.latestStatus.title') }}: </h2>
        <div class="list">
            <ul>
                <li>
                    <p class="fl">{{ $t('index.latestStatus.HeaderBlock') }}</p>
                    <p class="fr">
                        <router-link :to="'/Details/'+headerblock">{{headerblock}}</router-link>
                        
                    </p>
                </li>
                <li class="active">
                    <p class="fl">{{ $t('index.latestStatus.BlockInterval') }}</p>
                    <p class="fr">  
                        3
                    </p>
                </li>
                <li>
                    <p class="fl">{{ $t('index.latestStatus.RecentlyMissed') }}</p>
                    <p class="fr">0</p>
                </li>
                <li class="active">
                    <p class="fl">{{ $t('index.latestStatus.TotalSupply') }}</p>
                    <p class="fr">20000000000 INSUR</p>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import { bus } from '../api/bus.js'
export default{
    data(){
        return {
            headerblock:''
        }
    },
    mounted(){
        bus.$on('blockData', (text) => {

            let  blockData = text.received_msg.params[1][0];
            
            for(var i = 0;i <blockData.length;i++){

                if( blockData[i].id == '2.1.0'){
                    this.headerblock = blockData[i].head_block_number;
                }
            }
        
        })
    }
}
</script>
<style  lang="less" scoped>
    @import '~assets/style/base.less';
    .latest{
        width: 50%;
        float: left;
    }
    .title{
        font-size: 14px;
        color: #7690a4;
        font-weight: bold;
    }
    .list{
        margin-top: 26px;
        a{
            color: #4398d3;
        }
        li{
            height: 33px;
            line-height: 33px;
            font-size: 14px;
            padding: 0 10px;
            box-sizing: border-box;
            background: #fafbfc;
        }
        .active{
            background: #eef0f3;
        }
    }
</style>

