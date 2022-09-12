import { Component, OnInit } from '@angular/core';
import { EpubService } from 'src/app/services/epub.service';
import { saveAs } from 'file-saver';
import { Router } from '@angular/router';
@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.scss']
})
export class ExportComponent implements OnInit {

  toggle = false


  RenderQueue = [];
  constructor(private epubService:EpubService,private router:Router) { }

  ngOnInit(): void {
    if(this.epubService.intermediateFiles.length != 0){
    }
    else{
      this.router.navigateByUrl("ingest");
    }
  }

  async run(){
    const editedEpub =  await this.epubService.renderToEpub();
    saveAs(editedEpub,"test-epub-file.zip");
  }
  async run2(){
    const editedEpub =  await this.epubService.renderToPdf();
    saveAs(editedEpub,"test-epub-file.pdf");
  }

}

