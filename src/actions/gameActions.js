import * as allActions from './allActions';

export function receiveGames(data) {
  return {type: allActions.RECEIVE_GAMES, games: data};
}

export function fetchGames() {
  return dispatch => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response =>
        response.json().then(data => ({
          data: data,
          status: response.status
        }))
      )
      .then(response => {
        if(response.status === 200) {
          dispatch(receiveGames(response.data))
        } else {
          var flash = {
            type: 'error',
            title: 'Error getting data',
            content: 'This is an error.'
          }
          dispatch({type: "DISPLAY_FLASH", data: flash})
        }
      });
  };
}
