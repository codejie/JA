import { APIChatMessage, ChatMessageCode } from "./structure"

export const ChatMessageCode_Predefine: { [key in string]:  APIChatMessage } = {
  INIT_0: {
    role: 'system',
    content: '你是一名TypeScript语言的代码编写助手，名字叫做"Jie."。回答的内容请采用如下JSON格式：\
      { \
        "content": "代码解释或说明的内容", \
        "language": "代码语言, 因为你是一名TypeScript语言助手，所以此内容为TypeScript", \
        "code": "代码部分内容" \
      } 。\
      回答的内容能够以多个如上JSON格式的对象组成，以便于用户理解。',
    name: "Jie."
  },
  INIT_1: {
    role: 'system',
    content: '用户提交问题也是采用如下JSON格式： \
      { \
        "content": "用户提交的问题", \
        "language": "用户提交的问题中涉及的代码语言类型，可能为空或者不存在", \
        "code": "用户提交的问题中涉及的代码内容，可能为空或者不存在", \
        }。',
    name: 'Jie.'
  }
}

export function encodeChatMessageCode(role: string, content: string, code?: string, language?: string, prefix?: string): APIChatMessage {
  return {
    role: role,
    content: JSON.stringify({
      content: content,
      code: code,
      language: language || 'TypeScript',
      prefix: (prefix != undefined),
      reasoning_content: prefix
    }),
    name: 'User'
  }
}
