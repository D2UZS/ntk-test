const element = (tag, classes = [], content) => {
	const node = document.createElement(tag);
	if (classes.length) {
		node.classList.add(...classes);
	}
	if (content) {
		node.textContent = content;
	}
	return node;
}

function upload(selector, options = {}) {
	let files = [];
	const input = document.querySelector(selector);
	const previewList = element('div', ['docs__list']);
	const open = element('a', ['docs__btn'], 'Прикрепить документы');
	if (options.multi) {
		input.setAttribute('multiple', true);
	}

	if (options.accept && Array.isArray(options.accept)) {
		input.setAttribute('accept', options.accept.join(','));
	}

	input.insertAdjacentElement('afterend', open);
	open.insertAdjacentElement('afterend', previewList);

	const triggerInput = () => input.click();

	const changeHandler = event => {

		// преобразует в массив
		files = Array.from(event.target.files);
		files.forEach(file => {
			previewList.insertAdjacentHTML('afterbegin',
				`<div class="docs__item">
			 ${file.name}
			 <div class="docs__delete" data-name="${file.name}"></div>
			 </div>`);
		});

	}

	const removeHandler = event => {
		if (!event.target.dataset.name) {
			return;
		}

		const { name } = event.target.dataset;
		files = files.filter(file => file.name !== name);

		const block = previewList
			.querySelector(`[data-name="${name}"]`)
			.closest('.docs__item');

		block.remove();

	}

	open.addEventListener('click', triggerInput);
	input.addEventListener('change', changeHandler);
	previewList.addEventListener('click', removeHandler);
}

upload('#file', {
	multi: true,
	accept: ['.doc', '.txt', '.pdf']
});