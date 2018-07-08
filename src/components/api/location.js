
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
                            left:'100px',
                            top:'120px'
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
                        left:'752px',
                        top:'250px'
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
                        left:'762px',
                        top:'230px'
                    },
                    details:{
                        type: this.$t('witness.dpos'),
                        region:this.$i18n.locale == 'zh'?'杭州':'HangZhou',
                        organization:'INSUR-SKY',
                        isShow:false,
                        position:{
                            left:'560px',
                            top:'200px'
                        }
                    }
                }
                
            ]
        }
        }
}
