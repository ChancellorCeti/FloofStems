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

var uptoe=[]
let issubclicked;
const an=document.getElementById('an')
const con=document.getElementsByClassName('config')
var num;
let wre=false;
var wrongstems=[]
var wrongmeans=[]
var answer;

const upto=document.getElementById('upto')
const solonum=document.getElementById('solonum');
const none=document.querySelector('none')
//var upeto=prompt('up to what stem list should we quiz you?')
var sixstems=[]
var sixmeanings=[]
var correctstems=[]
const ree=document.getElementById('ree');
console.log(ree);
//console.log(submi)
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
    async function getStems2(list){
        const sevRef = collection(db, "Stems");
    
    // Create a query against the collection.
    const q = query(sevRef, where("list", "==", list));
    const querySnapshot = await getDocs(q);
    
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      sixstems.push(doc.data().stem)
      sixmeanings.push(doc.data().meaning)
    });
    }
    let uptoval;
    const submi=document.getElementById('submi');
    const moredel=document.getElementById('moredel')
    submi.addEventListener('click',(e)=>{
        uptoval=upto.value
        console.log(uptoval);
        console.log(upto.value)
        issubclicked=true;
        uptoe.push(upto.value)
        console.log('e')
        an.classList.remove('none')
        question.classList.remove('none')
        console.log(con);
        /*for(var i=0;i<con.length;i++){
        console.log('sae')
        con[i].classList.add('none')
        con[i].remove()
        }*/
        ree.innerHTML='';
        moredel.innerHTML='';
        evenmoredel.innerHTML=''
        solonum.style.opacity='0%';
        solonum.style.width='1px';
        upto.style.opacity='0%';
        upto.style.width='1px';
        console.log(issubclicked)
        main();
    }
    )
