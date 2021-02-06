import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import * as _dateformat from 'dateformat';

export interface Mitra {}
export interface Loket {}

@Injectable({
  providedIn: 'root',
})
export class LoketService {
  currentDate = new Date();
  filterDate = _dateformat(this.currentDate, 'ddmmyyyy');

  constructor(private firestore: AngularFirestore) {}

  getMitra(userId: string) {
    return this.firestore
      .collection('mitra', (ref) => ref.where('user_id', '==', userId))
      .snapshotChanges()
      .pipe(
        map((arr) => {
          return arr.map((doc) => {
            const data = doc.payload.doc.data();

            return { id: doc.payload.doc.id, data } as Mitra;
          });
        })
      );
  }

  getLoket(mitraId: string) {
    return this.firestore
      .collection('loket', (ref) => ref.where('mitra_id', '==', mitraId))
      .snapshotChanges()
      .pipe(
        map((arr) => {
          return arr.map((doc) => {
            const data = doc.payload.doc.data();

            return { id: doc.payload.doc.id, data } as Loket;
          });
        })
      );
  }

  getAntreanNow(loketId: string) {
    return this.firestore
      .collection('setting-tiket')
      .doc(this.filterDate)
      .collection(loketId)
      .valueChanges();
  }

  createNewAntrean(data: any, detailAntrean: any) {
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection('tiket')
        .doc(this.filterDate)
        .collection(detailAntrean.mitra_id)
        .doc(detailAntrean.id_antrean)
        .set(data)
        .then(
          (res) => {
            this.updateTotalAntrean(data.no_antrean, data.loket_id);
            if (data.no_antrean == 1) {
              this.updateCurrentAntrean(0, data.loket_id);
            }
          },
          (err) => reject(err)
        );
    });
  }

  updateCurrentAntrean(value: number, loketId: string) {
    return this.firestore
      .collection('setting-tiket')
      .doc(this.filterDate)
      .collection(loketId)
      .doc('1')
      .set({ current: value }, { merge: true });
  }

  updateTotalAntrean(value: number, loketId: string) {
    return this.firestore
      .collection('setting-tiket')
      .doc(this.filterDate)
      .collection(loketId)
      .doc('1')
      .set({ total: value }, { merge: true });
  }

  encryptCodeAntrean(param: string) {
    let code = param.toLocaleLowerCase();
    let value = '';
    switch (code) {
      case 'a':
        value = '01';
        break;
      case 'b':
        value = '02';
        break;
      case 'c':
        value = '03';
        break;
      case 'd':
        value = '04';
        break;
      case 'e':
        value = '05';
        break;
      case 'f':
        value = '06';
        break;
      case 'g':
        value = '07';
        break;
      case 'h':
        value = '08';
        break;
      case 'i':
        value = '09';
        break;
      case 'j':
        value = '10';
        break;
      case 'k':
        value = '11';
        break;
      case 'l':
        value = '12';
        break;
      case 'm':
        value = '13';
        break;
      case 'n':
        value = '14';
        break;
      case 'o':
        value = '15';
        break;
      case 'p':
        value = '16';
        break;
      case 'q':
        value = '17';
        break;
      case 'r':
        value = '18';
        break;
      case 's':
        value = '19';
        break;
      case 't':
        value = '20';
        break;
      case 'u':
        value = '21';
        break;
      case 'v':
        value = '22';
        break;
      case 'w':
        value = '23';
        break;
      case 'x':
        value = '24';
        break;
      case 'y':
        value = '25';
        break;
      case 'z':
        value = '26';
        break;
      default:
        value: '';
    }

    return value;
  }
}
