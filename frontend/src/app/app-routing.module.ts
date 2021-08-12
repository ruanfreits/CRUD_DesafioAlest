import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from "./views/home/home.component";
import { ProductCrudComponent } from './views/product-crud/product-crud.component';

import { ProductCreateComponent } from './components/product/product-create/product-create.component';
import { ProductDeleteComponent } from './components/product/product-delete/product-delete.component';
import { ProductUpdateComponent } from './components/product/product-update/product-update.component';
import { ProductCrudCloudComponent } from './views/product-crud-cloud/product-crud-cloud.component';




const routes: Routes = [{
  path:"",
  component: HomeComponent
},{
  path:"products",
  component: ProductCrudComponent
},
{
  path:"products/cloud",
  component: ProductCrudCloudComponent
}
,
{
  path:"products/create",
  component:ProductCreateComponent
},
{
  path:"product/update/:id",
  component:ProductUpdateComponent
},
{
  path:"product/delete/:id",
  component: ProductDeleteComponent
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
