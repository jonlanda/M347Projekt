<template>
  <div>
    <div>
      <table>
        <thead>
          <tr>
            <th>Film Name</th>
            <th>Description</th>
            <th>Genres</th>
            <th>Show Links</th>
            <th>Add Link</th>
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
            <td><button @click="getLink(film._id)">GET LINKS</button></td>
            <td><button @click="pressedAddLink(film._id)">ADD LINK</button></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="showLinks">
      <h2>Links for {{ filmName }}</h2>
      <table>
        <thead>
          <tr>
            <th>Link</th>
            <th>AdBlocker recommended</th>
            <th>Dub-Language</th>
            <th>Sub-Language</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="  link   in   links  " :key="link.filmId">
            <td>
              <a :href="link.linkValue">{{ link.linkValue }}</a>
            </td>
            <td>
              <p>{{ link.adBlocker }}</p>
            </td>
            <td>
              <p>{{ link.dubLanguage }}</p>
            </td>
            <td>
              <p>{{ link.subLanguage }}</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div v-if="addLinkPressed" id="addLink">
    <h2>Add Link for {{ filmName }}</h2>
    <form @submit.prevent="addLink">
      <label>Link Value:</label>
      <input type="text" v-model="newLinkValue">
      <br>
      <label>Ad Blocker:</label>
      <input type="checkbox" v-model="newAdBlocker">
      <br>
      <label>Dub Language:</label>
      <input type="text" v-model="newDubLanguage">
      <br>
      <label>Sub Language:</label>
      <input type="text" v-model="newSubLanguage">
      <br>
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>

export default {
  data() {
    return {
      filmName: '',
      links: [],
      films: [],
      showLinks: false,
      addLinkPressed: false,
      newLinkValue: '',
      newFilmId: '',
      newAdBlocker: false,
      newDubLanguage: '',
      newSubLanguage: '',
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

    getFilm(id) {
      fetch(`/filmById/${id}`)
        .then(response => response.json())
        .then(data => {
          this.filmName = data[0].filmName;
        })
        .catch(error => {
          console.log(error);
        })
    },

    getLink(id) {
      fetch(`/getLink/${id}`)
        .then(response => response.json())
        .then(data => {
          this.links = data;
          this.getFilm(id)
          this.toggleLinks()
        })
        .catch(error => {
          console.log(error);
        })
    },

    toggleLinks() {
      this.showLinks = true;
    },

    pressedAddLink(id) {
      this.addLinkPressed = true;
      this.newFilmId = id;
      this.getFilm(this.newFilmId)
    },

    addLink() {
      const url = `/addLink/${encodeURIComponent(this.newLinkValue)}/${this.newFilmId}/${this.newAdBlocker}/${this.newDubLanguage.toLowerCase()}/${this.newSubLanguage.toLowerCase()}`;
      return fetch(url, {
        method: 'POST'
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok, code failed');
          }
          this.addLinkPressed = false;
          return response.json();
        })
        .catch(error => {
          console.error('There was a problem with the fetch operation:', error);
        });
    }

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

#addLink {
  float: right;
  width: 80%;
  margin-left: 5%;
}
</style>