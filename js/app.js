document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const menuContent = document.getElementById('menu-content');
    const themeToggle = document.getElementById('themeToggle');
    const searchInput = document.getElementById('search-input');
    const categoryButtons = document.querySelectorAll('.category-btn');
    const menuModal = document.getElementById('menuModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const originalMenuImage = document.getElementById('originalMenuImage');
    const subcategoryNav = document.getElementById('subcategoryNav');
    
    // Menu images paths
    const menuImages = {
        'comida': 'assets/images/menu loungue comidas.jpg',
        'bebida': 'assets/images/menu loungue  bebidas 1 Oficial.jpg',
        'bebida2': 'assets/images/menu loungue  bebidas 2 Oficial.jpg'
    };
    
    // Current active category and subcategory
    let activeCategory = 'comida';
    let activeSubcategory = 'all';
    
    // Initialize loading state
    showLoadingState();
    
    // View Original Menu functionality
    document.addEventListener('click', (e) => {
        if (e.target.closest('#view-original-menu')) {
            // Get the image loader element
            const imageLoader = document.getElementById('imageLoader');
            
            // Show modal first
            menuModal.classList.remove('hidden');
            
            // Show loading indicator
            imageLoader.classList.add('opacity-100');
            originalMenuImage.classList.add('opacity-50');
            
            // Set appropriate image based on active category
            originalMenuImage.src = menuImages[activeCategory];
            
            // When image loads, hide loader and show image
            originalMenuImage.addEventListener('load', function() {
                imageLoader.classList.remove('opacity-100');
                originalMenuImage.classList.remove('opacity-50');
            }, { once: true });
            
            // Add elegant entrance animation
            const modalContent = menuModal.querySelector('div');
            modalContent.classList.add('scale-95', 'opacity-0');
            setTimeout(() => {
                modalContent.classList.remove('scale-95', 'opacity-0');
                modalContent.classList.add('scale-100', 'opacity-100');
            }, 10);
        }
    });
    
    // Close modal
    closeModalBtn.addEventListener('click', () => {
        menuModal.classList.add('hidden');
    });
    
    // Close modal when clicking outside
    menuModal.addEventListener('click', (e) => {
        if (e.target === menuModal) {
            menuModal.classList.add('hidden');
        }
    });

    // Theme toggle functionality
    themeToggle.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark');
        localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
    });
    
    // Check for saved theme preference
    if (localStorage.getItem('theme') === 'light') {
        document.documentElement.classList.remove('dark');
    }

    // Category buttons functionality
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button styling
            categoryButtons.forEach(btn => {
                btn.classList.remove('active');
            });
            
            button.classList.add('active');
            
            // Update active category and reset subcategory
            activeCategory = button.dataset.category;
            activeSubcategory = 'all';
            
            // Update subcategory navigation
            updateSubcategoryNav();
            
            // Display items
            displayMenuItems();
        });
    });
    
    // Subcategory navigation functionality
    function handleSubcategoryClick(e) {
        if (e.target.classList.contains('subcategory-btn')) {
            const subcategoryButtons = document.querySelectorAll('.subcategory-btn');
            subcategoryButtons.forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
            
            activeSubcategory = e.target.dataset.subcategory;
            displayMenuItems();
        }
    }
    
    subcategoryNav.addEventListener('click', handleSubcategoryClick);

    // Search functionality
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase().trim();
        
        if (searchTerm === '') {
            // If search is empty, show current category
            activeSubcategory = 'all';
            updateSubcategoryNav();
            displayMenuItems();
        } else {
            // Search across all categories
            const allItems = [
                ...menuData.comidas,
                ...menuData.bebidas
            ];
            
            const filteredItems = allItems.filter(item => {
                return (
                    item.name.toLowerCase().includes(searchTerm) ||
                    (item.description && item.description.toLowerCase().includes(searchTerm)) ||
                    item.subcategory.toLowerCase().includes(searchTerm) ||
                    item.category.toLowerCase().includes(searchTerm)
                );
            });
            
            // Hide subcategory nav during search
            subcategoryNav.innerHTML = '';
            
            renderMenuItems(filteredItems);
        }
    });
    
    // Function to update subcategory navigation
    function updateSubcategoryNav() {
        subcategoryNav.innerHTML = '';
        
        // Create "All" button
        const allButton = document.createElement('button');
        allButton.className = `subcategory-btn ${activeSubcategory === 'all' ? 'active' : ''}`;
        allButton.dataset.subcategory = 'all';
        allButton.textContent = 'Todos';
        subcategoryNav.appendChild(allButton);
        
        // Get subcategories for active category
        const items = activeCategory === 'comida' ? menuData.comidas : menuData.bebidas;
        
        // Verificar se temos itens antes de continuar
        if (!items || items.length === 0) {
            console.warn('Nenhum item disponível para a categoria:', activeCategory);
            return;
        }
        
        // Ordenar subcategorias em uma ordem lógica
        let subcategories = [...new Set(items.map(item => item.subcategory))];
        
        // Ordenação personalizada para categorias de comida
        if (activeCategory === 'comida') {
            const orderComida = [
                'Snacks', 'Sopas', 'Pratos da Casa', 'Guarnicoes', 
                'Pequeno Almoco', 'Extras'
            ];
            subcategories.sort((a, b) => {
                return orderComida.indexOf(a) - orderComida.indexOf(b);
            });
        }
        
        // Ordenação personalizada para categorias de bebida
        if (activeCategory === 'bebida') {
            const orderBebida = [
                'Cocktails', 'Shots', 'Whisky', 'Rum', 'Gin', 'Vodka', 
                'Licor', 'Digestivos'
            ];
            subcategories.sort((a, b) => {
                return orderBebida.indexOf(a) - orderBebida.indexOf(b);
            });
        }
        
        // Create buttons for each subcategory
        subcategories.forEach(subcategory => {
            const button = document.createElement('button');
            button.className = `subcategory-btn ${activeSubcategory === subcategory ? 'active' : ''}`;
            button.dataset.subcategory = subcategory;
            button.textContent = subcategory;
            subcategoryNav.appendChild(button);
        });
        
        // Scroll para o botão ativo em dispositivos móveis
        setTimeout(() => {
            const activeButton = subcategoryNav.querySelector('.subcategory-btn.active');
            if (activeButton && window.innerWidth < 640) {
                activeButton.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            }
        }, 100);
    }

    // Function to display menu items by category and subcategory
    function displayMenuItems() {
        showLoadingState();
        
        setTimeout(() => {
            const items = activeCategory === 'comida' ? menuData.comidas : menuData.bebidas;
            
            // Filter by subcategory if not 'all'
            const filteredItems = activeSubcategory === 'all' 
                ? items 
                : items.filter(item => item.subcategory === activeSubcategory);
                
            renderMenuItems(filteredItems);
        }, 300); // Small delay to show loading state
    }
    
    // Function to show loading state
    function showLoadingState() {
        menuContent.innerHTML = `
            <div class="menu-item-skeleton">
                <div class="skeleton-image"></div>
                <div class="skeleton-content">
                    <div class="skeleton-title"></div>
                    <div class="skeleton-price"></div>
                    <div class="skeleton-description"></div>
                    <div class="skeleton-description"></div>
                </div>
            </div>
            <div class="menu-item-skeleton">
                <div class="skeleton-image"></div>
                <div class="skeleton-content">
                    <div class="skeleton-title"></div>
                    <div class="skeleton-price"></div>
                    <div class="skeleton-description"></div>
                    <div class="skeleton-description"></div>
                </div>
            </div>
            <div class="menu-item-skeleton">
                <div class="skeleton-image"></div>
                <div class="skeleton-content">
                    <div class="skeleton-title"></div>
                    <div class="skeleton-price"></div>
                    <div class="skeleton-description"></div>
                    <div class="skeleton-description"></div>
                </div>
            </div>
        `;
    }

    // Function to render menu items to the DOM
    function renderMenuItems(items) {
        // Clear the container
        menuContent.innerHTML = '';
        
        if (items.length === 0) {
            menuContent.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-utensils no-results-icon"></i>
                    <p class="no-results-text">Nenhum item encontrado</p>
                    <p class="text-gray-500 mt-2">Tente outra pesquisa ou categoria</p>
                </div>
            `;
            return;
        }
        
        // Group items by subcategory if not searching
        const isSearching = searchInput.value.trim() !== '';
        
        if (isSearching) {
            // When searching, just show items without subcategory headers
            items.forEach(item => {
                const itemElement = createMenuItemElement(item);
                menuContent.appendChild(itemElement);
            });
        } else {
            // Group items by subcategory
            const groupedItems = {};
            items.forEach(item => {
                if (!groupedItems[item.subcategory]) {
                    groupedItems[item.subcategory] = [];
                }
                groupedItems[item.subcategory].push(item);
            });
            
            // Render each subcategory and its items
            Object.keys(groupedItems).forEach(subcategory => {
                // Add subcategory header
                const subcategoryHeader = document.createElement('div');
                subcategoryHeader.className = 'subcategory-header';
                subcategoryHeader.innerHTML = `
                    <h2 class="subcategory-title">${subcategory}</h2>
                `;
                menuContent.appendChild(subcategoryHeader);
                
                // Add items in this subcategory
                groupedItems[subcategory].forEach(item => {
                    const itemElement = createMenuItemElement(item);
                    menuContent.appendChild(itemElement);
                });
            });
        }
        
        // Add animation to menu items
        const allItems = document.querySelectorAll('.menu-item');
        allItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            setTimeout(() => {
                item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 50 * index);
        });
    }
    
    // Helper function to create menu item element
    function createMenuItemElement(item) {
        const itemElement = document.createElement('div');
        itemElement.className = 'menu-item';
        
        // Generate a color based on the item name for the placeholder
        const hash = item.name.split('').reduce((acc, char) => {
            return char.charCodeAt(0) + ((acc << 5) - acc);
        }, 0);
        const hue = Math.abs(hash % 360);
        const saturation = 70;
        const lightness = 40;
        
        // Create a placeholder with the item name and a color based on the name
        const bgColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
        const textColor = 'ffffff';
        
        const imagePlaceholder = `https://via.placeholder.com/400x300/${bgColor.replace('#', '')}/${textColor}?text=${encodeURIComponent(item.name.substring(0, 15))}`;
        
        // Check if item has a description
        const description = item.description ? `<p class="menu-item-description">${item.description}</p>` : '';
        
        itemElement.innerHTML = `
            <div class="menu-item-image">
                <img src="${item.image || imagePlaceholder}" alt="${item.name}" 
                     onerror="this.onerror=null; this.src='${imagePlaceholder}';">
            </div>
            <div class="menu-item-content">
                <div class="menu-item-header">
                    <h3 class="menu-item-title">${item.name}</h3>
                    <span class="menu-item-price">${item.price}</span>
                </div>
                ${description}
                <div class="mt-4 text-xs text-gray-500 dark:text-gray-400">
                    <span class="inline-block bg-gray-100 dark:bg-gray-800 rounded-full px-2 py-1">
                        ${item.subcategory}
                    </span>
                </div>
            </div>
        `;
        
        return itemElement;
    }
    
    // Initialize the app
    updateSubcategoryNav();
    loadMenuData(); // This will call initializeMenu() after data is loaded
});

// Function to initialize the menu after data is loaded
function initializeMenu() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    const activeButton = document.querySelector('.category-btn.active');
    
    if (activeButton) {
        const category = activeButton.dataset.category;
        const subcategoryNav = document.getElementById('subcategoryNav');
        
        // Trigger a click on the active category button
        activeButton.click();
    } else if (categoryButtons.length > 0) {
        // Click the first button if none is active
        categoryButtons[0].click();
    }
}
