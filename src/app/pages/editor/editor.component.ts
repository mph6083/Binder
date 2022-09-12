import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EpubService } from 'src/app/services/epub.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  editorOptions = {theme: 'vs-dark', language: 'html', scrollBeyondLastLine: false};
  code: any[] = [{src:'function x() {\nconsole.log("Hello world!");\n}'},{src:'function x() {\nconso("Hello world!");\n}'}];
  i = 0;

  codeHolder:{src:string,filename:string} = {src:"",filename:""}
  constructor(public epubService:EpubService, private router:Router) { }

  ngOnInit(): void {
    if(this.epubService.intermediateFiles.length != 0){
      this.codeHolder = this.epubService.intermediateFiles[0];
    }
    else{
      this.router.navigateByUrl("ingest");
    }
    
  }

  toggleCode(){
    this.i = (this.i + 1) % this.epubService.intermediateFiles.length;
    this.codeHolder = this.epubService.intermediateFiles[this.i];
  }
  setFile(index:number){
    this.i = index
    this.codeHolder = this.epubService.intermediateFiles[this.i];
  }

  export(){
    this.router.navigateByUrl("/export");
  }
}
