import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpQuizService } from '../../services/http-quiz.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-quiz-select',
  templateUrl: './quiz-select.component.html',
  styleUrls: ['./quiz-select.component.scss'],
})
export class QuizSelectComponent implements OnInit {
  constructor(
    private router: Router,
    private httpQuizService: HttpQuizService
  ) {}

  form = new FormGroup({
    level: new FormControl('', Validators.required),
  });

  level = this.form.value.level;

  get f() {
    return this.form.controls;
  }

  onStartquiz() {
    this.level = this.form.value.level;
    this.httpQuizService.difficultyLevel = this.level;
    this.router.navigateByUrl('quiz-start');
  }

  ngOnInit() {}
}
