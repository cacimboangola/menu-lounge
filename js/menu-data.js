// Menu data module
let menuData = {
    comidas: [],
    bebidas: []
};

// Function to load JSON data
async function loadMenuData() {
    try {
        // Tenta carregar via fetch (funciona em servidor)
        try {
            const comidaResponse = await fetch('database/comida.json');
            const comidaData = await comidaResponse.json();
            
            const bebidaResponse = await fetch('database/bebida.json');
            const bebidaData = await bebidaResponse.json();
            
            // Process food items
            processComidaData(comidaData);
            
            // Process drink items
            processBebidaData(bebidaData);
            
            // Initialize the menu after data is loaded
            initializeMenu();
            return; // Sai da função se o fetch funcionar
        } catch (fetchError) {
            console.log('Fetch não funcionou, tentando carregar dados estáticos:', fetchError);
        }
        
        // Se o fetch falhar, usa dados estáticos
        // Dados de comida estáticos
        const comidaData = {
            "Snacks": [
                { "item": "Sandes Club com Frango", "preco_kz": 4500 },
                { "item": "Sandes Pão de Forma", "preco_kz": 1500 },
                { "item": "Hambúrguer Simples", "preco_kz": 2500 },
                { "item": "Hambúrguer com Queijo", "preco_kz": 3000 },
                { "item": "Hambúrguer Completo", "preco_kz": 3500 },
                { "item": "Cachorro Quente", "preco_kz": 2000 },
                { "item": "Cachorro Completo", "preco_kz": 2500 },
                { "item": "Francesinha", "preco_kz": 3500 },
                { "item": "Tosta Mista", "preco_kz": 2000 },
                { "item": "Tosta de Frango", "preco_kz": 2500 },
                { "item": "Tosta de Atum", "preco_kz": 2500 },
                { "item": "Panado no Pão", "preco_kz": 2500 },
                { "item": "Bifana no Pão", "preco_kz": 2500 }
            ],
            "Pratos da Casa": [
                { "item": "Bitoque", "preco_kz": 5000 },
                { "item": "Bitoque com Cogumelos", "preco_kz": 5500 },
                { "item": "Bife da Casa", "preco_kz": 5500 },
                { "item": "Bife com Cogumelos", "preco_kz": 6000 },
                { "item": "Panados", "preco_kz": 5000 },
                { "item": "Febras", "preco_kz": 5000 },
                { "item": "Prego no Prato", "preco_kz": 5000 },
                { "item": "Filé de Pescada", "preco_kz": 5000 },
                { "item": "Bacalhau com Natas", "preco_kz": 6000 },
                { "item": "Espetada Mista", "preco_kz": 5500 },
                { "item": "Espetada de Camarão", "preco_kz": 6000 }
            ],
            "Guarnicoes": [
                { "item": "Arroz", "preco_kz": 1000 },
                { "item": "Batata Frita", "preco_kz": 1000 },
                { "item": "Salada", "preco_kz": 1000 },
                { "item": "Feijão", "preco_kz": 1000 },
                { "item": "Ovo Estrelado", "preco_kz": 500 }
            ],
            "Sopas": [
                { "item": "Caldo Verde", "preco_kz": 2000 },
                { "item": "Sopa de Legumes", "preco_kz": 1500 }
            ],
            "Pequeno Almoco": [
                { "item": "Café", "preco_kz": 500 },
                { "item": "Torrada", "preco_kz": 1000 },
                { "item": "Meia de Leite", "preco_kz": 1000 },
                { "item": "Galão", "preco_kz": 1000 },
                { "item": "Chocolate Quente", "preco_kz": 1500 },
                { "item": "Chá", "preco_kz": 1000 }
            ],
            "Extras": [
                { "item": "Ovo", "preco_kz": 500 },
                { "item": "Queijo", "preco_kz": 500 },
                { "item": "Fiambre", "preco_kz": 500 },
                { "item": "Cogumelos", "preco_kz": 1000 },
                { "item": "Bacon", "preco_kz": 1000 }
            ]
        };
        
        // Dados de bebida estáticos
        const bebidaData = {
            "Cocktails": [
                { "item": "Blue Lagoon", "preco_kz": 3500 },
                { "item": "Caipirinha", "preco_kz": 3500 },
                { "item": "Caipiroska", "preco_kz": 3500 },
                { "item": "Daiquiri", "preco_kz": 3500 },
                { "item": "Dry Martini", "preco_kz": 3500 },
                { "item": "Gin Fizz", "preco_kz": 3500 },
                { "item": "Gin Tonic", "preco_kz": 3500 },
                { "item": "Long Island", "preco_kz": 4000 },
                { "item": "Margarita", "preco_kz": 3500 },
                { "item": "Mojito", "preco_kz": 3500 },
                { "item": "Piña Colada", "preco_kz": 3500 },
                { "item": "Sex on the Beach", "preco_kz": 3500 },
                { "item": "Tequila Sunrise", "preco_kz": 3500 }
            ],
            "Shots": [
                { "item": "Tequila", "preco_kz": 1500 },
                { "item": "Sambuca", "preco_kz": 1500 }
            ],
            "Whisky": [
                { "item": "J&B", "preco_kz": 2000 },
                { "item": "Jameson", "preco_kz": 2500 },
                { "item": "Jack Daniel's", "preco_kz": 3000 },
                { "item": "Red Label", "preco_kz": 2500 },
                { "item": "Black Label", "preco_kz": 3500 }
            ],
            "Rum": [
                { "item": "Bacardi", "preco_kz": 2000 },
                { "item": "Havana Club", "preco_kz": 2500 }
            ],
            "Gin": [
                { "item": "Gordon's", "preco_kz": 2000 },
                { "item": "Bombay", "preco_kz": 3000 },
                { "item": "Beefeater", "preco_kz": 2500 }
            ],
            "Vodka": [
                { "item": "Absolut", "preco_kz": 2500 },
                { "item": "Smirnoff", "preco_kz": 2000 }
            ],
            "Licor": [
                { "item": "Baileys", "preco_kz": 2000 },
                { "item": "Safari", "preco_kz": 2000 },
                { "item": "Malibu", "preco_kz": 2000 },
                { "item": "Amarula", "preco_kz": 2000 }
            ],
            "Digestivos": [
                { "item": "Aguardente", "preco_kz": 1500 },
                { "item": "Cognac", "preco_kz": 2500 }
            ]
        };
        
        // Process food items
        processComidaData(comidaData);
        
        // Process drink items
        processBebidaData(bebidaData);
        
        // Initialize the menu after data is loaded
        initializeMenu();
        
    } catch (error) {
        console.error('Error loading menu data:', error);
        alert('Erro ao carregar o menu. Por favor, tente novamente mais tarde.');
    }
}

