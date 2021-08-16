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


UpdateIProdutos(produtoId:string, payload:IProdutos):Promise<any>{
  
  return this.firestore.collection('Items').doc(produtoId).update(payload);
}




//updateIProdutos(produtoId: string, payload: IProdutos){
//  return this.firestore.doc('Items/'+ produtoId).update(payload);
//  }


  deleteIProdutos(ProdutoId: string):Promise<any>{
   return this.firestore.collection("Items").doc(ProdutoId).delete();
  }

//deleteIProdutos(ProdutoId: any){
  //return this.firestore.doc('Items/'+ ProdutoId).delete();
//}


}

export interface IProdutos{
  id: string;
  Produto: string;
  Preco:number;
  Cor:string;
}