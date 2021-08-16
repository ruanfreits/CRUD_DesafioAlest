import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
@Component({
  selector: 'app-product-crud-cloud',
  templateUrl: './product-crud-cloud.component.html',
  styleUrls: ['./product-crud-cloud.component.css']
})
export class ProductCrudCloudComponent implements OnInit {

  constructor(private route: Router) {

   }


  navigateToProductCreate():void{
    this.route.navigate(['/products/create'])
  }

  ngOnInit(): void {
  }

}
