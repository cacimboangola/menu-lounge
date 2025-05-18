// Admin Panel JavaScript

// Global variables
let menuData = {
    comidas: [],
    bebidas: []
};

let categories = {
    comidas: [],
    bebidas: []
};

let currentItemId = null;
let currentAction = 'add';

// DOM Elements
const adminDashboard = document.getElementById('admin-dashboard');

// Navigation
const navLinks = document.querySelectorAll('.sidebar .nav-link');
const contentSections = document.querySelectorAll('.content-section');

// Dashboard elements
const totalComidasEl = document.getElementById('total-comidas');
const totalBebidasEl = document.getElementById('total-bebidas');
const totalCategoriasEl = document.getElementById('total-categorias');
const recentComidasList = document.getElementById('recent-comidas');
const recentBebidasList = document.getElementById('recent-bebidas');

// Tables
const comidasTable = document.getElementById('comidas-table');
const bebidasTable = document.getElementById('bebidas-table');

// Category lists
const comidasCategoriesList = document.getElementById('comidas-categories');
const bebidasCategoriesList = document.getElementById('bebidas-categories');

// Forms
const itemForm = document.getElementById('item-form');
const categoryForm = document.getElementById('category-form');
const settingsForm = document.getElementById('settings-form');

// Modals
const addItemModal = new bootstrap.Modal(document.getElementById('addItemModal'));
const addCategoryModal = new bootstrap.Modal(document.getElementById('addCategoryModal'));
const confirmationModal = new bootstrap.Modal(document.getElementById('confirmationModal'));

// Form elements
const itemId = document.getElementById('item-id');
const itemCategory = document.getElementById('item-category');
const itemName = document.getElementById('item-name');
const itemPrice = document.getElementById('item-price');
const itemSubcategory = document.getElementById('item-subcategory');
const itemDescription = document.getElementById('item-description');
const itemImage = document.getElementById('item-image');
const imagePreview = document.getElementById('image-preview');
const imagePreviewContainer = document.getElementById('image-preview-container');

const categoryType = document.getElementById('category-type');
const categoryName = document.getElementById('category-name');

// Buttons
const saveItemBtn = document.getElementById('save-item');
const saveCategoryBtn = document.getElementById('save-category');
const saveAllDataBtn = document.getElementById('save-all-data');
const exportDataBtn = document.getElementById('export-data');
const importDataBtn = document.getElementById('import-data');
const importFileInput = document.getElementById('import-file');
const confirmActionBtn = document.getElementById('confirm-action');

// Initialize the admin panel
document.addEventListener('DOMContentLoaded', () => {
    // Event listeners
    
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavigation);
    });
    
    saveItemBtn.addEventListener('click', handleSaveItem);
    saveCategoryBtn.addEventListener('click', handleSaveCategory);
    saveAllDataBtn.addEventListener('click', handleSaveAllData);
    
    exportDataBtn.addEventListener('click', handleExportData);
    importDataBtn.addEventListener('click', () => importFileInput.click());
    importFileInput.addEventListener('change', handleImportData);
    
    itemImage.addEventListener('change', handleImagePreview);
    
    // Inicializar o dashboard diretamente
    adminDashboard.style.display = 'block';
    
    // Mostrar a seção de dashboard por padrão
    document.getElementById('dashboard-section').style.display = 'block';
    
    // Marcar o link do dashboard como ativo
    document.querySelector('.nav-link[data-section="dashboard"]').classList.add('active');
    
    // Load menu data
    loadMenuData();
});

// Funções de navegação

// Navigation functions
function handleNavigation(e) {
    e.preventDefault();
    
    const targetSection = e.currentTarget.getAttribute('data-section');
    
    // Update active link
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    e.currentTarget.classList.add('active');
    
    // Show target section
    contentSections.forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById(`${targetSection}-section`).style.display = 'block';
}

