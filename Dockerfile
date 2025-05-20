# Используем официальный легковесный образ nginx на базе Alpine Linux
FROM nginx:1.25-alpine

# Устанавливаем рабочую директорию
WORKDIR /app

# Удаляем дефолтную конфигурацию nginx
RUN rm -rf /etc/nginx/conf.d/default.conf

# Копируем статические файлы
COPY ./public/ /usr/share/nginx/html/

# Копируем JS-файлы в правильную директорию
COPY ./src/js/ /usr/share/nginx/html/js/

# Копируем конфиг nginx
COPY nginx.conf /etc/nginx/conf.d/

# Устанавливаем права для nginx
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html

# Оптимизация для production
RUN echo "alias ll='ls -lah'" >> /etc/profile && \
    apk add --no-cache curl

# Открываем порт 80 (HTTP)
EXPOSE 80

# Запускаем nginx в foreground режиме
CMD ["nginx", "-g", "daemon off;"]