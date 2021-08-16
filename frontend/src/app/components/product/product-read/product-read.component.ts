import { Component, NgModule, OnInit } from '@angular/core';

import { Product } from '../product.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../product.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-read',
  templateUrl: './product-read.component.html',
  styleUrls: ['./product-read.component.css']
})
export class ProductReadComponent implements OnInit {

  title = 'firestore';

  criarProduto: FormGroup;
    submitted = false;
  items:Observable<any[]>;
  

  products: Product[]=[]
  displayedColumns = ['id', 'name', 'price', 'color', 'action'];


  constructor(
    private fb:FormBuilder,
    private productService: ProductService,
    private firestore : AngularFirestore,){
         this.criarProduto= this.fb.group({
          Produto:['',Validators.required],
        Preço:['',Validators.required]
      })

      this.items = firestore.collection('Items').valueChanges();
  }
  
  SalvarProduto(){
    this.submitted = true;
    if(this.criarProduto.invalid){
      return;
    }
      const produto: any={
        Produto: this.criarProduto.value.Produto,
        Preço:this.criarProduto.value.Preço,
      fecharCriacao: new Date(),
      fecharAtualizacao:new Date()
      }
    this.productService.CriarProduto(produto).then(()=>{
      console.log("Criado Produto com sucesso!!");
    }).catch(error =>{
      console.log(error);
    }) 
  }
  
  ngOnInit(): void {
    this.productService.read().subscribe(products=> {
      this.products = products
      console.log(products)
    });
  }
}
