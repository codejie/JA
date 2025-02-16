import { ChatMessageCodeContent } from "../request/structure";

export const ChatCodeTest_Contents: ChatMessageCodeContent[] = [
  {
    content: '请生成两个不同的函数代码片段，用于实现两个整型数字的和运算， 不需要用法示例。注意，是两个函数的代码。'
  },
  {
    content: '代码中的变量请使用x和y。'
  },
  {
    content: '解释上述代码什么意思？如何使用？'
  }  
]