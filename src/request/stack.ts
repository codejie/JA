import { ChatMessageRequestMessage, ChatMessageResponseChoice } from "./structure"


const chatRequestMessageStack: ChatMessageRequestMessage[] = []

export function chatStackPushRequest(msg: ChatMessageRequestMessage): void {
  chatRequestMessageStack.push(msg)
}

export function chatStackPushResponse(msg: ChatMessageResponseChoice): void {
  chatRequestMessageStack.push({
    role: msg.message.role,
    content: msg.message.content    
  })
}

export function chatStockPop(max: number = 0): ChatMessageRequestMessage[] {
  return chatRequestMessageStack.splice(-max)  
}
