export default function () {
    document.getElementById('add-size').addEventListener('click', (e) => {
        e.preventDefault();
        const size = prompt('Введите размер');

        if (size === null || size.trim() === '') {
            alert('Невалидное значение размера.');
            return;
        }

        if (size.length > 15) {
            alert(`Максимальная длинна размера - 15, текущий: ${size.length}.`);
            return;
        }

        const sizeList = document.getElementById('size-list');
        const existingSizes = Array.from(sizeList.getElementsByClassName('size_number')).map((el) => el.textContent);

        if (existingSizes.includes(size)) {
            alert('Этот размер уже существует');
            return;
        }

        const sizeItem = document.createElement('div');
        sizeItem.className = 'size_item';

        const sizeNumber = document.createElement('div');
        sizeNumber.className = 'size_number';
        sizeNumber.textContent = size;
        sizeItem.appendChild(sizeNumber);

        const sizeAmount = document.createElement('input');
        sizeAmount.className = 'size_amount';
        sizeAmount.type = 'number';
        sizeItem.appendChild(sizeAmount);

        const button = document.createElement('button');
        button.textContent = 'Х';
        button.type = 'button';
        button.className = 'delete-size';
        sizeItem.appendChild(button);

        button.addEventListener('click', function () {
            this.parentNode.remove();
        });

        document.getElementById('size-list').appendChild(sizeItem);
    });
}
