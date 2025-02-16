import axios from "axios"
import { makeConfig } from "./parameters"
import { ChatMessageRequest, ChatMessageRequestMessage, ChatMessageResponse } from "./structure"

export function request_chat(req: ChatMessageRequest): Promise<ChatMessageResponse> {
  return new Promise<ChatMessageResponse>((resolve, reject) => {
    axios(makeConfig('chat', req)).then(ret => {
      resolve(ret.data)
    }).catch(err => {
      reject(err)
    })
  })
}

export function request_chat_code(msgs:ChatMessageRequestMessage[]): Promise<ChatMessageResponse> {
  const req: ChatMessageRequest = {
    model: 'deepseek-chat',
    messages: msgs,
    response_format: {
      type: 'json_object'
    }
  }
  return request_chat(req)
}

// export function request_chat_code(msgs: APIChatMessage[]): Promise<APIChatMessage[]> {
//   return new Promise<APIChatMessage[]>((resolve, reject) => {
//     axios(makeConfig('chat', {
//       model: 'deepseek-chat',
//       messages: msgs,
//       response_format: {
//         type: 'json_object'
//       }
//     })).then(ret => {
//       resolve(ret.data)
//     }).catch(err => {
//       reject(err)
//     })

//   return axios(makeConfig('chat', {
//     model: 'deepseek-chat',
//     messages: msgs,
//     response_format: {
//       type: 'json_object'
//     }
//   }))
// }

// export function request_chat(msgs: any[]): Promise<any> {
//   return axios(makeConfig('chat', {
//     model: 'deepseek-chat',
//     messages: msgs,
//     response_format: {
//       type: 'json_object'
//     }
//   }))
// }