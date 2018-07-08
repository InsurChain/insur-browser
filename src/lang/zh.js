module.exports = { 
    header: { 
      main: '主页',
      witness: '见证人',
      committee: '理事会',
      search: '在此输入区块id、账户id或者账户名进行查询',
      localLang:'en'
    }, 
    index: {
        latestStatus: {
            title: '最新状态',
            HeaderBlock: '最新区块',
            BlockInterval: '出块时间(秒)',
            RecentlyMissed: '最近缺失',
            TotalSupply: '总发行'
        },
        history: {  
            title: '每块交易数',
            last_updated_at: '上次更新时间: {seconds}秒前',
            tips: '交易'
        },
        transations:{
            title:'最近交易记录',
            tableHead:{
                BlockNum: '区块',
                TrxID: '交易 ID',
                Cost: '金额',
                Type: '类型',
                Time: '时间'
            },
            type:{
                transfer:'转账',
                createUsers:'创建用户',
                upstream:'数据上链'
            }
        },
        block:{
            title:'最新区块',
            tableHead:{
                BlockNum: '区块',
                CreateTime:'区块生成时间',
                Witness: '见证人',
                Transactions: '交易数量',
                IrreversibleBlock: '不可逆区块'
            }
        }

    },
    witness:{
        title:'活跃见证人',
        tableHead:{
            Witnsss:'见证人',
            ConfirmedBlock:'最近确认',
            Votes:'总票数',
            Missed:'缺失'
        },
        nodeType:'节点类型',
        nodeRegion:'节点地区',
        organization:'组织名称',
        dpos:'超级节点',
        siliconValley:'硅谷',
        beijing:'北京',
        singapore:'新加坡',
        japan:'日本'
    },
    committee:{
        title:'活跃理事会成员',
        tableHead:{
            Committee:'活跃理事会成员',
            Votes:'总票数'
        }
    },
    Details:{
        Block:{
            title:'区块ID #{blockId}',
            Hashes:'区块简介',
            PreviousBlock:'上一区块',
            MerkleRoot:'默克尔 Root',
            Witness:'见证人ID',
            Timestamp:'区块生成时间',
            Transactions:'交易数量'
        },
        transactions:{
            title:'交易',
            cost:'手续费',
            amount:'金额',
            upstream:'数据上链',
            encrypted:'加密文件哈希',
            create:'创建用户',
            transfer:'转账'
        }
    },

    account:{
        title:'账户',
        BasicInformation:'基本信息',
        AccountName:'账户名',
        AccountID:'账户ID',
        RegisterReferrer:'推荐人',
        AccountType:'账户类型',
        AccountBalance:'账户余额',
        INSUR:'INSUR',
        ASSET:'资产类型',
        type:{
            Basic:'普通会员',
            Lifelong:'终身会员'
        },
        Transactions:{
            title:'交易',
            cost:'手续费'
        }
    }


   }