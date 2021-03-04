import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ItemI } from '../models/item.interface';
import { map } from 'rxjs/operators';
import { UniversityI } from '../models/university.interface';
import { OpportunityI } from '../models/opportunity';
import { HistoryI } from '../models/history.interface';
import { FacultyI } from '../models/faculty.interface';
import { ResearchI } from '../models/research.interface';
import { NgxSpinnerService } from "ngx-spinner";

@Injectable({
  providedIn: 'root'
})
export class GetDataService {

  constructor(private afs: AngularFirestore, private spinner: NgxSpinnerService) { }

  public getCarousel(): Observable<ItemI[]> {
    /** spinner starts on init */
    this.spinner.show();
    return this.afs.collection('carousel')
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() as ItemI;
            const id = a.payload.doc.id;
            let result = { id, ...data };
            this.spinner.hide();
            return result;
          })
        )
      )
  }

  public getDescription(): Observable<ItemI[]> {
    //this.spinner.show();
    return this.afs.collection('feature')
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() as ItemI;
            const id = a.payload.doc.id;
            let result = { id, ...data };
            //this.spinner.hide();
            return result;
          })
        )
      )
  }

  public getUniversities(): Observable<UniversityI[]> {
    //this.spinner.show();
    return this.afs.collection('university')
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() as UniversityI;
            const id = a.payload.doc.id;
            let result = { id, ...data };
            //this.spinner.hide();
            return result;
          })
        )
      )
  }

  public getFaculties(): Observable<FacultyI[]> {
    //this.spinner.show();
    return this.afs.collection('faculty')
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() as FacultyI;
            const id = a.payload.doc.id;
            let result = { id, ...data };
            //this.spinner.hide();
            return result;
          })
        )
      )
  }

  public getFaculties2(): Observable<FacultyI[]> {
    //this.spinner.show();
    return this.afs.collection('faculty')
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() as FacultyI;
            const id = a.payload.doc.id;
            let result = { id, ...data };
            //this.spinner.hide();
            return result;
          })
        )
      )
  }

  /*this.firestoreService.colWithIds$('restaurants').pipe(
    switchMap((restaurants: any[]) => { 
      const res = restaurants.map((r: any) => { 
        return this.firestoreService
          .col$(`restaurants/${r.id}/ratings`)
          .pipe(
            map(ratings => Object.assign(restaurant, {ratings}))
          ); 
        }); 
      return combineLatest(...res); 
    })
    ).subscribe(restaurants => console.log(restaurants);*/

  public getOpportunities(): Observable<OpportunityI[]> {
    //this.spinner.show();
    return this.afs.collection('opportunity')
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() as OpportunityI;
            const id = a.payload.doc.id;
            let result = { id, ...data };
            //this.spinner.hide();
            return result;
          })
        )
      )
  }

  public getHistories(): Observable<HistoryI[]> {
    //this.spinner.show();
    return this.afs.collection('history')
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() as HistoryI;
            const id = a.payload.doc.id;
            let result = { id, ...data };
            //this.spinner.hide();
            return result;
          })
        )
      )
  }

  public getResearch(): Observable<ResearchI[]> {
    //this.spinner.show();
    return this.afs.collection('research')
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() as ResearchI;
            const id = a.payload.doc.id;
            let result = { id, ...data };
            //this.spinner.hide();
            return result;
          })
        )
      )
  }

  public getOpportunity(id: string): Observable<OpportunityI> {
    return this.afs.doc<OpportunityI>(`opportunity/${id}`).valueChanges();
  }

}
