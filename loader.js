function loadComponent(elementId, filePath) {
    fetch(filePath)
        .then(response => {
            if (!response.ok) throw new Error('Erro ao carregar ' + filePath);
            return response.text();
        })
        .then(data => {
            const element = document.getElementById(elementId);
            element.innerHTML = data;

            const isInsidePages = window.location.href.includes('/pages/');

            if (isInsidePages) {

                const links = element.querySelectorAll('a');
                links.forEach(link => {
                    const href = link.getAttribute('href');
                    
                    // Se o link aponta para algo dentro de pages, remove o prefixo
                    if (href && href.startsWith('./pages/')) {
                        link.setAttribute('href', href.replace('./pages/', './'));
                    } 
                    // Se o link aponta para a Home, volta um nivel
                    else if (href === './index.html') {
                        link.setAttribute('href', '../index.html');
                    }
                });

                // 2. Corrigir Imagens (<img>)
                const images = element.querySelectorAll('img');
                images.forEach(img => {
                    const src = img.getAttribute('src');
                    if (src && src.startsWith('./img/')) {
                        img.setAttribute('src', src.replace('./img/', '../img/'));
                    }
                });
            }
        })
        .catch(error => console.error('Erro:', error));
}