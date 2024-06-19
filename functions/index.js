const express = require('express');
const routes = require('./src/routes/index');
const cors = require('cors');
const firebaseAdmin = require('firebase-admin');
const functions = require('firebase-functions');

const serviceAccount = require('./serviceAccountKey.json');

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

// Initialize Firebase Admin SDK
firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount)
});


app.use('/api', routes);

app.post('/login-google', (req, res) => {
  const idToken = req.body.idToken;

  firebaseAdmin.auth().verifyIdToken(idToken)
    .then((decodedToken) => {
      const uid = decodedToken.uid;
      // Perform additional operations if needed (e.g., database updates, session handling)
      res.status(200).send({ message: 'Authentication successful', uid: uid });
    })
    .catch((error) => {
      console.error(error);
      res.status(401).send({ message: 'Authentication failed' });
    });
});

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
exports.app = functions.https.onRequest(app);