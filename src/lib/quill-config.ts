export const quillModules = {
    toolbar: [
        [{ header: [2, 3, false] }],
        [{ font: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ align: [] }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link', 'image'],
        [{ color: [] }, { background: [] }], // dropdown with defaults from theme
        ['clean'],
    ],
}

export const quillFormats = [
    'header',
    'font',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'align',
    'list',
    'bullet',
    'link',
    'image',
    'color',
    'background',
    'clean',
]
