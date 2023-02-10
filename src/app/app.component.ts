import {Component, OnInit, OnDestroy} from '@angular/core';
import {CategoryService} from "./services/category.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Category} from "./models/category";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {


  categories$: Category[] | undefined;
  categoriesLength: number | undefined;

  categoryForm!: FormGroup;

  categorySubscription!: Subscription

  constructor(private categoryService: CategoryService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.buildCategoryForm();
    this.loadProductCategory();
  }

  private loadProductCategory() {
    this.categorySubscription = this.categoryService.getAllCategories().subscribe(category => {
      this.categories$ = category;
      this.categoriesLength = category.length;
      this.categoryFormUpdate(category.length)
    });
  }

  private buildCategoryForm(): void {
    this.categoryForm = this.formBuilder.group({
      categoryID: [0],
      categoryName: ['', {
        validators: [
          Validators.required, Validators.minLength(3), Validators.maxLength(15)]
      }],
    });
  }

  get categoryID() {
    return this.categoryForm.controls['categoryID'];
  }

  private categoryFormUpdate(categoriesLength: number): void {
    this.categoryID.setValue(categoriesLength + 1);
  }

  addCategory() {
    this.categoryService.addCategory(this.categoryForm.value).then(() => {
      console.log('ok')
    }).catch(e => console.log(e));
  }

  deleteCategory(key: string) {
    this.categoryService.removeCategory(key).then();
  }

  ngOnDestroy() {
    this.categorySubscription.unsubscribe();
  }
}
