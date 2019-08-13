var myMap;

ymaps.ready(init);

function init() {
  var viewportWidth = document.documentElement.clientWidth;

  var centerCoords = [59.938693, 30.323010];
  var markCoords = [59.938693, 30.323010];

  var verticalScrollbarWidth = 17;
  if (viewportWidth >= (1300 - verticalScrollbarWidth)) {
    centerCoords = [59.9388, 30.3215];
  };

  // Создание экземпляра карты и его привязка к контейнеру с
  // заданным id ("map").
  myMap = new ymaps.Map('map-yandex', {
    // При инициализации карты обязательно нужно указать
    // её центр и коэффициент масштабирования.
    center: centerCoords,
    zoom: 18
  }, {
      searchControlProvider: 'yandex#search'
    });

  //отключаем зум колёсиком мышки
  myMap.behaviors.disable('scrollZoom');

  //на мобильных устройствах... (проверяем по userAgent браузера)
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    //... отключаем перетаскивание карты
    myMap.behaviors.disable('drag');
  }

  myPlacemark = new ymaps.Placemark(markCoords, {
    hintContent: '',
    balloonContent: 'ул. Большая Конюшенная, д. 19/8 Санкт-Петербург'
  },
    {
      // Опции.
      // Необходимо указать данный тип макета.
      iconLayout: 'default#image',
      // Своё изображение иконки метки.
      iconImageHref: 'img/map-pin.png',
      // Размеры метки.
      iconImageSize: [124, 106],
      // Смещение левого верхнего угла иконки относительно
      // её "ножки" (точки привязки).
      iconImageOffset: [-62, -106]
    });

  myMap.geoObjects.add(myPlacemark)
}