// Data loading functions
function loadMenuData() {
    console.log('Iniciando carregamento de dados...');
    try {
        // Usar dados estáticos diretamente para garantir o funcionamento
        console.log('Usando dados estáticos para o menu');
        
        // Dados estáticos de comida
        const comidaData = {
            "Snacks": [
                { "item": "Sandes Club com Frango", "preco_kz": 4500 },
                { "item": "Sandes Pão de Forma", "preco_kz": 1500 },
                { "item": "Hambúrguer Simples", "preco_kz": 2500 }
            ],
            "Pratos da Casa": [
                { "item": "Bitoque", "preco_kz": 5000 },
                { "item": "Bitoque com Cogumelos", "preco_kz": 5500 }
            ]
        };
        
        // Dados estáticos de bebida
        const bebidaData = {
            "Cocktails": [
                { "item": "Blue Lagoon", "preco_kz": 3500 },
                { "item": "Caipirinha", "preco_kz": 3500 }
            ],
            "Whisky": [
                { "item": "J&B", "preco_kz": 2000 },
                { "item": "Jameson", "preco_kz": 2500 }
            ]
        };
        
        // Process food items
        processComidaData(comidaData);
        
        // Process drink items
        processBebidaData(bebidaData);
        
        // Extract categories
        extractCategories();
        
        // Update UI
        updateDashboard();
        updateTables();
        updateCategoryLists();
        
    } catch (error) {
        console.error('Error loading menu data:', error);
        alert('Erro ao carregar dados do menu. Por favor, tente novamente mais tarde.');
    }
}

// Process food data from JSON
function processComidaData(data) {
    menuData.comidas = [];
    let idCounter = 1;
    
    for (const category in data) {
        data[category].forEach(item => {
            menuData.comidas.push({
                id: `c${idCounter++}`,
                name: item.item,
                description: item.descricao || '',
                price: item.preco_kz,
                category: 'comidas',
                subcategory: category,
                image: getPlaceholderImage(item.item, category)
            });
        });
    }
}

// Process drink data from JSON
function processBebidaData(data) {
    menuData.bebidas = [];
    let idCounter = 1;
    
    for (const category in data) {
        data[category].forEach(item => {
            menuData.bebidas.push({
                id: `b${idCounter++}`,
                name: item.item,
                description: item.descricao || '',
                price: item.preco_kz,
                category: 'bebidas',
                subcategory: category,
                image: getPlaceholderImage(item.item, category)
            });
        });
    }
}

// Extract categories from menu data
function extractCategories() {
    categories = {
        comidas: [],
        bebidas: []
    };
    
    // Extract food categories
    menuData.comidas.forEach(item => {
        if (!categories.comidas.includes(item.subcategory)) {
            categories.comidas.push(item.subcategory);
        }
    });
    
    // Extract drink categories
    menuData.bebidas.forEach(item => {
        if (!categories.bebidas.includes(item.subcategory)) {
            categories.bebidas.push(item.subcategory);
        }
    });
}

