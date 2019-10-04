// use Node.js 10.x+

const fs          = require( 'fs' );
const superagent  = require( 'superagent' );
const gravatar    = require( 'gravatar' );

const config      = require( '../config' );

async function asyncForEach(list, handler) {
    for (let i=0; i<list.length; i++) {
        await handler(list[i], i);
    }
}

async
async function getEvents() {
    const attendees = {};
    try {
        const res = await (superagent
            .get('https://api.tito.io/timeline?auth_token=' + config.auth_token)
            .set('accept', 'application/json'));

        const events = res.body.events;
        await asyncForEach(events, async (event) => {
            const res = await (superagent
                .get(event.api_url + '/registrations?auth_token=' + config.auth_token)
                .set('accept', 'application/json'));

           res.body.registrations.forEach(( attendee ) => {
               if( !attendees[ attendee.email ] ) {
                   attendees[ attendee.email ] = 0;
               }
               attendees[ attendee.email ]++;
          });
        });

        // Process the attendees
        let sorted = 0;
        let id = 0;
        await asyncForEach(attendees, async (attendee) => {
            const image = gravatar.url( email, { s: '300', r: 'x', d: '404' }, true );
            // check image exists
            const response = superagent.get( image );
            if (response.status === 200) {
                sorted.push( [ id, image, count ] );
                id++;
            }
        });

        sorted.sort( function( a, b ) {
          return b[ 2 ] - a[ 2 ];
        });

        // Write to file
        const content = JSON.stringify( { attendees: sorted } );
        fs.writeFileSync( './_data/attendees.json', content );

        console.log( './_data/attendees.json'.yellow + ' was updated successfully!'.green )
    } catch (error) {
        console.error(`Error: ${error}`);
        process.exit(1);
    }
}

getEvents();

// Get events
request
  .get( 'https://api.tito.io/timeline?auth_token=' + config.auth_token )
  .set('accept', 'application/json')
  .end( function( err, res ) {
    // Iterate over events
    async.each( res.body.events, function( event, callback ) {
      // Get registrations
      request.get( event.api_url + '/registrations?auth_token=' + config.auth_token )
        .set('accept', 'application/json')
        .end( function( err, res ) {
          // Iterate over attendees
          res.body.registrations.forEach( function ( attendee ) {
            if( !attendees[ attendee.email ] ) {
              attendees[ attendee.email ] = 0;
            }
            attendees[ attendee.email ]++;
          });
          callback();
        });
    }, function () {
      // Sort by events attended
      const sorted = [];
      let id = 0;
      async.forEachOf( attendees, function( count, email, callback ) {
        var image = gravatar.url( email, { s: '300', r: 'x', d: '404' }, true );
        request.get( image )
          .end( function ( err, res ) {
            if( res.status === 200 ) {
              sorted.push( [ id, image, count ] );
              id++;
            }
            callback();
          });
      }, function (){
        sorted.sort( function( a, b ) {
          return b[ 2 ] - a[ 2 ]
        });

      });
    });
  });
