import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { map, switchMap } from 'rxjs/operators';

import * as CompanyActions from './company.actions';
import { navigate } from '../../store/actions/router.actions';
import { CompanyService } from '../company.service';
import { loadCompanies, loadCompaniesSuccess } from '../../store/actions/static.actions';


@Injectable()
export class CompanyEffects {

  filter$ = createEffect(() => this.actions$.pipe(
    ofType(CompanyActions.filterCompany),
    map(({ filters }) => navigate({ commands: [], extras: { queryParams: filters } }))
  ));

  save$ = createEffect(() => this.actions$.pipe(
    ofType(CompanyActions.saveCompany),
    switchMap(({ company }) => this.service.save(company).pipe(
      map(() => CompanyActions.saveCompanySuccess())
    ))
  ));

  verify$ = createEffect(() => this.actions$.pipe(
    ofType(CompanyActions.verifyCompany),
    switchMap(({ company }) => this.service.verify(company).pipe(
      map(() => CompanyActions.saveCompanySuccess())
    ))
  ));

  merge$ = createEffect(() => this.actions$.pipe(
    ofType(CompanyActions.mergeCompanies),
    switchMap(({ from, into }) => this.service.merge(from, into).pipe(
      map(() => CompanyActions.saveCompanySuccess())
    ))
  ));

  cancel$ = createEffect(() => this.actions$.pipe(
    ofType(CompanyActions.cancelCompany),
    switchMap(({ company }) => this.service.cancel(company).pipe(
      map(() => CompanyActions.saveCompanySuccess())
    ))
  ));

  saved$ = createEffect(() => this.actions$.pipe(
    ofType(CompanyActions.saveCompanySuccess),
    map(() => loadCompanies())
  ));

  loading$ = createEffect(() => this.actions$.pipe(
    ofType(
      CompanyActions.saveCompany,
      CompanyActions.cancelCompany,
      CompanyActions.mergeCompanies,
      CompanyActions.verifyCompany,
      loadCompanies
    ),
    map(() => CompanyActions.companyLoading({ loading: true }))
  ));

  loadingDone$ = createEffect(() => this.actions$.pipe(
    ofType(CompanyActions.saveCompanySuccess, loadCompaniesSuccess),
    map(() => CompanyActions.companyLoading({ loading: false }))
  ));

  constructor(private actions$: Actions, private service: CompanyService) {
  }

}
