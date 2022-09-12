import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  constructor(private router:Router) { }


  ngOnInit(): void {
  }

  newProject(){
    setTimeout( () => { // gives the animation some time to execute
      this.router.navigateByUrl("/export");
    },100 )
  }

}