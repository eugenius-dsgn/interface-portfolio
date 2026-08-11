# Agent instructions

Project goal: Создать статический персональный портфолио-сайт на HTML/CSS/JS для демонстрации кейсов интерфейсных проектов.

Structure:
- `index.html` — посадочная
- `cases/` — страницы кейсов.
- `styles/` — CSS
- `scripts/` — JS
- `assets/` — изображения и видео

CSS architecture:
- `styles/tokens/palette.css` — палитра цветовых постоянных
- `styles/tokens/colors.css` — семантические цветовые токены
- `styles/settings.css` — шрифт
- `styles/layout.css` — правила расположения элементов 
- `styles/style.css` — общие стили для элементов
- `styles/interactive.css` — Стили элементов, которыми я управляю из JavaScript

JS architecture:
- `scripts/main.js` — логика посадочной 
- `scripts/case.js` — логика страницы кейса