import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ItemI } from '../models/item.interface';
import { map } from 'rxjs/operators';
import { UniversityI } from '../models/university.interface';
import { OpportunityI } from '../models/opportunity';
import { HistoryI } from '../models/history.interface';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {

  constructor(private afs: AngularFirestore) { }

  public getCarousel(): Observable<ItemI[]>{
    return this.afs.collection('carousel')
    .snapshotChanges()
    .pipe(
      map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() as ItemI;
            const id = a.payload.doc.id;
            return { id, ... data };
          })
        )
    )
  }

  public getDescription(): Observable<ItemI[]>{
    return this.afs.collection('feature')
    .snapshotChanges()
    .pipe(
      map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() as ItemI;
            const id = a.payload.doc.id;
            return { id, ... data };
          })
        )
    )
  }

  public getUniversities(): Observable<UniversityI[]>{
    return this.afs.collection('university')
    .snapshotChanges()
    .pipe(
      map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() as UniversityI;
            const id = a.payload.doc.id;
            return { id, ... data };
          })
        )
    )
  }

  public getOpportunities(): Observable<OpportunityI[]>{
    return this.afs.collection('opportunity')
    .snapshotChanges()
    .pipe(
      map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() as OpportunityI;
            const id = a.payload.doc.id;
            return { id, ... data };
          })
        )
    )
  }

  public getHistories(): Observable<HistoryI[]>{
    return this.afs.collection('history')
    .snapshotChanges()
    .pipe(
      map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() as HistoryI;
            const id = a.payload.doc.id;
            return { id, ... data };
          })
        )
    )
  }

  public getResearch(): Observable<ItemI[]>{
    return this.afs.collection('research')
    .snapshotChanges()
    .pipe(
      map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() as ItemI;
            const id = a.payload.doc.id;
            return { id, ... data };
          })
        )
    )
  }

}
