var constant = require('../common/constant');
var mongoose = require('mongoose');
var config = require('../common/config');
var schedule = require("node-schedule");
var moment = require("moment");

module.exports = {
    /**
     *
     * @param {string} text
     * @param {string} replaceStr
     * @return {void|XML|string|*}
     */

    DB: null,
    replaceByPlaceholder: function (text, replaceStr) {
        return replaceStr.replace(constant.replaceText, text);
    },
    /**
     * 定时器
     * @param {Number}type
     * @param {{}}option
     * @param {Function}jobFunction
     */
    cronJob: function (name, type,option, jobFunction) {
        switch(type) {
            case constant.CronType.EVERY_DAY_ONCE:
                var rule = new schedule.RecurrenceRule();

                rule.dayOfWeek = [0, new schedule.Range(1, 6)];

                rule.hour = option.hour ? option.hour : 0;

                rule.minute = option.minute ? option.minute : 0;

                return {
                    name : name,
                    scheduleJob: schedule.scheduleJob(rule, function(){
                        jobFunction.call();
                        console.log('[' + moment().format('YYYY-MM-DD HH:mm:ss') + "] 执行任务：" + name);

                    })
                };
            case constant.CronType.DO_ONCE:
                var date = option.date ? option.date : new Date();

                return{
                    name : name,
                    scheduleJob:schedule.scheduleJob(date, function(){

                        jobFunction.call();
                        console.log('[' + moment().format('YYYY-MM-DD HH:mm:ss') + "] 执行任务：" + name);
                    })
                };
            default:
                console.log('参数错误！');
        }
    },
    /**
     *  取消定时任务
     * @param {{}}scheduleJob
     */
    cancelCronJob: function (scheduleJobObject) {

        try{
            scheduleJobObject.scheduleJob.cancel();
            throw new Error('[' + scheduleJobObject.name + ']任务取消成功！')
        } catch(e) {
            throw new Error('定时任务取消失败！' + e)
        }


    },
    /**
     *
     * @param {string} string
     * @param splitFlag
     */
    getObjectBySplit: function (string, splitFlag) {

        return  JSON.parse(string.substring(string.indexOf(splitFlag)).trim());
    },
    getDBConnection: function () {
        if(!this.DB) {
         this.DB =  mongoose.createConnection(config.database.DB_ADDRESS_IP, config.database.DB_REAL_DATABASE_NAME);
        }
        return this.DB;
    },

    getWatherName: function (index) {
        return constant.weather[index];
    },
    extend: function () {
        var options, name, src, copy, copyIsArray, clone, target = arguments[0] || {},
            i = 1,
            length = arguments.length,
            deep = false,
            toString = Object.prototype.toString,
            hasOwn = Object.prototype.hasOwnProperty,
            push = Array.prototype.push,
            slice = Array.prototype.slice,
            trim = String.prototype.trim,
            indexOf = Array.prototype.indexOf,
            class2type = {
                "[object Boolean]": "boolean",
                "[object Number]": "number",
                "[object String]": "string",
                "[object Function]": "function",
                "[object Array]": "array",
                "[object Date]": "date",
                "[object RegExp]": "regexp",
                "[object Object]": "object"
            },
            jQuery = {
                isFunction: function (obj) {
                    return jQuery.type(obj) === "function"
                },
                isArray: Array.isArray ||
                function (obj) {
                    return jQuery.type(obj) === "array"
                },
                isWindow: function (obj) {
                    return obj != null && obj == obj.window
                },
                isNumeric: function (obj) {
                    return !isNaN(parseFloat(obj)) && isFinite(obj)
                },
                type: function (obj) {
                    return obj == null ? String(obj) : class2type[toString.call(obj)] || "object"
                },
                isPlainObject: function (obj) {
                    if (!obj || jQuery.type(obj) !== "object" || obj.nodeType) {
                        return false
                    }
                    try {
                        if (obj.constructor && !hasOwn.call(obj, "constructor") && !hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
                            return false
                        }
                    } catch (e) {
                        return false
                    }
                    var key;
                    for (key in obj) {}
                    return key === undefined || hasOwn.call(obj, key)
                }
            };
        if (typeof target === "boolean") {
            deep = target;
            target = arguments[1] || {};
            i = 2;
        }
        if (typeof target !== "object" && !jQuery.isFunction(target)) {
            target = {}
        }
        if (length === i) {
            target = this;
            --i;
        }
        for (i; i < length; i++) {
            if ((options = arguments[i]) != null) {
                for (name in options) {
                    src = target[name];
                    copy = options[name];
                    if (target === copy) {
                        continue
                    }
                    if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)))) {
                        if (copyIsArray) {
                            copyIsArray = false;
                            clone = src && jQuery.isArray(src) ? src : []
                        } else {
                            clone = src && jQuery.isPlainObject(src) ? src : {};
                        }
                        // WARNING: RECURSION
                        target[name] = extend(deep, clone, copy);
                    } else if (copy !== undefined) {
                        target[name] = copy;
                    }
                }
            }
        }
        return target;
    }
};