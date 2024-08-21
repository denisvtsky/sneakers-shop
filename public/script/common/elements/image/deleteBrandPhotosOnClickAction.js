import removeBrandPhotos from '../../api/brand/removeBrandPhotos.js';

export default async (brandId, photos) => {
    try {
        await removeBrandPhotos(brandId, photos);
        return true;
    } catch (e) {
        alert(e.message);
    }

    return false;
};
