import { request_chat, request_chat_code } from "./src/request"
import { ChatMessageCode_Predefined, codeDecodeChatMessage, codeEncodeChatMessage, codeEncodeUserContent } from "./src/request/format"
import { ChatMessageRequestMessage } from "./src/request/structure"
import { ChatCodeTest_Contents } from "./src/test/code_req"

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
  // codeEncodeChatMessage("代码片段，用于实现两个整型数字的和运算。")
  codeEncodeUserContent(ChatCodeTest_Contents[0])
]

async function main() {
  let ret = await request_chat_code(data)
  console.log(ret.choices)
  const choice = ret.choices[0]
  data.push({
    role: choice.message.role,
    content: choice.message.content
  })
  data.push(codeEncodeUserContent(ChatCodeTest_Contents[1]))
  ret = await request_chat_code(data)
  console.log(ret.choices)
}

main()


// request_chat_code(data)
//   .then(ret => {
//     const results = codeDecodeChatMessage(ret.choices)
//     console.log(results)
//     // console.log(ret)
//   }).catch(err => {
//     console.log(err)
//   })