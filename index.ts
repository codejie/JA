import { request_chat, request_chat_code } from "./src/request"
import { ChatMessageCode_Predefined, codeDecodeChatMessage, codeEncodeChatMessage } from "./src/request/format"
import { ChatMessageRequestMessage } from "./src/request/structure"

// const data: any[] = [
//   {
//     role: 'system',
//     content: '你是一名Python代码开发助手。回答的内容请采用Markdown格式。',
//     name: 'Jie.'
//   },
//   {
//     role: 'user',
//     content: '我想要一个Python代码片段，用于计算两个数的和。',
//     name: 'User'
//   }
// ]

const data: ChatMessageRequestMessage[] = [
  ChatMessageCode_Predefined.INIT_0,
  ChatMessageCode_Predefined.INIT_1,
  codeEncodeChatMessage("代码片段，用于实现两个整型数字的和运算。")
]


request_chat_code(data)
  .then(ret => {
    const results = codeDecodeChatMessage(ret.choices)
    console.log(results)
    // console.log(ret)
  }).catch(err => {
    console.log(err)
  })