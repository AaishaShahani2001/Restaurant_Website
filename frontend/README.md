# Tomato.

A restaurant website for browsing the menu, creating an account, ordering food, and managing orders from an admin panel. The app runs entirely in the browser. Accounts, the cart, and orders are saved locally. Nothing is sent to a server.

## Stack

- React 19
- Vite
- React Router
- Tailwind CSS 4
- react-hot-toast

## Run the app

From the `frontend` folder:

```bash
npm install
npm run dev
```

Vite prints a local address, usually `http://localhost:5173`.

Other scripts:

```bash
npm run build
npm run preview
npm run lint
```

## What you can do

**Customers**

- Browse Home, About, and Contact.
- Filter the menu by category and search it from the navbar.
- Open a dish at `/food/:id` and add it to the cart.
- Sign up and log in. The session stays after a refresh.
- Apply the promo code `tomato` to drop the delivery fee.
- Check out with a delivery address. The only payment method is cash on delivery.
- Open **My orders** from the profile menu and see the status of each order.

**Admin**

- Open **Admin login** from the customer login page, or go to `/admin/login`.
- Add a dish, remove a dish, and see a toast when either happens.
- See orders placed by customers and change the status to Food Processing, Out for delivery, or Delivered. The customer sees that status on My orders.

Admin sign-in:

- Email: `admin@tomato.example`
- Password: `admin123`

## Routes

| Path | Page |
| --- | --- |
| `/` | Home |
| `/menu` | Menu. Search arrives as `?q=` |
| `/food/:id` | One dish |
| `/about` | About |
| `/contact` | Contact |
| `/login` | Customer login |
| `/signup` | Create an account |
| `/order` | Cart |
| `/payment` | Delivery address and cash on delivery |
| `/my-orders` | Orders for the signed-in customer |
| `/admin/login` | Admin login |
| `/admin` | Admin panel |

Any other path redirects to Home.

## How data is stored

| Key | Storage | What it holds |
| --- | --- | --- |
| `tomato_users` | `localStorage` | Customer accounts, including passwords |
| `tomato_session` | `localStorage` | Signed-in name and email only |
| `tomato_cart` | `localStorage` | Dish id and quantity |
| `tomato_orders` | `localStorage` | Placed orders, address, and status |
| `tomato_admin` | `sessionStorage` | Admin session for this browser tab |

Customer login survives a refresh. Admin login lasts until the tab is closed or the admin logs out.

Dishes added or removed in the admin panel live in that page’s state. A refresh restores the menu from `src/data/menu.js`, and those edits do not change the public menu.

The contact form only checks the fields and shows a thank-you message. It does not send the note anywhere.

## Project layout

```text
src/
  App.jsx                 Routes and shared layout
  main.jsx                App entry
  index.css               Tailwind and the tomato color
  pages/                  One screen per route
  components/             Navbar, footer, hero, auth panel
  components/admin/       Add form, food list, order list
  context/                Customer auth and cart/orders
  data/                   Menu, chefs, and site details
  assets/                 Photos used by the pages
```

`AuthContext` shares the signed-in customer. `CartContext` shares the cart and the order list. `cart-context.js` holds the cart context object so every screen reads the same one.
