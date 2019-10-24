class Tool {
  /**
   * @description 根据三边获取三角形面积
   *
   * @param {*} a 入参a边：num
   * @param {*} b  入参b边 ：num
   * @param {*} c 入参c边：num
   *
   * @returns 面积 ：num
   */
  getTriangleArea(a, b, c) {
    let p = (a + b + c) / 2;
    return Math.sqrt(p * (p - a) * (p - b) * (p - c));
  }

  /**
   * @description 工具函数 判断数据类型, 用于函数的入参判断，判断是否同一类型 int float  string 三种类型
   *
   * @param {*} paramsArr 需要判断的数组
   * @param {*} type 目标类型
   * @param {*} transform  是否转换成默认值
   * @param {*} defaultVal  默认值
   *
   * @returns 返回转换后的 入参数组
   */
  judge(paramsArr, type, transform = false, defaultVal) {
    let parseFunction;
    switch (type) {
      case "int": {
        transform && !defaultVal && (defaultVal = 0);
        parseFunction = Number.parseInt;
        break;
      }
      case "float": {
        transform && !defaultVal && (defaultVal = 0.0);
        parseFunction = Number.parseFloat;
        break;
      }
      case "string": {
        transform && !defaultVal && (defaultVal = "");
        parseFunction = String;
        break;
      }
    }
    return paramsArr.map(element => {
      if (String(parseFunction(element)) == "NAM") {
        return defaultVal;
      } else {
        return parseFunction(element) || defaultVal;
      }
    });
  }

  /**
   * @param {*} obj 传入的对像参数：obj
   *
   * @returns  是否为空 :bool (全部属性为空方为空)
   */
  isNullObj(obj) {
    let res = [];
    let objEntries = Object.entries(obj);
    for (let i = 0; i < objEntries.length; i++) {
      if (
        objEntries[i][1] === "" ||
        objEntries[i][1] == null ||
        objEntries[i][1] == undefined
      ) {
        obj[objEntries[i][0]] = "";
        res.push(true);
      } else {
        res.push(false);
      }
    }
    let filterRes = res.filter(item => {
      return item;
    });
    return filterRes.length == filterRes.length;
  }

  /**
   * @description  将目标对象已经拥有的属性赋值，没有的属性不要复制
   *
   * @param {*} sourceObj 需要复制的数据对象 ： obj
   * @param {*} targetObj 需要赋值的目标对象 :obj
   *
   * @returns targetObj  已经赋值好的目标对象返回：obj
   */
  copyPro(sourceObj, targetObj) {
    let tarkeys = Object.keys(targetObj);
    tarkeys.forEach(item => {
      targetObj[item] = sourceObj[item] || "";
    });
    return targetObj;
  }
}
