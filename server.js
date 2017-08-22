/**
 * Created by yanyj on 2017/7/11.
 */
/**
 * Created by yanyj on 2017/7/11.
 */
var {getPageByUrl} =  require('./src/request/request.own');
var util = require('./src/util/util');
var Match = require('./src/entity/Match');
var moment = require('moment');
var soccerSpider = require('./src/spiders/soccer/soccer.spider');
let url = `http://freelive.7m.cn/live.aspx?mark=gb&TimeZone=%2B0800&wordAd=188bifen&wadurl=188bifen&width=700&cpageBgColor=FFFFFF&tableFontSize=12&cborderColor=DDDDDD&ctdColor1=FFFFFF&ctdColor2=E0E9F6&clinkColor=0044DD&cdateFontColor=333333&cdateBgColor=FFFFFF&scoreFontSize=12&cteamFontColor=000000&cgoalFontColor=FF0000&cgoalBgColor=FFFFE1&cremarkFontColor=0000FF&cremarkBgColor=F7F8F3&Skins=10&teamWeight=400&scoreWeight=700&goalWeight=400&fontWeight=700&DSTbox=&voi=4&away=1&red=1&all=0&ordType=&match=&view=simplify`;

let url1 = `http://freelive.7m.cn/setFull1.aspx?encode=gb&view=simplify&match=&ordType=&speakall=0`;
let url21 = `http://freelive.7m.cn/live.aspx?mark=gb&TimeZone=%2B0800&wordAd=&cpageBgCol…ght=400&scoreWeight=700&goalWeight=400&fontWeight=700&DSTbox=&away=0&red=0`;
//

util.cronJob('每天爬取', 0, {hour: 14, minute: 15}, function () {
    soccerSpider.getTodayMaches();
});
