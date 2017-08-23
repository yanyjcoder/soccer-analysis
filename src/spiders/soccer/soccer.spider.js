/**
 * Created by yanyj on 2017/7/11.
*/
var {getPageByUrl} =  require('../../../src/request/request.own');
var util = require('../../../src/util/util');
var Match = require('../../../src/entity/Match');
var moment = require('moment');
var constant = require('../../../src/common/constant');
var gameHistoryJson, gameTeamHistoryJson;

//获取历史交锋数据
function getGameHistroyJson(data) {

    gameHistoryJson = util.getObjectBySplit(data, "{");
}

//获取主客队成绩数据
function getGameTeamHistroyJson(data) {

    gameTeamHistoryJson = util.getObjectBySplit(data, "{");
}


function getTodayMatches() {
    getPageByUrl('http://ctc.live.7m.cn/datafile/fgb.js', function (data) {
        // var gameTeamHistoryJson = util.getObjectBySplit(data, "{")
        var sDt=[],sDt2=[], WLID=[];
        eval(data);
        var match ,sdt, dateArray, bc;
        //获得比赛日期和时间
        getPageByUrl('http://ctc.live.7m.cn/datafile/sXl.js', function (_data) {
            eval(_data);

            for(var i = 0; i < ORD.length; i ++) {


                if(sDt[ORD[i]]) {
                    sdt = sDt[ORD[i]];
                    dateArray = sDt2[ORD[i]][8].split(',');
                    bc = sDt2[ORD[i]][6].split('-');
                    match = {

                        matchNo: ORD[i], //赛事编号
                        matchDate: dateArray.slice(0,3).join('-'), //日期精确到日 no
                        matchTime: dateArray.slice(0,3).join('-') + ' ' + dateArray.slice(3).join(':'), //日期精确的分no
                        matchName: sdt[0], //赛事名
                        homeTeamName: sdt[2], //主队名
                        guestTeamName: sdt[3], //客队名
                        weather: util.getWatherName(sdt[5]), //天气
                        temperature: sdt[6], //温度
                        homeTeamRank: sdt[7], //主队排名
                        guestTeamRank: sdt[8], //客队排名
                        guestTeamNo: sdt[9], //客队编号
                        homeTeamNo: sdt[10], //主队编号
                        tvStation: sdt[4], //可看比赛的电视台
                        letBalls: sdt[20], //可看比赛的电视台
                        extra: sDt2[ORD[i]][7], //额外信息(开球，角球)
                        homeHalfSoccer: bc[0] ? parseInt(bc[0]) : 0, //主队半场球
                        guestHalfSoccer: bc[1] ? parseInt(bc[1]) : 0, //客队半场球
                        guestSoccer: sDt2[ORD[i]][2], //客队终场球
                        homeSoccer:  sDt2[ORD[i]][1], //主队终场球
                        homeRedNumber:  sDt2[ORD[i]][3], //主队红卡
                        guestRedNumber:  sDt2[ORD[i]][4], //客队红卡
                        matchStatus: constant.matchStatus[sDt2[ORD[i]][0]], //比赛状态 （0：）
                    };

                    Match.save(match);
                }

            };
        });
        console.log('***************************************赛事保存开始*****************************');

    });
}

//该方法只执行一次，用来爬取数据

function getHistoryMatches(count,days, arry) {
        if(count > days) {
            console.log('*****************************************所有赛事已保存！*******************************************************');
            util.getDBConnection().close();
            return;
        }
        var day = moment().subtract(count++, "days").format('YYYY-MM-DD');
        getPageByUrl('http://data.7m.cn/Result_Data/'+ day + '/index_gb.js', function (data) {

            var match, dateArray;
            eval(data);
            console.log( day + '：' + live_bh_Arr.length);
            for(var i = 0; i < live_bh_Arr.length; i ++) {
                dateArray = Start_time_Arr[i].split(',');
                match = {
                    matchNo: live_bh_Arr[i], //赛事编号
                    matchDate: dateArray.slice(0,3).join('-'), //日期精确到日 no
                    matchTime: dateArray.slice(0,3).join('-') + ' ' + dateArray.slice(3).join(':'), //日期精确的分no
                    matchName: Match_name_Arr[i], //赛事名
                    homeTeamName: Team_A_Arr[i], //主队名
                    guestTeamName: Team_B_Arr[i], //客队名
                    weather: '', //天气
                    temperature: '', //温度
                    homeTeamRank: Rank_a_Arr[i], //主队排名
                    guestTeamRank: Rank_b_Arr[i], //客队排名
                    guestTeamNo: Team_A_bh_Arr[i], //客队编号
                    homeTeamNo: Team_B_bh_Arr[i], //主队编号
                    tvStation: '', //可看比赛的电视台
                    letBalls: pk_Arr[i], //让球
                    extra: meno_Arr[i], //额外信息(开球，角球)
                    homeHalfSoccer: banc_Arr[i].split('-')[0] ? banc_Arr[i].split('-')[0] : 0 , //主队半场球
                    guestHalfSoccer: banc_Arr[i].split('-')[1] ? banc_Arr[i].split('-')[1] : 0, //客队半场球
                    guestSoccer: live_b_Arr[i], //客队终场球
                    homeSoccer: live_a_Arr[i], //主队终场球
                    homeRedNumber: A_r_Arr[i], //主队红卡
                    guestRedNumber: B_r_Arr[i], //客队红卡
                    matchStatus: '完', //比赛状态 （0：）
                };
                arry.push(match)
            }
            Match.saveMany(arry, function () {
                    console.log('已保存[' + day + ']：' + arry.length + "场赛事！");
                    arry.length = 0;
                    getHistoryMatches(count, days, arry);
            });

        });



}

module.exports = {
    getTodayMatches : getTodayMatches,
    getHistoryMatches: getHistoryMatches
};