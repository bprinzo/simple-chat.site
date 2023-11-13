export type Message = {
  content: string,
  owner: {
    id: string | null;
    name: string | null
  },
}