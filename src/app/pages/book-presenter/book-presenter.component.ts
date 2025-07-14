import { Component, effect, inject, input, numberAttribute } from '@angular/core';
import { BookPresenterStore } from './store/book-presenter.store';
import { Router } from '@angular/router';
import { BOOKS_COLLECTION } from '../../data/books-collection';

@Component({
  selector: 'app-book-presenter',
  templateUrl: './book-presenter.component.html',
  styleUrl: './book-presenter.component.scss', 
  providers: [BookPresenterStore]
})
export default class BookPresenterComponent {
  readonly router = inject(Router);
  store = inject(BookPresenterStore);

  readonly id = input.required({ transform: numberAttribute });

  next(): void {
    this.router.navigate(['books', Math.min(this.id() + 1, BOOKS_COLLECTION.length-1)]);
  }

  previous(): void {
    this.router.navigate(['books', Math.max(this.id() - 1, 0)]);
  }

  constructor() {
    effect(() => this.store.setBookId(this.id()));
  }
}
