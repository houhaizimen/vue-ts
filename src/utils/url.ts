import { isObject } from './data-type';

/**
 * 将一个对象组装成query查询的字符串
 * @param data
 */
export const queryParamsJoin = (data: { [propsName: string]: any }): string => {
  if (!isObject(data)) {
    throw new TypeError(`${JSON.stringify(data)}不是对象类型`);
  }
  const result: string[] = [];
  Object.keys(data).forEach((key) => {
    if (data[key]) {
      result.push(`${key}=${data[key]}`);
    }
  });
  return `${result.join('&')}`;
};

/**
 * @param {string} url url地址
 * @param {key} key 需要获取的key
 * @return:
 * @Description: 根据key从一段url中获取query值
 * @Author: 水痕
 * @LastEditors: 水痕
 * @Date: 2019-08-08 15:20:15
 */
export const getUrlQuery = (
  url: {
    replace: (
      arg0: RegExp,
      arg1: (_$0: any, $1: string | number, $2: any) => void,
    ) => void;
  },
  key: string,
): string => {
  let result: any;
  const Oparam: { [propName: string]: any } = {};
  // 使用正则去捕获
  url.replace(
    /[\?&]?(\w+)=(\w+)/g,
    (_$0: any, $1: string | number, $2: any) => {
      if (Oparam[$1] === void 0) {
        Oparam[$1] = $2;
      } else {
        Oparam[$1] = [].concat(Oparam[$1], $2);
      }
    },
  );
  if (key === void 0 || key === '') {
    result = Oparam;
  } else {
    result = Oparam[key] || '';
  }
  return result;
};
