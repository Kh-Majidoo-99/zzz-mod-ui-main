export interface FeedItem {
  id: number
  author: string
  authorId?: number
  authorUrl?: string
  downloadUrl?: string
  title: string
  imageUrl: string
  link: string
  text: string
  _sInitialVisibility?: string
}

export interface Character {
  _idRow: number;
  _sName: string;
  _nItemCount: number;
  _sUrl: string;
  _sIconUrl: string;
}