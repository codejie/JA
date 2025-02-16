import * as Conversation from "."
import { ChatMessageRequestMessage } from "../request_o/structure"

export interface ChatContent {
  text?: string
  languange?: string
  code?: string
}

export const predefinedMessages: { [key in string]: ChatMessageRequestMessage } = {
  INIT_0: {
    role: 'system',
    content: '你是一名TypeScript语言的代码编写助手，名字叫做"Jie."。回答的内容请采用如下JSON格式：\
      { \
        "text": "代码解释或说明的内容", \
        "language": "代码语言, 因为你是一名TypeScript语言助手，所以此内容为TypeScript。如果没有代码部分，此字段可以不使用。", \
        "code": "代码部分内容，如果回答中没有代码内容，此字段可以不使用。" \
      } 。\
      回答的内容能够以一个或多个如上JSON格式的对象组成，以便于用户理解。',
    name: "Jie."
  },
  INIT_1: {
    role: 'system',
    content: '用户提交问题也是采用如下JSON格式： \
      { \
        "text": "用户提交的问题", \
        "language": "用户提交的问题中涉及的代码语言类型，可能为空或者不存在", \
        "code": "用户提交的问题中涉及的代码内容，可能为空或者不存在", \
        }。'
  }
}


//
const _conversionId = Conversation.create()

export function init_conversation(): void {
  push_message(predefinedMessages.INIT_0)
  push_message(predefinedMessages.INIT_1)
}

export function push_message(msg: ChatMessageRequestMessage): void {
  Conversation.push(_conversionId, {
    type: 'chat',
    role: msg.role,
    content: msg.content,
    updated: (new Date()).getTime()
  })
}

export function get_messages(max: number = 0): ChatMessageRequestMessage[] {
  const items = Conversation.get(_conversionId, max)
  const ret: ChatMessageRequestMessage[] = []
  items.forEach(item => {
    ret.push({
      role: item.role,
      content: item.content
    })
  })
  return ret
}

