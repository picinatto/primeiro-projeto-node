export default interface IHashProvider {
  generateHash(payload: string): Promise<string>;
  compareHash(payload: string, hased: string): Promise<boolean>;
}
