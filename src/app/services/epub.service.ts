import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as JSZip from 'jszip';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EpubService {

  private originalZip?: JSZip
  private metadata: any = undefined;
  private isInitalized: boolean = false;
  public intermediateFiles: { src: string, filename: string }[] = []
  public intermediateFiles_new: Map<string, string> = new Map<string, string>();
  constructor(private http:HttpClient) {

  }

  hasBeenInitalized(): boolean {
    return this.isInitalized;
  }

  async init(originalZip: JSZip) {

    this.isInitalized = true;
    this.originalZip = originalZip;

    let promises: Promise<any>[] = [];
    let paths: string[] = [];

    this.originalZip!.forEach((relativePath, file) => {
      if ((file.name.endsWith(".xhtml") || file.name.endsWith(".css") || file.name.endsWith(".html") || file.name.endsWith(".xml") || file.name.endsWith(".opf"))) {
        promises.push(file.async("text"));
        paths.push(relativePath);
      }
    })

    const data = await Promise.all(promises);

    for (let i = 0; i < paths.length; i++) {
      this.intermediateFiles.push({ src: data[i], filename: paths[i] })
      this.intermediateFiles_new.set(paths[i], data[i])
    }

    if(!this.intermediateFiles_new.has("BinderCss.html")){
      this.intermediateFiles.unshift({src:this.binderCss(),filename:"BinderCss.html"})
      this.intermediateFiles_new.set("BinderCss.html",this.binderCss());
    }

  }

  public async renderToEpub(): Promise<File> {
    if (!this.isInitalized) {
      throw new Error("service not initalized");
    }
    const zip = await this.renderNonDynamicAssets();
    for (let file of this.intermediateFiles) {
      zip.file(file.filename, file.src)
    }
    const filedata = await zip.generateAsync({ type: "blob" });
    const generatedFile = new File([filedata], "epub.zip",{"type":"application/epub+zip"});
    return generatedFile;

  }

  public async renderToPdf(): Promise<File> {
    this.oldToNew();
    if (!this.isInitalized) {
      throw new Error("service not initalized");
    }
    const zip = await this.renderNonDynamicAssets();

    let xmlStringData = this.intermediateFiles_new.get("META-INF/container.xml");

    let parser = new DOMParser();
    let xmlDoc = parser.parseFromString(xmlStringData!, "text/xml");

    let path = xmlDoc.getElementsByTagName("rootfile")[0].getAttribute("full-path");
    let folders = path?.split("/")
    folders?.pop()
    const folderPath = folders?.join("/")
    xmlStringData = this.intermediateFiles_new.get(path!);
    parser = new DOMParser();
    xmlDoc = parser.parseFromString(xmlStringData!, "text/xml");

    let spineElements = xmlDoc.getElementsByTagName("spine")[0].children;
    let htmlFile = "";
    htmlFile += this.intermediateFiles_new.get("BinderCss.html");
    let htmlSpineFiles: Set<string> = new Set<string>();
    //add files contained in the spine
    for (let i = 0; i < spineElements.length; i++) {
      let element = spineElements[i];
      let id = element.getAttribute("idref");
      let href = folderPath + "/" + xmlDoc.getElementById(id!)?.getAttribute("href");
      htmlSpineFiles.add(href);
      htmlFile += this.intermediateFiles_new.get(href);
    }

    htmlFile = htmlFile.replace(/<a.*\/>/g,"");

    //add edited files not contained in the spine
    for (let file of this.intermediateFiles) {
      if (!htmlSpineFiles.has(file.filename) && file.filename != "BinderCss.html") {
        zip.file(file.filename, file.src);
      }
    }

    zip.file(folderPath + "/index.html", htmlFile);

    const filedata = await zip.generateAsync({ type: "blob" });
    const generatedFile = new File([filedata], "ebook.zip",{"type":"application/epub+zip"});
    console.log(generatedFile);
    let returnval = await this.GetPdfFromServer(generatedFile);
    let returnPdf = new File([returnval], "ebook.zip",{"type":"application/epub+zip"});
    console.log(returnval);
    
    
    console.log(htmlFile);
    return returnPdf;

  }

  /**
   * take all the edited files and add them to the new render object 
   */
  oldToNew(){
    for(let file of this.intermediateFiles){
      this.intermediateFiles_new.set(file.filename,file.src);
    }
  }

  async GetPdfFromServer(filedata: File) {
    const apiLoc = "http://localhost:3000/";
    var formData = new FormData();

    formData.append('ebook', filedata,"file.zip");
    
    return await firstValueFrom(this.http.post(apiLoc + 'upload', formData, {responseType:"blob"}));
  }

  private async renderNonDynamicAssets(): Promise<JSZip> {
    const outputZip = new JSZip();
    let promises: Promise<any>[] = [];
    let paths: string[] = [];
    this.originalZip!.forEach((relativePath, file) => {
      if (!(file.name.endsWith(".xhtml") || file.name.endsWith(".css") || file.name.endsWith(".html"))) {
        promises.push(file.async("blob"));
        paths.push(relativePath);
      }
    })

    const data = await Promise.all(promises);

    for (let i = 0; i < paths.length; i++) {
      outputZip.file(paths[i], data[i]);
    }
    return outputZip;
  }


  /**
   * html file for the possible page render items
   * @returns template css html file string
   */
  binderCss():string{
    return `
<style>
@page{
  /* Page Size & orientation */
  /* size: A4 landscape; */


  /* page numbers */
  /* @bottom-left {
      content: counter(page) ' of ' counter(pages);
  } */
}
</style>

    `;
  }
}


class EpubEditFile {

}