import Vue from 'vue';

import './style.scss'

import MovieList from './components/MovieList.vue';
import MovieFilter from './components/MovieFilter.vue';

import VueResource from 'vue-resource'
Vue.use(VueResource);

import moment from 'moment-timezone';
moment.tz.setDefault("UTC");
//the below allows you to use moment method in any component (instead of just the root)
Object.defineProperty(Vue.prototype, '$moment', { get() { return this.$root.moment } });


new Vue({
    el: '#app',
    data: {
        genre: [], 
        time: [],
        movies: [],
        moment, 
        day: '2017-04-07T13:00:00.000Z'
    },
    methods: {
        checkFilter(category, title, checked) {
            if (checked) {
                this[category].push(title);
            } else {
                let index = this[category].indexOf(title);
                if (index > -1) {
                    this[category].splice(index, 1);
                }
            }

        }
    },
    components: {
        MovieList, 
        MovieFilter,
    },
    created() {
        this.$http.get('/api').then(response => {
            this.movies = response.data;
        })
    }
});
