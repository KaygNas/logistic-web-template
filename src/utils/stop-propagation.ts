/* 阻止事件冒泡 */
export function stopPropagation<T extends React.SyntheticEvent>(handler: (e: T) => any = () => {}) {
  return (e: T) => {
    e.stopPropagation()
    handler(e)
  }
}
