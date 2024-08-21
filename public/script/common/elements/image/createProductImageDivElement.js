export default function (imageElement, deleteButtonElement) {
    const imgDiv = document.createElement('div');
    imgDiv.className = 'img_list_item';
    imgDiv.appendChild(imageElement);
    imgDiv.appendChild(deleteButtonElement);

    return imgDiv;
}
