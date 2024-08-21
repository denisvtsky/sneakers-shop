import printMenu from './common/printMenu.js';
import createProductImageElement from './common/elements/image/createProductImageElement.js';
import deleteBrandPhotosOnClickAction from './common/elements/image/deleteBrandPhotosOnClickAction.js';
import uploadBrandPhotos from './common/api/brand/uploadBrandPhotos.js';
import createDeletePhotoBtn from './common/elements/image/createDeletePhotoButtonElement.js';
import createImageDivElement from './common/elements/image/createProductImageDivElement.js';
import editBrand from './common/api/brand/edit.js';

printMenu();

const brandId = window.location.pathname.split('/').slice(-1)[0];

const generateFileButton = () => {
    const fileBtn = document.createElement('input');
    fileBtn.id = 'add-photo';
    fileBtn.className = 'add-photo_shop_btn';
    fileBtn.type = 'file';

    fileBtn.addEventListener('change', async function (e) {
        const imagesContainer = document.querySelector('.images_horizontal_container');

        try {
            const uploads = await uploadBrandPhotos(brandId, e.target.files);

            uploads.forEach((upload) => {
                if (!upload.status) {
                    alert(upload.message);
                    return;
                }

                const img = createProductImageElement(`/${upload.path}`);
                const deleteButton = createDeletePhotoBtn(() => deleteBrandPhotosOnClickAction(brandId, [upload.path]));

                const imgDiv = createImageDivElement(img, deleteButton);
                imagesContainer.append(imgDiv);
            });
        } catch (error) {
            alert(error.message);
        }

        this.value = null;
    });

    return fileBtn;
};

document.getElementById('btn-send').addEventListener('click', async (e) => {
    e.preventDefault();

    // eslint-disable-next-line no-restricted-globals
    if (!confirm('Сохранить изменения бренда?')) {
        return;
    }

    const description = document.getElementById('description').value;

    editBrand(brandId, description)
        .then((response) => {
            if (!response.data.success && !response.data.message) {
                alert('Что-то пошло не так(');
            } else {
                alert(response.data.message);
            }
        });
});

document.addEventListener('DOMContentLoaded', () => {
    const imagesDiv = document.querySelector('.item_card_images');
    imagesDiv.appendChild(generateFileButton());

    const containerItems = imagesDiv.querySelectorAll('.images_horizontal_container_item');

    containerItems.forEach((item) => {
        const image = item.querySelector('.item_img');
        const deleteButton = createDeletePhotoBtn(
            () => deleteBrandPhotosOnClickAction(brandId, [image.src.replace(`${window.location.origin}/`, '')]),
        );

        item.appendChild(deleteButton);
    });
});
