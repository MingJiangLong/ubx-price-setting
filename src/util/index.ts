import sha1 from 'sha1'
import cryptoJS from "crypto-js";


const AES_PUBLIC_KEY = '83cb57ee663c9cc6'
const AES_IV = 'ec1b2e827f1d6521'
/**
 * 构建form表单
 * @param params 
 */
export function buildForm(params: { [k: string]: any }) {
  const form = new FormData();
  for (let k in params) {
    form.append(k, params[k])
  }
  return form
}

/**
 * sha1签名
 */
export function sha1Sign() {
  const stamp = `${new Date().getTime()}`.substr(0, 10);
  const str = `${stamp}_2d1w3Gi4cuwUBS8UI*weiVBI8us4o1%N`
  return {
    sign: sha1(str),
    stamp
  }
}

/**
 * AES加密
 * @param data 
 */
export function AESSign(data: any): string {
  const secretKey = cryptoJS.enc.Utf8.parse(AES_PUBLIC_KEY)
  const iv = cryptoJS.enc.Utf8.parse(AES_IV)
  const dataStr = cryptoJS.enc.Utf8.parse(JSON.stringify({
    ...data,
    timestamp: Date.now()
  }));

  return cryptoJS.AES.encrypt(dataStr, secretKey, {
    iv,
    mode: cryptoJS.mode.CBC,
    padding: cryptoJS.pad.Pkcs7
  }).toString();
}

function getPathParams() {
  // 如果用hash 就不能使用search
  const search = window.location.search.slice(1)

  const arr = window.location.hash.split('?');
  if (arr.length != 2) return {};
  const paramsStr = arr[1].split("&")
  return paramsStr.reduce<any>((a, b) => {
    const [key, value] = b.split('=')
    return {
      ...a,
      [key]: value
    }
  }, {})
}

/**
 * 获取用户eid
 */
export function getEid() {
  return getPathParams()['eid'] || '5252'
}

/**
 * 获取登录账号
 */
export function getLoginName() {
  let result = getPathParams();
  return result['loginName'] || 'heting'
}

/**
 * 计算毛利率
 * @param v1 
 * @param v2 
 */
export function calcGrossMargin(v1, v2) {
  return ~~((v2 - v1) / v1 * 100)
}

/**
 * 是否为该项目的合法字符串
 * @param params 
 */
export function isValidStr(params: string) {
  
}