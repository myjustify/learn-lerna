/**
 * 将数值四舍五入后格式化.
 *
 * @param num 数值(Number或者String)
 * @param cent 要保留的小数位(Number)
 * @param isThousand 是否需要千分位 0:不需要,1:需要(数值类型);
 * @param floor 四舍五入 0是1否;
 * @return 格式的字符串,如'1,234,567.45'
 * @type String
 */
export function formatMoney(num, cent = 2, isThousand = 1, floor=0, fill=true ) {
    let reg = /(\-)?(\d*)?\.?(\d*)/
    // 检查传入数值为数值类型
    if (isNaN(num)) {
        console.error(
            `${num} 该数据不是数字类型，请检查数据`
        )
        return '金额数据异常'
    }
    num = +num
    num = num.toString().replace(/\$|\,/g, '')

    let [,sign,nums=0,cents=0] = num.match(reg)
    // 获取小数部分
    cents = Math.floor(+('0.'+cents) * Math.pow(10, cent) + (floor?0:0.50000000001)).toString()

    if (isThousand) {
        // 对整数部分进行千分位格式化.
        for (var i = 0; i < Math.floor((nums.length - (1 + i)) / 3); i++) {
            nums =
                nums.substring(0, nums.length - (4 * i + 3)) +
                ',' +
                nums.substring(nums.length - (4 * i + 3))
        }
    }
    if ( cent > 0) {
        if(!fill){
            let decimals = +(cents.split('').reverse().join('')).toString()
            decimals = decimals.split('').reverse().join('')
            decimals = +decimals?'.'+decimals:''
            return (sign||'') + nums + decimals
        }else{
            return (sign||'') + nums + '.' + cents
        }
    } else {
        return (sign||'') + nums
    }
}