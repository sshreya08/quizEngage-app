import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { HttpQuizService } from '../../services/http-quiz.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { QuestionOption } from '../../model/options';

@Component({
  selector: 'app-quiz-start',
  templateUrl: './quiz-start.component.html',
  styleUrls: ['./quiz-start.component.scss'],
})
export class QuizStartComponent implements OnInit {
  constructor(
    private httpQuizService: HttpQuizService,
    private router: Router
  ) {}

  level = this.httpQuizService.difficultyLevel;
  totalPoints = this.httpQuizService.currentScore;
  submitted = false;
  isLoading = of(false);

  form = new FormGroup({
    level: new FormControl('', Validators.required),
  });

  get f() {
    return this.form.controls;
  }

  question: QuestionOption = {
    text: '',
    options: [],
    answerId: '',
    category: '',
  };

  selectedOption = '';
  rightAnswer = false;
  correctAnswer: string | undefined;
  @ViewChild('form') mytemplateForm: NgForm;

  ngOnInit() {
    this.getQuestion();
  }

  getQuestion() {
    this.isLoading = of(true);
    this.httpQuizService.getRandomQuestions().subscribe(
      (data) => {
        console.log(data);
        this.question.text = data.text;
        this.question.answerId = data.answerId;
        this.question.category = data.category;
        this.httpQuizService
          .getQuestionOptions(this.question.category.toUpperCase())
          .subscribe(
            (data) => {
              this.isLoading = of(false);
              console.log(
                this.handleDifficultyLevel(
                  data,
                  this.level,
                  this.question.answerId
                )
              );
              this.question.options = this.handleDifficultyLevel(
                data,
                this.level,
                this.question.answerId
              );
            },
            (error) => {
              console.log(error);
            }
          );
        console.log(this.question);
      },
      (error) => {
        this.isLoading = of(false);
        console.log(error);
      }
    );
  }

  handleDifficultyLevel(arr: any, level: string, rightAnswer: string) {
    const correctAnswer = arr.find((arr: any) => arr.id === rightAnswer);
    let newArray = [correctAnswer];
    const otherAnswers = arr.filter((arr: any) => arr.id !== rightAnswer);
    switch (level) {
      case 'easy':
        newArray = [...newArray, ...otherAnswers.slice(0, 2)];
        break;
      case 'medium':
        newArray = [...newArray, ...otherAnswers.slice(0, 3)];
        break;
      case 'hard':
        newArray = [...newArray, ...otherAnswers.slice(0, 4)];
        break;
      default:
        newArray = [...newArray, ...otherAnswers.slice(0, 2)];
    }
    return this.shuffleArray(newArray);
  }

  shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  handleChange(option: any) {
    console.log(option);
    this.selectedOption = option.id;
  }

  checkAnswer() {
    return this.selectedOption === this.question.answerId ? true : false;
  }

  onSumbitOption() {
    this.submitted = true;
    this.correctAnswer = this.question.options.find(
      (option) => option.id === this.question.answerId
    )?.label;

    if (this.checkAnswer()) {
      this.rightAnswer = true;
      this.httpQuizService.currentScore++;
      this.totalPoints = this.httpQuizService.currentScore;
    } else {
      this.rightAnswer = false;
      this.totalPoints = this.httpQuizService.currentScore;
    }
  }

  reset() {
    // this.mytemplateForm.reset();
    this.form.reset();
    this.rightAnswer = false;
    this.submitted = false;
    this.correctAnswer = '';
    this.question = {
      text: '',
      options: [],
      answerId: '',
      category: '',
    };
  }

  nextQuestion() {
    this.reset();
    this.getQuestion();
  }
}