// Generate placeholder image URL based on item name
function getPlaceholderImage(itemName, category) {
    // Local image bank
    const localImages = {
        "Hambúrguer": "assets/images/IMG-20250517-WA0087.jpg",
        "Sandes": "assets/images/IMG-20250517-WA0088.jpg",
        "Bitoque": "assets/images/IMG-20250517-WA0089.jpg",
        "Bife": "assets/images/IMG-20250517-WA0090.jpg",
        "Panados": "assets/images/IMG-20250517-WA0091.jpg",
        "Batata Frita": "assets/images/IMG-20250517-WA0092.jpg",
        "Salada": "assets/images/IMG-20250517-WA0093.jpg",
        "Sopa": "assets/images/IMG-20250517-WA0094.jpg",
        "Café": "assets/images/IMG-20250517-WA0095.jpg",
        "Cocktail": "assets/images/IMG-20250517-WA0096.jpg",
        "Mojito": "assets/images/IMG-20250517-WA0097.jpg",
        "Whisky": "assets/images/IMG-20250517-WA0098.jpg",
        "Gin": "assets/images/IMG-20250517-WA0099.jpg",
        "Vodka": "assets/images/IMG-20250517-WA0100.jpg",
        "Rum": "assets/images/IMG-20250517-WA0101.jpg",
        "Licor": "assets/images/IMG-20250517-WA0102.jpg",
        "Tequila": "assets/images/IMG-20250517-WA0103.jpg",
        "Caipirinha": "assets/images/IMG-20250517-WA0104.jpg",
        "Margarita": "assets/images/IMG-20250517-WA0105.jpg",
        "Long Island": "assets/images/IMG-20250517-WA0106.jpg",
        "Piña Colada": "assets/images/IMG-20250517-WA0107.jpg"
    };
    
    // Check for exact match in local images
    for (const key in localImages) {
        if (itemName.toLowerCase().includes(key.toLowerCase())) {
            return localImages[key];
        }
    }
    
    // Default placeholder images by category
    if (category === 'comidas' || category.includes('Snacks') || category.includes('Pratos')) {
        return 'assets/images/IMG-20250517-WA0087.jpg';
    } else if (category === 'bebidas' || category.includes('Cocktails') || category.includes('Whisky')) {
        return 'assets/images/IMG-20250517-WA0096.jpg';
    }
    
    // Generic placeholder
    return 'assets/images/placeholder.jpg';
}

// UI update functions
function updateDashboard() {
    // Update counts
    totalComidasEl.textContent = menuData.comidas.length;
    totalBebidasEl.textContent = menuData.bebidas.length;
    totalCategoriasEl.textContent = categories.comidas.length + categories.bebidas.length;
    
    // Update recent items lists
    updateRecentItems(recentComidasList, menuData.comidas.slice(-5).reverse());
    updateRecentItems(recentBebidasList, menuData.bebidas.slice(-5).reverse());
}

function updateRecentItems(listElement, items) {
    listElement.innerHTML = '';
    
    if (items.length === 0) {
        listElement.innerHTML = '<li class="list-group-item">Nenhum item encontrado</li>';
        return;
    }
    
    items.forEach(item => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        
        const nameSpan = document.createElement('span');
        nameSpan.textContent = item.name;
        
        const badgeSpan = document.createElement('span');
        badgeSpan.className = 'badge badge-subcategory';
        badgeSpan.textContent = item.subcategory;
        
        li.appendChild(nameSpan);
        li.appendChild(badgeSpan);
        
        listElement.appendChild(li);
    });
}

function updateTables() {
    // Update comidas table
    updateItemsTable(comidasTable, menuData.comidas);
    
    // Update bebidas table
    updateItemsTable(bebidasTable, menuData.bebidas);
}

function updateItemsTable(tableElement, items) {
    tableElement.innerHTML = '';
    
    if (items.length === 0) {
        const tr = document.createElement('tr');
        tr.innerHTML = '<td colspan="5" class="text-center">Nenhum item encontrado</td>';
        tableElement.appendChild(tr);
        return;
    }
    
    items.forEach(item => {
        const tr = document.createElement('tr');
        
        // Image cell
        const imgTd = document.createElement('td');
        const img = document.createElement('img');
        img.src = item.image;
        img.alt = item.name;
        img.className = 'preview-image';
        imgTd.appendChild(img);
        
        // Name cell
        const nameTd = document.createElement('td');
        nameTd.textContent = item.name;
        
        // Category cell
        const categoryTd = document.createElement('td');
        const categoryBadge = document.createElement('span');
        categoryBadge.className = 'badge badge-subcategory';
        categoryBadge.textContent = item.subcategory;
        categoryTd.appendChild(categoryBadge);
        
        // Price cell
        const priceTd = document.createElement('td');
        priceTd.textContent = `${item.price.toLocaleString()} Kz`;
        
        // Actions cell
        const actionsTd = document.createElement('td');
        
        const editBtn = document.createElement('button');
        editBtn.className = 'btn btn-sm btn-primary me-2';
        editBtn.innerHTML = '<i class="fas fa-edit"></i>';
        editBtn.addEventListener('click', () => openEditItemModal(item));
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn btn-sm btn-danger';
        deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
        deleteBtn.addEventListener('click', () => openDeleteItemConfirmation(item));
        
        actionsTd.appendChild(editBtn);
        actionsTd.appendChild(deleteBtn);
        
        // Append all cells to row
        tr.appendChild(imgTd);
        tr.appendChild(nameTd);
        tr.appendChild(categoryTd);
        tr.appendChild(priceTd);
        tr.appendChild(actionsTd);
        
        tableElement.appendChild(tr);
    });
}

