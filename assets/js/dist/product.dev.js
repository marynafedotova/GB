"use strict";

document.addEventListener("DOMContentLoaded", function () {
  var urlParams = new URLSearchParams(window.location.search);
  var productId = urlParams.get('id');

  if (productId) {
    fetch('../data/data.json').then(function (response) {
      return response.json();
    }).then(function (data) {
      var product = data.Sheet1.find(function (item) {
        return item.ID_EXT === productId;
      });

      if (product) {
        document.querySelector('.product-name').textContent = product.zapchast;
        document.querySelector('.product-markaavto').textContent = product.markaavto;
        document.querySelector('.product-dop_category').textContent = product.dop_category;
        document.querySelector('.product-pod_category').textContent = product.pod_category;
        document.querySelector('.product-typ_kuzova').textContent = product.typ_kuzova;
        document.querySelector('.product-price').textContent = product.zena + ' ' + product.valyuta;
        document.querySelector('.product-description').textContent = product.opysanye;
        document.querySelector('.product-model').textContent = product.model;
        document.querySelector('.product-god').textContent = product.god;
        document.querySelector('.product-category').textContent = product.category;
        document.querySelector('.product-toplivo').textContent = product.toplivo;
        document.querySelector('.product-originalnumber').textContent = product.originalnumber;
        var imageGallery = document.querySelector('#imageGallery');

        if (product.photo && typeof product.photo === 'string') {
          product.photo.split(',').forEach(function (photoUrl) {
            var listItem = "\n                <li data-thumb=\"".concat(photoUrl.trim(), "\" data-src=\"").concat(photoUrl.trim(), "\">\n                  <a href=\"").concat(photoUrl.trim(), "\" data-lightgallery=\"item\">\n                    <img src=\"").concat(photoUrl.trim(), "\" alt=\"").concat(product.zapchast, "\">\n                  </a>\n                </li>\n              ");
            imageGallery.innerHTML += listItem;
          });
          $('#imageGallery').lightSlider({
            gallery: true,
            item: 1,
            thumbItem: 3,
            slideMargin: 20,
            enableDrag: true,
            currentPagerPosition: 'left',
            controls: true,
            verticalHeight: 600,
            loop: true,
            auto: true,
            onSliderLoad: function onSliderLoad() {
              $('#imageGallery').removeClass('cS-hidden');
            }
          });
        } else {
          console.error('Поле photo не містить даних або не є рядком для товару з ID:', productId);
        }
      } else {
        console.error('Продукт з ID не знайдено:', productId);
      }
    })["catch"](function (error) {
      return console.error('Помилка завантаження даних продукту:', error);
    });
  }
}); //header

var header = document.querySelector('header');
window.addEventListener('scroll', function () {
  var scrollDistance = window.scrollY;
  var threshold = 30;

  if (scrollDistance > threshold) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}); //hamburger-menu

document.getElementById('hamb-btn').addEventListener('click', function () {
  document.body.classList.toggle('open-mobile-menu');
});
document.getElementById('hamb-btn-mobile').addEventListener('click', function () {
  document.body.classList.toggle('open-mobile-menu');
});