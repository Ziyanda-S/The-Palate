import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe.model';

const RECIPES: Recipe[] = [
  {
    id: 'rec1',
    dishName: 'Herb-Crusted Chicken',
    photoUrl: 'assets/images/chicken.jpg',
    ingredients: ['2 chicken breasts', 'Rosemary, thyme, parsley', '2 tbsp butter', '1 lemon, confit', 'Salt & pepper'],
    steps: ['Season chicken with salt and pepper.', 'Press chopped herbs onto the skin.', 'Sear in butter until golden, 4 mins per side.', 'Finish in oven at 180°C for 15 mins.', 'Rest 5 mins, plate with confit lemon and rosemary jus.']
  },
  {
    id: 'rec2',
    dishName: 'Seared Scallop Duo',
    photoUrl: 'assets/images/scallop.jpg',
    ingredients: ['4 large scallops', '1 head cauliflower', '100ml cream', '2 tbsp brown butter'],
    steps: ['Boil cauliflower until soft, blend with cream into a purée.', 'Pat scallops dry, season well.', 'Sear scallops 90 seconds per side in hot pan.', 'Spoon purée onto plate, top with scallops.', 'Drizzle with brown butter.']
  },
  {
    id: 'rec3',
    dishName: 'Twice-Baked Soufflé',
    photoUrl: 'assets/images/souffle.jpg',
    ingredients: ['3 eggs, separated', '50g Gruyère, grated', '20g butter', '20g flour', '150ml milk', 'Black truffle shavings'],
    steps: ['Make a roux with butter and flour, whisk in milk.', 'Stir in egg yolks and half the cheese.', 'Whisk egg whites to soft peaks, fold in.', 'Bake in ramekins at 180°C for 12 mins.', 'Cool, then top with remaining cheese and truffle, bake again until golden.']
  },
  {
    id: 'rec4',
    dishName: 'Velvet Chocolate Torte',
    photoUrl: 'assets/images/torte.jpg',
    ingredients: ['200g dark chocolate', '150g butter', '3 eggs', '100g sugar', 'Sea salt caramel', 'Gold leaf (optional)'],
    steps: ['Melt chocolate and butter together.', 'Whisk eggs and sugar until pale, fold into chocolate.', 'Pour into lined tin, bake at 160°C for 20 mins.', 'Cool fully, top with sea salt caramel.', 'Finish with gold leaf.']
  }
];

@Injectable({ providedIn: 'root' })
export class RecipeService {
  getRecipes(): Recipe[] {
    return RECIPES;
  }
}