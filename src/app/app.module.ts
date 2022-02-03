import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AngularMaterialModule } from './angular-material.module';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { QuizSelectComponent } from './components/quiz-select/quiz-select.component';
import { AppConstant } from './constant';
import { QuizStartComponent } from './components/quiz-start/quiz-start.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    QuizSelectComponent,
    QuizStartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    AngularMaterialModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
