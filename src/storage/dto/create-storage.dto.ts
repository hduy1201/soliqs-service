export class CreateStorageDto {
  constructor(
    public folderName: string,
    public urls: string[],
  ) {}
}
