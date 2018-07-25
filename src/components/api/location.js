
export default {
    data(){
        return{
            location:[
                {
                    name:'Silicon valley',
                    position:{
                        left:'152px',
                        top:'235px'
                    },
                    details:{
                        type: this.$i18n.locale == 'zh'?'超级节点':'DPOS',
                        region: this.$i18n.locale == 'zh'?'硅谷':'Silicon valley',
                        organization:'LinkVC',
                        isShow:false,
                        position:{
                            left:'70px',
                            top:'110px'
                        }
                    }
                    
                },
                {
                    name:'Beijing',
                    position:{
                        left:'750px',
                        top:'202px',
                    },
                
                    details:{
                        type: this.$t('witness.dpos'),
                        region:this.$i18n.locale == 'zh'?'北京':'Beijing',
                        organization:this.$i18n.locale == 'zh'?'INSUR-猎户座':'INSUR-ORION',
                        isShow:false,
                        position:{
                            left:'560px',
                            top:'150px'
                        }
                    }
                    
                },
                {
                    name:'Japan',
                    position:{
                        left:'815px',
                        top:'215px',
                        
                    },
                    details:{
                        type: this.$t('witness.dpos'),
                        region:this.$i18n.locale == 'zh'?'日本':'Japan',
                        organization:'Contract VC',
                        isShow:false,
                        position:{
                            left:'780px',
                            top:'100px'
                        }
                    }
                    
                },
               { 
                    name:'Singapore',
                    position:{
                        left:'745px',
                        top:'327px',
                    },
                    details:{
                        type: this.$t('witness.dpos'),
                        region:this.$i18n.locale == 'zh'?'新加坡':'Singapore',
                        organization:'Bangshi Capital',
                        isShow:false,
                        position:{
                            left:'680px',
                            top:'360px'
                        }
                    }
                },
                { 
                    name:'HongKong',
                    position:{
                        left:'754px',
                        top:'254px'
                    },
                    details:{
                        type: this.$t('witness.dpos'),
                        region:this.$i18n.locale == 'zh'?'香港':'HongKong',
                        organization:'INSUR-HK',
                        isShow:false,
                        position:{
                            left:'560px',
                            top:'220px'
                        }
                    }
                },
                { 
                    name:'HangZhou',
                    position:{
                        left:'760px',
                        top:'230px'
                    },
                    details:{
                        type: this.$t('witness.dpos'),
                        region:this.$i18n.locale == 'zh'?'杭州':'HangZhou',
                        organization:'INSUR-SKY',
                        isShow:false,
                        position:{
                            left:'560px',
                            top:'204px'
                        }
                    }
                },
                { 
                    name:'ShenZhe',
                    position:{
                        left:'747px',
                        top:'245px'
                    },
                    details:{
                        type: this.$t('witness.dpos'),
                        region:this.$i18n.locale == 'zh'?'深圳':'ShenZhen',
                        organization:this.$i18n.locale == 'zh'?'超级圆桌':'Topmdrt',
                        isShow:false,
                        position:{
                            left:'550px',
                            top:'210px'
                        }
                    }
                },
                { 
                    name:'Sydney',
                    position:{
                        left:'875px',
                        top:'430px'
                    },
                    details:{
                        type: this.$t('witness.dpos'),
                        region:this.$i18n.locale == 'zh'?'悉尼':'Sydney',
                        organization:this.$i18n.locale == 'zh'?'风雨同舟':'INSUR-Solidarity',
                        isShow:false,
                        position:{
                            left:'640px',
                            top:'400px'
                        }
                    }
                },
                { 
                    name:'Toronto',
                    position:{
                        left:'253px',
                        top:'203px'
                    },
                    details:{
                        type: this.$t('witness.dpos'),
                        region:this.$i18n.locale == 'zh'?'多伦多':'Toronto',
                        organization:this.$i18n.locale == 'zh'?'反重力社区':'Anti-Gravity',
                        isShow:false,
                        position:{
                            left:'274px',
                            top:'110px'
                        }
                    }
                },
                { 
                    name:'ShangHai',
                    position:{
                        left:'765px',
                        top:'228px'
                    },
                    details:{
                        type: this.$t('witness.dpos'),
                        region:this.$i18n.locale == 'zh'?'上海':'ShangHai',
                        organization:this.$i18n.locale == 'zh'?'NewTank':'NewTank',
                        isShow:false,
                        position:{
                            left:'564px',
                            top:'190px'
                        }
                    }
                },
                { 
                    name:'Washington',
                    position:{
                        left:'255px',
                        top:'230px'
                    },
                    details:{
                        type: this.$t('witness.dpos'),
                        region:this.$i18n.locale == 'zh'?'华盛顿':'Washington',
                        organization:this.$i18n.locale == 'zh'?'INSUR-ZT':'INSUR-ZT',
                        isShow:false,
                        position:{
                            left:'210px',
                            top:'260px'
                        }
                    }
                }
                
            ]
        }
        }
}
