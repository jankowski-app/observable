import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CategoryService } from "./services/category.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable, of, tap } from "rxjs";
import { Category } from "./models/category";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  categories$: Observable<Category[]> = of([]);
  categoryForm!: FormGroup;

  constructor(
    private categoryService: CategoryService,
    private formBuilder: FormBuilder
    ) {
  }

  ngOnInit() {
    this.loadProductCategory();
  }

  loadProductCategory(): void {
    this.categories$ = this.categoryService.getAllCategories()
      .pipe(
        tap(
          category => {
            this.buildCategoryForm(category.length);
          }
        )
      );
  }

  buildCategoryForm(categoriesLength: number): void {    
    this.categoryForm = this.formBuilder.group({
      categoryID: [categoriesLength],
      categoryName: ['', {
        validators: [
          Validators.required, 
          Validators.minLength(3), 
          Validators.maxLength(15)]
      }],
    });
  }


  // TODO: move to service
  addCategory(): void {
    this.categoryService.addCategory(this.categoryForm.value)
    .then((response) => {
      console.log('addCategory:response: ', response)
    }).catch(e => console.log(e));
  }
}
