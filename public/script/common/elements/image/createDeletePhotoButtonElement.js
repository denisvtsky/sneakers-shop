export default function (onClickAction) {
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Удалить';
    deleteButton.className = 'delete_photo_btn';
    deleteButton.addEventListener('click', async function (e) {
        e.preventDefault();

        const response = await onClickAction();

        if (response) {
            this.parentNode.remove();
        }
    });

    return deleteButton;
}
