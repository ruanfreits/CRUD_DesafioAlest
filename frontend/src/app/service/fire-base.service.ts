import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class FireBaseService {
  constructor(
    private firestore: AngularFirestore,
  ) {

   }



   getIProdutos(){
    return this.firestore.collection('Items').snapshotChanges();
    }


    
addIProdutos(payload: IProdutos){
  return this.firestore.collection('Items').add(payload);
}

  updateIProdutos(produtoId: string, payload: IProdutos){
  return this.firestore.doc('Items'+ produtoId).update(payload);
  }

deleteIProdutos(produtoId: string){
  return this.firestore.doc('Items'+ produtoId).delete()
}


}


export interface IProdutos{
  id?: string;
  Produto: string;
  Preco:number;
  Cor:string;
}