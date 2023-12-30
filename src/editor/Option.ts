export interface CollaborationOption  {
  ws: string
}

export default interface Option {

  collaboration?: CollaborationOption

  html?: string

  name?: string
}