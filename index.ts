import * as Chat from './src/conversation/chat'
import { request_chat } from './src/request'
import { ChatMessageRequestMessage } from './src/request/structure'



// const data: ChatMessageRequestMessage[] = [
//   ChatMessageCode_Predefined.INIT_0,
//   ChatMessageCode_Predefined.INIT_1,
//   // codeEncodeChatMessage("代码片段，用于实现两个整型数字的和运算。")
//   codeEncodeUserContent(ChatCodeTest_Contents[0])
// ]

// async function main() {
//   let ret = await request_chat_code(data)
//   console.log(ret.choices)
//   let choice = ret.choices[0]
//   // const json = JSON.parse(choice.message.content)
//   // console.log(json)
//   data.push({
//     role: choice.message.role,
//     content: choice.message.content
//   })
//   data.push(codeEncodeUserContent(ChatCodeTest_Contents[1]))
//   ret = await request_chat_code(data)
//   console.log(ret.choices)
//   choice = ret.choices[0]  
//   data.push({
//     role: choice.message.role,
//     content: choice.message.content
//   })
//   data.push(codeEncodeUserContent(ChatCodeTest_Contents[2]))
//   ret = await request_chat_code(data)
//   console.log(ret.choices)

//   console.log(data)

// }

async function main() {
  Chat.init_conversation()
  const data: ChatMessageRequestMessage[] = Chat.get_messages()
  const ret = await Chat.request_message({
    role: 'user',
    content: '请生成两个不同的函数代码片段，用于实现两个整型数字的和运算， 不需要用法示例。注意，是两个函数的代码。'
  })
  console.log(ret)
  const ret1 = await Chat.request_message({
    role: 'user',
    content: '- 代码中的变量请使用x和y。\n - 解释上述代码什么意思？如何使用？'
  })
  console.log(ret1)
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