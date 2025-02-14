interface MessageStack<T> {
  type: string,
  messages: T[]
  updated: number
}

