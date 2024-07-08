# Ecos Podcast API

Bienvenido a la API de Ecos Podcast, una plataforma para gestionar y escuchar podcasts. Esta API permite acceder a información sobre podcasts, episodios y categorías. A continuación se detallan las rutas disponibles para interactuar con la API.

## Rutas de la API

### Podcasts

- **Mostrar todos los podcasts publicados**
  - **GET** `https://ecos-podcast.onrender.com/api/podcasts/`
  - Esta ruta devuelve una lista de todos los podcasts publicados en la plataforma.

- **Mostrar podcast por ID**
  - **GET** `https://ecos-podcast.onrender.com/api/podcasts/id`
  - Reemplaza `id` con el ID del podcast que deseas consultar. Por ejemplo, para obtener el podcast con ID 32: `https://ecos-podcast.onrender.com/api/podcasts/32`

- **Mostrar podcasts por ID de usuario**
  - **GET** `https://ecos-podcast.onrender.com/api/podcasts/user/search?userId=43`
  - Reemplaza `userId` con el ID del usuario cuyos podcasts deseas consultar. Por ejemplo, para obtener los podcasts del usuario con ID 43.

### Categorías

- **Mostrar todas las categorías de los podcasts**
  - **GET** `https://ecos-podcast.onrender.com/api/podcasts/categories`
  - Esta ruta devuelve una lista de todas las categorías disponibles en la plataforma.

- **Mostrar categoría por ID**
  - **GET** `https://ecos-podcast.onrender.com/api/categories/id`
  - Reemplaza `id` con el ID de la categoría que deseas consultar. Por ejemplo, para obtener la categoría con ID 10: `https://ecos-podcast.onrender.com/api/categories/10`

- **Mostrar categorías de un podcast específico**
  - **GET** `https://ecos-podcast.onrender.com/api/podcasts/32/categories/`
  - Reemplaza `32` con el ID del podcast cuyas categorías deseas consultar. Por ejemplo, para obtener las categorías del podcast con ID 32.

### Episodios

- **Mostrar todos los episodios**
  - **GET** `https://ecos-podcast.onrender.com/api/episodes`
  - Esta ruta devuelve una lista de todos los episodios disponibles en la plataforma.

- **Mostrar episodio por ID**
  - **GET** `https://ecos-podcast.onrender.com/api/episodes/id`
  - Reemplaza `id` con el ID del episodio que deseas consultar. Por ejemplo, para obtener el episodio con ID 15: `https://ecos-podcast.onrender.com/api/episodes/15`
