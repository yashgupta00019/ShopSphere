# ShopSphere

ShopSphere is a clean and modern shopping dashboard web app built with HTML, CSS, and Vanilla JavaScript. It fetches live product data from the public [DummyJSON Products API](https://dummyjson.com/products) and displays it in a responsive e-commerce dashboard layout with a featured section, category overview, and product cards.

## Features

- Live product data using `fetch()`
- Modern dashboard-style layout
- Featured products section based on top ratings
- Product cards with image, title, price, discount, rating, and category
- Loading and error states
- Responsive design for mobile, tablet, and desktop
- Future-ready structure for search, sorting, filters, cart, and wishlist

## Project Structure

```text
ShopSphere/
├── index.html
├── style.css
├── script.js
└── README.md
```

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript
- DummyJSON public API

## How It Works

1. The app loads and shows a loading state.
2. JavaScript fetches product data from `https://dummyjson.com/products`.
3. The top-rated products are shown in the Featured Products section.
4. All products are rendered into the main dashboard grid.
5. Category chips and quick stats are generated dynamically from the fetched data.

## Run Locally

Because this is a plain frontend project, you can run it very simply:

1. Open [index.html](/Users/yashgupta/Desktop/project/index.html) directly in your browser.

You can also use a local server if you prefer. For example:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Main Files

### [index.html](/Users/yashgupta/Desktop/project/index.html)

Contains the dashboard structure:

- Navbar
- Sidebar
- Hero section
- Featured products section
- Product grid
- Loading and error states

### [style.css](/Users/yashgupta/Desktop/project/style.css)

Handles the full visual design:

- Warm human-centered color palette
- Responsive layout
- Card styles
- Hover effects
- Typography and spacing
- Custom ShopSphere branding

### [script.js](/Users/yashgupta/Desktop/project/script.js)

Handles the app logic:

- Fetching products from the API
- Rendering featured products
- Rendering the product grid
- Building category chips
- Updating dashboard stats
- Showing loading and error states

## API Used

- Products endpoint: [https://dummyjson.com/products](https://dummyjson.com/products)

## Future Improvements

- Search functionality
- Clickable category filters
- Price sorting
- Add to cart
- Wishlist / favorites
- Product details modal or page

## Notes

- No backend is used.
- No frameworks are used.
- The project is intentionally kept simple and readable for easy extension.

## Author

Built as a Vanilla JavaScript shopping dashboard project.
