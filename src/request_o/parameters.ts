import { AxiosHeaders, AxiosRequestConfig } from "axios";
import * as token from '../../token.json'

const _headers: AxiosHeaders = new AxiosHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': 'Bearer ' + token.token
})

const _base_url: string = 'https://api.deepseek.com'

const _urls: { [key in string]: string} = {
  'chat': '/chat/completions',
  'beta': '/beta/completions'
}

export function getHeaders(): AxiosHeaders {
  return _headers
}

export function getUrl(type: string): string {
  return _base_url + _urls[type]
}

export function makeConfig(type: string, data: any, extra: any = undefined): AxiosRequestConfig {
  if (!extra) {
    return {
        headers: getHeaders(),
        url: getUrl(type),
        method: 'post',
        data: data
    }
  } else {
    return {
        headers: getHeaders(),
        url: getUrl(type),
        method: 'post',
        data: data,
        ...extra
    }
  }
}
