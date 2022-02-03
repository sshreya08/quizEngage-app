import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { QuizSelectComponent } from './components/quiz-select/quiz-select.component';
import { QuizStartComponent } from './components/quiz-start/quiz-start.component';
const routes: Routes = [
  { path: '', redirectTo: '/quiz-select', pathMatch: 'full' },
  {
    path: 'quiz-select',
    component: QuizSelectComponent,
  },
  {
    path: 'quiz-start',
    component: QuizStartComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
