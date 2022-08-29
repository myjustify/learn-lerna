// 提出keys中不存在的数据
export function pickExclude(obj = {}, keys = []) {
    return Object.keys(obj).reduce((prev, key) => {
        console.log(prev, key)
        if (!keys.includes(key)) {
            prev[key] = obj[key];
        }

        return prev;
    }, {});
}
// 提出keys中存在的数据
export function pickInclude(obj = {}, keys = []) {
    return Object.keys(obj).reduce((prev, key) => {
        console.log(prev, key)
        if (keys.includes(key)) {
            prev[key] = obj[key];
        }

        return prev;
    }, {});
}
// 将options方法名改成自己想用的别名 onLoad => created
export function mapKeys(source = {}, map = {}) {
    let target = {}
    Object.keys(source).forEach((key) => {
        if (map[key]) {
            target[map[key]] = source[key];
        }else{
            target[key] = source[key];
        }
    });
    return target;
}
