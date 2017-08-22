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


function getTodayMaches() {
    getPageByUrl('http://ctc.live.7m.cn/datafile/fgb.js', function (data) {
        // var gameTeamHistoryJson = util.getObjectBySplit(data, "{")
        var sDt=[],sDt2=[], WLID=[];
        eval(data);
        var match ,sdt, dateArray;
        //获得比赛日期和时间
        getPageByUrl('http://ctc.live.7m.cn/datafile/sXl.js', function (_data) {
            eval(_data);

            for(var i = 0; i < ORD.length; i ++) {


                if(sDt[ORD[i]]) {
                    sdt = sDt[ORD[i]];
                    dateArray = sDt2[ORD[i]][8].split(',');
                    match = {

                        matchNo: ORD[i], //赛事编号
                        matchDate: dateArray.slice(0,3).join('-'), //日期精确到日 no
                        matchTime: moment(dateArray.slice(0,3).join('-') + ' ' + dateArray.slice(3).join(':')), //日期精确的分no
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

                    };

                    Match.save(match);
                }

            };
        });
        console.log('***************************************赛事保存开始*****************************');

    });
}


module.exports = {
    getTodayMaches : getTodayMaches
};