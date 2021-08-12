import { Product } from '../product.model';

import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ProductCreateComponent } from '../product-create/product-create.component';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {
  product!: Product

Id!:string|null;
  
constructor(
    private productService: ProductService,
     private Router: Router,
     private route: ActivatedRoute,
    private prodcreat: ProductCreateComponent
     ) { }


     EditarProduto(Id:string){
       const Produto: any ={
         Produto:this.prodcreat.formularioProduto.value.Produto,
         Preco:this.prodcreat.formularioProduto.value.Preco,
         Cor:this.prodcreat.formularioProduto.value.Cor,
       } 

this.prodcreat.loading = true;
 this.productService.atualizarProduto(Id,Produto).then(()=>{
   this.prodcreat.loading = false;
 })
this.Router.navigate(['/product-read-cloud']);
     }











  ngOnInit(): void {
this.prodcreat.esEditar()

    const id = +Number(this.route.snapshot.paramMap.get('id'));
    this.productService.readById(id).subscribe((product =>{
      this.product = product;
}))
  }



//Json Server

  alter(price:any, product:Product):number {
    price = this.productService.change(this.product.price, this.product);
    console.log(this.product.price+">>>>"+price);
  return this.product.price = price;
}


updateProduct():void{
  //this.alter(this.product.price, this.product);
  this.productService.update(this.product).subscribe(()=>{
    this.productService.showMenssage("Produto Atualizado com sucesso")
  
    this.Router.navigate(["/products"]);
  })
}


cancel():void {
this.Router.navigate(['/products']);
}

}
