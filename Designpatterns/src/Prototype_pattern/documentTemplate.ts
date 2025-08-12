export class DocumentTemplate {
  constructor(
    public title: string,
    public content: string,
    public footer?: string
  ) {}

  
  clone(): DocumentTemplate {
    
    return new DocumentTemplate(
      this.title,
      this.content,
      this.footer
    );
  }

  
  display(): void {
    console.log(`Title: ${this.title}`);
    console.log(`Content: ${this.content}`);
    if (this.footer) {
      console.log(`Footer: ${this.footer}`);
    }
    console.log('-------------------');
  }
}