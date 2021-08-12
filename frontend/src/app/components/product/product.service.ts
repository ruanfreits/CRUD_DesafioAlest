import { Injectable } from '@angular/core';
import { Product } from './product.model';
import { MatSnackBar} from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})


export class ProductService {
  
baseUrl = "http://localhost:3001/products"


product!:Product;

  constructor(private snackBar: MatSnackBar,
     private http: HttpClient,
     private firestore: AngularFirestore
     ){ }


 


     getProdutos(): Observable<any> {
      return this.firestore.collection('Items', ref => ref.orderBy('fecharCriacao', 'asc')).snapshotChanges();
    }


 //Serviços para Cloud


    atualizarProduto(Id:string, data:any):Promise<any>{
      return this.firestore.collection('Items').doc(Id).update(data);
    }


  CriarProduto(Produto:any):Promise<any>{
    return this.firestore.collection('Items').add(Produto)

}

getProduto(id:string):Observable<any>{
  return this.firestore.collection('Items').snapshotChanges();
}


excluirProduto(id:string):Promise<any>{
  return this.firestore.collection("Items").doc(id).delete();
}










showMenssage(msg: string): void{
  this.snackBar.open(msg, 'X', {
    duration:3000,
    horizontalPosition: "right",
    verticalPosition: "top"
  
  })
}



//Serviços para Json Serve
create(product: Product): Observable<Product> {
  return this.http.post<Product>(this.baseUrl, product); 
}



change(price:any, product: Product):Observable<Product> {  

  console.log("valor inicio: "+ price);

  let x = price.replace(",",".");

  //let mod = `${this.product.price.replace(".",",")}`

  console.log(x +"Valor modificado")

  return price = x;
}

  read(): Observable<Product[]>{
    return this.http.get<Product[]>(this.baseUrl)
  }

  readById(id: number): Observable<Product>{
    const url = `${this.baseUrl}/${id}`
    return this.http.get<Product>(url)
  }

  update(product: Product): Observable<Product>{
    const url = `${this.baseUrl}/${product.id}`;
    return this.http.put<Product>(url, product)
  }


  delete(id:number): Observable<Product>{
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<Product>(url);
  }

}
