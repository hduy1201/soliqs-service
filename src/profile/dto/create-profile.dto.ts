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
    public posts: string[],
    public saved: string[],
    public tag: string[],
    public blocked: string[],
    public groups: string[],
    public notifications: string[],
    public messages: string[],
  ) {}
}
