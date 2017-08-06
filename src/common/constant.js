/**
 * Created by yanyj on 2017/7/11.
 */
module.exports = {
    scoreBoardUrl: 'http://ctc.live.7m.cn/datafile/fgb.js', //今天所有比赛爬取
    gameTeamHistoryUrl: 'http://analyse.7m.cn/$$/data/gamehistory_gb.js', //主客队历史交锋战绩
    teamHistoryUrl: 'http://analyse.7m.cn/$$/data/gameteamhistory_gb.js', //住客队最近10场战绩
    replaceText: '$$',
    weather: ["", "晴天", "少云", "多云", "阴天", "小雨", "中到大雨", "雷阵雨", "雷暴", "小雪", "大雨", "晴天", "晴间多云", "少云", "多云", "雨加雪", "", "", "晴间多云", "小雷雨", "小阵雨", "汽雾", "冻雾", "零星小雨", "中雨", "小阵雪", "细雨", "阵雪", "风尘", "低空飘雪", "大阵雪", "中雪"],
    CronType: {
        /**
         * @description 每天一次
         */
        EVERY_DAY_ONCE:0, //每天一次
        DO_ONCE: 1, //执行一次
    }
};