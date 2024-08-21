export default function (imagePath) {
    const img = document.createElement('img');
    img.src = imagePath;
    img.width = 200;
    img.height = 200;
    img.className = 'item_img';

    return img;
}
