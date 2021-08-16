import { Component, OnInit,TemplateRef, NgModule, AfterViewInit,ViewChild, ɵɵqueryRefresh} from '@angular/core';

import { MatTableDataSource,MatTableDataSourcePaginator,} from '@angular/material/table';

import {MatPaginator} from '@angular/material/paginator'
import { Product } from '../product.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder,FormGroup, Validators,FormsModule } from '@angular/forms';
import { ProductService } from '../product.service';
import { Observable } from 'rxjs';
import { ProductCreateComponent } from '../product-create/product-create.component';
import {MatSort} from '@angular/material/sort';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FireBaseService, IProdutos } from 'src/app/service/fire-base.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { collectExternalReferences } from '@angular/compiler';
import { disableDebugTools } from '@angular/platform-browser';

@Component({
  selector: 'app-product-read-cloud',
  templateUrl: './product-read-cloud.component.html',
  styleUrls: ['./product-read-cloud.component.css']
})
export class ProductReadCloudComponent {


public form!:FormGroup;
public produtoList: IProdutos[] =[];

public ProdutoDetails!: IProdutos;
constructor(
  
  private fb:FormBuilder,
  private modalService: NgbModal,
  private fireBaseService: FireBaseService,
  private route: Router )
{

}

AuxId!:string 
AuxProd!:string
AuxPreco!:any
AuxCor!:string


ngOnInit():void{
  this.getIProdutos();
}

getIProdutos(): void {
  this.fireBaseService.getIProdutos().subscribe((res)=>{
    this.produtoList = res.map((Items)=>{
      return{
      ...Items.payload.doc.data() as{},
    id: Items.payload.doc.id
  } as IProdutos;
    });
})
}

openModa(content: TemplateRef<any>, ProdutoId:any, ProdutoPro:any, ProdutoPrice:any,ProdutoCor:any):void{

  this.ProdutoDetails!= this.produtoList.find((Items: IProdutos)=>Items.id === ProdutoId);
console.log(ProdutoId);
this.getIProdutos();

this.openProd(ProdutoId, ProdutoPro, ProdutoPrice,ProdutoCor);
console.log("Valor do aaux aqui:"+ this.AuxId)
this.formInit(this.ProdutoDetails, ProdutoId);
this.modalService.open(content, {backdrop: 'static', centered: true});
}



openProd(ProdutoId:string, ProdutoPro:string, ProdutoPrice:any,ProdutoCor:string):string{
  
  this.ProdutoDetails!= this.produtoList.find((Items: IProdutos)=>Items.id === ProdutoId);
  console.log(ProdutoId);
  this.formInit(this.ProdutoDetails, ProdutoId);
return this.AuxId = ProdutoId, this.AuxProd = ProdutoPro, this.AuxCor = ProdutoCor, this.AuxPreco = ProdutoPrice
}





formInit(data: IProdutos, ProdutoId:string):void{

  this.form = this.fb.group({
  id:[{value: this.AuxId, disabled: true}, Validators.required],
  Produto:[{value: this.AuxProd, disabled:false}, Validators.required],
  Preco:[{value: this.AuxPreco, disabled:false},Validators.required],
  Cor:[{value: this.AuxCor, disabled:false},Validators.required]
})
}



ProdutoId!: string



addProdutos():void{
  this.fireBaseService.addIProdutos(this.form.value).then();
}

updateProdutos():void{
console.log("Valor do aux aqui: "+ this.AuxId)


  this.fireBaseService.updateIProdutos(this.AuxId, this.form.value).then(ref =>{location.reload()});
  
}

deleteProduto(ProdutoId :string):void{
  this.fireBaseService.deleteIProdutos(ProdutoId).then();

}
}




/*
  Produtos: any[]=[];

products: Product[]=[]
displayedColumns =['id', 'Produtos', 'Preco', 'color', 'action'];
//dataSource = new MatTableDataSource(ELEMENT_DATA);




constructor(private produtoService: ProductService,
            private firestore: AngularFirestore, 
            private router: Router,
            ){
}



//está funcionando
ObterProduto(){
  this.produtoService.getProdutos().subscribe(data=>{
    data.forEach((element:any) =>{
    console.log(element.payload.doc.id);
    this.router.navigate(["/product-update"]);

  //console.log(element.payload.doc.data());  
this.Produtos.push({
  id: element.payload.doc.id,
  ...element.payload.doc.data()
}) 
});


console.log(this.Produtos)
  });

};

editarProduto(id:string){
this.router.navigate(["/product-update"]);
}


ngOnInit():void{
 // this.getIProdutos();
    this.ObterProduto()
  }

eliminarProduto(id: string){
  this.produtoService.excluirProduto(id).then(()=>{
    console.log("Produto Excluido")
    window.location.reload()
  }).catch(error => {
    console.log(error);
  })
}
}
*/