# Лабораторна робота № 5

## Тема: Побудова навігації у React Native із використанням бібліотеки Expo  Router.
## Мета:Ознайомлення з концепцією file-based маршрутизації в мобільних застосунках.
## Інструкція запуску

1. Встановіть залежності:

```bash
npm install
```

2. Запустіть Expo:

```bash
npx expo start
```

3. Відкрийте застосунок у `Expo Go`, Android emulator, iOS simulator або у браузері.

## Реалізований функціонал

- авторизація через `AuthContext`
- локальні `login`, `register`, `logout` без бекенду
- маршрутизація через `Expo Router`
- групи маршрутів `(auth)` і `(app)`
- захист каталогу через `<Redirect href="/login" />`
- список товарів через `FlatList`
- перехід на деталі товару через `<Link asChild>`
- динамічний маршрут `details/[id].jsx`
- обробка неіснуючих маршрутів у `+not-found.jsx`
- адаптований сучасний інтерфейс українською мовою

## Структура проєкту

```text
app/
  _layout.jsx
  +not-found.jsx
  (auth)/
    _layout.jsx
    login.jsx
    register.jsx
  (app)/
    _layout.jsx
    index.jsx
    details/
      [id].jsx
components/
  AuthFormInput.jsx
  EmptyState.jsx
  ProductCard.jsx
constants/
  colors.js
context/
  AuthContext.jsx
data/
  products.js
assets/
  images/
app.json
babel.config.js
package.json
README.md
```

## Маршрутизація через Expo Router

- Кореневий файл `app/_layout.jsx` обгортає весь застосунок у `AuthProvider`.
- Група `app/(auth)` містить екрани входу та реєстрації.
- Група `app/(app)` містить захищений каталог і сторінку деталей товару.
- Назви груп у дужках потрібні лише для структури й не потрапляють у URL.
- Якщо користувач не авторизований, `app/(app)/_layout.jsx` виконує редірект на `/login`.
- Якщо користувач уже авторизований, `app/(auth)/_layout.jsx` перенаправляє його на `/`.

## Скріншоти роботи застосунку


![Екран реєстрації](assets/images/register.jpg)
![Каталог товарів](assets/images/catalog.jpg)
![Сторінка деталей товару](assets/images/details.jpg)
![Екран не знайдено](assets/images/not-found.png)
