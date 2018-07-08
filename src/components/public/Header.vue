<template>
    <div>
        <div class="headerTop">
            <div class="warp1000">
                <div class="nav_box header clearfix">
                    <ul class="list fr clearfix">
                        <li class="fl">
                            <router-link to="/Index">{{ $t('header.main') }}</router-link>
                            <b>|</b>
                        </li>
                        <li class="fl">
                            <router-link to="/witness">{{ $t('header.witness') }}</router-link>
                            <b>|</b>
                        </li>
                        <li class="fl">
                            <router-link to="/Committee">{{ $t('header.committee') }}</router-link>
                             <b>|</b>
                        </li>

                        <li class="fl lang" @click="changeLocale" @mouseover="changePic" @mouseout="canclePic">
                            <img v-if="locale == 'en'" src="../../assets/images/CN.png" alt="" >
                            <img v-else src="../../assets/images/US.png" alt="">
                        </li>
                       
                    </ul>
                </div>
                <div class="logo_box">
                     <router-link to="/Index">
                         <img src="../../assets/images/logo.png" alt="">
                     </router-link>
                    <p>INSUR CHAIN EXPLORER</p>
                </div>
                <div class="search clearfix">
                    <input maxlength="30" type="text" class="fl" v-model="inputData" :placeholder="$t('header.search')" 
                     @keyup.enter="searchFn" />
                    <p class="fr icon" @click="searchFn"></p>
                </div>
            </div>
        </div>

        <div class="head" id="head" v-show="auto_show" :class="auto_fixed">
            <div class="warp1000">
                    <div class="head">
                        <router-link to="/Index">
                            <img src="../../assets/images/logo.png" alt="" class="fl">
                       </router-link>
                        <div class="search clearfix">
                            <input type="text" class="fl"  maxlength="30" v-model="inputData" :placeholder="$t('header.search')" @keyup.enter="searchFn">
                            <p class="fr icon" @click="searchFn"></p>
                        </div>
                        <ul class="list fr clearfix">
                            <li class="fl">
                                <router-link to="/Index">{{ $t('header.main') }}</router-link>
                                <b>|</b>
                            </li>
                            <li class="fl">
                                <router-link to="/Witness">{{ $t('header.witness') }}</router-link>
                                <b>|</b>
                            </li>
                            <li class="fl">
                                <router-link to="/Committee">{{ $t('header.committee') }}</router-link>
                                <b>|</b>
                            </li>
                            <li class="fl lang" @click="changeLocale" @mouseover="changePic" @mouseout="canclePic">
                                <img v-if="locale == 'en'" src="../../assets/images/CN.png" alt="" >
                                <img v-else src="../../assets/images/US.png" alt="">
                            </li>
                        </ul>
                    </div>
            </div>
        </div>
    </div>
</template>
<script>
import { bus } from '../api/bus.js'
import  ajax   from '../api/index.js'
    export default{
        data(){
            return {
                inputData:'',
                auto_show:false,
                auto_fixed: {
                    fixed: false
                },
                isshow:false,
                locale:'',
                isClick: false
            }
        },
        mounted(){
            this.$nextTick(function () {
                window.addEventListener('scroll', this.onScroll)
            })
        },
        methods:{
            changeLocale(){
                this.isClick = true;
                this.locale = this.$i18n.locale;
                this.locale === 'zh' ? this.$i18n.locale = 'en' : this.$i18n.locale = 'zh';
            },
            searchFn(){

                if(this.inputData.replace(/ /g,'') == ''){
                    return;
                }else{

                    if( (/^[0-9]*$/.test(this.inputData))){
                        this.$router.push('/Details/'+ this.inputData.replace(/ /g,''));
                         bus.$emit('searchInfo', this.inputData.replace(/ /g,''));
                    }else{
                        let regx = /^[1-／9]\d*\,\d*|[1-9]\d*$/;

                        if( this.inputData.indexOf('.') >-1){
                            this.$router.push('/Account/'+ this.inputData.replace(/ /g,'')+'/2');
                        }else{
                            this.$router.push('/Account/'+ this.inputData.replace(/ /g,'')+'/1');
                        }
                         bus.$emit('searchAccount', this.inputData.replace(/ /g,''));
                    }

                   
                   
                }
               
            },
            onScroll(){
                let scrolled = document.documentElement.scrollTop || document.body.scrollTop
                let header_height = 200;
                if( scrolled >= header_height ){
                    this.auto_show = true;
                    this.auto_fixed = {
                        auto_fixed: true,
                        fixed: scrolled >= header_height
                    }
                }else{
                    this.auto_show = false;
                }
                
            },
            changePic( ev ){
                if(this.locale == 'en'){
                    this.locale = 'zh';
                }else{
                    this.locale = 'en';
                }
                ev.preventDefault();
            },
            canclePic( ev ){
                if( this.isClick ){
                    this.isClick = false;
                    return;
                }
                if(this.locale == 'en' || this.locale == ''){
                    this.locale = 'zh';
                }else{
                    this.locale = 'en';
                }
                
            }
        }

    }
</script>

<style scoped lang="less">
    @import '~assets/style/base.less';

    .headerTop{
        height: 212px;
        background:-webkit-linear-gradient(top, #282f56, #186792);
        font-size: 12px;
        min-width: 1000px;
    }
    .fixed{
        position: fixed;
        top: 0px;
        width: 100%;
        z-index: 10000;
    }
    .logo_box{
        text-align: center;
        img{
            display: block;
            margin:  0 auto
        }
        p{
            color: #d3def1;
            font-size: 20px;
            margin-top: 20px;
        }
    }
    .list{
       font-size: 14px;
       line-height: 22px;
       margin-top: 10px;
       a{
           color: #d3def1;
           font-weight: bold;
       }
       b{
           color: #d3def1;
           padding: 0 5px;
       }
    }
    .search{
       border: 1px solid #97b2c1;
       height: 40px;
       width: 490px;
       margin: 10px auto;
       position: relative;
       input{
           width:100%;
           line-height: 32px;
           padding:3px 5px 0;
           background: none;
           box-sizing: border-box;
           outline: none;
           color: #fff;
           text-align: center;
       }
    }
    .icon{
       background: url('../../assets/images/search.png') no-repeat;
       background-size: 100% 100%;
       width: 23px;
       height: 23px;
       margin: 8px 20px 0;
       cursor: pointer;
       position: absolute;
       right: 0;
       top: 0;
    }

    .head{
        background: #19638e;
        height: 84px;
        min-width: 1000px;
        position: fixed;
        img{
            margin-top: 18px;
            width: 45px;
            margin-left: 40px;
        }
        .search{
            border: 1px solid #97b2c1;
            height: 40px;
            width: 490px;
            position: absolute;
            left:50%;
            margin-left: -262px;
            top: 50%;
            margin-top: -20px;
            
        }
    
        .list{
            margin-top:0;
            line-height: 84px;
        }
    }
    .lang{
        position: relative;
        img{
            height:16px;
            cursor: pointer;
            margin-top: 2px;
            margin-left: 0;
            width: inherit
        }
    }

    .head .lang{
        margin-top: 3px;
    }
</style>


