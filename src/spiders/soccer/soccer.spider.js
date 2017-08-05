/**
 * Created by yanyj on 2017/7/11.
 */
var util = require('../../util/util');

var gameHistoryJson, gameTeamHistoryJson;

//获取历史交锋数据
function getGameHistroyJson(data) {

    gameHistoryJson = util.getObjectBySplit(data, "{");
}

//获取主客队成绩数据
function getGameTeamHistroyJson(data) {

    gameTeamHistoryJson = util.getObjectBySplit(data, "{");
}



