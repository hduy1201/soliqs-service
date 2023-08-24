export class CreateProfileDto {
  constructor(
    public id: string,
    public userName: string,
    public displayName: string,
    public email: string,
    public phone: string,
    public country: string,
    public avatar: string,
    public cover: string,
    public bio: string,
    public followers: string[],
    public following: string[],
    public saved: string[],
    public tags: string[],
    public blocked: string[],
    public notifications: string[],
    public messages: string[],
  ) {}
}
