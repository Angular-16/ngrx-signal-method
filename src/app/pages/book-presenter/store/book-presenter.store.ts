import { computed } from '@angular/core';
import { patchState, signalMethod, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { withDevtools } from '@angular-architects/ngrx-toolkit';

import { initialBookPresenterSlice } from './book-presenter.slice';
import { BOOKS_COLLECTION } from '../../../data/books-collection';

export const BookPresenterStore = signalStore(
    withState(initialBookPresenterSlice),
    withComputed(store => ({
        book: computed(() => BOOKS_COLLECTION[store.id()])
    })),
    withMethods(store => ({
        setBookId: signalMethod<number>(id => patchState(store, { id }))
    })),
    withDevtools('books-browser')
)