import { request_chat } from "./src/request"

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

const data: any[] = [
  Message_Chat.INIT_0,
  Message_Chat.INIT_1,
  formatUserMessage("代码片段，用于实现两个整型数字的和运算。")
]



request_chat(data)
  .then(ret => {
    console.log(ret.data)
  }).catch(err => {
    console.log(err)
  })