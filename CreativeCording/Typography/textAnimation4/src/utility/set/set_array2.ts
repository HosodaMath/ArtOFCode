/**
 * @class SetArray2
 * @description
 * 2つの配列を1つの配列にまとめるジェネリッククラス
 * 
 * @example
 * 
 * 
 * @author ShingoHosoda
 * @copyright ShingoHosoda
 * @license MIT
 */
class SetArray2<T> {
  array1 : T[] = [];
  array2 : T[] = [];
  constructor(array1: T[], array2: T[]){
    this.array1 = array1;
    this.array2 = array2;
  }
}

export {SetArray2}