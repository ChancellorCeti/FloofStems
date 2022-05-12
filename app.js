import {} from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js'
const stem=document.getElementById('stem')
const mean=document.getElementById('mean')
const sub=document.getElementById('submit')
const list=document.getElementById('list')
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js';
import { getFirestore, collection, getDocs,doc,addDoc,where,query,setDoc } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js';
import { getAuth, onAuthStateChanged,GoogleAuthProvider,signInWithPopup } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
const firebaseConfig = {
  //...
  apiKey: "AIzaSyDqOZTH-Syc5xExSSMkdSJ9iXRhYKO24KA",
  authDomain: "floofstems.firebaseapp.com",
  projectId: "floofstems",
  storageBucket: "floofstems.appspot.com",
  messagingSenderId: "109668646865",
  appId: "1:109668646865:web:9e7251b69d7ed0aeeaeaf0",
  measurementId: "G-CJSKF2HYE2"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// Add a new document in collection "cities"
sub.addEventListener('click',(e)=>{
var li=list.value;
setDoc(doc(db, "Stems", stem.value), {
  stem:stem.value,
  meaning: mean.value,
  list:li.toNumber()
});
stem.value=""
mean.value=""
list.value=""

})
async function getSev(){
const sevRef = collection(db, "Stems");

// Create a query against the collection.
const q = query(sevRef, where("list", ">=", "11"));
const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  console.log(doc.id, " => ", doc.data());
});
}
getSev();
