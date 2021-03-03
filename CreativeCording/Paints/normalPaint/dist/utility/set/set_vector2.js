import { Vector2 } from "../../mathematics/vector.js";
/**
 * @class SetVector
 * @description
 * 2つの数値配列をVector2配列に変換するクラス
 * @example
 *
 *
 * @author ShingoHosoda
 * @copyright ShingoHosoda
 * @license MIT
 */
class SetVector2 {
    constructor(data1, data2) {
        this.data1 = [0, 0, 0, 0, 0];
        this.data2 = [0, 0, 0, 0, 0];
        this.data1 = data1;
        this.data2 = data2;
    }
    convert_array_vector2() {
        let vec_data = [];
        if (this.data1.length != this.data2.length) {
            /**
            * todo エラーが起きたときの文を考える。
            */
            throw new Error("Error data1.length != data2 data2.length");
        }
        for (let count = 0; count < this.data1.length; count++) {
            let tmp = new Vector2(this.data1[count], this.data2[count]);
            vec_data.push(tmp);
        }
        return vec_data;
    }
}
export { SetVector2 };
