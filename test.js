// test.js

require('dotenv').config(); //get the environment variables described in .env
const Telegraf = require('telegraf')
require('au5ton-logger')();
const PlexAPI = require('plex-api');
const os = require('os')

// Create a bot that uses 'polling' to fetch new updates
//const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

process.on('unhandledRejection', r => console.error('unhandledRejection: ',r.stack,'\n',r));


// Custom modules
const database = require('./lib/database');
const content = require('./lib/content');
const User = require('./lib/classes/User');
const Request = require('./lib/classes/Request');

const app_options = {
    identifier: 'com.github.au5ton.hatsume',
    product: 'hatsume/Node.js',
    version: '1.0',
    deviceName: 'Node.js',
    platform: 'Node.js',
    platformVersion: process.version,
    device: os.platform()
};

let pms = new PlexAPI({
    hostname: process.env.PMS_HOSTNAME,
    port: process.env.PMS_PORT,
    username: process.env.PMS_USERNAME,
    password: process.env.PMS_PASSWORD,
    options: app_options
});

// lookup movie by imdb id
/*
pms.query('/library/sections').then(response => {
    
    //console.log(response.MediaContainer.Directory)
    let sections = response.MediaContainer.Directory;
    for(let i in sections) {
        if(sections[i]['type'] === 'movie') {
            pms.query('/library/sections/'+sections[i]['key']+'/all').then(response => {
                //console.log(response)

                let movies = response.MediaContainer.Metadata;
                for(let i in movies) {
                    //console.log(movies[i])
                }
                //console.log(movies[0])
                //console.log(movies[1])
                pms.query(movies[0]['key']).then(response => {
                    console.log(response.MediaContainer.Metadata) //extended metadata

                    //response.MediaContainer.Metadata[0].guid contains imdb id

                })

            }).catch(err => {
                console.error(err)
            })
        }
        // else if(sections[i]['type'] === 'show') {
        //     pms.query('/library/sections/'+sections[i]['key']).then(response => {
        //         console.log(response)
        //     }).catch(err => {
        //         console.error(err)
        //     })
        // }
    }

}).catch(err => {
    console.error('Error connecting to PMS: ', err)
});
*/


// pms.query('/library/sections').then(response => {
    
//     //console.log(response.MediaContainer.Directory)
//     let sections = response.MediaContainer.Directory;
//     //console.log(sections)
//     for(let i in sections) {
//         if(sections[i]['type'] === 'show') {
//             pms.query('/library/sections/'+sections[i]['key']+'/all').then(response => {
//                 //console.log(response)

//                 let shows = response.MediaContainer.Metadata;
//                 for(let i in shows) {
//                     //console.log(movies[i])
//                 }
//                 console.log(shows[0])
//                 //console.log(movies[1])
//                 pms.query('/library/metadata/'+shows[0]['ratingKey']).then(response => {
//                     console.log(response) //extended metadata
//                     //let meta = response.MediaContainer.Metadata

//                     //response.MediaContainer.Metadata[0].guid contains imdb id

//                 })

//             }).catch(err => {
//                 console.error(err)
//             })
//         }
//     }

// }).catch(err => {
//     console.error('Error connecting to PMS: ', err)
// });
const _IMDB = require('imdb-api');
const imdb = new _IMDB.Client({apiKey: process.env.OMDB_API_KEY});
const _TVDB = require('node-tvdb');
const tvdb = new _TVDB(process.env.THETVDB_API_KEY);

// Erased (2016) anime: tt5249462
// Erased (2017) live-action: tt7573686
// Spider-Man (1967): tt0061301
// Spider-Man (1994): tt0112175

// imdb.get({id: 'tt5249462'}).then(response => {
//     console.log(response['title'] + ' ' + response['start_year'])
//     tvdb.getSeriesByImdbId(response['imdbid']).then(response => {
//         console.log(response)
//     }).catch(err => {
//         console.log(err.response)
//     })

//     //console.log(response)
// })

// content.getTVDBIdFromUrl('https://www.thetvdb.com/series/boku-no-pico').then(id => {
//     console.log(id)
// }).catch(err => {
//     console.error(err)
// })

// database.requests.getAll().then(response => {
//     console.log(response)
// })