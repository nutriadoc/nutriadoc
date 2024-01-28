export function getAllLanguages(): any[] {

  if (hljs === undefined) return []

  return hljs
    .listLanguages()
    .map((lang: any) => {
      const ext = hljs.getLanguage(lang)
      return { value: lang, name: (ext as any)?.name ?? ""}
    })
}

export function getSupportedLanguages(): Record<string, unknown> {
  if (hljs === undefined) return {}

  return hljs.listLanguages().reduce(
    (memo: Record<string, unknown>, lang: any) => {
      memo[lang] = true
      return memo
    },
    {}
  )
}

