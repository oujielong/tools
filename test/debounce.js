/* func （功能）：防抖功能。
[wait=0] （数字）：要延迟的毫秒数。
[options={}] （对象）：选项对象。
[options.leading=false] （布尔值）：指定在超时的前沿调用。
[options.maxWait] （数字）：func允许在调用之前延迟最大时间。
[options.trailing=true] （布尔值）：指定在超时的后沿调用。 */

// 注意：如果leading和trailing选项为true，func仅当在wait超时期间多次执行去抖动功能时，才在超时的后沿调用。
// 如果waitis 0和leadingis false，则将func调用推迟到下一个刻度，类似于setTimeout超时为0
/*
    猜测的函数：  
        nativeMax  -- 取较大的值
        now        -- 获取当前时间的时间戳
        isObject   -- 是否是对象
 */
function nativeMax(a, b) {
    return a > b ? a : b
}
function isObject(obj) {
    return typeof obj == 'object'
}
function now() {
    return new Date().getTime()
}

function debounce(func, wait, options) {
    var lastArgs, //记录事件的参数，event
        lastThis, //记录当前的调用对象
        result, //调用返回结果
        timerId, // timerout 函数的实例 保存
        lastCallTime = 0, //最后一次触发的时间
        lastInvokeTime = 0, //最后的调用时间
        //#region
        // 三者为选项参数
        leading = false, //是否前触发一次
        maxWait = false, //最大等待时长
        trailing = true //是否后触发一次
    //#endregion

    if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT)
    }
    wait = Number(wait) || 0

    //#region
    // 是否有选项参数
    // leading :true/false
    // maxWait： false /number
    // trailing : true/false
    //#endregion
    if (isObject(options)) {
        leading = !!options.leading
        maxWait = 'maxWait' in options && nativeMax(Number(options.maxWait) || 0, wait) //
        trailing = 'trailing' in options ? !!options.trailing : trailing
    }

    //#region
    //上面是调用就直接执行的
    //更新lastInvokeTime ：最后的调用时间 为当前调用时间
    //重置 this 的保存变量 lastThis
    //重置 回调函数的 参数 lastArgs
    //最后会被调用的 执行 传进来的回调函数
    //#endregion
    function invokeFunc(time) {
        var args = lastArgs,
            thisArg = lastThis
        lastArgs = lastThis = undefined
        lastInvokeTime = time
        result = func.apply(thisArg, args)
        return result
    }

    //如果有参数leading： 直接触发一次
    function leadingEdge(time) {
        //本次将会调用
        lastInvokeTime = time
        // 起动定时器为选项 trailing 尾执行
        timerId = setTimeout(timerExpired, wait)
        // 存在选项 leading 为true, 头执行
        return leading ? invokeFunc(time) : result
    }

    // 还需要等待多长时间可以 再次触发下次定时器
    function remainingWait(time) {
        var timeSinceLastCall = time - lastCallTime,
            timeSinceLastInvoke = time - lastInvokeTime,
            result = wait - timeSinceLastCall
        return maxWait === false ? result : nativeMin(result, maxWait - timeSinceLastInvoke)
    }

    //   判断是否应该执行回调函数， true /false
    function shouldInvoke(time) {
        var timeSinceLastCall = time - lastCallTime,
            timeSinceLastInvoke = time - lastInvokeTime
        //#region
        // lastCallTime 为0 ， 即这是第一次调用，需要执行一次
        // timeSinceLastCall >= wait  自从上一次调用以来时间差， 超过等待时间
        // timeSinceLastCall  自从上一次调用以来时间差，为负值-- 防止因为系统时间被更改掉导致的错误
        // maxWait 最大等待标识 不为初始值false（有传递选项）, 并且上一次调用以来的时间差 超过或等于 最大等待时间
        //#endregion
        return (
            !lastCallTime ||
            timeSinceLastCall >= wait ||
            timeSinceLastCall < 0 ||
            (maxWait !== false && timeSinceLastInvoke >= maxWait)
        )
    }

    // 时间失效、终止
    function timerExpired() {
        var time = now()
        if (shouldInvoke(time)) {
            return trailingEdge(time)
        }
        //#region
        /*  
      每次通过remainingWait 函数确定下次的递归调用时间
      判断是否到达执行时间，重置定时器 
    */
        //#endregion
        timerId = setTimeout(timerExpired, remainingWait(time))
    }

    //超时之后调用
    function trailingEdge(time) {
        clearTimeout(timerId)
        timerId = undefined
        // 如果设置trailing为true,并且参数存在 lastArgs，调用func
        if (trailing && lastArgs) {
            return invokeFunc(time)
        }
        lastArgs = lastThis = undefined
        return result
    }

    //  取消执行
    function cancel() {
        if (timerId !== undefined) {
            clearTimeout(timerId)
        }
        lastCallTime = lastInvokeTime = 0
        lastArgs = lastThis = timerId = undefined
    }

    //   直接执行
    function flush() {
        return timerId === undefined ? result : trailingEdge(now())
    }

    // 返回的函数
    function debounced() {
        var time = now(),
            isInvoking = shouldInvoke(time)
        lastArgs = arguments
        debugger
        // 当前this 赋值
        lastThis = this
        lastCallTime = time
        if (isInvoking) {
            // 第一次调用的时候，启动定时器，并且执行一次
            if (timerId === undefined) {
                return leadingEdge(lastCallTime)
            }
            // Handle invocations in a tight loop.
            clearTimeout(timerId)
            timerId = setTimeout(timerExpired, wait)
            return invokeFunc(lastCallTime)
        }
        return result
    }

    debounced.cancel = cancel
    debounced.flush = flush

    return debounced
}
