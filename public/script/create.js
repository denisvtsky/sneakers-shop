import printMenu from './common/printMenu.js';
import attachListenersToAddPhotoBtn from './common/attachListenersToAddPhotoBtn.js';
import attachListenerToAddSizeBtn from './common/attachListenerToAddSizeBtn.js';
import create from './common/api/merch/create.js';

printMenu();

const images = {};

const addDeleteHandler = (button) => {
    button.addEventListener('click', function () {
        this.parentNode.remove();
    });
};

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('btn-send').addEventListener('click', async (e) => {
        e.preventDefault();
        // eslint-disable-next-line no-restricted-globals
        if (!confirm('Сохранить карточку товара?')) {
            return;
        }

        const brand = document.getElementById('brand').value;
        const model = document.getElementById('model').value;
        const description = document.getElementById('description').value;
        const isActive = document.getElementById('isActive').checked;
        const sizes = Array.from(document.querySelectorAll('.size_item'));

        const formData = new FormData();
        formData.append('brand', brand);
        formData.append('model', model);
        formData.append('description', description);
        formData.append('isActive', isActive ? '1' : '0');

        for (let i = 0; i < sizes.length; i++) {
            const size = sizes[i].querySelector('.size_number').textContent;
            const amount = sizes[i].querySelector('.size_amount').value;

            formData.append(`sizes[${size}]`, amount);
        }

        Object.entries(images).forEach(([shopId, shopImages]) => {
            shopImages.forEach((shopImage) => {
                formData.append(shopId, shopImage, shopImage.name);
            });
        });

        await create(formData);
    });
    document.querySelectorAll('.delete-size').forEach(addDeleteHandler);

    attachListenerToAddSizeBtn();
    attachListenersToAddPhotoBtn(images);
});
