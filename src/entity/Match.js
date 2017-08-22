var util = require('../util/util');
var mongoose = require('mongoose');
mongoose.Promise = Promise;
var BaseEntity = require('./BaseEntity');
/**
 * Created by yanyj on 2017/7/31.
 */
module.exports = (function () {

    const matchSchema = new mongoose.Schema({
        matchNo: String, //赛事编号
        matchDate: String, //日期精确到日
        matchTime: String, //日期精确的分
        matchName: String, //赛事名
        homeTeamName: String, //主队名
        guestTeamName: String, //客队名
        weather: String, //天气
        temperature: String, //温度
        homeTeamRank: String, //主队排名
        guestTeamRank: String, //客队排名
        guestTeamNo: String, //客队编号
        homeTeamNo: String, //主队编号
        tvStation: String, //可看比赛的电视台
        letBalls: String //让球
    });

    return util.extend(new BaseEntity(), {
        schema: matchSchema,
        name: 'matches'
        } )
})();