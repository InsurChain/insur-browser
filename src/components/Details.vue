<template>
    <div class="index">
        <Headers></Headers>
         <Block :blockId=blockId></Block>
         <Transactions :ws="ws"></Transactions>
        <Foot></Foot>
    </div>
</template>
<style>
   
</style>

<script>
import Headers from './public/Header'
import Block from './BlockAll'
import Transactions from './TransationsAll'
import Foot from './public/Foot';
import ajax from './api/index.js'
import { bus } from './api/bus.js'
    export default{
        data() {
            return {
                blockId:'',
            }
        },
        created(){
            this.blockId = this.$route.params.id;
            this.blockInfo(this.blockId);

            bus.$on('searchInfo', (text) => {
                this.blockId = text;
                this.blockInfo();
            })

        },
        components:{
            Headers,
            Block,
            Transactions,
            Foot
        },
        methods:{
            blockInfo( blockId ){
               ajax.blockInfo( {"id":1, "method":"call", "params":[0,"get_block",[this.blockId]]}).then( rs => {
                   
                    bus.$emit('blockDataJson', rs.result);
               })
           }    
        }
    }
</script>
<style lang="less" scoped>
    @import '~assets/style/base.less';
</style>

