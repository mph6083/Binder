import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { IngestComponent } from './pages/ingest/ingest.component';
import { EditorComponent } from './pages/editor/editor.component';
import { ExportComponent } from './pages/export/export.component';
import { MaterialModule } from './modules/material.module';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RenderCardComponent } from './components/render-card/render-card.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    IngestComponent,
    EditorComponent,
    ExportComponent,
    RenderCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    MonacoEditorModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
