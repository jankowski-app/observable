import {Component, OnInit} from '@angular/core';
import {CategoryService} from "./services/category.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {Category} from "./models/category";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {


  // categories$: Observable<Category[]> | undefined;
  categories$: Category[] | undefined;

  categoriesLength: number | undefined;

  categoryForm!: FormGroup;

  constructor(private categoryService: CategoryService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.loadProductCategory();
    console.log(this.categoriesLength);
    this.buildCategoryForm();
  }

  private loadProductCategory() {
    // this.categories$ = this.categoryService.getAllCategories();

    this.categoryService.getAllCategories().subscribe(category => {
      this.categories$ = category;
      this.categoriesLength = category.length;
      console.log(this.categoriesLength);
    });
  }


  private buildCategoryForm(): void {
    this.categoryForm = this.formBuilder.group({
      // categoryID: [this.categoriesLength],
      categoryID: [this.categoriesLength], // here I want to use this value this.categoriesLength to add it to the database
      categoryName: ['', {
        validators: [
          Validators.required, Validators.minLength(3), Validators.maxLength(15)]
      }],
    });
  }

  addCategory() {
    this.categoryService.addCategory(this.categoryForm.value).then(() => {
      console.log('ok')
    }).catch(e => console.log(e));
  }
}
