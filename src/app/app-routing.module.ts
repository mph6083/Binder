import { Injectable, NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterModule, RouterStateSnapshot, Routes, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { EditorComponent } from './pages/editor/editor.component';
import { ExportComponent } from './pages/export/export.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { IngestComponent } from './pages/ingest/ingest.component';
import { EpubService } from './services/epub.service';



const routes: Routes = [
  { path: 'homepage', component: HomepageComponent },
  { path: 'ingest', component: IngestComponent },
  { path: 'editor', component: EditorComponent },
  { path: 'export', component: ExportComponent},
  { path: '', redirectTo: '/homepage', pathMatch: 'full' },
  { path: '**', redirectTo: '/homepage' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


