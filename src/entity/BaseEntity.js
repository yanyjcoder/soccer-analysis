//公共实体类
var util = require('../util/util');
module.exports = function () {

    return {
        schema: null,
        name: '',
        saveMany: function (docs, callback) {
            try{
                var _model =  util.getDBConnection().model(this.name,this.schema);
                _model.insertMany(docs,{ordered: false}).then(function(r) {
                    callback();
                }, function (e) {
                    callback();
                });
            }catch (e) {

            }
        },
        _save: function (object, endFag, endlog) {
            try{
                var _model =  util.getDBConnection().model(this.name,this.schema);
                new _model(object).save(function (error, doc) {
                    if(error) {
                        console.log(object.matchNo + ': 保存失败!');
                        console.log(error);
                        return ;
                    }

                    console.log(object.matchNo + ': 保存成功!' );
                });

                if(endFag) {
                    console.log('***************************************保存结束*****************************');
                    endlog && console.log(endlog);
                }
            }catch(e) {
                throw new Error('保存失败！')
            }

        },
        /**
         * 保存
         * @param {{}} object
         * @param {boolean} endFag
         */
        save: function (object, endFag) {
           this._save(object, endFag);
        },
        /**
         * 更新
         * @param whereStr
         * @param updateStr
         * @param callBack
         */
        update: function (whereStr, updateStr, callBack) {
            try{
                var _model =  util.getDBConnection().model(this.name,this.schema);
                _model.find(whereStr,updateStr,function (error, doc) {
                    if(error) {
                        console.log( '更新失败!');
                        console.log(error);
                        return ;
                    }
                    callBack&&callBack.call(this);
                    console.log('更新成功!');
                });
            }catch(e) {
                throw new Error('更新失败！')
            }
        },
        /**
         * 查找
         * @param where
         * @param columns
         * @param callback
         */
        find: function (where, columns, callback) {
            try{
                var _model =  util.getDBConnection().model(this.name,this.schema);
                 _model.find(where,columns, function (error, doc) {
                    if(error) {
                        console.log(error);
                        return ;
                    }
                    callback && callback(doc);
                });

            }catch(e) {
                throw new Error('查询失败！')
            }
        }
    }
};