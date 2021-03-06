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

exports.onGotOut = functions.database.ref('/gotout/{email}').onWrite((change, context) => {
    console.log(change);
  
    if (change.after.val() !== true){
        return null;
    }

    const taggedEmail = context.params.email;

    // Get tagger's email
    const allPromises = ref.child(`/taggers/${taggedEmail}`).once('value').then((snapshot) => {
        const taggerEmail = snapshot.val().replace('.', '');
        
        // Get tagged's target
        const allPromises = ref.child(`/targets/${taggedEmail}`).once('value').then((snapshot) => {
            const taggedTarget = snapshot.val();

            var promises = [];

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

            return Promise.all(promises);
        });
        return allPromises;
    });
    return allPromises;
  });