// Process food data from JSON
function processComidaData(data) {
    let idCounter = 1;
    
    for (const category in data) {
        data[category].forEach(item => {
            menuData.comidas.push({
                id: `c${idCounter++}`,
                name: item.item,
                description: item.descricao || '',
                price: formatPrice(item.preco_kz),
                category: 'comidas',
                subcategory: category,
                image: getPlaceholderImage(item.item, category)
            });
        });
    }
}

// Process drink data from JSON
function processBebidaData(data) {
    let idCounter = 1;
    
    for (const category in data) {
        data[category].forEach(item => {
            menuData.bebidas.push({
                id: `b${idCounter++}`,
                name: item.item,
                description: item.descricao || '',
                price: formatPrice(item.preco_kz),
                category: 'bebidas',
                subcategory: category,
                image: getPlaceholderImage(item.item, category)
            });
        });
    }
}

// Format price with thousand separator
function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + ' Kz';
}

// Generate real image URL based on item name
function getPlaceholderImage(itemName, category) {
    // Banco de imagens locais
    const localImages = {
        // Mapeamento de imagens locais
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
    
    // Verificar correspondência exata nas imagens locais
    for (const key in localImages) {
        if (itemName.toLowerCase().includes(key.toLowerCase())) {
            return localImages[key];
        }
    }
    
    // Banco de imagens reais para itens comuns (fallback)
    const imageDatabase = {
        // Comidas - Snacks
        "Sandes Club com Frango": "https://images.pexels.com/photos/1600711/pexels-photo-1600711.jpeg",
        "Sandes Pão de Forma": "https://images.pexels.com/photos/1647163/pexels-photo-1647163.jpeg",
        "Hambúrguer": "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg",
        "Hambúrguer Simples": "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg",
        "Hambúrguer com Queijo": "https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg",
        "Hambúrguer Completo": "https://images.pexels.com/photos/2983101/pexels-photo-2983101.jpeg",
        "Cachorro Quente": "https://images.pexels.com/photos/5718073/pexels-photo-5718073.jpeg",
        "Cachorro Completo": "https://images.pexels.com/photos/5718073/pexels-photo-5718073.jpeg",
        "Francesinha": "https://images.pexels.com/photos/1893556/pexels-photo-1893556.jpeg",
        "Tosta Mista": "https://images.pexels.com/photos/5589050/pexels-photo-5589050.jpeg",
        "Tosta de Frango": "https://images.pexels.com/photos/7390098/pexels-photo-7390098.jpeg",
        "Tosta de Atum": "https://images.pexels.com/photos/7390098/pexels-photo-7390098.jpeg",
        "Panado no Pão": "https://images.pexels.com/photos/5945514/pexels-photo-5945514.jpeg",
        "Bifana no Pão": "https://images.pexels.com/photos/1647163/pexels-photo-1647163.jpeg",
        
        // Comidas - Pratos da Casa
        "Bitoque": "https://images.pexels.com/photos/675951/pexels-photo-675951.jpeg",
        "Bitoque com Cogumelos": "https://images.pexels.com/photos/675951/pexels-photo-675951.jpeg",
        "Bife da Casa": "https://images.pexels.com/photos/1307658/pexels-photo-1307658.jpeg",
        "Bife com Cogumelos": "https://images.pexels.com/photos/3997609/pexels-photo-3997609.jpeg",
        "Panados": "https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg",
        "Febras": "https://images.pexels.com/photos/1251208/pexels-photo-1251208.jpeg",
        "Prego no Prato": "https://images.pexels.com/photos/1307658/pexels-photo-1307658.jpeg",
        "Filé de Pescada": "https://images.pexels.com/photos/262959/pexels-photo-262959.jpeg",
        "Bacalhau com Natas": "https://images.pexels.com/photos/262959/pexels-photo-262959.jpeg",
        "Espetada Mista": "https://images.pexels.com/photos/1766645/pexels-photo-1766645.jpeg",
        "Espetada de Camarão": "https://images.pexels.com/photos/725991/pexels-photo-725991.jpeg",
        
        // Comidas - Guarnicoes
        "Arroz": "https://images.pexels.com/photos/1095550/pexels-photo-1095550.jpeg",
        "Batata Frita": "https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg",
        "Salada": "https://images.pexels.com/photos/1059905/pexels-photo-1059905.jpeg",
        "Feijão": "https://images.pexels.com/photos/5946081/pexels-photo-5946081.jpeg",
        "Ovo Estrelado": "https://images.pexels.com/photos/6294248/pexels-photo-6294248.jpeg",
        
        // Comidas - Sopas
        "Caldo Verde": "https://images.pexels.com/photos/539451/pexels-photo-539451.jpeg",
        "Sopa de Legumes": "https://images.pexels.com/photos/539451/pexels-photo-539451.jpeg",
        
        // Comidas - Pequeno Almoco
        "Café": "https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg",
        "Torrada": "https://images.pexels.com/photos/1586947/pexels-photo-1586947.jpeg",
        "Meia de Leite": "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg",
        "Galão": "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg",
        "Chocolate Quente": "https://images.pexels.com/photos/6205791/pexels-photo-6205791.jpeg",
        "Chá": "https://images.pexels.com/photos/1417945/pexels-photo-1417945.jpeg",
        
        // Comidas - Extras
        "Ovo": "https://images.pexels.com/photos/6294248/pexels-photo-6294248.jpeg",
        "Queijo": "https://images.pexels.com/photos/821365/pexels-photo-821365.jpeg",
        "Fiambre": "https://images.pexels.com/photos/1927377/pexels-photo-1927377.jpeg",
        "Cogumelos": "https://images.pexels.com/photos/53494/mushrooms-fungi-forest-nature-53494.jpeg",
        "Bacon": "https://images.pexels.com/photos/4110377/pexels-photo-4110377.jpeg",
        
        // Bebidas - Cocktails
        "Blue Lagoon": "https://images.pexels.com/photos/1170598/pexels-photo-1170598.jpeg",
        "Caipirinha": "https://images.pexels.com/photos/1170598/pexels-photo-1170598.jpeg",
        "Caipiroska": "https://images.pexels.com/photos/1170598/pexels-photo-1170598.jpeg",
        "Daiquiri": "https://images.pexels.com/photos/602750/pexels-photo-602750.jpeg",
        "Dry Martini": "https://images.pexels.com/photos/1170598/pexels-photo-1170598.jpeg",
        "Gin Fizz": "https://images.pexels.com/photos/1170598/pexels-photo-1170598.jpeg",
        "Gin Tonic": "https://images.pexels.com/photos/1170598/pexels-photo-1170598.jpeg",
        "Long Island": "https://images.pexels.com/photos/1170598/pexels-photo-1170598.jpeg",
        "Margarita": "https://images.pexels.com/photos/3407782/pexels-photo-3407782.jpeg",
        "Mojito": "https://images.pexels.com/photos/1224158/pexels-photo-1224158.jpeg",
        "Piña Colada": "https://images.pexels.com/photos/1170598/pexels-photo-1170598.jpeg",
        "Sex on the Beach": "https://images.pexels.com/photos/1170598/pexels-photo-1170598.jpeg",
        "Tequila Sunrise": "https://images.pexels.com/photos/1170598/pexels-photo-1170598.jpeg",
        
        // Bebidas - Shots
        "Tequila": "https://images.pexels.com/photos/1283219/pexels-photo-1283219.jpeg",
        "Sambuca": "https://images.pexels.com/photos/1283219/pexels-photo-1283219.jpeg",
        
        // Bebidas - Whisky
        "J&B": "https://images.pexels.com/photos/602750/pexels-photo-602750.jpeg",
        "Jameson": "https://images.pexels.com/photos/602750/pexels-photo-602750.jpeg",
        "Jack Daniel's": "https://images.pexels.com/photos/602750/pexels-photo-602750.jpeg",
        "Red Label": "https://images.pexels.com/photos/602750/pexels-photo-602750.jpeg",
        "Black Label": "https://images.pexels.com/photos/602750/pexels-photo-602750.jpeg",
        
        // Bebidas - Rum
        "Bacardi": "https://images.pexels.com/photos/1304540/pexels-photo-1304540.jpeg",
        "Havana Club": "https://images.pexels.com/photos/1304540/pexels-photo-1304540.jpeg",
        
        // Bebidas - Gin
        "Gordon's": "https://images.pexels.com/photos/1170598/pexels-photo-1170598.jpeg",
        "Bombay": "https://images.pexels.com/photos/1170598/pexels-photo-1170598.jpeg",
        "Beefeater": "https://images.pexels.com/photos/1170598/pexels-photo-1170598.jpeg",
        
        // Bebidas - Vodka
        "Absolut": "https://images.pexels.com/photos/1304540/pexels-photo-1304540.jpeg",
        "Smirnoff": "https://images.pexels.com/photos/1304540/pexels-photo-1304540.jpeg",
        
        // Bebidas - Licor
        "Baileys": "https://images.pexels.com/photos/1304540/pexels-photo-1304540.jpeg",
        "Safari": "https://images.pexels.com/photos/1304540/pexels-photo-1304540.jpeg",
        "Malibu": "https://images.pexels.com/photos/1304540/pexels-photo-1304540.jpeg",
        "Amarula": "https://images.pexels.com/photos/1304540/pexels-photo-1304540.jpeg",
        
        // Bebidas - Digestivos
        "Aguardente": "https://images.pexels.com/photos/1304540/pexels-photo-1304540.jpeg",
        "Cognac": "https://images.pexels.com/photos/1304540/pexels-photo-1304540.jpeg"
    };
    
    // Imagens de fallback por categoria
    const fallbackImages = {
        'Snacks': 'assets/images/IMG-20250517-WA0088.jpg',
        'Pratos da Casa': 'assets/images/IMG-20250517-WA0089.jpg',
        'Guarnicoes': 'assets/images/IMG-20250517-WA0092.jpg',
        'Sopas': 'assets/images/IMG-20250517-WA0094.jpg',
        'Pequeno Almoco': 'assets/images/IMG-20250517-WA0095.jpg',
        'Extras': 'assets/images/IMG-20250517-WA0093.jpg',
        'Cocktails': 'assets/images/IMG-20250517-WA0096.jpg',
        'Shots': 'assets/images/IMG-20250517-WA0103.jpg',
        'Whisky': 'assets/images/IMG-20250517-WA0098.jpg',
        'Rum': 'assets/images/IMG-20250517-WA0101.jpg',
        'Gin': 'assets/images/IMG-20250517-WA0099.jpg',
        'Vodka': 'assets/images/IMG-20250517-WA0100.jpg',
        'Licor': 'assets/images/IMG-20250517-WA0102.jpg',
        'Digestivos': 'assets/images/IMG-20250517-WA0103.jpg'
    };
    
    // Verificar correspondência exata
    if (imageDatabase[itemName]) {
        return imageDatabase[itemName];
    }
    
    // Verificar correspondência parcial
    for (const key in imageDatabase) {
        if (itemName.toLowerCase().includes(key.toLowerCase()) || key.toLowerCase().includes(itemName.toLowerCase())) {
            return imageDatabase[key];
        }
    }
    
    // Usar imagem de fallback da categoria se disponível
    if (category && fallbackImages[category]) {
        return fallbackImages[category];
    }
    
    // Imagem de fallback final - logo
    return 'assets/images/logo.jpg';
}
