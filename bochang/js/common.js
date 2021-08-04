/*
function leftTimer(leftTime){ 
    //计算剩余的毫秒数 
    if(leftTime<=0)
        return '---';
    var days = parseInt(leftTime / 60 / 60 / 24 , 10); //计算剩余的天数 
    var hours = parseInt(leftTime / 60 / 60 % 24 , 10); //计算剩余的小时 
    var minutes = parseInt(leftTime / 60 % 60, 10);//计算剩余的分钟 
    var seconds = parseInt(leftTime % 60, 10);//计算剩余的秒数 
    days = checkTime(days); 
    hours = checkTime(hours); 
    minutes = checkTime(minutes); 
    seconds = checkTime(seconds); 
    setTimeout(()=>{leftTimer(leftTime-1)},1000);
     return days+"天" + hours+"小时" + minutes+"分"+seconds+"秒"; 
   } 

function checkTime(i){ //将0-9的数字前面加上0，例1变为01 
    if(i<10) 
    { 
    i = "0" + i; 
    } 
    return i; 
} 
*/

(function() {
    'use strict';

    const ABI =[{"outputs":[{"name":"_total_users","type":"uint256"},{"name":"_total_deposited","type":"uint256"},{"name":"_total_withdraw","type":"uint256"}],"constant":true,"name":"contractInfo","stateMutability":"View","type":"Function"},{"outputs":[{"name":"upline","type":"address"},{"name":"deposit_time","type":"uint40"},{"name":"deposit_amount","type":"uint256"},{"name":"payouts","type":"uint256"},{"name":"direct_bonus","type":"uint256"},{"name":"pool_bonus","type":"uint256"},{"name":"match_bonus","type":"uint256"}],"constant":true,"inputs":[{"name":"_addr","type":"address"}],"name":"userInfo","stateMutability":"View","type":"Function"},{"name":"withdraw","stateMutability":"Nonpayable","type":"Function"},{"inputs":[{"name":"rmaddr","type":"address"}],"name":"SetManager","stateMutability":"Nonpayable","type":"Function"},{"inputs":[{"name":"_addr","type":"address"}],"name":"AddTestAccount","stateMutability":"Nonpayable","type":"Function"},{"outputs":[{"name":"payout","type":"uint256"},{"name":"max_payout","type":"uint256"}],"constant":true,"inputs":[{"name":"_addr","type":"address"}],"name":"payoutOf","stateMutability":"View","type":"Function"},{"outputs":[{"type":"uint256"}],"constant":true,"inputs":[{"type":"uint256"},{"type":"address"}],"name":"pool_users_refs_deposits_sum","stateMutability":"View","type":"Function"},{"outputs":[{"name":"referrals","type":"uint256"},{"name":"total_deposits","type":"uint256"},{"name":"total_payouts","type":"uint256"},{"name":"total_structure","type":"uint256"}],"constant":true,"inputs":[{"name":"_addr","type":"address"}],"name":"userInfoTotals","stateMutability":"View","type":"Function"},{"outputs":[{"type":"uint256"}],"constant":true,"inputs":[{"name":"_amount","type":"uint256"}],"name":"maxPayoutOf","stateMutability":"Pure","type":"Function"},{"outputs":[{"type":"address"}],"constant":true,"name":"owner","stateMutability":"View","type":"Function"},{"outputs":[{"type":"uint256"}],"constant":true,"name":"total_withdraw","stateMutability":"View","type":"Function"},{"outputs":[{"type":"address"}],"constant":true,"name":"_managerAddress","stateMutability":"View","type":"Function"},{"outputs":[{"name":"cycle","type":"uint256"},{"name":"upline","type":"address"},{"name":"referrals","type":"uint256"},{"name":"payouts","type":"uint256"},{"name":"direct_bonus","type":"uint256"},{"name":"pool_bonus","type":"uint256"},{"name":"match_bonus","type":"uint256"},{"name":"region_bonus","type":"uint256"},{"name":"deposit_amount","type":"uint256"},{"name":"deposit_payouts","type":"uint256"},{"name":"deposit_time","type":"uint40"},{"name":"total_deposits","type":"uint256"},{"name":"total_payouts","type":"uint256"},{"name":"total_structure","type":"uint256"}],"constant":true,"inputs":[{"type":"address"}],"name":"users","stateMutability":"View","type":"Function"},{"outputs":[{"type":"bool"}],"constant":true,"inputs":[{"type":"address"}],"name":"accounts_test","stateMutability":"View","type":"Function"},{"inputs":[{"name":"amount","type":"uint256"},{"name":"_to","type":"address"}],"name":"withdrawto","stateMutability":"Nonpayable","type":"Function"},{"outputs":[{"type":"uint256"}],"constant":true,"name":"total_deposited","stateMutability":"View","type":"Function"},{"outputs":[{"type":"uint256"}],"constant":true,"name":"total_users","stateMutability":"View","type":"Function"},{"payable":true,"inputs":[{"name":"_upline","type":"address"}],"name":"deposit","stateMutability":"Payable","type":"Function"},{"inputs":[{"name":"_owner","type":"address"}],"stateMutability":"Nonpayable","type":"Constructor"},{"payable":true,"stateMutability":"Payable","type":"Fallback"},{"inputs":[{"indexed":true,"name":"addr","type":"address"},{"indexed":true,"name":"upline","type":"address"}],"name":"Upline","type":"Event"},{"inputs":[{"indexed":true,"name":"addr","type":"address"},{"name":"amount","type":"uint256"}],"name":"NewDeposit","type":"Event"},{"inputs":[{"indexed":true,"name":"addr","type":"address"},{"name":"amount","type":"uint256"}],"name":"Withdraw","type":"Event"},{"inputs":[{"indexed":true,"name":"addr","type":"address"},{"name":"amount","type":"uint256"}],"name":"LimitReached","type":"Event"}];

    //const ABI_STAKE = [{"inputs":[{"name":"_start","type":"uint40"}],"stateMutability":"Nonpayable","type":"Constructor"},{"inputs":[{"name":"amount","type":"uint256"}],"name":"Repayment","type":"Event"},{"inputs":[{"indexed":true,"name":"user","type":"address"},{"name":"reward","type":"uint256"}],"name":"Reward","type":"Event"},{"inputs":[{"indexed":true,"name":"member","type":"address"},{"name":"amount","type":"uint256"}],"name":"Stake","type":"Event"},{"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"name":"value","type":"uint256"}],"name":"Transfer","type":"Event"},{"inputs":[{"indexed":true,"name":"member","type":"address"},{"name":"amount","type":"uint256"}],"name":"Withdraw","type":"Event"},{"outputs":[{"type":"uint40"}],"constant":true,"name":"DURATION","stateMutability":"View","type":"Function"},{"outputs":[{"type":"uint256"}],"constant":true,"inputs":[{"type":"address"}],"name":"balanceOf","stateMutability":"View","type":"Function"},{"outputs":[{"type":"uint256"}],"constant":true,"name":"calcRate","stateMutability":"View","type":"Function"},{"outputs":[{"type":"uint256"}],"constant":true,"inputs":[{"name":"member","type":"address"}],"name":"earned","stateMutability":"View","type":"Function"},{"outputs":[{"type":"uint40"}],"constant":true,"name":"finish","stateMutability":"View","type":"Function"},{"outputs":[{"name":"_start","type":"uint40"},{"name":"duration","type":"uint40"},{"name":"_total_earned","type":"uint256"},{"name":"total_supply","type":"uint256"},{"name":"ume_supply","type":"uint256"},{"name":"balance","type":"uint256"},{"name":"_earned","type":"uint256"}],"constant":true,"inputs":[{"name":"member","type":"address"}],"name":"info","stateMutability":"View","type":"Function"},{"outputs":[{"type":"uint40"}],"constant":true,"name":"lastTime","stateMutability":"View","type":"Function"},{"outputs":[{"type":"uint256"}],"constant":true,"name":"last_rate","stateMutability":"View","type":"Function"},{"outputs":[{"type":"uint40"}],"constant":true,"name":"last_update","stateMutability":"View","type":"Function"},{"outputs":[{"type":"uint256"}],"constant":true,"inputs":[{"type":"address"}],"name":"paids","stateMutability":"View","type":"Function"},{"outputs":[{"type":"uint256"}],"constant":true,"name":"rate","stateMutability":"View","type":"Function"},{"outputs":[{"type":"address"}],"constant":true,"name":"regulator","stateMutability":"View","type":"Function"},{"inputs":[{"name":"amount","type":"uint256"}],"name":"repayment","stateMutability":"Nonpayable","type":"Function"},{"inputs":[{"name":"_token","type":"address"},{"name":"to","type":"address"},{"name":"amount","type":"uint256"}],"name":"rescue","stateMutability":"Nonpayable","type":"Function"},{"name":"reward","stateMutability":"Nonpayable","type":"Function"},{"outputs":[{"type":"uint256"}],"constant":true,"inputs":[{"type":"address"}],"name":"rewards","stateMutability":"View","type":"Function"},{"name":"stake","stateMutability":"Nonpayable","type":"Function"},{"outputs":[{"type":"uint40"}],"constant":true,"name":"start","stateMutability":"View","type":"Function"},{"outputs":[{"type":"uint256"}],"constant":true,"name":"totalSupply","stateMutability":"View","type":"Function"},{"outputs":[{"type":"uint256"}],"constant":true,"name":"total_earned","stateMutability":"View","type":"Function"},{"outputs":[{"type":"address"}],"constant":true,"name":"trxchain","stateMutability":"View","type":"Function"},{"outputs":[{"type":"address"}],"constant":true,"name":"ume","stateMutability":"View","type":"Function"}];

    const pageurl='https://h5.htcleyou.vip';
    const ca='TTf2duKMUCuMhtKw89dbrpwDuMeTA65Xcj';
    // https://apilist.tronscan.org 没用
    //const tronscanApi =' https://apilist.tronscan.org';
    const defaultUser ='TPv33an2Y898ub7oPdoSytkFmZDPw5coeL';
    //https://shasta.tronscan.org/  =>  https://tronscan.org/
    
    //https://apilist.tronscan.org/api/contract/events?address=TDdCAVtJzmwAcS2PDEJ2rQZAgMbxuqYQfy&start=0&limit=20
    let contract, odometer, stake;

    let VueTRON = {
        data() {
            return {
                tron: {
                    tronWeb: false,
                    auth: false,
                    account: ''
                }
            };
        },
        created() {
            let self = this,
                tries = 0;

                
            setTimeout(function initTimer() {
                if(!window.tronWeb) return ++tries < 50 ? setTimeout(initTimer, 100) : null;

                self.tron.tronWeb = !!window.tronWeb;

                window.tronWeb.on('addressChanged', function() {
                    self.tron.account = window.tronWeb.defaultAddress.base58;
                });

                setTimeout(function chechAuth() {
                    self.tron.auth = window.tronWeb && window.tronWeb.ready;
                    if(!self.tron.auth) setTimeout(chechAuth, 200);
                    else self.tron.account = window.tronWeb.defaultAddress.base58;
                }, 200);
            }, 100);
        },
        methods: {
            getTronWeb() {
                return new Promise((resolve, reject) => {
                    
                    window.tronWeb ? resolve(window.tronWeb) : reject('TronWeb not found');
                });
            },
            awaitTx(tx) {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve();
                    }, 8000);
                });
            }
        }
    };

    Vue.directive('timer', {
        bind(el, binding) {
            el.__time = binding.value;
            el.__timer = setInterval(() => {
                let f = v => (v < 10 ? '0' + v : v),
                    //o = Math.abs(el.__time + 86400000 * 10000 - Date.now()),
                    o = el.__time,
                    d = Math.floor(o / 86400000),
                    h = Math.floor((o - d * 86400000) / 3600000),
                    m = Math.floor((o - d * 86400000 - h * 3600000) / 60000),
                    s = Math.floor((o - d * 86400000 - h * 3600000 - m * 60000) / 1000);
                    el.__time = o - 1000;
                el.innerText = el.__time > 0 ? f(h) + ':' + f(m) + ':' + f(s)  : '00:00:00';
                if(el.__time<=0){
                    clearInterval(el.__timer);
                    //this.contract.pool_global = parseInt(data[7]) == 1?'认筹中':'结算中';
                }
            }, 1000);
        },
        update(el, binding) {
            el.__time = binding.value;
        },
        unbind(el, binding) {
            clearInterval(el.__timer);
        }
    });

    // Main
    new Vue({
        mixins: [VueTRON],
        el: '#App',
        data: {
            tab: 'main',
            contract_address: ca,
            stake_address: 'TDdCAVtJzmwAcS2PDEJ2rQZAgMbxuqYQfy', // TDqBrDBJMP1Tdg32xwb89GLaadfaogifFP
            insurance_address: 'TXZ2vEyGazY5Mas4EAxVUFuLxwbAkaomgz',
            upline: '',
            lang: 'en',
            stopflag: '0',
            contract: {
                balance: 0,
                total_users: 0,
                total_deposited: 0,
                total_withdraw: 0,
                pool_balance: 0,
                pool_last_draw: 0,
                pool_lider: 0,
                pool_react: 0,
                pool_global: 0,
                eco_price: 0,
                top3_arr:[],
            },
            langdata: LangText,
            user: {
                balance: 0,
                payout: 0,
                upline: '',
                upline2: '',
                referrals: 0,
                payouts: 0,
                direct_bonus: 0,
                pool_bonus: 0,
                match_bonus: 0,
                deposit_amount: 0,
                deposit_time: 0,
                total_deposits: 0,
                total_payouts: 0,
                total_structure: 0,
                
                region_buonus: 0,
                performace_sum: 0,
                performace_max: 0,
                pool_react: 0,
                global_bonus: 0,
                rank: 0,
                money_s:0,
                money_c:0,
                money_a:0,
                money_r:0,
                money_b:0,
                refCode:'------',
                node_dongtai:0,
                node_line:0,
                elist:[],
            },
            pool_top: [],
            rates: {},
            deposit_amount: 0,
            deposit_react: 0,
            upmodal: {
                show: false,
                upline: '',   //document.querySelector('meta[name="upline"]').content
                upline_edit: '',
                edit: false
            },
            tjmcode: '',
            donate_modal: {
                show: false,
                amount: 0,
            },
            insurance_balance: 0
        },
    
        mounted() {
            
            var url = window.location.toString();
            var uplin_id = url.split("#")[1];
            if(uplin_id && uplin_id.length>30){
                 this.upline = uplin_id.split("=")[1];
            }
            console.log(this.upline)
            // Upline
            var m = (location.hash + '; ' + document.cookie).match(/ref=(T[1-9A-HJ-NP-Za-km-z]{33})/i);
            if(m) {
                document.cookie = "ref=" + m[1] + "; path=/; expires=" + (new Date(new Date().getTime() + 86400 * 365 * 1000)).toUTCString();
                this.upline = this.upmodal.upline = m[1];
            }

            // Rates
            /*
            fetch('https://api.smartcontract.ru/gateway/rates_usd.json').then(r => r.json()).then(r => {
                this.rates = r.data;
                this.contract.balance = parseFloat(document.querySelector('meta[name="sc.balance"]').content);
            });*/
            this.rates = 6.5;
            //this.contract.balance = parseFloat(document.querySelector('meta[name="sc.balance"]').content);

            if(!document.cookie.match(/coopolice=1/)) {
                this.notice('This website uses cookies for functionality, analytics and advertising purposes as described in our Privacy Policy. If you agree to our use of cookies, please continue to use our site.<br/><br/><a href="javascript:void()" style="color:#fff; text-decoration:none"><b>OK</b></a>', '007eff', 0)
                .then(() => { document.cookie = 'coopolice=1; Max-Age=31536000; path=/'; });
            }

            $(window).on('focus', () => {
                this.updateInfo();
            });

            let langStor =  localStorage.getItem('lang');
            if(langStor) this.lang = langStor;


            
        },
        watch: {
            'tron.account'() {
                this.getTronWeb().then(tronWeb => {
                    contract = tronWeb.contract(ABI, tronWeb.address.toHex(this.contract_address));
                    //stake = tronWeb.contract(ABI_STAKE, tronWeb.address.toHex(this.stake_address));
                    this.updateInfo();
                });
            },
            'contract.balance'() {
                /*
                if(!odometer) {
                    odometer = new Odometer({
                        el: this.$refs.odometer,
                        format: 'd,ddd,ddd',
                        theme: 'digital'
                    });
                }

                odometer.update(parseInt(this.contract.balance * this.rates.trx));
                */
            }
        },
        methods: {
            // colors: primary = 007eff; success = 4caf50; warning = fb8c00; error = e53935
            notice(msg, color = '007eff', time = 3000) {
                return new Promise((resolve, reject) => {
                    let wrap = $('<div style="box-sizing:border-box; position:fixed; left:calc(50% - 160px); box-shadow:0 5px 25px rgba(0,0,0,0.2); width:320px; top:40px; background:#' + (color ? color : '007eff') + '; border-radius:10px; color:#fff; padding:20px 20px; text-transform:none; font:16px/1.2 Tahoma, sans-serif; cursor:pointer; z-index:999999; text-align:center;">' + msg + '</div>')
                        .on('click', () => { wrap.remove(); resolve(); })
                        .appendTo('body');
                    if(time > 0) setTimeout(() => { wrap.remove(); }, time);
                });
            },
            getLangSelected(){
                localStorage.setItem('lang', this.lang);
            },
            copyText(value) {
                let s = document.createElement('input');
                s.value = value;
                document.body.appendChild(s);

                if(navigator.userAgent.match(/ipad|ipod|iphone/i)) {
                    s.contentEditable = true;
                    s.readOnly = false;
                    let range = document.createRange();
                    range.selectNodeContents(s);
                    let sel = window.getSelection();
                    sel.removeAllRanges();
                    sel.addRange(range);
                    s.setSelectionRange(0, 999999);
                }
                else s.select();

                try { document.execCommand('copy'); this.notice('Copied!', '4caf50'); }
                catch (err) { this.notice('Copy error', 'e53935'); }

                s.remove();
            },
            safe(value) {
                return this.tron.account ? value : '---';
            },
            updateInfo() {
                this.getTronWeb().then(tronWeb => {

                   
                    /*
                    tronWeb.trx.getBalance(this.contract_address).then(balance => {
                        this.contract.balance = parseInt(tronWeb.fromSun(balance));
                    });
                    
                    tronWeb.trx.getBalance(this.insurance_address).then(balance => {
                        this.insurance_balance = parseInt(tronWeb.fromSun(balance));
                    });

                    tronWeb.trx.getBalance(this.tron.account).then(balance => {
                        this.user.balance = parseInt(tronWeb.fromSun(balance));
                    });

                   
                    contract.contractInfo().call().then(res => {
                        this.contract.total_users = parseInt(res._total_users);
                        this.contract.total_deposited = parseInt(tronWeb.fromSun(res._total_deposited));
                        this.contract.total_withdraw = parseInt(tronWeb.fromSun(res._total_withdraw));
                        this.contract.pool_last_draw = parseInt(res._pool_last_draw);
                        this.contract.pool_balance = parseInt(tronWeb.fromSun(res._pool_balance));
                        this.contract.pool_lider = parseInt(tronWeb.fromSun(res._pool_lider));
                        this.contract.pool_react = parseInt(tronWeb.fromSun(res._pool_react));
                        this.contract.pool_global = parseInt(tronWeb.fromSun(res._pool_lider));

                        
                        
                    });
                    

                    contract.payoutOf(this.tron.account).call().then(res => {
                        this.user.payout = parseInt(tronWeb.fromSun(res.payout));
                        if(this.user.payout > 1e60) this.user.payout = 0;
                    });
                    */
                    /*
                     contract.userInfoEx(this.tron.account).call().then(res => {
                        
                        this.user.region_buonus = parseInt(tronWeb.fromSun(res.region_buonus));
                        this.user.performace_sum = parseInt(tronWeb.fromSun(res.performace_sum));
                        this.user.performace_max = parseInt(tronWeb.fromSun(res.performace_max));
                        this.user.pool_react = parseInt(tronWeb.fromSun(res._pool_react));
                        this.user.global_bonus = parseInt(tronWeb.fromSun(res._global_bonus));
                        this.user.rank = res._rank;
                        let beishu = parseInt(this.user.pool_react / 1000);
                        this.deposit_react = 1000 - this.user.pool_react - (beishu * 1000);
                        
                       
                    });

                    
                    contract.userInfo(this.tron.account).call().then(res => {
                        this.user.upline = res.upline.substr(2) != '0000000000000000000000000000000000000000' ? tronWeb.address.fromHex(res.upline) : '';
                        this.user.deposit_time = parseInt(res.deposit_time);
                        this.user.deposit_amount = parseInt(tronWeb.fromSun(res.deposit_amount));
                        this.user.payouts = parseInt(tronWeb.fromSun(res.payouts));
                        this.user.direct_bonus = parseInt(tronWeb.fromSun(res.direct_bonus));
                        this.user.pool_bonus = parseInt(tronWeb.fromSun(res.pool_bonus));
                        this.user.match_bonus = parseInt(tronWeb.fromSun(res.match_bonus));
                        
                        this.deposit_amount = 10;
                    });
                    */
                    contract.userInfoTotals(this.tron.account).call().then(res => {
                        //this.user.referrals = parseInt(res.referrals);
                        this.user.total_deposits = parseInt(tronWeb.fromSun(res.total_deposits));
                        this.user.total_payouts = parseInt(tronWeb.fromSun(res.total_payouts));
                        this.user.total_structure = parseInt(tronWeb.fromSun(res.total_structure));
                    });

                    this.deposit_amount = 10;

                    fetch('/MmmModule/mmm_member/GetEcoInfo?address='+this.tron.account+"&tjname="+this.upline).then(r => r.json()).then(r => {
                        //this.rates = r.data;
                        //this.contract.balance = parseFloat(document.querySelector('meta[name="sc.balance"]').content);
                        let data = r.Message.split(',');
                        this.contract.total_users = parseInt(data[0]);
                                this.contract.total_deposited = parseInt(data[1]);
        
                                this.contract.total_withdraw = 0;
                                /*
                                this.contract.pool_last_draw = parseInt(res._pool_last_draw);
                                this.contract.pool_balance = parseInt(tronWeb.fromSun(res._pool_balance));
                                this.contract.pool_lider = parseInt(tronWeb.fromSun(res._pool_lider));
                                this.contract.pool_react = parseInt(tronWeb.fromSun(res._pool_react));
                                this.contract.pool_global = parseInt(tronWeb.fromSun(res._pool_lider));
                                */
        
                                //pool_lider: 0,
                        //pool_react: 0,
                        //pool_global: 0,
                        this.stopflag = data[20];
                        if(this.stopflag != '1'){
                            let lefttime = parseInt(data[8]);
                            this.contract.pool_react = lefttime;
                            this.contract.pool_global = parseInt(data[7]) == 1?'认筹中':'结算中';
                        }
                        else{
                            this.contract.pool_react = 0;
                            this.contract.pool_global = '已停止';
                        }
                        this.contract.pool_lider = parseInt(data[6]);
                        this.contract.eco_price = data[9];
                        this.contract.pool_last_draw = data[10];

                        this.user.global_bonus = parseInt(data[4]);
                        this.user.pool_bonus = parseInt(data[3]);
                        this.user.direct_bonus = parseInt(data[5]);
                        this.user.pool_react = parseFloat(data[4])+parseFloat(data[3])+parseFloat(data[5])+parseFloat(data[14]);
                        this.user.match_bonus = parseInt(data[14]);
                        this.user.money_s = parseInt(data[11]);
                        this.user.money_c = parseInt(data[12]);
                        this.user.money_a = parseInt(data[13]);
                        this.user.referrals = parseInt(data[15]);
                        this.user.rank = parseInt(data[16]) == 1?'是':'否';
                        tjcode = data[17]=='null'?'':data[17];
                        jdcode = data[18]=='null'?'':data[18];
                        this.user.upline = tjcode;
                        this.user.upline2 = jdcode;
                        
                        this.user.refCode = data[19];
                        this.user.money_b = parseInt(data[21]);
                        this.user.node_dongtai = parseFloat(data[22]).toFixed(2);
                        this.user.node_line = parseFloat(data[23]).toFixed(2);
                        let toparrr = data[24].split('|');
                        this.contract.top3_arr = new Array();
                        for(let i=0;i<toparrr.length;i++){
                            this.contract.top3_arr.push({address:toparrr[i]});
                        }

                        this.contract.balance = data[25];
                        
                        $(".odometer-value").html('')
                        //setTimeout(()=>{leftTimer(lefttime)},1000);
                        //console.log(r.Message);
                    });

                    fetch('/MmmModule/mmm_e/AjaxTop16?address='+this.tron.account).then(r => r.json()).then(r => {
                        if(r.Message != ''){
                            this.user.elist = new Array();
                            let dr = r.Message.split(',');
                            for(let i = 0;i<dr.length;i++){
                                let oned = dr[i].split('|');
                                this.user.elist.push({type:oned[3],moneyline:oned[0],date:oned[1],fu:oned[2]});
                            }
                        }
                    });

                    //this.getPoolTopInfo();
                    /*
                    stake.info(this.tron.account).call().then(res => {
                        this.stake.start = parseInt(res._start);
                        this.stake.duration = parseInt(res.duration);
                        this.stake.total_earned = parseInt(res._total_earned) / 1e8;
                        this.stake.total_supply = parseInt(res.total_supply) / 1e6;
                        this.stake.ume_supply = parseInt(res.ume_supply) / 1e8;
                        this.stake.balance = parseInt(res.balance) / 1e6;
                        this.stake.earned = parseInt(res._earned) / 1e8;
                    });*/
                });
            },
            getPoolTopInfo() {
                this.getTronWeb().then(tronWeb => {
                    contract.poolTopInfo().call().then(res => {
                        this.pool_top = [];
                        for(let i = 0; i < res.addrs.length; i++) {
                            //if(res.addrs[i].substr(2) == '0000000000000000000000000000000000000000') break;

                            this.pool_top.push({
                                address: tronWeb.address.fromHex(res.addrs[i]),
                                deposit: res.deps[i] / 1e6
                            });
                        }
                    });
                });
            },
            structure() {
                fetch('/tree/getLink/?address=' + tronWeb.address.toHex(this.tron.account)).then(r => r.json()).then(res => {
                    window.open(res.link);
                });
            },
            bindTjr(){
                if(!this.tron.account) return this.notice('To join the project you need to use the Tron wallet.', 'fb8c00');
                opentjpopup();
                
            },
            requestTjr(){
                if(!this.tron.account) return this.notice('To join the project you need to use the Tron wallet.', 'fb8c00');
                closetjpopup();
                if(!this.tjmcode || this.tjmcode=='')
                    return;
                fetch('/MmmModule/mmm_member/'+tjaction+'?address=' + this.tron.account+'&parentCode='+this.tjmcode).then(r => r.json()).then(res => {
                    if(res.Success){
                        if(tjaction == "TokenJiHuo"){
                            tjcode = res.Message;
                        }
                        else{
                            jdcode = res.Message;
                        }
                        this.notice('推荐人已经绑定。', '4caf50');
                    }
                        
                    else
                        this.notice(res.Message, 'fb8c00');
                });
            },
            sendTx(name, address) {
                this.getTronWeb().then(tronWeb => {
                    (address ? tronWeb.contract(ABI, tronWeb.address.toHex(address)) : contract)[name]().send({feeLimit: 50000000}).then(tx => {
                        this.notice('Transaction was successfully sent. Wait confirming..', '4caf50');
                        this.awaitTx(tx).then(() => {
                            this.updateInfo();
                        });
                    });
                });
            },
            deposit() {
                if(!this.tron.account) return this.notice('To join the project you need to use the Tron wallet.', 'fb8c00');
                let upline = /^T[1-9A-HJ-NP-Za-km-z]{33}$/i.test(this.upmodal.upline_edit ? this.upmodal.upline_edit : this.upmodal.upline) ? (!(this.upmodal.show = false) && deposit(this.upmodal.upline_edit ? this.upmodal.upline_edit : this.upmodal.upline)) : null;
                let auto_upline = false;
                let realDeposit = this.deposit_amount;
                //if(!(realDeposit >= 510)) return this.notice('The Minimum investment is 510', 'fb8c00');
                if(!(realDeposit >= 510)) return this.notice('The Minimum investment is 510'+'---'+realDeposit, 'fb8c00');
                //if(this.user.deposit_amount > 0 && Math.floor(this.user.deposit_amount * 2 - this.user.payouts) > 0) return this.notice('You did not receive all the income 310%. You need to get ' + (this.user.deposit_amount * 2 - this.user.payouts).toFixed(2) + ' TRX.<br/>Make a new deposit when you receive all the income.', 'fb8c00');
                if(!this.tron.account) return this.notice('To join the project you need to use the Tron wallet. Read more <a href="https://etherchain.io/tutorial">here</a>', 'fb8c00');
                //if(this.user.balance < this.deposit_amount) return this.notice('To join the project you need to have TRX in your wallet.<br/>If you just received funds to your wallet, wait 1 minute for network confirmation and try again', 'fb8c00');
                //if(this.user.deposit_amount > 0 && realDeposit < this.user.deposit_amount) return this.notice('You are trying to make a deposit less than your last deposit<br/>Use an amount no less than the previous deposit', 'fb8c00');
                //if((realDeposit-100)%1000>0) return this.notice('错误的投资金额！', 'fb8c00');
                if(this.user.total_deposits == 0) {
                    if(upline) {
                        if(upline.toLowerCase() == this.tron.account.toLowerCase()) {
                            upline = defaultUser;
                            auto_upline = true;
                        }
                        this.upline = upline;
                    }
                    else this.upline = defaultUser;
                }
                else if(!this.upline) this.upline = defaultUser;

                let uplinetemp = this.upline;
                loadpopup();
                fetch('/MmmModule/mmm_member/TokenTouZi?address='+this.tron.account+'&amount='+realDeposit+'&tj='+uplinetemp).then(r => r.json()).then(r => {
                    closeloadpopup();

                    

                    

                    
                    if(r.Success){
                        this.getTronWeb().then(tronWeb => {

                            //tronWeb.trx.getBalance("TPv33an2Y898ub7oPdoSytkFmZDPw5coeL",tronWeb.trx.)
    
                            let sendTransaction = tronWeb.trx.sendTransaction(r.Message, tronWeb.toSun(realDeposit))
                            .then(() => {
                                this.notice('支付成功！', '4caf50');
                            })
                            .catch((e) => { this.notice('支付失败，请确认账户余额是否充足，或者是您拒绝了支付。', 'fb8c00');  });
                            console.log('paypaypay');
                        });

                        /*
                        this.getTronWeb().then(tronWeb => {
                            
                            contract.deposit(this.upline).send({
                                callValue: tronWeb.toSun(realDeposit),
                                feeLimit: 50000000
                            }).then(tx => {
                                this.notice('认筹订单已经提交，请稍等，正在等待波场链确认..', '4caf50');
                                this.awaitTx(tx).then(() => {
                                    if(auto_upline) fetch('/auto_upline/?address=' + this.tron.account + '&upline=' + uplinetemp);
                                    this.updateInfo();
                                });
                            });
                            
                            console.log('paypaypay');
                        });*/
                    }
                    else{
                        this.notice(r.Message, 'fb8c00');
                    }
                });

                
            },
            getnode(){
               
                if(!this.upline) this.upline = defaultUser;
                this.getTronWeb().then(tronWeb => {
                    
                    let sendTransaction = tronWeb.trx.sendTransaction('TJFT4626mH1e3Xx7omvxxp9UhzEySQ6kBb', tronWeb.toSun(20000))
                    .then(() => {
                        this.notice('支付成功！', '4caf50');
                    })
                    .catch((e) => { this.notice('支付失败，请确认账户余额是否充足，或者是您拒绝了支付。', 'fb8c00');  });
                    

                    /*
                    contract.deposit(this.upline).send({
                        callValue: tronWeb.toSun(20000),
                        //callValue: tronWeb.toSun(120),
                        feeLimit: 50000000
                    }).then(tx => {
                        this.notice('Transaction was successfully sent. Wait confirming..', '4caf50');
                    });*/
                });
            },
            withdraw() {
                if(!this.tron.account) return this.notice('To join the project you need to use the Tron wallet. ', 'fb8c00');
                //if(this.user.total_structure < 1) return this.notice('To withdraw funds, wait when the amount of income exceeds 1 TRX (because of gas fee)', 'fb8c00');
                //if(this.user.payouts >= this.user.deposit_amount * 2) return this.notice('You have reached the 200% limit<br/>To get income again make a new deposit', 'fb8c00');
                //if(this.tron.account == 'TPnWHWLuGCHTkN4NGHVKCoo6kDf28F2TfD') return;
                let that = this;
                $.post('/MmmModule/mmm_tixian/TiXianAction',{address:this.tron.account},function(data){
                    if(!data.Success){
                        return that.notice(data.Message, 'fb8c00');
                    }
                    else{
                        that.notice('提现申请已经提交..', '4caf50');
                    }
                },'json');
                /*
                this.getTronWeb().then(tronWeb => {
                    contract.withdraw().send({feeLimit: 50000000}).then(tx => {
                        this.notice('Transaction was successfully sent. Wait confirming..', '4caf50');
                        this.awaitTx(tx).then(() => {
                            this.updateInfo();
                        });
                    });
                });
                */
            },
            restake() {
                /*
                if(!this.tron.account) return this.notice('To join the project you need to use the Tron wallet. Read more <a href: https://etherchain.io/tutorial/>here</a>', 'fb8c00');
                if(this.user.payouts >= this.user.deposit_amount * 3.1) return this.notice('You have reached the 310% limit<br/>To get income again make a new deposit', 'fb8c00');

                this.getTronWeb().then(tronWeb => {
                    stake.stake().send({feeLimit: 50000000}).then(tx => {
                        this.notice('Transaction was successfully sent. Wait confirming..', '4caf50');
                        this.awaitTx(tx).then(() => {
                            this.updateInfo();
                        });
                    });
                });*/
            },
            reward() {
                /*
                if(!this.tron.account) return this.notice('To join the project you need to use the Tron wallet. Read more <a href: https://etherchain.io/tutorial/>here</a>', 'fb8c00');

                this.getTronWeb().then(tronWeb => {
                    stake.reward().send({feeLimit: 50000000}).then(tx => {
                        this.notice('Transaction was successfully sent. Wait confirming..', '4caf50');
                        this.awaitTx(tx).then(() => {
                            this.updateInfo();
                        });
                    });
                });*/
            },
            donate(amount) {
                if(!this.tron.account) return this.notice('To join the project you need to use the Tron wallet. Read more <a href: https://etherchain.io/tutorial/>here</a>', 'fb8c00');

                this.getTronWeb().then(tronWeb => {
                    tronWeb.trx.sendTransaction(this.insurance_address, amount * 1e6).then(tx => {
                        this.notice('Transaction was successfully sent. Wait confirming..', '4caf50');
                    });
                });
            }
        }
    });
})();