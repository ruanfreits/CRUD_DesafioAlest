import { Product } from "./../product.model";

import { Router} from "@angular/router";
import { ProductService } from "./../product.service";

import { ActivatedRoute} from "@angular/router"
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { AngularFirestore } from "@angular/fire/firestore";
import { Validators } from "@angular/forms";
import { Observable } from "rxjs";
@Component({
  selector: "app-product-delete",
  templateUrl: "./product-delete.component.html",
  styleUrls: ["./product-delete.component.css"],
})
export class ProductDeleteComponent {
  product!: Product;

  title = 'firestore';
    formularioProduto: FormGroup;
    submitted = false;
    items:Observable<any[]>;
  
  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,

    private fb:FormBuilder,
    private firestore : AngularFirestore,){
      this.formularioProduto= this.fb.group({
      Produto:['',Validators.required],
      Preco:['',Validators.required],
      Cor:['',Validators.required]
      })
        this.items = firestore.collection('Items').valueChanges();
    } 
  
  
  
  eliminarProduto(id: string){
    this.productService.excluirProduto(id).then(()=>{
      console.log("Produto Excluido")
    }).catch(error => {
      console.log(error);
    })
  }
  


  
  
  ngOnInit(): void {
    const id = +Number(this.route.snapshot.paramMap.get('id'));
    this.productService.readById(id).subscribe((product) => {
      this.product = product;
    });
  }







  deleteProduct(): void {
    this.productService.delete(this.product.id).subscribe(() => {
      
      this.productService.showMenssage("Produto excluido com sucesso!");
      
      this.router.navigate(["/products"]);
    });
  }

  cancel(): void {
    this.router.navigate(["/products"]);
  }
}