// 将描述转化为数据描述U
let a = [{ 2: "泰" }, { 3: "华" }];
let b = [{ 4: "衡" }, { 2: "嵩" }];
let c = [{ 1: "衡" }, { 5: "恒" }];
let d = [{ 4: "恒" }, { 3: "嵩" }];
let e = [{ 2: "华" }, { 5: "泰" }];

// 记录所有的组合
let allRes = {};
// 区分每个组合
let globalCount = 0;
a.forEach((item1, index1) => {
    b.forEach((item2, index2) => {
        c.forEach((item3, index3) => {
            d.forEach((item4, index4) => {
                e.forEach((item5, index5) => {
                    globalCount++;
                    allRes[globalCount] = [item1, item2, item3, item4, item5]
                })
            })
        })
    })
});
// 遍历退出标识
let flage = false;
// 存放最后结果
let resItem = new Set;

let keys = Object.keys(allRes);
for (let i = 0; i < keys.length; i++) {
    if (flage) {
        break;
    }
    // 数据处理源
    let oneItem = allRes[keys[i]];
    // 中间结果存储，用于判断
    let setKey = new Set();
    let setVal = new Set();
    oneItem.forEach(item1 => {
        let oneKey = Object.keys(item1)[0];
        let oneVal = item1[oneKey];
        setKey.add(oneKey);
        setVal.add(oneVal);
    });
    // 五个key 和 val 不冲突为正确
    if (setKey.size == 5 && setVal.size == 5) {
        flage = true;
        resItem.add(oneItem);
    }
}
console.log(JSON.stringify(Array.from(resItem)));
//[[{"3":"华"},{"2":"嵩"},{"1":"衡"},{"4":"恒"},{"5":"泰"}]]

