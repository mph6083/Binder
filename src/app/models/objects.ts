export interface RenderOptions {
  bookletPages: number;
  margins: Margins;
  pageNumbers: boolean;
}

export interface Margins {
  left: number
  right: number
  top: number
  bottom: number
}