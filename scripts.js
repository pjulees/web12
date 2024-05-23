// Функция для получения выбранных фильтров
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

    console.log('Selected Filters:', filters); // Debugging
    return filters;
}

// Функция для фильтрации товаров
function filterItems() {
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

        if (matchesPrice && matchesPurpose && matchesPattern && matchesShade) {
            item.style.display = 'block'; // Показываем товар
        } else {
            item.style.display = 'none'; // Скрываем товар
        }
    });
}

// Добавляем обработчики для автоматического применения фильтров
document.querySelectorAll('.filter-content input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', filterItems);
});

document.getElementById('price-min').addEventListener('input', filterItems);
document.getElementById('price-max').addEventListener('input', filterItems);

// Обработчик для кнопки "Сбросить"
document.querySelector('.reset-btn').addEventListener('click', () => {
    document.querySelectorAll('.filter-content input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = false;
    });

    document.getElementById('price-min').value = 0;
    document.getElementById('price-max').value = 3000;

    filterItems();
});

// Добавление логики для отображения/скрытия фильтров
document.querySelectorAll('.filter-label').forEach(label => {
    label.addEventListener('click', () => {
        const content = label.nextElementSibling.nextElementSibling;
        if (content.style.display === 'block') {
            content.style.display = 'none';
        } else {
            content.style.display = 'block';
        }
    });
});
