const firebase = require('firebase');
require('firebase/database');
require('firebase/storage');

const firebaseConfig = require('../config');

class Fire {
  constructor() {
    firebase.initializeApp(firebaseConfig);
  }

  uploadPhotoAsync = async (uri) => {
    const path = `photos/${this.uid}/${Date.now()}.jpg`;
    return new Promise(async (res, rej) => {
      const response = await fetch(uri);
      const file = await response.blob();

      let upload = firebase.storage().ref(path).put(file);

      upload.on(
        'state_changed',
        (snapshot) => {},
        (err) => {
          rej(err);
        },
        async () => {
          // eslint-disable-next-line no-shadow
          const url = await upload.snapshot.ref.getDownloadURL();
          res(url);
        }
      );
    });
  };
  uploadVideoAsync = async (uri) => {
    const path = `videos/${this.uid}/${Date.now()}.mp4`;
    return new Promise(async (res, rej) => {
      const response = await fetch(uri);
      const file = await response.blob();

      let upload = firebase.storage().ref(path).put(file);

      upload.on(
        'state_changed',
        (snapshot) => {},
        (err) => {
          rej(err);
        },
        async () => {
          // eslint-disable-next-line no-shadow
          const url = await upload.snapshot.ref.getDownloadURL();
          res(url);
        }
      );
    });
  };

  get firestore() {
    return firebase.firestore();
  }
  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }
  get timestamp() {
    return Date.now();
  }
}
Fire.shared = new Fire();
module.exports = Fire;
