import { v4 as uuidv4 } from "uuid"

export interface ConversationItem {
  id?: string
  type?: string
  role: string
  content: string
  updated: number
}

type Conversation = {
  [key in string]: ConversationItem[]
}

export function create(): string {
  const id = _make_id()
  _conversationCollection[id] = []
  return id
}

export function remove(id: string): void {
  delete _conversationCollection[id]
}

export function push(conversion: string, item: ConversationItem): string {
  const id = _make_id()
  item.id = id
  _conversationCollection[conversion].push(item)
  return id
}

export function get(conversion: string, max: number = 0): ConversationItem[] {
  return _conversationCollection[conversion].slice(-max)
}

export function pop(conversion: string, max: number = 0): ConversationItem[] {
  return _conversationCollection[conversion].splice(-max)
}

//
function _make_id(): string {
  return uuidv4().substring(27)  
}
//
const _conversationCollection: Conversation = {}
