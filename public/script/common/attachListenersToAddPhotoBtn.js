import createProductImageElement from './elements/image/createProductImageElement.js';
import createProductImageDivElement from './elements/image/createProductImageDivElement.js';

export default function (images) {
    const btns = document.querySelectorAll('.add-photo_shop_btn');

    btns.forEach((btn) => {
        const shopId = +btn.id.replace('add-photo_', '');

        btn.addEventListener('change', (e) => {
            const { files } = e.target;

            Array.from(files).forEach((file) => {
                const reader = new FileReader();

                reader.onloadend = function () {
                    const img = createProductImageElement(reader.result);
                    const deleteButton = document.createElement('button');
                    deleteButton.textContent = 'Удалить';
                    deleteButton.className = 'delete_photo_btn';
                    deleteButton.addEventListener('click', function () {
                        images[shopId] = images[shopId].filter((image) => image.name !== file.name);
                        this.parentNode.remove();
                        this.remove();
                    });

                    const imgDiv = createProductImageDivElement(img, deleteButton);
                    const imgList = document.querySelector(`#img_list_shop_${shopId}`);
                    imgList.appendChild(imgDiv);
                };

                if (file) {
                    if (typeof images[shopId] === 'undefined') {
                        images[shopId] = [];
                    }

                    images[shopId].push(file);
                    reader.readAsDataURL(file);
                }
            });

            btn.value = null;
        });
    });
}
