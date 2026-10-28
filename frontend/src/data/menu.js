import menu_1 from '../assets/menu_1.png'
import menu_2 from '../assets/menu_2.png'
import menu_3 from '../assets/menu_3.png'
import menu_4 from '../assets/menu_4.png'
import menu_5 from '../assets/menu_5.png'
import menu_6 from '../assets/menu_6.png'
import menu_7 from '../assets/menu_7.png'
import menu_8 from '../assets/menu_8.png'
import food_1 from '../assets/food_1.png'
import food_2 from '../assets/food_2.png'
import food_3 from '../assets/food_3.png'
import food_4 from '../assets/food_4.png'
import food_5 from '../assets/food_5.png'
import food_6 from '../assets/food_6.png'
import food_7 from '../assets/food_7.png'
import food_8 from '../assets/food_8.png'
import food_9 from '../assets/food_9.png'
import food_10 from '../assets/food_10.png'
import food_11 from '../assets/food_11.png'
import food_12 from '../assets/food_12.png'
import food_13 from '../assets/food_13.png'
import food_14 from '../assets/food_14.png'
import food_15 from '../assets/food_15.png'
import food_16 from '../assets/food_16.png'
import food_17 from '../assets/food_17.png'
import food_18 from '../assets/food_18.png'
import food_19 from '../assets/food_19.png'
import food_20 from '../assets/food_20.png'
import food_21 from '../assets/food_21.png'
import food_22 from '../assets/food_22.png'
import food_23 from '../assets/food_23.png'
import food_24 from '../assets/food_24.png'
import food_25 from '../assets/food_25.png'
import food_26 from '../assets/food_26.png'
import food_27 from '../assets/food_27.png'
import food_28 from '../assets/food_28.png'
import food_29 from '../assets/food_29.png'
import food_30 from '../assets/food_30.png'
import food_31 from '../assets/food_31.png'
import food_32 from '../assets/food_32.png'

const about = 'Food provides essential nutrients for overall health and well-being'

// Round category photos shown above the dishes.
export const menuTypes = [
    { name: 'Salad', image: menu_1 },
    { name: 'Rolls', image: menu_2 },
    { name: 'Deserts', image: menu_3 },
    { name: 'Sandwich', image: menu_4 },
    { name: 'Cake', image: menu_5 },
    { name: 'Pure Veg', image: menu_6 },
    { name: 'Pasta', image: menu_7 },
    { name: 'Noodles', image: menu_8 },
]

// Every dish, grouped by the category names above.
export const menuItems = [
    { id: '1', name: 'Greek salad', image: food_1, price: 12, description: about, category: 'Salad', rating: 4 },
    { id: '2', name: 'Veg salad', image: food_2, price: 18, description: about, category: 'Salad', rating: 4 },
    { id: '3', name: 'Clover Salad', image: food_3, price: 16, description: about, category: 'Salad', rating: 4 },
    { id: '4', name: 'Chicken Salad', image: food_4, price: 24, description: about, category: 'Salad', rating: 4 },
    { id: '5', name: 'Lasagna Rolls', image: food_5, price: 14, description: about, category: 'Rolls', rating: 4 },
    { id: '6', name: 'Peri Peri Rolls', image: food_6, price: 12, description: about, category: 'Rolls', rating: 4 },
    { id: '7', name: 'Chicken Rolls', image: food_7, price: 20, description: about, category: 'Rolls', rating: 4 },
    { id: '8', name: 'Veg Rolls', image: food_8, price: 15, description: about, category: 'Rolls', rating: 4 },
    { id: '9', name: 'Ripple Ice Cream', image: food_9, price: 14, description: about, category: 'Deserts', rating: 4 },
    { id: '10', name: 'Fruit Ice Cream', image: food_10, price: 22, description: about, category: 'Deserts', rating: 4 },
    { id: '11', name: 'Jar Ice Cream', image: food_11, price: 10, description: about, category: 'Deserts', rating: 4 },
    { id: '12', name: 'Vanilla Ice Cream', image: food_12, price: 12, description: about, category: 'Deserts', rating: 4 },
    { id: '13', name: 'Chicken Sandwich', image: food_13, price: 12, description: about, category: 'Sandwich', rating: 4 },
    { id: '14', name: 'Vegan Sandwich', image: food_14, price: 18, description: about, category: 'Sandwich', rating: 4 },
    { id: '15', name: 'Grilled Sandwich', image: food_15, price: 16, description: about, category: 'Sandwich', rating: 4 },
    { id: '16', name: 'Bread Sandwich', image: food_16, price: 24, description: about, category: 'Sandwich', rating: 4 },
    { id: '17', name: 'Cup Cake', image: food_17, price: 14, description: about, category: 'Cake', rating: 4 },
    { id: '18', name: 'Vegan Cake', image: food_18, price: 12, description: about, category: 'Cake', rating: 4 },
    { id: '19', name: 'Butterscotch Cake', image: food_19, price: 20, description: about, category: 'Cake', rating: 4 },
    { id: '20', name: 'Sliced Cake', image: food_20, price: 15, description: about, category: 'Cake', rating: 4 },
    { id: '21', name: 'Garlic Mushroom', image: food_21, price: 14, description: about, category: 'Pure Veg', rating: 4 },
    { id: '22', name: 'Fried Cauliflower', image: food_22, price: 22, description: about, category: 'Pure Veg', rating: 4 },
    { id: '23', name: 'Mix Veg Pulao', image: food_23, price: 10, description: about, category: 'Pure Veg', rating: 4 },
    { id: '24', name: 'Rice Zucchini', image: food_24, price: 12, description: about, category: 'Pure Veg', rating: 4 },
    { id: '25', name: 'Cheese Pasta', image: food_25, price: 12, description: about, category: 'Pasta', rating: 4 },
    { id: '26', name: 'Tomato Pasta', image: food_26, price: 18, description: about, category: 'Pasta', rating: 4 },
    { id: '27', name: 'Creamy Pasta', image: food_27, price: 16, description: about, category: 'Pasta', rating: 4 },
    { id: '28', name: 'Chicken Pasta', image: food_28, price: 24, description: about, category: 'Pasta', rating: 4 },
    { id: '29', name: 'Butter Noodles', image: food_29, price: 14, description: about, category: 'Noodles', rating: 4 },
    { id: '30', name: 'Veg Noodles', image: food_30, price: 12, description: about, category: 'Noodles', rating: 4 },
    { id: '31', name: 'Somen Noodles', image: food_31, price: 20, description: about, category: 'Noodles', rating: 4 },
    { id: '32', name: 'Cooked Noodles', image: food_32, price: 15, description: about, category: 'Noodles', rating: 4 },
]

// Turn a number into a price like $14.
export function formatPrice(amount) {
    return '$' + amount
}
