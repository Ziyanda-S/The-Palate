import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RecipeService } from '../../data/recipe.service';
import { Recipe } from '../../models/recipe.model';

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './recipes.page.html',
  styleUrls: ['./recipes.page.scss']
})
export class RecipesPage implements OnInit {
  recipes: Recipe[] = [];
  expandedId: string | null = null;

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
  }

  toggle(recipe: Recipe): void {
    this.expandedId = this.expandedId === recipe.id ? null : recipe.id;
  }
}