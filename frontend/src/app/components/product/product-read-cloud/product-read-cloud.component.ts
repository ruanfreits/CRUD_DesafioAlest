import { Component, OnInit,TemplateRef, NgModule, AfterViewInit,ViewChild, ɵɵqueryRefresh} from '@angular/core';

import { MatTableDataSource,MatTableDataSourcePaginator,} from '@angular/material/table';

import {MatPaginator} from '@angular/material/paginator'
import { Product } from '../product.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../product.service';
import { Observable } from 'rxjs';
import { ProductCreateComponent } from '../product-create/product-create.component';
import {MatSort} from '@angular/material/sort';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FireBaseService, IProdutos } from 'src/app/service/fire-base.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { collectExternalReferences } from '@angular/compiler';

@Component({
  selector: 'app-product-read-cloud',
  templateUrl: './product-read-cloud.component.html',
  styleUrls: ['./product-read-cloud.component.css']
})
export class ProductReadCloudComponent {

/*
public form!:FormGroup;
public produtoList: IProdutos[] =[];

public ProdutoDetails!: IProdutos;
constructor(

  private fb:FormBuilder,
  private modalService: NgbModal,
  private fireBaseService: FireBaseService )
{

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

openModal(content: TemplateRef<any>, ProdutoId:string):void{
  this.ProdutoDetails!= this.produtoList.find((Items: IProdutos)=>Items.id === ProdutoId);

this.formInit(this.ProdutoDetails);
this.modalService.open(content, {backdrop:'static', centered:true});

}

formInit(data: IProdutos):void{
this.form = this.fb.group({
  Produto:[data?data.Produto: '', Validators.required],
  Preco:[data? data.Preco:'',Validators.required],
  Cor:[data?data.Cor:'',Validators.required]
})
}

addProdutos():void{
  this.fireBaseService.addIProdutos(this.form.value).then();
}

updateProdutos(ProdutoId: string):void{
  this.fireBaseService.updateIProdutos(ProdutoId, this.form.value).then();
}

deleteProduto(ProdutoId :string):void{
  this.fireBaseService.deleteIProdutos(ProdutoId).then();

}



}
*/


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