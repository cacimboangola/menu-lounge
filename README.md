# Menu Lounge Digital

Um menu digital responsivo com suporte a modo escuro, desenvolvido com HTML, Tailwind CSS e JavaScript.

## Funcionalidades

- Design responsivo para todos os dispositivos
- Modo escuro/claro
- Filtro de categorias (Comidas, Bebidas 1, Bebidas 2)
- Busca por itens do menu
- Agrupamento de itens por subcategoria

## Como usar

1. Abra o arquivo `index.html` em qualquer navegador moderno
2. Navegue entre as categorias clicando nos botões
3. Use a barra de busca para encontrar itens específicos
4. Clique no botão de tema para alternar entre modo claro e escuro

## Estrutura do projeto

- `index.html` - Página principal
- `js/app.js` - Lógica da aplicação
- `js/menu.js` - Dados do menu
- `assets/menus/` - PDFs originais do menu
- `assets/images/` - Imagens dos itens do menu (placeholders são usados se as imagens não existirem)

## Personalização

Para adicionar ou modificar itens do menu, edite o arquivo `js/menu.js` seguindo a estrutura existente.

```javascript
{
    id: 'identificador-unico',
    name: 'Nome do Item',
    description: 'Descrição do item',
    price: 'R$ XX,XX',
    category: 'categoria', // comidas, bebidas1 ou bebidas2
    subcategory: 'Subcategoria',
    image: 'caminho/para/imagem.jpg'
}
```

Para adicionar imagens reais aos itens, coloque as imagens na pasta `assets/images/` e atualize os caminhos no arquivo `menu.js`.
