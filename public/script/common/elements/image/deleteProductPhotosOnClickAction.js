import removeProductPhotos from '../../api/merch/removePhotos.js';

export default async (shopId, sneakersId, images) => {
    try {
        await removeProductPhotos(shopId, sneakersId, images);
        return true;
    } catch (e) {
        alert(e.message);
    }

    return false;
};
