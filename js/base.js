/*
    基础库，放一些工具，公用的方法
*/

const tool = {
    // 继承方法
    inherit: function(target, origin) {
        let temp = function () {};
        temp.prototype = origin.prototype;
        target.prototype = new temp();
        target.prototype.constructor = target;
    },
    // 扩展方法
    extends: function (origin) {
        let target = function () {
            // this = {}
            origin.apply(this, arguments);
            // return this;
        }
        this.inherit(target, origin);
        return target;
    },
    // 单例模式
    single: function (origin) {
        let singleResult = (function () {
            let instance;
            return function () {
                if(typeof instance == 'object') {
                    return instance;
                }
                origin && origin.apply(this, arguments);
                instance = this;
            }
        }())
        origin && this.inherit(singleResult, origin);
        return singleResult;
    },
}