function updateCategoryLists() {
    // Update comidas categories list
    updateCategoryList(comidasCategoriesList, categories.comidas, 'comidas');
    
    // Update bebidas categories list
    updateCategoryList(bebidasCategoriesList, categories.bebidas, 'bebidas');
    
    // Update subcategory dropdown in item form
    updateSubcategoryDropdown();
}

function updateCategoryList(listElement, categories, type) {
    listElement.innerHTML = '';
    
    if (categories.length === 0) {
        listElement.innerHTML = '<li class="list-group-item">Nenhuma categoria encontrada</li>';
        return;
    }
    
    categories.forEach(category => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        
        const nameSpan = document.createElement('span');
        nameSpan.textContent = category;
        
        const countSpan = document.createElement('span');
        countSpan.className = 'badge bg-primary rounded-pill';
        
        // Count items in this category
        const count = menuData[type].filter(item => item.subcategory === category).length;
        countSpan.textContent = count;
        
        const btnGroup = document.createElement('div');
        btnGroup.className = 'btn-group';
        
        const editBtn = document.createElement('button');
        editBtn.className = 'btn btn-sm btn-outline-primary';
        editBtn.innerHTML = '<i class="fas fa-edit"></i>';
        editBtn.addEventListener('click', () => openEditCategoryModal(category, type));
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn btn-sm btn-outline-danger';
        deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
        deleteBtn.addEventListener('click', () => openDeleteCategoryConfirmation(category, type));
        
        btnGroup.appendChild(editBtn);
        btnGroup.appendChild(deleteBtn);
        
        li.appendChild(nameSpan);
        li.appendChild(countSpan);
        li.appendChild(btnGroup);
        
        listElement.appendChild(li);
    });
}

function updateSubcategoryDropdown() {
    const currentCategory = itemCategory.value || 'comidas';
    const currentCategories = categories[currentCategory];
    
    itemSubcategory.innerHTML = '';
    
    currentCategories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        itemSubcategory.appendChild(option);
    });
}

// Modal functions
function openAddItemModal(category) {
    currentAction = 'add';
    currentItemId = null;
    
    // Reset form
    itemForm.reset();
    imagePreviewContainer.style.display = 'none';
    
    // Set category
    itemCategory.value = category;
    
    // Update subcategory dropdown
    updateSubcategoryDropdown();
    
    // Update modal title
    document.getElementById('itemModalTitle').textContent = `Adicionar ${category === 'comidas' ? 'Comida' : 'Bebida'}`;
    
    // Show modal
    addItemModal.show();
}

function openEditItemModal(item) {
    currentAction = 'edit';
    currentItemId = item.id;
    
    // Fill form
    itemId.value = item.id;
    itemCategory.value = item.category;
    itemName.value = item.name;
    itemPrice.value = item.price;
    itemDescription.value = item.description;
    
    // Update subcategory dropdown
    updateSubcategoryDropdown();
    
    // Select current subcategory
    itemSubcategory.value = item.subcategory;
    
    // Show image preview
    imagePreview.src = item.image;
    imagePreviewContainer.style.display = 'block';
    
    // Update modal title
    document.getElementById('itemModalTitle').textContent = `Editar ${item.category === 'comidas' ? 'Comida' : 'Bebida'}`;
    
    // Show modal
    addItemModal.show();
}

