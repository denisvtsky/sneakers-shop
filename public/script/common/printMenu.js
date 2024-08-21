export default function toggleHamburgerMenu() {
    document.getElementById('menu_toggle').addEventListener('change', function () {
        if (this.checked) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    });
}
