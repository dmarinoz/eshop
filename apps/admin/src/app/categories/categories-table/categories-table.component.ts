import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService, Category} from '@empresaurios/products';
import { MessageService, ConfirmationService} from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'admin-categories-table',
  templateUrl: './categories-table.component.html',
  styles: [
  ]
})
export class CategoriesTableComponent implements OnInit, OnDestroy {
  categories : Category[] = [];
  endsubs$ : Subject<unknown> = new Subject();
  constructor(
    private categoriesService: CategoriesService, 
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this._getCategories();
    
  }

  ngOnDestroy(): void {
    this.endsubs$.complete();
  }

  deleteCategory(categoryId: string) {
    this.confirmationService.confirm({
      message: '¿Está seguro de eliminar esta categoría?',
      header: 'Eliminar Categoría',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.categoriesService.deleteCategory(categoryId).subscribe(response => {
          this._getCategories();
          this.messageService.add({
            severity:'success', 
            summary:'Éxito', 
            detail:'La categoría fue eliminada'
          });
        },()=> {
          this.messageService.add({
            severity:'error', 
            summary:'Error', 
            detail:'La categoría no fue eliminada'
          });
        });
      },

    });

  }

  updateCategory(categoryid: string) {
    this.router.navigateByUrl(`categories/form/${categoryid}`)
  }

  private _getCategories() {
    this.categoriesService.getCategories().pipe(takeUntil(this.endsubs$)).subscribe((cats) =>{
      this.categories = cats;
    });
  }
}