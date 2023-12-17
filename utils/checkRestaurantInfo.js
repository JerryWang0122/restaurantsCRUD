module.exports = (restaurantInfo) => {
  const mistakeObj = []
  // 資料判斷
  mistakeObj.push(isValidPhoneNumber(restaurantInfo.phone))
  mistakeObj.push(isValidRating(restaurantInfo.rating))
  mistakeObj.push(isValidGoogleMapUrl(restaurantInfo.google_map))

  // 提取錯誤物件，並回傳資料
  const errorObj = mistakeObj.filter(value => value !== undefined)
  if (errorObj.length) {
    return {
      state: false,
      errorMessage: errorObj.join(',') + ' 有誤'
    }
  }
  return {state: true}
}

// =====check function, generated by GPT ==== 有稍微調整下 ====
// 尚可擴充
function isValidPhoneNumber(phoneNumber) {
  // 定義一個簡單的電話號碼格式：8 到 12 位數字，可以包含空格、括號、橫線
  const phoneRegex = /^[\d\s()-]{8,12}$/;

  // 使用正規表達式測試字串
  if(!phoneRegex.test(phoneNumber)) return '電話號碼'
}

function isValidRating(rating) {
  // 使用正規表達式來檢查
  const regex = /^(?:[0-4](?:\.\d)?|5(?:\.0)?)$/;
  if(!regex.test(rating)) return '評價'
}

function isValidGoogleMapUrl(url) {
  // 使用正規表達式來檢查
  const regex = /^(https?:\/\/)?(www\.)?(maps\.app\.goo\.gl|goo\.gl)\/.*$/;
  if(!regex.test(url)) return 'Google Map'
}