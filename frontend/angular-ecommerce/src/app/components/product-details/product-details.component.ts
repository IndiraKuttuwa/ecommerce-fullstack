import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  theProductId: number = +this.route.snapshot.paramMap.get('id');
  product: Product;
  constructor(private productService : ProductService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.productService.getProduct(this.theProductId).subscribe(
      data => {
          this.product = data;
      }
    )
  }

}
