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

  /**
   * @description 根据筛选条件获取, 关键字，树，属性
   *
   * @param {*} key  需要搜索的值
   * @param {*} tree 树结构，下层用children表示，isLeaf 表示是否是最总叶子节点
   * @param {*} prop 通过哪个属性和 key 对应
   *
   * @returns 返回当前key 的所有子节点： list
   */

  nodeSelectionItems(key, tree, prop = { key: "key" }) {
    if (tree[prop.key] == key) {
      return this.recursionGetItem(tree);
    } else if (tree.children && tree.children.length > 0) {
      for (let i = 0; i < tree.children.length; i++) {
        let res = this.nodeSelectionItems(key, tree.children[i], prop);
        if (res && res.length > 0) {
          return res;
          break;
        }
      }
    }
  }
  /**
   * @description 获取当前树的所有子节点
   *
   * @param {*} tree 树结构，下层用children表示，isLeaf 表示是否是最总叶子节点
   * @param {*} collectList 存储所有的叶子节点的数据
   *
   * @returns 最后的叶子节点的集合: list
   */

  recursionGetItem(tree) {
    let collectList = [];
    if (tree.isLeaf) {
      return collectList.push(tree);
    } else if (tree.children && tree.children.length > 0) {
      for (let i = 0; i < tree.children.length; i++) {
        let items = this.recursionGetItem(tree.children[i]);
        collectList.push(...items);
      }
      return collectList;
    }
  }
}
