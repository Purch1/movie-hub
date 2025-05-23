# Movie Hub

![Movie Hub Logo](https://img.shields.io/badge/Movie-Hub-e50914?style=for-the-badge&logo=react)

Movie Hub is a feature-rich React application that allows users to explore popular movies, search for specific titles, filter by genres, and save their favorite films. The app uses The Movie Database (TMDB) API to provide users with an extensive collection of movies, complete with details, ratings, and recommendations.

## 🌟 Features

- **Browse Popular Movies**: Discover trending and popular movies
- **Top Rated Films**: Explore critically acclaimed movies with high ratings
- **Genre Filtering**: Find movies by specific genres
- **Favorites Collection**: Save and manage your favorite movies
- **Search Functionality**: Find specific movies by title
- **Responsive Design**: Optimized for all devices (desktop, tablet, mobile)
- **Movie Details**: View comprehensive information about each movie including:
  - Cast information
  - Runtime and release date
  - Ratings
  - Overview and plot summary
  - Similar movie recommendations

## 🚀 Live Demo

[Visit Movie Hub](https://movie-hub-demo.netlify.app) (Demo link)

## 📸 Screenshots

<details>
<summary>View Screenshots</summary>

### Home Page

![Home Page](screenshots/home.png)

### Movie Details

![Movie Details](screenshots/details.png)

### Mobile View

![Mobile View](screenshots/mobile.png)

</details>

## 🔧 Technologies Used

- **React.js** - UI component library
- **React Router** - For navigation and routing
- **Vite** - Fast build tool and development server
- **CSS3** - Custom styling with responsive design
- **TMDB API** - External API for movie data
- **Local Storage** - For saving user favorites

## 📦 Installation and Setup

### Prerequisites

- Node.js (v14.0.0 or later)
- npm (v7.0.0 or later)

### Installation Steps

1. Clone the repository

```bash
git clone https://github.com/Purch1/movie-hub.git
cd movie-hub
```

2. Install dependencies

```bash
npm install
```

3. Set up environment variables
   Create a `.env` file in the root directory and add your TMDB API key:

```
VITE_TMDB_API_KEY=your_tmdb_api_key_here
```

You can obtain an API key by creating an account at [The Movie Database](https://www.themoviedb.org/documentation/api).

4. Start the development server

```bash
npm run dev
```

5. Build for production

```bash
npm run build
```

## 🧩 Project Structure

```
src/
|-- components/       # Reusable UI components
|-- contexts/         # React context providers
|-- css/              # Component-specific styles
|-- pages/            # Application page components
|-- services/         # API service layer
|-- App.jsx           # Main application component
|-- main.jsx          # Application entry point
```

## 🔍 Key Components

- **MovieCard**: Displays individual movie with poster, title, and rating
- **MovieList**: Renders a collection of MovieCard components
- **GenreFilter**: Allows filtering movies by genre
- **MovieDetails**: Shows detailed information about a selected movie
- **Navbar**: Navigation component with responsive mobile menu
- **Footer**: Site footer with links and information

## 📊 API Integration

The application uses the following TMDB API endpoints:

- `/movie/popular` - Get popular movies
- `/movie/top_rated` - Get top rated movies
- `/search/movie` - Search for movies
- `/movie/{id}` - Get detailed movie information
- `/genre/movie/list` - Get available movie genres
- `/discover/movie` - Get movies by genre

## 🔐 State Management

Movie favorites are managed using React Context API and persisted in the browser's local storage, allowing users to maintain their favorite movie selections between sessions.

## 📱 Responsive Design

The application is designed to be fully responsive, providing an optimal viewing experience across a wide range of devices:

- Desktop (1200px and above)
- Tablet (768px to 1199px)
- Mobile (767px and below)

## 🛠️ Future Enhancements

- User authentication and profiles
- Movie reviews and ratings
- Advanced filtering options
- Watchlist functionality
- Dark/Light theme toggle
- Internationalization support

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- [The Movie Database (TMDB)](https://www.themoviedb.org/) for providing the API
- [React](https://reactjs.org/) and [Vite](https://vitejs.dev/) for the development framework
- [React Router](https://reactrouter.com/) for navigation

---

Developed with ❤️ by Prince Uche Ikechukwu
