<template>
  <div>
    <div>
      <table>
        <thead>
          <tr>
            <th>Film Name</th>
            <th>Description</th>
            <th>Genres</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="  film   in   films  " :key="film._id">
            <td>
              <p>{{ film.filmName }}</p>
            </td>
            <td>{{ film.description }}</td>
            <td v-for="  genre   in   film.genres  " :key="film._id">
              <p v-for="  moreGenre   in   genre  " :key="film._id">{{ moreGenre }}</p>
            </td>
            <td><button @click="setFilmId(film._id)">GET LINKS</button></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="viewFilm == true">
      <p>showing film view</p>
      <FilmView :film-id="id"></FilmView>
    </div>
  </div>
</template>

<script>
import FilmView from './FilmView.vue';

export default {
  components: {
    FilmView,
  },
  data() {
    return {
      filmName: '',
      description: '',
      id: '',
      links: [],
      spanishLinks: [],
      films: [],
      viewFilm: false
    };
  },
  mounted() {
    this.getAllFilms();
  },
  methods: {
    setFilmId(id) {
      this.id = id;
      this.viewFilm = true
    },

    getAllFilms() {
      fetch('/films')
        .then(response => response.json())
        .then(data => {
          this.films = data;
        })
        .catch(error => {
          console.log(error);
        });
    },

    getLink(id) {
      fetch(`/getLink/${id}`)
        .then(response => response.json())
        .then(data => {
          this.links = data;
        })
        .catch(error => {
          console.log(error);
        })
    },

    getLinkByLanguage(id, dubLanguage) {
      fetch(`/getLinkWithDub/${id}/${dubLanguage}`)
        .then(response => response.json())
        .then(data => {
          this.spanishLinks = data;
        })
        .catch(error => {
          console.log(error);
        })
    },
  }
};
</script>

<style>
table {
  border-collapse: collapse;
  width: 100%;
}

th,
td {
  text-align: left;
  padding: 8px;
  border: 1px solid black;
}

th {
  background-color: #ddd;
}

tr:nth-child {
  background-color: #f2f2f2;
}
</style>