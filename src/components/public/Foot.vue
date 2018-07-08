<template>
  <div class="foot" id="foot">
     <div class="warp1000">
         <div class="clearfix" style="height:50px;">
             <img src="../../assets/images/insurChain.png" alt="" class="fl insurChain">
             <div class="link fl">
                <ul class="clearfix">
                    <li class="fl">
                        <h2 class="title">PRODUCTS</h2>
                        <div class="link_list clearfix">
                            <p class="fl"><a href="http://wallet.insurchain.org">WALLET</a></p>
                           
                            <p class="fr"><a href="http://browser.insurchain.org/#/Index">EXPLORER</a></p>
                        </div>  
                    </li>
                    <li class="fl">
                        <h2 class="title">COMPANY</h2>
                        <div class="link_list clearfix">
                            <p class="fl"><a href="http://www.insurchain.org">InsurChain</a></p>
                          
                        </div>  
                    </li>
                    <li class="fl">
                        <h2 class="title">SUPPORT</h2>
                        <div class="link_list clearfix">
                            <p class="fl"><a href="javaScript:;"> API</a></p>
                           
                        </div>  
                    </li>
                </ul>
            </div>

             <div class="clearfix foot_logo">
             <ul class=" fr clearfix">
                <li class="fl">
                    <a href="mailto:customer@insurchain.org">
                        <img src="../../assets/images/email.png" alt="">
                    </a>
                </li>
                <li class="fl">
                    <a href="https://www.reddit.com/r/Insurchain/">
                        <img src="../../assets/images/reddit.png" alt="">
                    </a>
                </li>

                <li class="fl">
                    <a href="https://twitter.com/InsurChain">
                        <img src="../../assets/images/tuite.png" alt="">
                    </a>
                </li>
                <li class="fl">
                    <a href="https://weibo.com/insurchain">
                        <img src="../../assets/images/weibo.png" alt="">
                    </a>
                </li>

                <li class="fl weixin" @mouseover="showQr" @mouseout="hideQr">
                    <img src="../../assets/images/weixin.png" alt="">
                    <div class="qrcode" v-show="isShow">
                        <img src="../../assets/images/qrcode.png" alt="">
                    </div>
                </li>

            </ul>
         </div>
         </div>
        
     </div>
  </div>
</template>
<script>
    export default{
        data(){
            return {
                isShow:false
            }
        },
        methods:{
            showQr(){
                this.isShow = true;
            },
            hideQr(){
                this.isShow = false;
            }
        }

    }
</script>
<style lang="less" scoped>
    @import '~assets/style/base.less';
    .foot{
        height: 123px;
        background: #19638e;
        margin-top: 100px;
        width: 100%;
        padding-top: 40px;
        box-sizing: border-box;
        min-width: 1000px;
        position: fixed;
        left: 0;
        bottom: 0;
        .insurChain{
            margin: 20px 0 0 20px;
        }
        .weixin{
            position: relative;
            .qrcode{
                position: absolute;
                left: 0;
                top: 0;
                img{
                    width: 100px;
                    height: 100px;
                    margin-top: -110px;
                    margin-left: -30px;
                }
            }
        }
        .title{
            font-size: 14px;
            font-weight: bold;
            color: #fff;
            border-bottom: 1px solid #84acc3;
            line-height: 24px;
        }
        .foot_logo{
            ul{
                margin-top: 15px;
            }
            img{
                width: 26px;
                height: 26px;
                display: block;
                margin-left: 10px;
                cursor: pointer;
            }
        }
        a{
            font-size: 12px;
            color: #fff;
        }
        .link{
            width: 500px;
            margin-left: 40px;
            >ul{
                display: flex;
                li{
                    flex: 1;
                    margin-right: 40px;
                }
                .link_list{
                    font-size: 12px;
                    line-height: 24px;
                    p{
                        margin-right: 10px;
                    }
                }
            }
        }
    }
</style>
