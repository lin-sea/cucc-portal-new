
//数字转比例如 0.25转1比4
export function decimalsToFractional(decimals) {
    const formatDecimals = decimals.toFixed(2)
    let denominator = 100 //初始化分母
    let numerator = formatDecimals * 100 //初始化分子
    let bigger = 0
    function recursion() {
        bigger = denominator > numerator ? denominator : numerator
        for (let i = bigger; i > 1; i--) {
            if (Number.isInteger(numerator / i) && Number.isInteger(denominator / i)) {
                numerator = numerator / i
                denominator = denominator / i
                recursion()
            }
        }
    }
    recursion()
    if (decimals % 1 === 0) { // 入参为整数时 直接返回
        return `${decimals}`
    } else if (numerator / denominator > 1) {  // 分子大于分母 
        return `${denominator} / ${numerator}`
    } else { // 分子小于分母
        return `${numerator} / ${denominator}`
    }
}

//数字转大写
export function intToChinese ( str ) {
    str = str+'';
    var len = str.length-1;
    var idxs = ['','十','百','千','万','十','百','千','亿','十','百','千','万','十','百','千','亿'];
    var num = ['零','壹','贰','叁','肆','伍','陆','柒','捌','玖'];
    return str.replace(/([1-9]|0+)/g,function( $, $1, idx, full) {
     var pos = 0;
     if( $1[0] != '0' ){
      pos = len-idx;
      if( idx == 0 && $1[0] == 1 && idxs[len-idx] == '十'){
       return idxs[len-idx];
      }
      return num[$1[0]] + idxs[len-idx];
     } else {
      var left = len - idx;
      var right = len - idx + $1.length;
      if( Math.floor(right/4) - Math.floor(left/4) > 0 ){
       pos = left - left%4;
      }
      if( pos ){
       return idxs[pos] + num[$1[0]];
      } else if( idx + $1.length >= len ){
       return '';
      }else {
       return num[$1[0]]
      }
     }
    });
   }