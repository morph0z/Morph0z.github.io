import {createLayout, utils} from "./animejs";

const buttons = utils.$('button');

// Create demo dialog and append it to the body
const $dialog = document.createElement('dialog');
$dialog.id = 'layout-dialog';
document.body.appendChild($dialog);

// Create the modal layout by setting the dialog as the root
// Since the elements are not yet part of the modal root, it's necessary to specify all animated children
// to tell the layout what to look for during an update
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
        $item.focus(); // Focus to the closed element to preserve the keyboard navigation flow
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
