# Команды для деплоя проекта Amplera

## Вариант 1: Деплой на Vercel (Рекомендуется)

### Через Vercel CLI:

```bash
# Установка Vercel CLI (если еще не установлен)
npm i -g vercel

# Логин в Vercel
vercel login

# Деплой проекта
vercel

# Для продакшн деплоя
vercel --prod
```

### Через GitHub + Vercel (Автоматический деплой):

1. Создайте репозиторий на GitHub
2. Загрузите код:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/ваш-username/ваш-репозиторий.git
git push -u origin main
```

3. Зайдите на [vercel.com](https://vercel.com)
4. Импортируйте репозиторий
5. Vercel автоматически определит Next.js и задеплоит проект

## Вариант 2: Деплой на другие платформы

### Netlify:

```bash
# Установка Netlify CLI
npm install -g netlify-cli

# Логин
netlify login

# Деплой
netlify deploy --prod
```

### Docker (для самостоятельного хостинга):

```bash
# Сборка Docker образа
docker build -t amplera-app .

# Запуск контейнера
docker run -p 3000:3000 amplera-app
```

### Стандартный Node.js хостинг:

```bash
# Сборка проекта
npm run build

# Запуск продакшн сервера
npm start
```

## Локальная проверка перед деплоем:

```bash
# Установка зависимостей
npm install

# Запуск в режиме разработки
npm run dev

# Сборка для продакшна
npm run build

# Тест продакшн сборки локально
npm start
```

## Важные файлы для деплоя:

- `package.json` - зависимости и скрипты
- `next.config.ts` - конфигурация Next.js
- `public/` - статические файлы (включая PDF)
- `.env` - переменные окружения (если используются)

## PDF файл доступен по ссылке:

После деплоя PDF файл будет доступен по адресу:
- `https://ваш-домен.com/TermsForMBClients.pdf`

Файл находится в папке `public/`, поэтому Next.js автоматически сделает его доступным по корневому пути.
