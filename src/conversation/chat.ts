import * as Conversation from "."
import { request_chat } from "../request"
import { ChatMessageRequestMessage } from "../request/structure"

// export interface ChatContent {
//   text?: string
//   languange?: string
//   code?: string
// }

export interface ChatMessage {
  role: string
  content: string
}

export const predefinedMessages: { [key in string]: ChatMessage } = {
  // INIT_0: {
  //   role: 'system',
  //   content: '你是一名TypeScript语言的代码编写助手，名字叫做"Jie."。回答的内容请采用如下一个或多个JSON对象数组形式：\
  //     [{ \
  //       "text": "代码解释或说明的内容", \
  //       "language": "代码语言, 因为你是一名TypeScript语言助手，所以此内容为TypeScript。如果没有代码部分，此字段可以不使用。", \
  //       "code": "代码部分内容，如果回答中没有代码内容，此字段可以不使用。" \
  //     }]。',
  //   name: "Jie."
  // },
  // INIT_1: {
  //   role: 'system',
  //   content: '用户提交问题也是采用如下JSON对象形式： \
  //     { \
  //       "text": "用户提交的问题", \
  //       "language": "用户提交的问题中涉及的代码语言类型，可能为空或者不存在", \
  //       "code": "用户提交的问题中涉及的代码内容，可能为空或者不存在", \
  //       }。'
  // }

  INIT_0: {
    role: 'system',
    content: '你是一名TypeScript语言的代码编写助手，名字叫做"Jie."。回答内容请采用markdown格式，用户提交的问题也会采用markdown格式。'
  },
  INIT_1: {
    role: 'system',
    content: '回答的内容中如果含有编程代码信息，请标记出所使用的语言，语言缺省采用Typescript，除非用户指定其他语言。'
  }
}

//
const _conversionId = Conversation.create()

export function init_conversation(): void {
  push_message(predefinedMessages.INIT_0)
  push_message(predefinedMessages.INIT_1)
  // push_message(predefinedMessages.INIT_2)
}

export function destroy_conversation(): void {
  Conversation.remove(_conversionId)
}

export function push_message(msg: ChatMessage | ChatMessage[]): void {
  if (!Array.isArray(msg)) {
    msg = [msg]
  }
  msg.forEach(item => {
    Conversation.push(_conversionId, {
      type: 'chat',
      role: item.role,
      content: item.content,
      updated: (new Date()).getTime()
    })
  })
}

export function get_messages(max: number = 0): ChatMessage[] {
  const items = Conversation.get(_conversionId, max)
  const ret: ChatMessage[] = []
  items.forEach(item => {
    ret.push({
      role: item.role,
      content: item.content
    })
  })
  return ret
}

export function pop_messages(max: number = 0): ChatMessage[] {
  const items = Conversation.pop(_conversionId, max)
  const ret: ChatMessage[] = []
  items.forEach(item => {
    ret.push({
      role: item.role,
      content: item.content
    })
  })
  return ret
}

export function request_content(content: string | string[], history: number = 0, role: string = 'user'): Promise<ChatMessage[]> {
  if (typeof content === 'string') {
    content = [content]
  }

  const msgs: ChatMessage[] = []
  content.forEach(item => {
    msgs.push({
      role: role,
      content: item
    })
  })

  return request_message(msgs)
}

export function request_message(message: ChatMessage | ChatMessage[], history: number = 0): Promise<ChatMessage[]> {
  if (!Array.isArray(message)) {
    message = [message]
  }
  message.forEach(item => {
    push_message(item)
  })

  const msgs = get_messages(history)

  return new Promise<ChatMessage[]>((resolve, reject) => {
    const data: ChatMessageRequestMessage[] = <ChatMessageRequestMessage[]>(msgs)
    request_chat(data)
      .then(ret => {
        const msgs: ChatMessage[] = []
        ret.forEach(item => {
          msgs.push({
            role: item.message.role,
            content: item.message.content
          })
        })
        push_message(msgs)
        resolve(msgs)
      })
      .catch(err => {
        reject(err)
      })  
  })
} 
