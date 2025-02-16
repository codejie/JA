import axios, { AxiosHeaders, AxiosRequestConfig, AxiosResponse } from "axios";
import * as token from '../../token.json'
import { ChatMessageRequestMessage, ChatMessageResponseChoice } from "./structure";

const _base_url: string = 'https://api.deepseek.com'

const _urls: { [key in string]: string } = {
  'chat': '/chat/completions',
  'beta': '/beta/completions'
}

const _headers: AxiosHeaders = new AxiosHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': 'Bearer ' + token.token
})

function _request(type: string, data: any, method: string = 'post'): Promise<AxiosResponse<any, any>> {
  return axios({
    headers: _headers,
    url: _base_url + _urls[type],
    method: method,
    data: data
  })  
}

export function request_chat(msgs: ChatMessageRequestMessage[], extra: any = undefined): Promise<ChatMessageResponseChoice[]> {
  const data = {
    model: 'deepseek-chat',
    messages: msgs,
    response_format: {
      type: 'json_object'
    },
    ...extra
  }
  return new Promise<ChatMessageResponseChoice[]>((resolve, reject) => {
    _request('chat', data, 'post')
      .then(ret => {
        // const chioces = ret.data.chioces
        resolve(ret.data.choices) 
      })
      .catch(err => {
        reject(err)
      })
  })
}