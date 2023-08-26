export class CreateCommentDto {
  constructor(
    public id: string,
    public authorId: string,
    public postId: string,
    public authorName: string,
    public authorAvatar: string,
    public authorUserName: string,
    public content: string,
    public isDeleted: boolean,
  ) {}
}
