import { message } from 'ant-design-vue';
import dayjs from 'dayjs';
import { nanoid } from 'nanoid';

// 获取时间
export const getData = (format?: string) => {
  return dayjs().format(format || 'YYYY-MM-DD HH:mm:ss');
}

/**
 * 生成随机字符串
 * @param num 字符串长度(默认36位)
 * @returns 字符串
 */
export const generateRandom = (num?: number) => {
  return nanoid(num || 12)
}

// 随机ip生成
export const randomIp = () => {
  const ip = [];
  for (let i = 0; i < 4; i++) {
    ip.push(Math.floor(Math.random() * 255));
  }
  return ip.join('.');
}

/**
 * 批量复制内容到粘贴板
 * textList : 需要复制的内容列表
 * sign : 分隔符
 */
export const batchCopyToClip = (textList: Array<string | number>, sign = ',') => {
  const text = textList.join(sign)
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text)
  } else {
    const textarea = document.createElement('textarea')
    document.body.appendChild(textarea)
    textarea.style.position = 'fixed'
    textarea.style.clipPath = 'rect(0 0 0 0)'
    textarea.style.top = '10px'
    textarea.value = text
    textarea.select()
    document.execCommand('copy', true)
    document.body.removeChild(textarea)
  }
  message.success('复制成功')
}

/**
 * @description 获取localStorage
 * @param {String} key Storage名称
 * @return string
 */
export const localGet = (key: string) => {
  const value = window.localStorage.getItem(key)
  try {
    return JSON.parse(window.localStorage.getItem(key) as string)
  } catch (error) {
    return value
  }
}

/**
 * @description 存储localStorage
 * @param {String} key Storage名称
 * @param {Any} value Storage值
 * @return void
 */
export const localSet = (key: string, value: any) => {
  window.localStorage.setItem(key, JSON.stringify(value))
}

/**
 * @description 清除localStorage
 * @param {String} key Storage名称
 * @return void
 */
export const localDel = (key: string) => {
  window.localStorage.removeItem(key)
}

/**
 * @description 清除所有localStorage
 * @return void
 */
export const localClear = () => {
  window.localStorage.clear()
}
