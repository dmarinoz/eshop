import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService, Product, CategoriesService, Category } from '@empresaurios/products';

@Component({
  selector: 'eshop-product-list',
  templateUrl: './product-list.component.html',
})
export class ProductListComponent implements OnInit {
  products: Product[]=[]
  categories: Category[]=[]
  constructor(private prodService: ProductsService, private catService: CategoriesService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) =>{
      params.categoryid ? this._getProducts([params.categoryid]) : this._getProducts();
    })
    
    this._getCategories();
  }

  private _getProducts(categoriesFilter?: string[]){
    this.prodService.getProducts(categoriesFilter).subscribe(resProducts=>{
      this.products=resProducts;
    })
  }

  private _getCategories(){
    this.catService.getCategories().subscribe(resCats=>{
      this.categories=resCats;
    })
  }

  categoryFilter(){
    const selectedCategories = this.categories.filter(category => category.checked).map(Category => Category.id);
    this._getProducts(selectedCategories)
  }


}