async function main(){
    await issubclicked;
    console.log(upto.value)
    console.log("Being quizzed up to list "+uptoval)
    
    //console.log(ert)
    if(!solonum.value){
    await getStems(upto.value*1);
    upto.remove()
    solonum.remove()
       /* getStems2(solonum.value*1)
        console.log('e');
        upto.remove()
        solonum.remove();
    */
    var sixt=sixstems.length;
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
                correctstems.push(sixstems[num])
                console.log(correctstems);
                console.log(sixt);
                var perf=((correctstems.length)/(sixt))*100
                
                console.log(correctstems.length);
                console.log(sixt.length);
                console.log(perf);
                var perfbar=document.createElement('h2');
                var wrongbar=document.createElement('h3');
                wrongbar.innerHTML="You missed the following stems:"
                if(wrongstems.length>0){
                    document.body.appendChild(wrongbar)
                    for(var h=0;h<wrongstems.length;h++){
                        var wr=document.createElement('li')
                        wr.innerHTML=wrongstems[h];
                        wrongbar.appendChild(wr);
                    }
                }
                perfbar.innerHTML="You had "+perf.toString()+"% accuracy!"
                addBu(perfbar)
                //question.innerHTML="ur done"
            }else if(an.value!=answer&&sixstems.length>1){
                console.log(wre)
                
                if(!wre){
                    var wrong=document.createElement('h3');
                var cont=document.createElement('button');
                wrongstems.push(sixstems[num])
                wrongmeans.push(sixmeanings[num])
                console.log(wrongstems)
                wrong.innerHTML='You got it wrong, the correct answer was '+sixmeanings[num]
                cont.innerHTML="continue"
                wre=true;
                document.body.appendChild(wrong)
                }
                
                console.log(wrong)
                //wre=false;
                
                setTimeout(addBu(cont),2000);
                cont.addEventListener('click',(e)=>{
                    wrong.remove()
                    cont.remove()
                    sixstems.splice(num,1)
                    wre=false;
                sixmeanings.splice(num,1)
                
                num=Math.floor(Math.random() * (sixstems.length))
                console.log(num)
                question.innerHTML=sixstems[num]
                answer=sixmeanings[num]
                an.value=""
                })
            }
            else if(an.value!=answer&&sixstems.length==1){
                console.log(wre)
                
                if(!wre){
                    var wrong=document.createElement('h3');
                var cont=document.createElement('button');
                wrongstems.push(sixstems[num])
                wrongmeans.push(sixmeanings[num])
                console.log(wrongstems)
                wrong.innerHTML='You got it wrong, the correct answer was '+sixmeanings[num]
                cont.innerHTML="continue"
                wre=true;
                document.body.appendChild(wrong)
                }
                
                console.log(wrong)
                //wre=false;
                
                setTimeout(addBu(cont),2000);
                cont.addEventListener('click',(e)=>{
                    wrong.remove()
                    cont.remove()
                    sixstems.splice(num,1)
                    wre=false;
                    //this part
                    alert('all done!')
                an.value=""
                correctstems.push(sixstems[num])
                console.log(correctstems);
                console.log(sixt);
                var perf=((correctstems.length)/(sixt))*100
                
                console.log(correctstems.length);
                console.log(sixt.length);
                console.log(perf);
                var perfbar=document.createElement('h2');
                var wrongbar=document.createElement('h3');
                wrongbar.innerHTML="You missed the following stems:"
                if(wrongstems.length>0){
                    document.body.appendChild(wrongbar)
                    for(var h=0;h<wrongstems.length;h++){
                        var wr=document.createElement('li')
                        wr.innerHTML=wrongstems[h];
                        wrongbar.appendChild(wr);
                    }
                }
                perfbar.innerHTML="You had "+perf.toString()+"% accuracy!"
                addBu(perfbar)
                sixmeanings.splice(num,1)
                
                /*num=Math.floor(Math.random() * (sixstems.length))
                console.log(num)
                question.innerHTML=sixstems[num]
                answer=sixmeanings[num]
                an.value=""*/
                })
            }
        }
    });

}else if(solonum.value){
   
    
      await  getStems2(solonum.value*1)
        console.log('e');
        upto.remove()
        solonum.remove();
    
    var sixt=sixstems.length;
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
                correctstems.push(sixstems[num])
                console.log(correctstems);
                console.log(sixt);
                var perf=((correctstems.length)/(sixt))*100
                
                console.log(correctstems.length);
                console.log(sixt.length);
                console.log(perf);
                var perfbar=document.createElement('h2');
                var wrongbar=document.createElement('h3');
                wrongbar.innerHTML="You missed the following stems:"
                if(wrongstems.length>0){
                    document.body.appendChild(wrongbar)
                    for(var h=0;h<wrongstems.length;h++){
                        var wr=document.createElement('li')
                        wr.innerHTML=wrongstems[h];
                        wrongbar.appendChild(wr);
                    }
                }
                perfbar.innerHTML="You had "+perf.toString()+"% accuracy!"
                addBu(perfbar)
                //question.innerHTML="ur done"
            }else if(an.value!=answer&&sixstems.length>1){
                console.log(wre)
                
                if(!wre){
                    var wrong=document.createElement('h3');
                var cont=document.createElement('button');
                wrongstems.push(sixstems[num])
                wrongmeans.push(sixmeanings[num])
                console.log(wrongstems)
                wrong.innerHTML='You got it wrong, the correct answer was '+sixmeanings[num]
                cont.innerHTML="continue"
                wre=true;
                document.body.appendChild(wrong)
                }
                
                console.log(wrong)
                //wre=false;
                
                setTimeout(addBu(cont),2000);
                cont.addEventListener('click',(e)=>{
                    wrong.remove()
                    cont.remove()
                    sixstems.splice(num,1)
                    wre=false;
                sixmeanings.splice(num,1)
                
                num=Math.floor(Math.random() * (sixstems.length))
                console.log(num)
                question.innerHTML=sixstems[num]
                answer=sixmeanings[num]
                an.value=""
                })
            }
            else if(an.value!=answer&&sixstems.length==1){
                console.log(wre)
                
                if(!wre){
                    var wrong=document.createElement('h3');
                var cont=document.createElement('button');
                wrongstems.push(sixstems[num])
                wrongmeans.push(sixmeanings[num])
                console.log(wrongstems)
                wrong.innerHTML='You got it wrong, the correct answer was '+sixmeanings[num]
                cont.innerHTML="continue"
                wre=true;
                document.body.appendChild(wrong)
                }
                
                console.log(wrong)
                //wre=false;
                
                setTimeout(addBu(cont),2000);
                cont.addEventListener('click',(e)=>{
                    wrong.remove()
                    cont.remove()
                    sixstems.splice(num,1)
                    wre=false;
                    //this part
                    alert('all done!')
                an.value=""
                correctstems.push(sixstems[num])
                console.log(correctstems);
                console.log(sixt);
                var perf=((correctstems.length)/(sixt))*100
                
                console.log(correctstems.length);
                console.log(sixt.length);
                console.log(perf);
                var perfbar=document.createElement('h2');
                var wrongbar=document.createElement('h3');
                wrongbar.innerHTML="You missed the following stems:"
                if(wrongstems.length>0){
                    document.body.appendChild(wrongbar)
                    for(var h=0;h<wrongstems.length;h++){
                        var wr=document.createElement('li')
                        wr.innerHTML=wrongstems[h];
                        wrongbar.appendChild(wr);
                    }
                }
                perfbar.innerHTML="You had "+perf.toString()+"% accuracy!"
                addBu(perfbar)
                sixmeanings.splice(num,1)
                
                /*num=Math.floor(Math.random() * (sixstems.length))
                console.log(num)
                question.innerHTML=sixstems[num]
                answer=sixmeanings[num]
                an.value=""*/
                })
            }
        }
    });

}
}


//await main();
function addBu(cont){
    document.body.appendChild(cont)
}
