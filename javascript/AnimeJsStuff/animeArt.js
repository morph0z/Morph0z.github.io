import {createLayout, utils} from "https://esm.sh/animejs";

const buttons = utils.$('button');

const $dialog = document.createElement('dialog');
$dialog.id = 'layout-dialog';
document.body.appendChild($dialog);


const modalLayout = createLayout($dialog, {
    children: ['.item', '.image'],
    properties: ['--overlay-alpha'],
});


const closeModal = (e) => {
    let $item;
    modalLayout.update(({ root }) => {
        $dialog.close();
        $item = buttons.find(item => item.classList.contains('is-open'));
        $item.classList.remove('is-open'); // Makes the clicked element visible again
        $item.focus();
    });
};

const openModal = e => {
    const $target = e.target;
    const $item = $target.closest('.item');
    const $clone = $item.cloneNode(true);
    $dialog.innerHTML = ''; // Make sure old clones are removed from the modal before adding a new one
    $dialog.appendChild($clone); // Append the clicked element clone to the modal
    modalLayout.update(() => {
        $dialog.showModal(); // Open the modal
        $item.classList.add('is-open');// Hide the clicked element
    });
}

buttons.forEach($button => $button.addEventListener('click', openModal));
$dialog.addEventListener('cancel', closeModal);
$dialog.addEventListener('click', closeModal);
