import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as JSZip from 'jszip';
import { EpubService } from 'src/app/services/epub.service';

@Component({
  selector: 'app-ingest',
  templateUrl: './ingest.component.html',
  styleUrls: ['./ingest.component.scss']
})
export class IngestComponent implements OnInit {

  constructor(private epubService:EpubService, private router:Router) { }

  ngOnInit(): void {
  }

  jsZip: JSZip = new JSZip();


  async handleFileInput(event: any){
    let files = event.target?.files;
    let epubFile: File;
    console.log(files);
    console.log(files.length);
    if(files != undefined && files.length > 0){
      epubFile = files.item(0);
    }
    else{
      alert("Error in uploading File")
      return
    }

    let zipfile = await this.jsZip.loadAsync(epubFile);
    console.log(zipfile.files);
    await this.epubService.init(zipfile);
    console.log("inited");
    this.router.navigateByUrl("/editor");

    //https://segmentfault.com/a/1190000041686221/en
  }

}
