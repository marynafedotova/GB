//header
const header = document.querySelector('header');

window.addEventListener('scroll', function() {
  const scrollDistance = window.scrollY;
  const threshold = 30;

  if (scrollDistance > threshold) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

//hamburger-menu
document.getElementById('hamb-btn').addEventListener('click', function () {
  document.body.classList.toggle('open-mobile-menu')
})

document.getElementById('hamb-btn-mobile').addEventListener('click', function () {
  document.body.classList.toggle('open-mobile-menu')
})
//lazy

// var lazyLoadInstance = new LazyLoad({});

// wow
// new WOW().init();
//scroll
// document.getElementById('scrollButton').addEventListener('click', function(event) {
//   event.preventDefault();
//   const targetElement = document.getElementById('news');
//   const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
//   window.scrollTo({
//     top: targetPosition,
//     behavior: 'smooth'
//   });
// });
// Код для обработки кликов по ссылкам
document.querySelectorAll('.submenu a').forEach(link => {
  link.addEventListener('click', function (event) {
    event.preventDefault();
    const brand = this.querySelector('img').alt.toLowerCase();
    const pageUrl = `catalog-template.html?brand=${brand}`;
    window.location.href = pageUrl;
  });
});
// form
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('feedback_form');
  const nameFld = document.getElementById('exampleInputName');
  const telFld = document.getElementById('exampleInputTel');

  if (!form || !nameFld || !telFld) {
    console.error('Form or fields not found!');
    return;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = nameFld.value ? nameFld.value.trim() : ''; 
    const tel = telFld.value ? telFld.value.trim() : '';

    const errors = [];

    // Очистка классов ошибок
    nameFld.classList.remove('is-invalid');
    telFld.classList.remove('is-invalid');

    if (name === '') {
      errors.push("Введіть, будь ласка, Ваше ім'я");
      nameFld.classList.add('is-invalid');
    } else if (name.length < 2) {
      errors.push('Ваше ім\'я занадто коротке');
      nameFld.classList.add('is-invalid');
    }

    if (tel === '' || tel.length < 17) {  // Длина номера должна быть 17 символов
      errors.push('Введіть, будь ласка, правильний номер телефону');
      telFld.classList.add('is-invalid');
    }

    if (errors.length > 0) {
      toast.error(errors.join('. '));
      return;
    }

    // Отправка данных в Telegram
    const CHAT_ID = '836622266';
    const BOT_TOKEN = '8046931960:AAHhJdRaBEv_3zyB9evNFxZQlEdiz8FyWL8';
    const message = `<b>Ім'я: </b> ${name}\r\n<b>Телефон: </b>${tel}`;
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${encodeURIComponent(message)}&parse_mode=HTML`;

    fetch(url, {
      method: 'POST',
    })
    .then(response => response.json())
    .then(data => {
      if (data.ok) {
        nameFld.value = '';
        telFld.value = '';
        toast.success('Ваше повідомлення успішно надіслано.');
      } else {
        toast.error('Сталася помилка.');
      }
    })
    .catch(error => {
      toast.error('Помилка: ' + error.message);
    });
  });

  telFld.addEventListener('input', function (e) {
    let input = e.target.value.replace(/\D/g, ''); // Удаляем все, кроме цифр
    let formattedInput = '';

    if (input.length > 0) {
      formattedInput += '+38 (';
    }
    if (input.length >= 1) {
      formattedInput += input.substring(0, 3);
    }
    if (input.length >= 4) {
      formattedInput += ') ' + input.substring(3, 6);
    }
    if (input.length >= 7) {
      formattedInput += '-' + input.substring(6, 8);
    }
    if (input.length >= 9) {
      formattedInput += '-' + input.substring(8, 10);
    }

    e.target.value = formattedInput;
  });
 // Запрещаем ввод чисел в поле имени
 nameFld.addEventListener('input', function (e) {
  let input = e.target.value;
  // Оставляем только буквы и специальные символы для имени
  e.target.value = input.replace(/[^A-Za-zА-Яа-яІіЇїЄє']/g, '');
});
});
//copiraite
document.addEventListener("DOMContentLoaded", function() {
  const currentYear = new Date().getFullYear();
  document.getElementById("year").textContent = currentYear;
});

//search
const urlMonoBank = 'https://api.monobank.ua/bank/currency';
let products = [];
let usdToUahRate = 1;
let displayedProductCount = 0; // Счётчик отображённых товаров
const PRODUCTS_PER_PAGE = 12; // Количество товаров на одну "страницу"

// Функция для получения курса валют
async function fetchCurrencyRate() {
  try {
    const cachedRate = localStorage.getItem('usdToUahRate');
    const cachedTime = localStorage.getItem('usdToUahRateTime');
    const now = Date.now();

    // Если кэш действителен (меньше 5 минут)
    if (cachedRate && cachedTime && now - cachedTime < 5 * 60 * 1000) {
      usdToUahRate = parseFloat(cachedRate);
      return;
    }

    const response = await fetch(urlMonoBank);
    if (!response.ok) throw new Error('Не удалось получить курс валют');
    const data = await response.json();
    const usdToUah = data.find(item => item.currencyCodeA === 840);
    if (usdToUah && usdToUah.rateSell) {
      usdToUahRate = usdToUah.rateSell;

      // Сохраняем курс в кэш
      localStorage.setItem('usdToUahRate', usdToUahRate);
      localStorage.setItem('usdToUahRateTime', now);
    }
  } catch (error) {
    console.error('Ошибка при получении курса валют:', error);
  }
}

// Функция для получения продуктов
async function fetchProducts() {
  try {
    const response = await fetch('../data/data_ukr.json');
    if (!response.ok) throw new Error('Не удалось загрузить продукты');
    const data = await response.json();
    if (!data.Sheet1 || !Array.isArray(data.Sheet1)) throw new Error('Некорректный формат данных');
    products = data.Sheet1;
  } catch (error) {
    console.error('Ошибка при получении данных продуктов:', error);
  }
}

// Функция для отображения продуктов
function displayProducts(filteredProducts) {
  const productContainer = document.querySelector('.search-results');
  const loadMoreButton = document.querySelector('.load-more-search');

  if (!productContainer || !loadMoreButton) {
    console.error('Контейнер для товаров или кнопка "Загрузить ещё" не найдены');
    return;
  }

  // Если это первый запуск, очищаем контейнер
  if (displayedProductCount === 0) {
    productContainer.innerHTML = '';
  }

  // Если нет товаров
  if (filteredProducts.length === 0) {
    productContainer.innerHTML = '<p>Ничего не найдено.</p>';
    return;
  }

  // Отображаем товары постранично
  const nextProducts = filteredProducts.slice(displayedProductCount, displayedProductCount + PRODUCTS_PER_PAGE);

  nextProducts.forEach(product => {
    const priceInUah = Math.ceil(product.zena * usdToUahRate);
    const photoUrl = product.photo ? product.photo.split(',')[0].trim() : 'default-photo.jpg';
    const productCard = `
      <div class="product-card">
        <img src="${photoUrl}" alt="${product.zapchast}">
        <div>Артикул: ${product.ID_EXT}</div>
        <h3>${product.zapchast}</h3>
        <p>Цена: ${product.zena} ${product.valyuta} / ${priceInUah} грн</p>
        <div class="btn-cart">
          <button class="add-to-cart" data-id="${product.ID_EXT}" data-price="${priceInUah}">Додати до кошика</button>
        </div>
        <div class="product_btn">
          <a href="assets/pages/product.html?id=${product.ID_EXT}">Детальніше</a>
        </div>
      </div>`;
    productContainer.insertAdjacentHTML('beforeend', productCard);
  });

  // Обновляем счётчик отображённых товаров
  displayedProductCount += nextProducts.length;

  // Показываем кнопку, если есть ещё товары
  if (displayedProductCount < filteredProducts.length) {
    loadMoreButton.style.display = 'block';
  } else {
    loadMoreButton.style.display = 'none';
  }
}

// Обработчик кнопки "Загрузить ещё"
document.querySelector('.load-more-search').addEventListener('click', function () {
  const query = document.getElementById('search-input').value.trim().toLowerCase();
  const filteredProducts = products.filter(product =>
    (product.zapchast && product.zapchast.toLowerCase().includes(query)) ||
    (product.markaavto && product.markaavto.toLowerCase().includes(query)) ||
    (product.model && product.model.toLowerCase().includes(query))
  );
  displayProducts(filteredProducts);
});

// Обработчик формы поиска
document.getElementById('search-form').addEventListener('submit', async function(event) {
  event.preventDefault();
  await fetchCurrencyRate(); // Получаем актуальный курс валют

  const query = document.getElementById('search-input').value.trim().toLowerCase();
  if (query) {
    const filteredProducts = products.filter(product => 
      (product.zapchast && product.zapchast.toLowerCase().includes(query)) ||
      (product.markaavto && product.markaavto.toLowerCase().includes(query)) ||
      (product.model && product.model.toLowerCase().includes(query))
    );

    displayedProductCount = 0; // Сбрасываем счётчик отображённых товаров
    displayProducts(filteredProducts);
  } else {
    // Если поле пустое, очищаем результаты
    displayedProductCount = 0;
    displayProducts([]);
  }

  // Прокрутка к результатам поиска
  const resultsContainer = document.querySelector('.search-results');
  if (resultsContainer) {
    resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
});

// Инициализация
async function initialize() {
  await fetchCurrencyRate();
  await fetchProducts();
}

// Запуск
initialize();

