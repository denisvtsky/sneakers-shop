import createDeletePhotoBtn from './elements/image/createDeletePhotoButtonElement.js';
import createProductImageElement from './elements/image/createProductImageElement.js';
import createImageDivElement from './elements/image/createProductImageDivElement.js';
import uploadProductPhotos from './api/merch/uploadPhotos.js';
import removeProductPhotos from './api/merch/removePhotos.js';

export default async function (event, shopId, sneakersId) {
    const {files} = event.target;
    const imgList = document.querySelector(`#img_list_shop_${shopId}`);

    try {
        const uploads = await uploadProductPhotos(files, shopId, sneakersId);

        uploads.forEach((upload) => {
            if (!upload.status) {
                alert(upload.message);
                return;
            }

            const img = createProductImageElement(`/${upload.path}`);
            const deleteButton = createDeletePhotoBtn(() => removeProductPhotos(shopId, sneakersId, [upload.path]));
            const imgDiv = createImageDivElement(img, deleteButton);

            imgList.appendChild(imgDiv);
        });
    } catch (e) {
        alert(e.message);
    }
}