function openDeleteItemConfirmation(item) {
    currentItemId = item.id;
    
    // Set confirmation message
    document.getElementById('confirmation-message').textContent = `Tem certeza que deseja excluir "${item.name}"?`;
    
    // Set confirm action
    confirmActionBtn.onclick = handleDeleteItem;
    
    // Show modal
    confirmationModal.show();
}

function openAddCategoryModal() {
    currentAction = 'add';
    
    // Reset form
    categoryForm.reset();
    
    // Show modal
    addCategoryModal.show();
}

function openEditCategoryModal(categoryName, type) {
    currentAction = 'edit';
    
    // Fill form
    categoryType.value = type;
    document.getElementById('category-name').value = categoryName;
    
    // Disable category type selection for edit
    categoryType.disabled = true;
    
    // Show modal
    addCategoryModal.show();
}

function openDeleteCategoryConfirmation(categoryName, type) {
    // Set confirmation message
    document.getElementById('confirmation-message').textContent = `Tem certeza que deseja excluir a categoria "${categoryName}"?`;
    
    // Set confirm action
    confirmActionBtn.onclick = () => handleDeleteCategory(categoryName, type);
    
    // Show modal
    confirmationModal.show();
}

// Form handling functions
function handleImagePreview(e) {
    const file = e.target.files[0];
    
    if (file) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            imagePreview.src = e.target.result;
            imagePreviewContainer.style.display = 'block';
        }
        
        reader.readAsDataURL(file);
    }
}

function handleSaveItem() {
    // Validate form
    if (!itemName.value || !itemPrice.value || !itemSubcategory.value) {
        alert('Por favor, preencha todos os campos obrigatórios!');
        return;
    }
    
    const category = itemCategory.value;
    
    // Create item object
    const item = {
        name: itemName.value,
        price: parseFloat(itemPrice.value),
        description: itemDescription.value,
        category: category,
        subcategory: itemSubcategory.value,
        image: imagePreview.src || getPlaceholderImage(itemName.value, category)
    };
    
    if (currentAction === 'add') {
        // Generate new ID
        const idPrefix = category === 'comidas' ? 'c' : 'b';
        const idCounter = menuData[category].length + 1;
        item.id = `${idPrefix}${idCounter}`;
        
        // Add to menu data
        menuData[category].push(item);
    } else {
        // Edit existing item
        item.id = currentItemId;
        
        // Find item index
        const itemIndex = menuData[category].findIndex(i => i.id === currentItemId);
        
        if (itemIndex !== -1) {
            // Update item
            menuData[category][itemIndex] = item;
        }
    }
    
    // Save to localStorage
    saveMenuData();
    
    // Update UI
    updateDashboard();
    updateTables();
    
    // Close modal
    addItemModal.hide();
}

function handleSaveCategory() {
    // Validate form
    if (!categoryName.value) {
        alert('Por favor, preencha o nome da categoria!');
        return;
    }
    
    const type = categoryType.value;
    const name = categoryName.value;
    
    if (currentAction === 'add') {
        // Check if category already exists
        if (categories[type].includes(name)) {
            alert('Esta categoria já existe!');
            return;
        }
        
        // Add to categories
        categories[type].push(name);
    } else {
        // Edit existing category
        const oldName = document.getElementById('category-name').defaultValue;
        
        // Update category name in all items
        menuData[type].forEach(item => {
            if (item.subcategory === oldName) {
                item.subcategory = name;
            }
        });
        
        // Update category in categories array
        const categoryIndex = categories[type].findIndex(c => c === oldName);
        
        if (categoryIndex !== -1) {
            categories[type][categoryIndex] = name;
        }
    }
    
    // Save to localStorage
    saveMenuData();
    
    // Update UI
    updateCategoryLists();
    updateTables();
    
    // Close modal
    addCategoryModal.hide();
    
    // Reset category type disabled state
    categoryType.disabled = false;
}

