import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService, Product, ProductsService } from '@empresaurios/products';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';

@Component({
  selector: 'admin-products-form',
  templateUrl: './products-form.component.html',
  styles: [
  ]
})
export class ProductsFormComponent implements OnInit {
  form: FormGroup;
  isSubmited = false; 
  editmode = false;
  catagories = [];
  imageDisplay: string | ArrayBuffer;
  currentProductId: string;


  constructor(
    private messageService: MessageService, 
    private formBuilder: FormBuilder, 
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    private location: Location,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this._initForm();
    this._getCategories();
    this._checkEditMode();
  }
  

  private _initForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      countInStock: ['', Validators.required],
      description: ['', Validators.required],
      richDescription: [''],
      image: ['', Validators.required],
      isFeatured: [false]
    });
  }

  private _getCategories() {
    this.categoriesService.getCategories().subscribe((categories) => {
      this.catagories = categories;
    });
  }

  private _addProduct(productData: FormData) {
    this.productsService.createProduct(productData).subscribe(
      (product: Product) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: `El producto ${product.name} fue creado`
        });
        timer(2000)
          .toPromise()
          .then(() => {
            this.location.back();
          });
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'El producto no fue creado'
        });
      }
    );
  }

  private _updateProduct(productFormData: FormData) {
    this.productsService.updateProduct(productFormData, this.currentProductId).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'El producto fue actualizado'
        });
        timer(2000)
          .toPromise()
          .then(() => {
            this.location.back();
          });
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'El producto no fue actualizado'
        });
      }
    );
  }

  private _checkEditMode() {
    this.route.params.subscribe((params) => {
      if (params.id) {
        this.editmode = true;
        this.currentProductId = params.id;
        this.productsService.getProduct(params.id).subscribe((product) => {
          this.productForm.name.setValue(product.name);
          this.productForm.category.setValue(product.category);
          console.log(product.category)
          //this.productForm.category.setValue(product.category.id);
          this.productForm.brand.setValue(product.brand);
          this.productForm.price.setValue(product.price);
          this.productForm.countInStock.setValue(product.countInStock);
          this.productForm.isFeatured.setValue(product.isFeatured);
          this.productForm.description.setValue(product.description);
          this.productForm.richDescription.setValue(product.richDescription);
          this.imageDisplay = product.image;
          this.productForm.image.setValidators([]);
          this.productForm.image.updateValueAndValidity();
        });
      }
    });
  }



  onSubmit(){
    this.isSubmited = true;
    if (this.form.invalid) return;

    const productFormData = new FormData();
    Object.keys(this.productForm).map((key) => {
      productFormData.append(key, this.productForm[key].value);
    });
    if (this.editmode) {
      this._updateProduct(productFormData);
    } else {
      this._addProduct(productFormData);
    }
    
  }



  onCancel() {
    this.location.back();
  }

  onImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
      this.form.patchValue({ image: file });
      this.form.get('image').updateValueAndValidity();
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.imageDisplay = fileReader.result;
      };
      fileReader.readAsDataURL(file);
    }
  }


  get productForm() {
    return this.form.controls;
  }

}
