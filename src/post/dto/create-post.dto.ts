export class CreatePostDto {
  constructor(
    public id: string,
    public authorId: string,
    public authorName: string,
    public authorAvatar: string,
    public authorUserName: string,
    public content: string,
    public media: string[],
    public tags: string[],
    public likes: string[],
    public comments: string[],
    public shares: string[],
    public bookmarks: string[],
  ) {}
}