function handleDeleteItem() {
    const category = currentItemId.startsWith('c') ? 'comidas' : 'bebidas';
    
    // Find item index
    const itemIndex = menuData[category].findIndex(i => i.id === currentItemId);
    
    if (itemIndex !== -1) {
        // Remove item
        menuData[category].splice(itemIndex, 1);
        
        // Save to localStorage
        saveMenuData();
        
        // Update UI
        updateDashboard();
        updateTables();
    }
    
    // Close modal
    confirmationModal.hide();
}

function handleDeleteCategory(categoryName, type) {
    // Check if category has items
    const hasItems = menuData[type].some(item => item.subcategory === categoryName);
    
    if (hasItems) {
        alert('Não é possível excluir uma categoria que contém itens!');
        confirmationModal.hide();
        return;
    }
    
    // Find category index
    const categoryIndex = categories[type].findIndex(c => c === categoryName);
    
    if (categoryIndex !== -1) {
        // Remove category
        categories[type].splice(categoryIndex, 1);
        
        // Save to localStorage
        saveMenuData();
        
        // Update UI
        updateCategoryLists();
    }
    
    // Close modal
    confirmationModal.hide();
}

function handleSaveAllData() {
    // Save to localStorage
    saveMenuData();
    
    // Export to JSON files
    exportToJSON();
    
    alert('Dados salvos com sucesso!');
}

// Data storage functions
function saveMenuData() {
    // Save to localStorage
    localStorage.setItem('menuLoungeData', JSON.stringify(menuData));
}

function exportToJSON() {
    // Convert menu data to JSON format for export
    const comidaData = {};
    const bebidaData = {};
    
    // Process food items
    menuData.comidas.forEach(item => {
        if (!comidaData[item.subcategory]) {
            comidaData[item.subcategory] = [];
        }
        
        comidaData[item.subcategory].push({
            item: item.name,
            preco_kz: item.price,
            descricao: item.description
        });
    });
    
    // Process drink items
    menuData.bebidas.forEach(item => {
        if (!bebidaData[item.subcategory]) {
            bebidaData[item.subcategory] = [];
        }
        
        bebidaData[item.subcategory].push({
            item: item.name,
            preco_kz: item.price,
            descricao: item.description
        });
    });
    
    // Create JSON strings
    const comidaJSON = JSON.stringify(comidaData, null, 2);
    const bebidaJSON = JSON.stringify(bebidaData, null, 2);
    
    // Create download links
    downloadJSON(comidaJSON, 'comida.json');
    downloadJSON(bebidaJSON, 'bebida.json');
}

function downloadJSON(jsonData, filename) {
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    
    URL.revokeObjectURL(url);
}

function handleExportData() {
    exportToJSON();
}

function handleImportData(e) {
    const file = e.target.files[0];
    
    if (file) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            try {
                const importedData = JSON.parse(e.target.result);
                
                // Check if it's valid menu data
                if (importedData.comidas && importedData.bebidas) {
                    menuData = importedData;
                    
                    // Extract categories
                    extractCategories();
                    
                    // Save to localStorage
                    saveMenuData();
                    
                    // Update UI
                    updateDashboard();
                    updateTables();
                    updateCategoryLists();
                    
                    alert('Dados importados com sucesso!');
                } else {
                    alert('Formato de dados inválido!');
                }
            } catch (error) {
                console.error('Error importing data:', error);
                alert('Erro ao importar dados. Verifique se o arquivo é um JSON válido.');
            }
        };
        
        reader.readAsText(file);
    }
}

// Event listeners for modal buttons
document.querySelectorAll('[data-bs-toggle="modal"][data-bs-target="#addItemModal"]').forEach(button => {
    button.addEventListener('click', () => {
        const category = button.getAttribute('data-category');
        openAddItemModal(category);
    });
});

// Initialize tooltips
document.addEventListener('DOMContentLoaded', function () {
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    });
});
