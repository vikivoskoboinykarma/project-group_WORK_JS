// Функція для побудови URL запиту на основі поточних фільтрів
function buildQueryURL(filters) {
    const baseUrl = "https://food-boutique.b.goit.study/api/products";
    const queryParams = new URLSearchParams();
  
    if (filters.keyword) queryParams.append('keyword', filters.keyword);
    if (filters.category) queryParams.append('category', filters.category);
    if (filters.sortBy) queryParams.append(filters.sortBy, true);
    queryParams.append('page', filters.page);
    queryParams.append('limit', filters.limit);
  
    return `${baseUrl}?${queryParams}`;
  }
  
  // Функція для оновлення списку продуктів з відповіді сервера
  function updateProductsList(data) {
    // Очищення поточного списку продуктів
    // Заповнення новими даними
    console.log(data);
    // Тут написати код, щоб оновити DOM новими даними продуктів
  }
  
  // Функція для отримання продуктів на основі поточних фільтрів
  function fetchProducts() {
    const filters = JSON.parse(localStorage.getItem('filters'));
    const queryURL = buildQueryURL(filters);
  
    fetch(queryURL)
      .then(response => response.json())
      .then(data => {
        updateProductsList(data);
      })
      .catch(error => {
        console.error('Помилка при отриманні продуктів:', error);
      });
  }
  
  // Обробники подій для UI фільтра
  document.getElementById('search-box').addEventListener('input', function() {
    updateLocalStorage('keyword', this.value.trim());
    fetchProducts();
  });
  
  document.getElementById('categories').addEventListener('change', function() {
    updateLocalStorage('category', this.value);
    fetchProducts();
  });
  
  document.getElementById('sort').addEventListener('change', function() {
    // Відображення значення сортування UI у параметри сортування API
    const sortMapping = {
      'atoz': 'byABC',
      'ztoa': 'byABC',
      'cheap': 'byPrice',
      'expensive': 'byPrice',
      'popular': 'byPopularity',
      'notpopular': 'byPopularity',
      'showall': null
    };
    
    const sortValue = sortMapping[this.value];
    updateLocalStorage('sortBy', sortValue);
    fetchProducts();
  });
  
  // Ініціалізація
  initialize();
  