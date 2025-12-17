# React + Vite

Sprawozdanie z laboratorium – DevOps
1. Wstęp – cel laboratorium i opis projektu

Celem laboratorium było zapoznanie się z podstawowymi narzędziami DevOps, takimi jak Linux, Git, Docker, Docker Compose, GitHub Actions oraz Kubernetes, a także zrozumienie ich roli w procesie wytwarzania i utrzymania aplikacji.

W ramach laboratorium zrealizowano projekt To-Do App, czyli prostą aplikację webową umożliwiającą dodawanie i usuwanie zadań. Projekt został zrealizowany w architekturze mikroserwisowej i składa się z trzech kontenerów:

frontend (React),

backend (Node.js + Express),

baza danych (PostgreSQL).

Aplikacja jest uruchamiana przy użyciu Docker Compose, wersjonowana w systemie Git oraz przygotowana do dalszej integracji z procesami CI/CD.

2. Linux – podstawowe komendy

Podczas laboratorium wykorzystywano podstawowe polecenia systemu Linux:

ls – wyświetla listę plików i katalogów w bieżącym katalogu

cd – zmienia bieżący katalog

mkdir – tworzy nowy katalog

rm – usuwa pliki lub katalogi

pwd – wyświetla aktualną ścieżkę

cat – wyświetla zawartość pliku

touch – tworzy pusty plik

chmod – zmienia prawa dostępu do pliku

3. Git
Repozytorium

Repozytorium projektu dostępne jest pod adresem:
https://github.com/NataliaBala/to-do-app.git

Przykładowe komendy Git użyte w projekcie
git init
git checkout -b feature/docker
git add .
git commit -m "Add docker configuration"
git push -u origin feature/docker

Klucze SSH

Aby wygenerować klucz SSH:

ssh-keygen -t ed25519 -C "email@example.com"


Klucz publiczny (id_ed25519.pub) należy dodać w ustawieniach GitHub w sekcji SSH Keys.

Po co wykorzystujemy klucze SSH?

Klucze SSH umożliwiają bezpieczne, szyfrowane połączenie z repozytorium bez konieczności każdorazowego podawania loginu i hasła. Zwiększają bezpieczeństwo oraz wygodę pracy, szczególnie w automatyzacji CI/CD.

4. Docker i konteneryzacja

Konteneryzacja polega na uruchamianiu aplikacji w izolowanych środowiskach (kontenerach), które zawierają wszystkie wymagane zależności. Dzięki temu aplikacja działa identycznie na każdym środowisku.

Przykładowy Dockerfile (backend)
FROM node:20
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm", "start"]


Wyjaśnienie:

FROM – określa bazowy obraz

WORKDIR – ustawia katalog roboczy

COPY – kopiuje pliki do obrazu

RUN – wykonuje polecenia podczas budowania obrazu

EXPOSE – informuje o porcie aplikacji

CMD – uruchamia aplikację

5. Docker Compose

Docker Compose służy do zarządzania aplikacjami wielokontenerowymi. Pozwala uruchomić wiele serwisów jedną komendą oraz definiować ich zależności.

Plik docker-compose.yml
services:
  backend:
    build: ./backend
    ports:
      - "5000:5000"

  frontend:
    build: ./frontend
    ports:
      - "5173:5173"
    depends_on:
      - backend

  db:
    image: postgres:15
    environment:
      POSTGRES_USER: devops
      POSTGRES_PASSWORD: devops
      POSTGRES_DB: tododb


Wyjaśnienie:

services – lista serwisów

build – wskazuje katalog z Dockerfile

ports – mapowanie portów

depends_on – zależności między serwisami

environment – zmienne środowiskowe

6. CI i GitHub Actions

CI (Continuous Integration) polega na automatycznym budowaniu i testowaniu aplikacji po każdej zmianie w repozytorium.

GitHub Actions umożliwia definiowanie workflow w plikach YAML.

Przykładowy workflow
name: CI

on: [push]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Build Docker images
        run: docker compose build


Workflow ten automatycznie buduje obrazy Dockera po każdym pushu do repozytorium.

7. Kubernetes

Kubernetes służy do zarządzania kontenerami w środowiskach produkcyjnych. Umożliwia skalowanie aplikacji, zarządzanie awariami oraz automatyczne restarty kontenerów.

Przykładowy plik Deployment
apiVersion: apps/v1
kind: Deployment
metadata:
  name: backend-deployment
spec:
  replicas: 1
  selector:
    matchLabels:
      app: backend
  template:
    metadata:
      labels:
        app: backend
    spec:
      containers:
        - name: backend
          image: todo-backend:latest
          ports:
            - containerPort: 5000


Plik ten definiuje sposób uruchamiania backendu w klastrze Kubernetes.

8. Wnioski

DevOps znacząco usprawnia proces tworzenia i utrzymania aplikacji. Automatyzacja, konteneryzacja oraz CI/CD pozwalają ograniczyć błędy, przyspieszyć wdrażanie zmian i zapewnić spójność środowisk.

W mojej opinii DevOps jest niezbędnym elementem nowoczesnych projektów informatycznych, ponieważ ułatwia zarządzanie całym cyklem życia aplikacji – od kodu, przez testy, aż po wdrożenie i utrzymanie.





This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
