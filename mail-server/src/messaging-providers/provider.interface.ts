export interface IProvider {
  send(to: string, subject: string, content: any): Promise<void>;
}
