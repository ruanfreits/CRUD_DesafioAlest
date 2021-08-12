//JsonImport
import {Product} from './../product.model'
import{ ProductService} from './../product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


//Cloud Imports
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})

export class ProductCreateComponent implements OnInit{





  constructor(
    //JSON SERVE//
    private productService: ProductService,
    private router: Router,
    private aRouter: ActivatedRoute,
    //CLOUD//
    private fb:FormBuilder,
    private firestore : AngularFirestore,){
      this.formularioProduto= this.fb.group({
      Produto:['',Validators.required],
      Preco:['',Validators.required],
      Cor:['',Validators.required]
      })
        this.items = firestore.collection('Items').valueChanges();
    this.Id = this.aRouter.snapshot.paramMap.get('id'); 
  console.log(this.Id);    
  } 
  

  //CLOUD//
    title = 'firestore';
    formularioProduto: FormGroup;
    submitted = false;
    Id!:string|null;
    loading = false;
    items:Observable<any[]>;
    




    CriarProduto(){
      this.submitted = true;
      if(this.formularioProduto.invalid){
        return;
      }
        const produto: any={
          Produto: this.formularioProduto.value.Produto,
          Preco: this.formularioProduto.value.Preco,
          Cor:this.formularioProduto.value.Cor,
        fecharCriacao: new Date(),
        fecharAtualizacao:new Date()
        }

      this.productService.CriarProduto(produto).then(()=>{
        console.log("Criado Produto com sucesso!!");
      }).catch(error =>{
        console.log(error);
      })
  
    }



//JSON SERVE
  product: Product ={
  id: null as any,
  name:'',
  price: null as any,
  color: '',
}
 
  ngOnInit(): void {
  this.esEditar();
  }

esEditar(){
  this.title = "Editar Produto"
  if(this.Id !== null){
  this.loading = true;
  this.productService.getProduto(this.Id).subscribe(data=>
    {
      this.loading = false;
      this.formularioProduto.setValue({
        Produto: data.payload.data()['Produto'],
        Preco: data.payload.data()['Preco'],
        Cor: data.payload.data()['Cor']
      })
    })
  }
}




  alter(preco:any, product:Product):number {
    preco = this.productService.change(this.product.price, this.product);
    console.log(this.product.price+">>>>"+preco);
  return this.product.price = preco;
}

//Criar Produto JSON-Serve
  createProduct(): void{
    this.alter(this.product.price, this.product);
    this.productService.create(this.product).subscribe(()=>{

      console.log(this.product.price+ "Changed Dude!!");
      //this.product.price.toString().replace(",",".");
      
      //alert("Preço do produto: " +this.product.price);
      this.productService.showMenssage('Produto criado!!');
      this.router.navigate(['/products']);

    })
    
  }

  change():void{
    this.product.price
  }

  cancel(): void{
    this.router.navigate(["/products"]);
 
  }

  
}
