// import fs from "fs";

export class DBFile {
  private key = "dbfile"
  constructor(public readonly path: string) {
    this.key = path
    // if (!fs.existsSync(path)) {
    //   fs.writeFileSync(path, "{}");
    // }
  }

  public write(content: any) {
    // fs.writeFile(this.path, content, err => {
    //   if (err != null) {
    //     throw err;
    //   }
    // });
    localStorage.setItem(this.key, content)
  }

  public async append(content: any) {
    const data = this.read() + content;
    this.write(data);
  }

  public read(): string {
    return localStorage.getItem(this.key) ?? ""
    // return fs.readFileSync(this.path, "utf-8");
  }
}
