import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ItemI } from '../models/item.interface';
import { map } from 'rxjs/operators';

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

  public getUniversities(): Observable<ItemI[]>{
    return this.afs.collection('university')
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
