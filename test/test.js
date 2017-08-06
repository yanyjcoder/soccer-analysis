/**
 * Created by yanyj on 2017/7/11.
 */
var {getPageByUrl} =  require('../src/request/request.own');
var util = require('../src/util/util');
var Match = require('../src/entity/Match');
var moment = require('moment');
var constant = require('../src/common/constant');

let url = `http://freelive.7m.cn/live.aspx?mark=gb&TimeZone=%2B0800&wordAd=188bifen&wadurl=188bifen&width=700&cpageBgColor=FFFFFF&tableFontSize=12&cborderColor=DDDDDD&ctdColor1=FFFFFF&ctdColor2=E0E9F6&clinkColor=0044DD&cdateFontColor=333333&cdateBgColor=FFFFFF&scoreFontSize=12&cteamFontColor=000000&cgoalFontColor=FF0000&cgoalBgColor=FFFFE1&cremarkFontColor=0000FF&cremarkBgColor=F7F8F3&Skins=10&teamWeight=400&scoreWeight=700&goalWeight=400&fontWeight=700&DSTbox=&voi=4&away=1&red=1&all=0&ordType=&match=&view=simplify`;

let url1 = `http://freelive.7m.cn/setFull1.aspx?encode=gb&view=simplify&match=&ordType=&speakall=0`;
let url21 = `http://freelive.7m.cn/live.aspx?mark=gb&TimeZone=%2B0800&wordAd=&cpageBgCol…ght=400&scoreWeight=700&goalWeight=400&fontWeight=700&DSTbox=&away=0&red=0`;

// getPageByUrl('http://ctc.live.7m.cn/datafile/fgb.js', function (data) {
//     // var gameTeamHistoryJson = util.getObjectBySplit(data, "{")
//     var sDt=[],sDt2=[];
//     eval(data);
//     var match ,sdt, dateArray;
//     //获得比赛日期和时间
//     getPageByUrl('http://ctc.live.7m.cn/datafile/sXl.js', function (_data) {
//         eval(_data);
//
//         for(var i = 0; i < ORD.length; i ++) {
//
//
//             if(sDt[ORD[i]]) {
//                 sdt = sDt[ORD[i]];
//                 dateArray = sDt2[ORD[i]][8].split(',');
//                 match = {
//
//                     matchNo: ORD[i], //赛事编号
//                     matchDate: dateArray.slice(0,3).join('-'), //日期精确到日 no
//                     matchTime: moment(dateArray.slice(0,3).join('-') + ' ' + dateArray.slice(3).join(':')), //日期精确的分no
//                     matchName: sdt[0], //赛事名
//                     homeTeamName: sdt[2], //主队名
//                     guestTeamName: sdt[3], //客队名
//                     weather: util.getWatherName(sdt[5]), //天气
//                     temperature: sdt[6], //温度
//                     homeTeamRank: sdt[7], //主队排名
//                     guestTeamRank: sdt[8], //客队排名
//                     guestTeamNo: sdt[9], //客队编号
//                     homeTeamNo: sdt[10], //主队编号
//                     tvStation: sdt[4], //可看比赛的电视台
//                     letBalls: sdt[20], //可看比赛的电视台
//
//                 };
//
//                 Match.save(match);
//             }
//
//         };
//     });
//     console.log('***************************************赛事保存开始*****************************');
//
// });

