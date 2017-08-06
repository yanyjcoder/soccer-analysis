//公共实体类
var util = require('../util/util');
module.exports = function () {

    return {
        schema: null,
        name: '',
        /**
         * 保存
         * @param {{}} object
         * @param {boolean} endFag
         */
        save: function (object, endFag) {
            try{
                var _model =  util.getDBConnection().model(this.name,this.schema);
                new _model(object).save(function (error, doc) {
                    if(error) {
                        console.log(object.matchNo + ': 保存失败!');
                        console.log(error);
                        return ;
                    }

                    console.log(object.matchNo + ': 保存成功!');
                });

                if(endFag) {
                    console.log('***************************************保存结束*****************************');
                }
            }catch(e) {
                throw new Error('保存失败！')
            }

        }
    }
};