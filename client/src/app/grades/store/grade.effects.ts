import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { map, switchMap } from 'rxjs/operators';

import * as GradeActions from './grade.actions';
import { saveGradeSuccess } from './grade.actions';
import { GradeService } from '../grade.service';
import { loadGrades, loadGradesSuccess } from '../../store/actions/static.actions';
import { navigate } from '../../store/actions/router.actions';


@Injectable()
export class GradeEffects {

  upload$ = createEffect(() => this.actions$.pipe(
    ofType(GradeActions.uploadGrades),
    switchMap(action => this.service.upload(action.file).pipe(
      map(() => saveGradeSuccess())
    ))
  ));

  filter$ = createEffect(() => this.actions$.pipe(
    ofType(GradeActions.filterGrade),
    map(action => navigate({ commands: [], extras: { queryParams: action.filter } }))
  ));

  save$ = createEffect(() => this.actions$.pipe(
    ofType(GradeActions.saveGrade),
    switchMap(action => this.service.save(action.grade)
      .pipe(
        map(res => GradeActions.saveGradeSuccess())
      ))
    )
  );

  verify$ = createEffect(() => this.actions$.pipe(
    ofType(GradeActions.verifyGrade),
    switchMap(action => this.service.verify(action.grade)
      .pipe(
        map(res => GradeActions.saveGradeSuccess())
      )
    )
  ));

  merge$ = createEffect(() => this.actions$.pipe(
    ofType(GradeActions.merge),
    switchMap((action) => this.service.merge(action.payload.from, action.payload.into)
      .pipe(map(res => GradeActions.saveGradeSuccess()))
    )
  ));

  cancel$ = createEffect(() => this.actions$.pipe(
    ofType(GradeActions.cancelGrade),
    switchMap(action => this.service.cancel(action.grade)
      .pipe(
        map(res => GradeActions.saveGradeSuccess())
      ))
  ));

  loading$ = createEffect(() => this.actions$.pipe(
    ofType(GradeActions.cancelGrade, GradeActions.saveGrade, GradeActions.verifyGrade, GradeActions.uploadGrades, loadGrades),
    map(() => GradeActions.loading({ loading: true }))
  ));

  loadingDone$ = createEffect(() => this.actions$.pipe(
    ofType(GradeActions.saveGradeSuccess, loadGradesSuccess),
    map(() => GradeActions.loading({ loading: false }))
  ));

  loadGrades$ = createEffect(() => this.actions$.pipe(
    ofType(GradeActions.saveGradeSuccess),
    map(() => loadGrades())
  ));


  constructor(private actions$: Actions, private service: GradeService) {
  }

}
