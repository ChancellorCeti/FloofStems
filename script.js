import {} from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js'

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
const question=document.getElementById('question')
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const an=document.getElementById('an')
var num;
var answer;
const sub=document.getElementById('sub')
var sixstems=[]
var sixmeanings=[]
var correctstems=[]
async function getStems(list){
    const sevRef = collection(db, "Stems");
    
    // Create a query against the collection.
    const q = query(sevRef, where("list", "<=", list));
    const querySnapshot = await getDocs(q);
    
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      sixstems.push(doc.data().stem)
      sixmeanings.push(doc.data().meaning)
    });
    }
async function main(){

    await getStems(20);
    console.log(sixstems)
    console.log(sixmeanings)
    console.log(sixstems.length)
    num=Math.floor(Math.random() * (sixstems.length))
    console.log(num);
    answer=sixmeanings[num]
    question.innerHTML=sixstems[num];

    $(document).on("keypress", "input", function(e){
        
        if(e.which == 13){
            if(an.value==answer&&sixstems.length>1){
                console.log('e')
                correctstems.push(sixstems[num])
                sixstems.splice(num,1)
                sixmeanings.splice(num,1)
                
                num=Math.floor(Math.random() * (sixstems.length))
                console.log(num)
                question.innerHTML=sixstems[num]
                answer=sixmeanings[num]
                an.value=""
            }else if(an.value==answer&&sixstems.length==1){
                alert('all done!')
                an.value=""
                question.innerHTML="ur done"
            }
        }
    });

}


main();
