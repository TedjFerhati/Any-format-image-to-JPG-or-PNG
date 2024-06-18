function findImage(element) {
    // Cherche dans l'élément lui-même
    if (element.tagName === 'IMG') {
        return element.src;
    }

    // Cherche dans les enfants de l'élément
    const imgInChildren = element.querySelector('img');
    if (imgInChildren) {
        return imgInChildren.src;
    }

    // Passe à la hiérarchie supérieure
    let parent = element.parentElement;
    while (parent) {
        // Cherche dans le parent lui-même
        if (parent.tagName === 'IMG') {
            return parent.src;
        }

        // Cherche dans les enfants du parent
        const imgInParentChildren = parent.querySelector('img');
        if (imgInParentChildren) {
            return imgInParentChildren.src;
        }

        // Passe au parent suivant
        parent = parent.parentElement;
    }

    // Si aucune image n'est trouvée
    return null;
}

function downloadImage(url, format) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const image = new Image();

    image.crossOrigin = 'anonymous';
    image.src = url;
    image.onload = () => {
        canvas.width = image.width;
        canvas.height = image.height;
        context.drawImage(image, 0, 0);
        canvas.toBlob((blob) => {
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = `image.${format}`;
            link.click();
            URL.revokeObjectURL(link.href);
        }, `image/${format}`);
    };
}

document.addEventListener('contextmenu', (event) => {
    const imageUrl = findImage(event.target);

    // Envoie un message au service worker avec l'URL de l'image ou null
    chrome.runtime.sendMessage({imageUrl: imageUrl});
});

chrome.runtime.onMessage.addListener((message) => {
    if (message.command === 'downloadImage' && message.url && message.format) {
        downloadImage(message.url, message.format);
    }
});
