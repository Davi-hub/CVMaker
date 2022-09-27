import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ForLang, Goals, Hobby, PerData, StuJobs, Tech, ItemTypes } from './data.model';


@Injectable({ providedIn: "root" })
export class DataService {

  goalsChanged = new Subject<Goals>();
  stuJobsListChanged = new Subject<StuJobs[]>();
  forLangsListChanged = new Subject<ForLang[]>();
  techListChanged = new Subject<Tech[]>();
  hobbyListChanged = new Subject<Hobby[]>();
  perDataChanged = new Subject<PerData>();

  constructor(private db: AngularFirestore, private afAuth: AngularFireAuth) { }

  personal: PerData = {
    firstName: "Péter",
    lastName: "Minta",
    phone: "+36123456789",
    email: "email@email.com",
    local: "1000 Budapest",
    github: "https://github.com/",
    linkedin: "https://www.linkedin.com/",
    profile: "https://thumbnails-4.fotky-foto.cz/400/11/93/81/FotkyFoto_person-silhouette-face-profile-man-guy-head-icon-vector-graphic_119381224.jpg"
  }

  fetchItem(collectionName: string) {
    return this.db.collection('users/' + this.userId + '/' + collectionName)
    .snapshotChanges()
    .pipe(
      map((docArray: any) => {
        const itemArray = [];
        for (let i = 0; i < docArray.length; i++) {
          if ((docArray[i].payload.doc.data() as ItemTypes).id) {
            const item = docArray[i].payload.doc.data() as ItemTypes;
            itemArray.push(item);
          } else {
            const item = { ...docArray[i].payload.doc.data() as ItemTypes, id: docArray[i].payload.doc.id };
            itemArray.push(item);
          }
        }
        return itemArray;
      })
    )
  }

  fetchGoals() {
    this.fetchItem('goals').subscribe((goals: any) => {
        this.goalsChanged.next(goals[0]);
      },
      error => {
        console.log(error)
      }
    );
  }

  fetchStuJobs() {
    this.fetchItem('stuJobs')
    .subscribe(data => {
      (data as StuJobs[]).sort((a, b) => b.years[0] - a.years[0]);
      this.stuJobsListChanged.next(data as StuJobs[]);
    });
  }

  fetchPerData() {
    this.fetchItem('perdata').subscribe((data: any) => {
      this.perDataChanged.next(data[0]);
      console.log(data[0]);
    });
  }

  fetchForLangs() {
    this.fetchItem('forLangs').subscribe((data: any) => {
      this.forLangsListChanged.next(data);
    });
  }

  fetchTech() {
    this.fetchItem('techs').subscribe((data: any) => {
      (data as Tech[]).sort((a: Tech, b: Tech) => a.index - b.index);
      this.techListChanged.next(data);
    });
  }

  fetchHobby() {
    this.fetchItem('hobbies').subscribe((data: any) => {
      this.hobbyListChanged.next(data);
      console.log(data);
    });
  }

  addItem(item: ItemTypes, collectionName: string) {
    this.db.collection('users/' + this.userId + '/' + collectionName).add(item);
  }

  updateItem(item: ItemTypes, collectionName: string) {
    this.db.doc('users/' + this.userId + '/' + collectionName + '/' + item.id).update(item);
  }

  deleteItem(item: ItemTypes, collectionName: string) {
    this.db.doc('users/' + this.userId + '/' + collectionName + '/' + item.id).delete();
  }

  createDataSet(id: any) {
    this.db.collection('users').doc(id).set({});
    this.db.collection('users').doc(id).collection('perdata').add(this.personal);
    this.db.collection('users').doc(id).collection('goals').add({ goalsText: "Magamról..." });
  }

  private get userId() {
    return this.afAuth.auth.currentUser?.uid;
  }
}
