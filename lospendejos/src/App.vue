<template>
  <div>
    <div>
      <button @click="pressedNewFilm">NEW FILM</button>
      <br>
      <label>Film Name:</label>
      <input type="search" v-model="searchQuery" placeholder="Search">
      <label>Genre:</label>
      <input type="search" v-model="genreQuery" placeholder="Search">
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
          <tr v-for="  film   in   filteredFilm  " :key="film._id">
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
  </div>
  <div v-if="showLinks" id="showLinks">
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
    <button @click="hideLinks">Hide Links</button>
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
      <button @click="cancelLink">Cancel</button>
    </form>
  </div>
  <div v-if="newFilmPressed" id="newFilm">
    <h2>New Film</h2>
    <form @submit.prevent="newFilm">
      <label>Film Name:</label>
      <input type="text" v-model="newFilmName">
      <br>
      <label>Description:</label>
      <input type="text" v-model="newDescription">
      <br>
      <label>Genres: (Separate by coma)</label>
      <input type="text" v-model="newGenre">
      <br>
      <button type="submit">Submit</button>
      <button @click="cancelFilm">Cancel</button>
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
      newFilmPressed: false,
      newLinkValue: '',
      newFilmId: '',
      newAdBlocker: false,
      newDubLanguage: '',
      newSubLanguage: '',
      searchQuery: '',
      genreQuery: '',
      newFilmName: '',
      newDescription: '',
      newGenre: '',
      newGenres: [],
      newFilmOrSeries: false,
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

    cancelFilm() {
      this.newFilmPressed = false;
    },

    cancelLink() {
      this.addLinkPressed = false;
    },

    hideLinks() {
      this.showLinks = false;
    },

    pressedAddLink(id) {
      this.addLinkPressed = true;
      this.newFilmId = id;
      this.getFilm(this.newFilmId)
    },

    pressedNewFilm() {
      this.newFilmPressed = true;
    },

    addGenre() {
      if (this.newGenre) {
        this.newGenres.push(this.newGenre);
        this.newGenre = '';
      }
    },

    async addLink() {
      const url = `/addLink/${encodeURIComponent(this.newLinkValue)}/${this.newFilmId}/${this.newAdBlocker}/${this.newDubLanguage.toLowerCase()}/${this.newSubLanguage.toLowerCase()}`;
      try {
        const response = await fetch(url, {
          method: 'POST'
        });
        if (!response.ok) {
          throw new Error('Network response was not ok, code failed');
        }
        this.addLinkPressed = false;
        return await response.json();
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    },

    async newFilm() {
      const url = `/newFilm/${this.newFilmName}/${this.newDescription}/${this.newGenre}/${this.newFilmOrSeries}`;
      try {
        const response = await fetch(url, {
          method: 'POST'
        });
        if (!response.ok) {
          throw new Error('Network response was not ok, code failed');
        }
        this.newFilmPressed = false;
        return await response.json();
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    }

  },
  computed: {
    filteredFilm() {
      if (this.searchQuery) {
        return this.films.filter(film => {
          return film.filmName.toLowerCase().includes(this.searchQuery.toLowerCase())
        })
      } else if (this.genreQuery) {
        return this.films.filter(film => {
          return film.genres.toString().toLowerCase().includes(this.genreQuery.toLowerCase())
        })
      } else {
        return this.films
      }
    }
  }
};
</script>

<style>
/* Style for the entire page */
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
}

/* Style for the search bar and buttons */
button {
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  background-color: #0077be;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  margin-left: 5%;
}

button:hover {
  background-color: #005c99;
}

/* Style for the film table */
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th,
td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #f2f2f2;
  font-weight: normal;
}

td p {
  margin: 0;
}

/* Style for the links table */
#linksTable {
  margin-top: 20px;
}

#linksTable th,
#linksTable td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

#linksTable th {
  background-color: #f2f2f2;
  font-weight: normal;
}

#linksTable td p {
  margin: 0;
}

#linksTable a {
  color: #0077be;
}

/* Style for the add link form */
#addLink,
#newFilm,
#showLinks {
  margin-top: 20px;
  float: right;
  width: 80%;
  margin-left: 5%;
}

#addLink label,
#newFilm label {
  display: block;
  margin-bottom: 10px;
}

#addLink input[type="text"],
#newFilm input[type="text"],
#addLink input[type="checkbox"] {
  border: none;
  border-radius: 5px;
  padding: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  font-size: 16px;
  margin-bottom: 10px;
}

#addLink input[type="checkbox"] {
  margin-left: 10px;
}

#addLink button,
#newFilm button,
#showLinks button {
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  background-color: #0077be;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

#addLink button:hover,
#newFilm button:hover,
#showLinks button:hover {
  background-color: #005c99;
}
</style>