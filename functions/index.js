const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const ref = admin.database().ref();

exports.registerNewUser = functions.auth.user().onCreate(event => {
    const user = event.data
  
    const uid = user.uid
    const email = user.email
    const displayName = user.displayName
  
    return ref.child(`/users/${uid}/`).set({
      "email": email,
      "displayName": displayName,
      "gotout": false
    });
});

exports.onGotOut = functions.database.ref('/users/{uid}/gotout').onWrite(event => {
    console.log(event)
  
    if (event.data.current.val() !== true){
        return
    }
    // Read tagged's email
    ref.child(`/users/${event.params.uid}`).once('value').then((snapshot) => {
        var taggedUser = snapshot.val();
        var taggedEmail = taggedUser.email.replace('.', '');

        // Get tagger's email
        ref.child(`/taggers/${taggedEmail}`).once('value').then((snapshot) => {
            taggerEmail = snapshot.val().replace('.', '');
            
            // Get tagged's target
            ref.child(`/targets/${taggedEmail}`).once('value').then((snapshot) => {
            var taggedTarget = snapshot.val();

            var promises = []

            // Set tagged's out to true
            promises.push(
                ref.child(`/out/${taggedEmail}`).set(true)
            );
            // Set tagged's target to null
            promises.push(
                ref.child(`/targets/${taggedEmail}`).set(null)
            );

            // Set tagged's tagger to null
            promises.push(
                ref.child(`/taggers/${taggedEmail}`).set(null)
            );

            // Set tagger's target to tagged's target
            promises.push(
                ref.child(`/targets/${taggerEmail}`).set(taggedTarget)
            );

            // Set tagged's target's tagger to tagger
            promises.push(
                ref.child(`/taggers/${taggedTarget}`).set(taggerEmail)
            );

            // Update tagger's tag count
            ref.child(`/numTags/${taggerEmail}`).once('value').then((snapshot) => {
                numTags = snapshot.val();
                return ref.child(`/numTags/${taggerEmail}`).set(numTags+1);
            });

            // Update tags database
            promises.push(
                ref.child('/tags').push({
                    timestamp: Date.now(),
                    tagger: taggerEmail,
                    tagged: taggedEmail
                })
            );

            return Promise.all(promises)                
            });
        });
    });
  })