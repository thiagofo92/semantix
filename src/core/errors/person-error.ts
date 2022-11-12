export class PersonCreateError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'PersonCreateError'
  }
}