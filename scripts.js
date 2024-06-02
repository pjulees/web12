// Получение выбранных фильтров
function getSelectedFilters() {
    const filters = {
        price: {
            min: parseInt(document.getElementById('price-min').value),
            max: parseInt(document.getElementById('price-max').value)
        },
        purpose: [],
        pattern: [],
        shade: []
    };

    // Сбор информации о выбранных чекбоксах
    document.querySelectorAll('.filter-content input[type="checkbox"]:checked').forEach(checkbox => {
        const parentLabel = checkbox.closest('.filter-group').querySelector('.filter-label');
        if (parentLabel) {
            const filterType = parentLabel.textContent.trim();
            const filterValue = checkbox.value;
            if (filterType.includes('Назначение')) {
                filters.purpose.push(filterValue);
            } else if (filterType.includes('Рисунок')) {
                filters.pattern.push(filterValue);
            } else if (filterType.includes('Оттенок')) {
                filters.shade.push(filterValue);
            }
        }
    });

    return filters;
}

// Обновление подсказки с количеством товаров
function updateTooltip() {
    const filters = getSelectedFilters();
    const items = document.querySelectorAll('.catalog .item');
    let count = 0;

    items.forEach(item => {
        const price = parseInt(item.getAttribute('data-price'));
        const purpose = item.getAttribute('data-purpose');
        const pattern = item.getAttribute('data-pattern');
        const shade = item.getAttribute('data-shade');

        const matchesPrice = price >= filters.price.min && price <= filters.price.max;
        const matchesPurpose = filters.purpose.length === 0 || filters.purpose.includes(purpose);
        const matchesPattern = filters.pattern.length === 0 || filters.pattern.includes(pattern);
        const matchesShade = filters.shade.length === 0 || filters.shade.includes(shade);

        if (matchesPrice && matchesPurpose && matchesPattern && matchesShade) {
            count++;
        }
    });

    const tooltip = document.querySelector('.filter-hint');
    tooltip.textContent = `Товаров: ${count}`;
    tooltip.classList.add('show')
    const showBtn = document.querySelector('.show-btn');
    showBtn.textContent = `Товаров: ${count}`;
}
const tooltip = document.querySelector('.filter-hint');
const showBtn = document.querySelector('.show-btn');
let resetBtn = document.querySelector('.reset-btn');
tooltip.onclick = hideHint
showBtn.onclick = hideHint
resetBtn.onclick = hideHint
function hideHint() {
    tooltip.classList.remove('show')
    filterSidebar.classList.remove('show')
}

// Применение фильтров и обновление отображения товаров
function applyFilters() {
    const filters = getSelectedFilters();
    const items = document.querySelectorAll('.catalog .item');

    items.forEach(item => {
        const price = parseInt(item.getAttribute('data-price'));
        const purpose = item.getAttribute('data-purpose');
        const pattern = item.getAttribute('data-pattern');
        const shade = item.getAttribute('data-shade');

        const matchesPrice = price >= filters.price.min && price <= filters.price.max;
        const matchesPurpose = filters.purpose.length === 0 || filters.purpose.includes(purpose);
        const matchesPattern = filters.pattern.length === 0 || filters.pattern.includes(pattern);
        const matchesShade = filters.shade.length === 0 || filters.shade.includes(shade);

        item.style.display = matchesPrice && matchesPurpose && matchesPattern && matchesShade ? 'block' : 'none';
    });
}

// Навешивание обработчиков событий на элементы управления фильтрами
document.querySelectorAll('.filter-content input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', updateTooltip);
});

document.getElementById('price-min').addEventListener('input', updateTooltip);
document.getElementById('price-max').addEventListener('input', updateTooltip);

// Обработчик событий для подсказки, который применяет фильтры
document.querySelector('.filter-hint').addEventListener('click', applyFilters);
document.querySelector('.show-btn').addEventListener('click', applyFilters);

// Сброс фильтров
document.querySelector('.reset-btn').addEventListener('click', () => {
    document.querySelectorAll('.filter-content input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = false;
    });

    document.getElementById('price-min').value = 0;
    document.getElementById('price-max').value = 3000;

    updateTooltip(); // Обновляем подсказку
    applyFilters(); // Применяем фильтры
    tooltip.classList.remove('show')
});

// Разворачивание и сворачивание групп фильтров
document.querySelectorAll('.filter-label').forEach(label => {
    label.addEventListener('click', () => {
        const content = label.nextElementSibling.nextElementSibling;
        content.style.display = content.style.display === 'block' ? 'none' : 'block';
    });
});


/*----------------------------*/


var mobileFilterScrolHint = document.querySelector('.mobile-filter-scrol-hint');

var showAtHeight = 300;

window.addEventListener('scroll', function () {
    if (window.scrollY > showAtHeight) {
        mobileFilterScrolHint.classList.add('show')
    } else {
        mobileFilterScrolHint.classList.remove('show')
    }
});

document.querySelector('.filter-mobail-btn').onclick = showSidebar
mobileFilterScrolHint.onclick = showSidebar
const filterSidebar = document.querySelector('.filter-sidebar')

function showSidebar() {
    filterSidebar.classList.add('show')
}
