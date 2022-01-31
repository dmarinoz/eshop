import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService, Category } from '@empresaurios/products';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';


@Component({
  selector: 'admin-categories-form',
  templateUrl: './categories-form.component.html',
  styles: [
  ]
})
export class CategoriesFormComponent implements OnInit {
  form: FormGroup;
  isSubmited = false; 
  editmode = false;
  currentCategoryID: string;

  constructor(
    private messageService: MessageService, 
    private formBuilder: FormBuilder, 
    private categoriesService: CategoriesService,
    private location: Location,
    private router: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name:['', Validators.required],
      icon:['', Validators.required],
      color: ['#fff']
    });

    this._checkEditMode();
  }

  onSubmit(){
    this.isSubmited = true;
    if (this.form.invalid) {
      return;
    }
    const category : Category = {
      id: this.currentCategoryID,
      name: this.categoryForm.name.value,
      icon: this.categoryForm.icon.value,
      color: this.categoryForm.color.value
    }

    if (this.editmode) {
      this._updateCategory(category)
    } else {
      this._addCategory(category)
    }
  }

  private _updateCategory(category: Category) {
    this.categoriesService.updateCategory(category).subscribe(
    (category: Category) =>{
      this.messageService.add({
        severity:'success', 
        summary:'Éxito', 
        detail:`La categoría ${category.name} fue editada`
      });
      timer(2000).toPromise().then(done =>{
        this.location.back();
      })
    },
    (ddd)=> {
      this.messageService.add({
        severity:'error', 
        summary:'Error', 
        detail:'La categoría no fue editada'
      });
    });

  }


  private _addCategory(category: Category) {
    this.categoriesService.createCategory(category).subscribe(
      (category: Category) =>{
      this.messageService.add({
        severity:'success', 
        summary:'Éxito', 
        detail:`La categoría ${category.name} fue creada`
      });
      timer(2000).toPromise().then(done =>{
        this.location.back();
      })
    },
    ()=> {
      this.messageService.add({
        severity:'error', 
        summary:'Error', 
        detail:'La categoría no fue creada'
      });
    });
  }

  private _checkEditMode() {
    this.router.params.subscribe(params => {
      if (params.id) {
        this.editmode = true;
        this.currentCategoryID = params.id;
        this.categoriesService.getCategory(params.id).subscribe(category =>{
          this.categoryForm.name.setValue(category.name)
          this.categoryForm.icon.setValue(category.icon)
          this.categoryForm.color.setValue(category.color)
        })
      }
    });
  }


  get categoryForm(){
    return this.form.controls;
  }

  onCancel() {
    this.location.back();
  }

}
