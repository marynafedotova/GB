"use strict";

function loadData() {
  var response, data;
  return regeneratorRuntime.async(function loadData$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(fetch('../data/deliverypayment.json'));

        case 2:
          response = _context.sent;
          _context.next = 5;
          return regeneratorRuntime.awrap(response.json());

        case 5:
          data = _context.sent;
          generateContent(data);

        case 7:
        case "end":
          return _context.stop();
      }
    }
  });
}

function generateContent(data) {
  var contentSection = document.getElementById('content'); // Генерация раздела доставки

  var deliverySection = document.createElement('div');
  deliverySection.innerHTML = "\n  <div class=\"container\">\n    <h1>".concat(data.delivery.title, "</h1>\n    <ul>").concat(data.delivery.options.map(function (option) {
    return "<li>&#9733; ".concat(option, "</li>");
  }).join(''), "</ul>\n  </div>");
  contentSection.appendChild(deliverySection); // Генерация раздела оплаты

  var paymentSection = document.createElement('div');
  paymentSection.innerHTML = "\n  <div class=\"container\">\n    <div class=\"delivery_payment_title\">".concat(data.payment.title, "</div>\n    <ul>").concat(data.payment.options.map(function (option) {
    return "<li>&#10004; ".concat(option, "</li>");
  }).join(''), "</ul>\n    <div class=\"important\">").concat(data.payment.important, "</div>\n  </div>");
  contentSection.appendChild(paymentSection); // Генерация графика работы

  var workSchedule = document.createElement('div');
  workSchedule.innerHTML = "\n    <div class=\"container\">\n    <div class=\"delivery_payment_title\">".concat(data.workingHours.title, "</div>\n    <ul>").concat(data.workingHours.schedule.map(function (day) {
    return "<li>&#9734; ".concat(day, "</li>");
  }).join(''), "</ul>\n  </div>");
  contentSection.appendChild(workSchedule); // Генерация таблицы запчастей

  var partsSection = document.createElement('div');
  partsSection.innerHTML = "\n  <div class=\"container\">\n    <div class=\"delivery_payment_title\">\u0421\u043F\u0438\u0441\u043E\u043A \u0437\u0430\u043F\u0447\u0430\u0441\u0442\u0438\u043D</div>\n    <table>\n      <thead>\n        <tr>\n          <th>\u041F\u043E\u0437\u0438\u0446\u0456\u044F</th>\n          <th class=\"price\">\u0421\u0443\u043C\u0430 (\u0433\u0440\u043D)</th>\n        </tr>\n      </thead>\n      <tbody>\n        ".concat(data.partsList.map(function (part) {
    return "<tr><td>".concat(part.name, "</td><td class=\"price\">").concat(part.price, "</td></tr>");
  }).join(''), "\n      </tbody>\n    </table>\n    </div>\n  ");
  contentSection.appendChild(partsSection);
} // Вызов функции загрузки данных


loadData(); //header

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