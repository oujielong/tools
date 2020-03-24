let persons = [1, 2, 3, 4, 5, 6]
let list = ['123', '123']
// 产生全排列
let permutation = function(ss1, i = 0) {
    let ss = Object.assign([], ss1)
    if (ss == null || i < 0 || i > ss.length) {
        return
    }
    if (i == ss.length) {
        list.push(ss)
    } else {
        for (let j = i; j < ss.length; j++) {
            // j与i交换
            let temp = ss[j]
            ss[j] = ss[i]
            ss[i] = temp
            permutation(ss, i + 1)
            // j与i还原
            temp = ss[j]
            ss[j] = ss[i]
            ss[i] = temp
        }
    }
}

// 检查当前的位置是否有问题
let checkRound = function(datas) {
    let leng = datas.length
    let flag = true
    datas.forEach((element, index) => {
        // 正常的情况
        if (index == leng - 1) {
            if (element + 1 == datas[0] || element - 1 == datas[0]) {
                flag = false
            }
        } else {
            if (
                element + 1 == datas[index + 1] ||
                element - 1 == datas[index + 1]
            ) {
                flag = false
            }
        }
        // 特殊情况 3号和5号不相邻
        if (element == 3) {
            // 最后一个
            if (index == leng - 1) {
                if (element + 2 == datas[0] || element - 2 == datas[0]) {
                    flag = false
                }
            } else {
                if (
                    element + 2 == datas[index + 1] ||
                    element - 2 == datas[index + 1]
                ) {
                    flag = false
                }
            }
        }
    })
    return flag
}
// 插入的数据，存储的空间，插入的位置(人为)，位置左边还是右边
let RountedInsert = function(data, sotre, location, dirction = 0) {
    let length = sotre.length
    // 数据位置
    let arrayLocation = ((location - 1) % length) + dirction
    let realyLocation = 0 //实际数组插入位置
    if (arrayLocation >= 0) {
        realyLocation = arrayLocation % length
    } else {
        realyLocation = (arrayLocation % length) + length
    }
    sotre[realyLocation] = data
}

permutation(persons, 0)
let rest = []
list.forEach(item => {
    if (checkRound(item)) {
        rest.push(item)
    }
})
debugger
console.log(rest)
