<template>
  <div>
    <p>hey hey</p>
    <p>{{ film.filmName }}</p>
    <p>{{ film.description }}</p>
    <p v-for="genre in film.genres" :key="film._id">
    <p v-for="moreGenre in genre" :key="film._id">{{ moreGenre }}</p>
    </p>
    <div>
      <button @click="getLinkByLanguage(id, 'spanish')">get spanish links</button>
      <ul>
        <li v-for=" link  in  spanishLinks " :key="link._id">{{ link.linkValue }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'filmView',
  props: {
    filmId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      film: [],
      links: [],
      languageLinks: [],
    };
  },
  mounted() {
    this.getFilmById(this.filmId);
  },
  methods: {
    getFilmById(id) {
      fetch(`/filmById/${id}`)
        .then(response => response.json())
        .then(data => {
          this.film = data;
          this.getLink(id);
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
          this.languageLinks = data;
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