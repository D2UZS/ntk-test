ymaps.ready(function () {
	var myMap = new ymaps.Map('map', {
		center: [56.297103, 43.946805],
		zoom: 16
	}, {
		searchControlProvider: 'yandex#search'
	}),

		// Создаём макет содержимого.
		MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
			'<div class="map__local">$[properties.iconContent]</div>'
		),

		myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
			hintContent: 'НТК',
			balloonContent: 'НТК. Комсомольская площадь, 2',
			iconContent: 'Комсомольская площадь, 2'
		}, {
			// Опции.
			// Необходимо указать данный тип макета.
			iconLayout: 'default#imageWithContent',
			// Своё изображение иконки метки.
			iconImageHref: 'images/icons/local-icon.svg',
			// Размеры метки.
			iconImageSize: [91, 100],
			// Смещение левого верхнего угла иконки относительно
			// её "ножки" (точки привязки).
			iconImageOffset: [-45.5, -100],
			// Смещение слоя с содержимым относительно слоя с картинкой.
			iconContentOffset: [-65.5, 116],
			// Макет содержимого.
			iconContentLayout: MyIconContentLayout
		});

	myMap.geoObjects
		.add(myPlacemark);
});