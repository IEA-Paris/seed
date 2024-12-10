export const listEvents = gql`
  query listEvents($filters: ListEventsInput = {}, $appId: ID = "apex") {
    listEvents(appId: $appId, filters: $filters) {
      total
      items {
        appId
        availableSlots
        bookingState
        category
        delay
        description
        disciplines {
          name
        }
        discussants {
          firstname
          lastname
        }
        id
        image
        name
        place {
          address
          id
          name
          url
        }
        eventSlots {
          email
          firstname
          institution
          lang
          lastname
        }
        start
        state
        title
        type
        url
        totalSlots
      }
    }
  }
`
/* 
query getEvent($name: String!) {
  event(name: $name) {
    name
    description
    start
    stop
    location {
      name
      city
      country
    }
    speakers {
      firstname
      lastname
    }
    tags {
      name
    }
  }
}
 */
