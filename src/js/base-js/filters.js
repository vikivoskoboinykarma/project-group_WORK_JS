
import SlimSelect from 'slim-select';

document.addEventListener('DOMContentLoaded', function () {
  initializeSlimSelectWithCategories();
  initializeFilters();
  setupEventListeners();
});

// Ініціалізація SlimSelect з категоріями, статичний список
function initializeSlimSelectWithCategories() {
  const categories = [
    "Beverages",
    "Breads_&_Bakery",
    "Dairy",
    "Deli",
    "Eggs",
    "Fresh_Produce",
    "Frozen_Foods",
    "Meat_&_Seafood",
    "Pantry_Items",
    "Prepared_Foods",
    "Snacks"
  ];

  const categoryOptions = categories.map(category => ({
    text: category.replace(/_/g, ' '),
    value: category
  }));
  categoryOptions.unshift({ text: 'Show all', value: '' });

  new SlimSelect({
    select: '#categories',
    data: categoryOptions
  });
}
// або за запитом  з сервера
//function initializeSlimSelectWithCategories() {
//  fetch('https://your-api-url/categories')
  //  .then(response => response.json())
  //  .then(categories => {
   //   const categoryOptions = categories.map(category => ({
  //      text: category.replace(/_/g, ' '),
  //      value: category
   //   }));
   //   categoryOptions.unshift({ text: 'Show all', value: '' });

   //   new SlimSelect({
   //     select: '#categories',
   //     data: categoryOptions
   //   });
  //  })
  //  .catch(error => console.error('Error fetching categories:', error));
//}


// Функція для ініціалізації фільтрів у локальному сховищі
function initializeFilters() {
  if (!localStorage.getItem('filters')) {
    localStorage.setItem('filters', JSON.stringify({ keyword: null, category: null, page: 1, limit: 6, sort: null }));
  }
}

// Функція для оновлення фільтрів у локальному сховищі
function updateFilters(key, value) {
  const filters = JSON.parse(localStorage.getItem('filters'));
  filters[key] = value;
  localStorage.setItem('filters', JSON.stringify(filters));
}

// Модифікована функція для оновлення фільтрів у локальному сховищі
//function updateFilters(key, value) {
 // const filters = JSON.parse(localStorage.getItem('filters'));
 // filters[key] = value;

  // Обнулення сторінки пагінації на 1 при зміні ключового слова, категорії або способу сортування
 // if (key === 'keyword' || key === 'category' || key === 'sort') {
 //   filters['page'] = 1;
 // }

  //localStorage.setItem('filters', JSON.stringify(filters));
//}


// Функція для встановлення обробників подій
function setupEventListeners() {
  const searchBox = document.getElementById('search-box');
  const categoriesSelect = document.getElementById('categories');

  // Обробка події submit для форми пошуку
  const searchForm = document.querySelector('.search-form');
  searchForm.addEventListener('submit', function (e) {
    e.preventDefault();
    updateFilters('keyword', searchBox.value);
    fetchFilteredProducts();
  });

  // Обробка зміни категорії
  categoriesSelect.addEventListener('change', function () {
    updateFilters('category', this.value);
    fetchFilteredProducts();
  });

  // Обробка зміни сортування
  const sortSelect = document.getElementById('sort');
  sortSelect.addEventListener('change', function () {
    updateFilters('sort', this.value);
    fetchFilteredProducts();
  });
 
}

// Функція для відправлення запиту на сервер з поточними фільтрами
function fetchFilteredProducts() {
  const filters = JSON.parse(localStorage.getItem('filters'));
  const queryParameters = new URLSearchParams(filters).toString();
  const requestURL = `https://your-api-url/products?${queryParameters}`;

  fetch(requestURL)
    .then(response => response.json())
    .then(data => {
      updateProductsList(data);
    })
    .catch(error => console.error('Error fetching products:', error));
}

// Функція для оновлення ProductsList
function updateProductsList(data) {
  // Логіка для оновлення ProductsList на основі отриманих даних
  // ...
}
