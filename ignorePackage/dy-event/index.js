// 全局的 event 对象, 提供 on, off, emit 方法
const event = (function () {
    let eventObjs = {};

    return {
        /** 注册事件, 可以连续注册, 可以注册多个事件 */
        on: function (type, handler) {

            (eventObjs[type] || (eventObjs[type] = [])).push(handler);

        },

        /** 移除事件,
         * - 如果没有参数, 移除所有事件,
         * - 如果只带有 事件名 参数, 就移除这个事件名下的所有事件,
         * - 如果带有 两个 参数, 那么就是表示移除某一个事件的具体处理函数
         * */
        off: function (type, handler) {
            if (arguments.length === 0) { // 没有参数移除所有的事件
                eventObjs = {};
            } else if (arguments.length === 1) { // 只有事件的类型, 移除该事件的所有处理函数
                eventObjs[type] = [];
            } else if (arguments.length === 2) { // 移除 type 事件的 handler 处理函数
                // 使用循环移除所有的 该函数 对应的 type 事件
                let _events = eventObjs[type];
                if (!_events) return;
                // 倒着循环 数组的 序号不会受到影响
                for (let i = _events.length - 1; i >= 0; i--) {
                    if (_events[i] === handler) {
                        _events.splice(i, 1);
                    }
                }
            }
        },

        /**
         * 发射事件, 触发事件, 包装参数 传递给事件处理函数
        */
        emit: function (type) {
            // Array.form
            let args = Array.prototype.slice.call(arguments, 1); // 或 arguments 从 1 开始后的所有参数, 返回的是数组
            let _events = eventObjs[type];
            if (!_events) return;

            for (let i = 0; i < _events.length; i++) {
                // 如果要绑定上下文就需要使用 call 或 apply
                _events[i].apply(null, args);
            }
        },
    }
}());

module.exports = event;
