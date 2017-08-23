var util = require('../util/util');
var mongoose = require('mongoose');
mongoose.Promise = Promise;
var BaseEntity = require('./BaseEntity');
/**
 * Created by yanyj on 2017/7/31.
 */
module.exports = (function () {

    const matchSchema = new mongoose.Schema({
        matchNo: { type: [String], index: true,unique:true }, //赛事编号
        matchDate: { type: [String], index: true }, //日期精确到日
        matchTime: { type: [String], index: true }, //日期精确到分 unique:true
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
        letBalls: String, //让球
        extra: String, //额外信息(开球，角球)
        homeHalfSoccer: Number, //主队半场球
        guestHalfSoccer: Number, //客队半场球
        guestSoccer: Number, //客队终场球
        homeSoccer: Number, //主队终场球
        homeRedNumber: Number, //主队红卡
        guestRedNumber: Number, //客队红卡
        matchStatus: String, //比赛状态 （0：）
    });
    
    let _match = util.extend(new BaseEntity(), {
        schema: matchSchema,
        name: 'matches'
    } );
    _match.save = function (entity, endFlag, endLog) {
        _match.find({matchNo:entity.matchNo}, null, function (doc) {
            if(!doc || doc.length === 0) {
                _match._save(entity, endFlag, endLog);
            } else {
                console.log('[' + entity.matchNo + '] 已存在！')
            }
        })
    };
    
    return _match;
})();