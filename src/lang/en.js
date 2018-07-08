module.exports = { 
    header: { 
      main: 'Main',
      witness: 'Witness',
      committee: 'Committee',
      search: 'Search blockid, account or name on the InsurChain network',
      localLang:'中文'
    }, 
    index: {
        latestStatus: {
            title: 'Latest Status',
            HeaderBlock: 'Header Block',
            BlockInterval: 'Block Interval(s)',
            RecentlyMissed: 'Recently Missed',
            TotalSupply: 'Total Supply'
        },
        history: {
            title: 'TRX/Block',
            last_updated_at: 'Updated at: {seconds}s ago',
            tips: 'TRX'
        },
        transations:{
            title:'The lastest transations since open this explorer',
            tableHead:{
                BlockNum: 'Block Num',
                TrxID: 'Trx ID',
                Cost: 'Cost',
                Type: 'Type',
                Time: 'Time'
            },
            type:{
                transfer:'Transfer',
                createUsers:'Create Account',
                upstream:'Upstream'
            }
        },
        block:{
            title:'The lastest block since open this explorer',
            tableHead:{
                BlockNum: 'Block Num',
                CreateTime:'Create Time',
                Witness: 'Witness',
                Transactions: 'Transactions',
                IrreversibleBlock: 'Irreversible Block'
            }
        }
    },
    witness:{
        title:'Active Witness',
        tableHead:{
            Witnsss:'Witnsss',
            ConfirmedBlock:'Confirmed Block',
            Votes:'Votes',
            Missed:'Missed'
        },
        nodeType:'Node Type',
        nodeRegion:'Node Region',
        organization:'Organization',
        dpos:'DPOS',
        siliconValley:'硅谷',
        beijing:'北京',
        singapore:'新加坡',
        japan:'日本'
    },
    committee:{
        title:'Active Committees',
        tableHead:{
            Committee:'Committee',
            Votes:'Votes'
        }
    },
    Details:{
        Block:{
            title:'Block #{blockId}',
            Hashes:'Hashes',
            PreviousBlock:'Previous Block',
            MerkleRoot:'Merkle Root',
            Witness:'Witness',
            Timestamp:'Timestamp',
            Transactions:'Transactions'
        },
        transactions:{
            title:'Transactions',
            cost:'cost',
            amount:'amount',
            upstream:'Upstream',
            encrypted:'Encrypted File Hash',
            create:'Create Account',
            transfer:'Transfer'
        }
    },
    account:{
        title:'Account',
        BasicInformation:'Basic Information',
        AccountName:'Account Name',
        AccountID:'Account ID',
        RegisterReferrer:'Register Referrer',
        AccountType:'Account Type',
        AccountBalance:'Account Balance',
        INSUR:'INSUR',
        ASSET:'ASSET',
        type:{
            Basic:'Basic',
            Lifelong:'Lifelong'
        },
        Transactions:{
            title:'Transactions',
            cost:'cost'
        }
    }
   }