import { Component, Input, OnInit } from '@angular/core';
import { RenderOptions } from 'src/app/models/objects';

@Component({
  selector: 'app-render-card',
  templateUrl: './render-card.component.html',
  styleUrls: ['./render-card.component.scss']
})
export class RenderCardComponent implements OnInit {

  status:string = "";
  fileName: string = "";
  outputFile?:File;

  @Input() options?:RenderOptions;
  @Input() toPdf = true;
  
  constructor() { 
    this.status = "Waiting"
  }

  ngOnInit(): void {
  }

}
