import printMenu from './common/printMenu.js';
import attachListenerToAddSizeBtn from './common/attachListenerToAddSizeBtn.js';
import createDeletePhotoBtn from './common/elements/image/createDeletePhotoButtonElement.js';
import handleAddPhotosEvent from './common/handleAddPhotosEventForEdit.js';
import deleteProductPhotosOnClickAction from './common/elements/image/deleteProductPhotosOnClickAction.js';
import edit from './common/api/merch/edit.js';

printMenu();

const sneakersId = +window.location.pathname.split('/').slice(-1)[0];

const addDeleteHandler = (button) => {
    button.addEventListener('click', function () {
        this.parentNode.remove();
    });
};
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.size_item').forEach((item) => {
        const button = document.createElement('button');
        button.textContent = 'Х';
        button.type = 'button';
        button.className = 'delete-size';
        item.appendChild(button);
        addDeleteHandler(button);
    });

    const all = document.querySelectorAll('.item_card_img_shop');
    all.forEach((item) => {
        const shopId = +item.id.replace('item_card_img_', '');
        const imagesDivShop = document.querySelector(`#item_card_img_${shopId}`);
        const imagesContainersShop = imagesDivShop.querySelectorAll('.img_list_item');

        imagesContainersShop.forEach((imageContainerShop) => {
            const img = imageContainerShop.querySelector('.item_img');
            imageContainerShop.appendChild(
                createDeletePhotoBtn(
                    async () => deleteProductPhotosOnClickAction(shopId, sneakersId, [img.src.replace(`${window.location.origin}/`, '')]),
                ),
            );
        });
    });

    const btns = document.querySelectorAll('.add-photo_shop_btn');

    btns.forEach((btn) => {
        const shopId = +btn.id.replace('add-photo_', '');
        btn.addEventListener('change', function (event) {
            handleAddPhotosEvent(event, shopId, sneakersId);
            this.value = null;
        });
    });
    attachListenerToAddSizeBtn();
});

document.getElementById('btn-send').addEventListener('click', async (e) => {
    e.preventDefault();
    // eslint-disable-next-line no-restricted-globals
    if (!confirm('Сохранить изменения товара?')) {
        return;
    }

    const description = document.getElementById('description').value;
    const isActive = document.getElementById('isActive').checked;
    const sizes = Array.from(document.querySelectorAll('.size_item'));

    const request = {
        id: sneakersId,
        isActive,
        sizes: {},
        description,
    };

    for (let i = 0; i < sizes.length; i++) {
        const size = sizes[i].querySelector('.size_number').textContent;
        request.sizes[size] = sizes[i].querySelector('.size_amount').value;
    }

    await edit(request);
});

document.querySelectorAll('.delete-size').forEach(addDeleteHandler);
