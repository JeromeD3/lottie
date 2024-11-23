'use server'

export const getTranslation = async ({ currentId }: any): Promise<any> => {
  const res = await fetch(`https://api.oioweb.cn/api/txt/QQFanyi?sourceText=${currentId}`).then((res) => {
    return res.json()
  })
  return res
}
