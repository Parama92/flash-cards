const speak = document.querySelector('.speak');
const card = document.querySelector('.btn-container');
const learnBtn = document.querySelector('#learn-btn');
const unlearn = document.querySelector('#unlearn')
window.addEventListener('load', createDb)

if (speak != null) {
    speak.addEventListener('click', playAudio)
}
if(card != null){
    card.addEventListener('click', changeStatus)
}
if(learnBtn != null){
    learnBtn.addEventListener('click', learnWord)
}
if(unlearn != null){
    unlearn.addEventListener('click', deleteWord)
}

function playAudio () {
    speak.previousElementSibling.play();
}

async function changeStatus (e) {
    if (!e.target.classList.contains('status-btn')) {
        return;
    }
    const status = e.target.id;
    const word = document.querySelector('.word').textContent.trim();

    const item = await getWord(word)
    if(!item) {
        saveWord({word, status})
    }
    else if (item.status != status) {
        alterWord({word, status})
    }
    // fetch(`/changeStatus`,{
    //     method: 'POST', 
    //     body: JSON.stringify({status, word}), 
    //     headers:{
    //         'Content-Type': 'application/json'
    //     }
    // }).then(res => res.json())
    // .then(res => {console.log(res)})
    // .catch(err => console.log(err))

    // TODO: change status on word in indexeddb

}

async function learnWord (e) {
    e.preventDefault();
    const word = document.querySelector('#word').value.trim();
    const status = 'Learn'
    // TODO: 1. Check if meaning is available
    // 2. Add word to indexeddb if valid
    // 3. Show the relevant flashcard

    // checking meaning
    const res = await fetch('/dictionary', {
                method: 'POST', 
                body: JSON.stringify({word, fetch: true}), 
                headers:{
                    'Content-Type': 'application/json'
                }
            })
    // taking care of the error
    if (!res.ok) {
        const error = `<span>"${word}"</span> seems to be absent from the dictionary. Are you sure you spelt it right?`
        document.querySelector('.error').innerHTML = error;
        console.log(res.statusText)
        return
    }
    
    //saving the word
    saveWord({word, status})

    //displaying it in a flashcard
    location.href = `/dictionary/new/${word}`
}

function deleteWord (e) {
    const word = document.querySelector('.word').textContent.trim();
    removeWord(word);
}

function createDb () {
    idb.open('vocabulary', 1, function(upgradeDb) {
        if (!upgradeDb.objectStoreNames.contains('word-list')) {
            upgradeDb.createObjectStore('word-list', {keyPath: 'word'});
        }
    })
}

function saveWord (item) {
    idb.open('vocabulary', 1)
        .then(function (db) {
            const tx = db.transaction('word-list', 'readwrite')
            const store = tx.objectStore('word-list')
            store.add(item)
            return tx.complete
        })
        .then(function () {
            console.log('item added');
        })
        .catch(function (err) {
            console.log(err)
        })
}

async function getWord (word) {
    try{
        const db = await idb.open('vocabulary', 1)
        const tx = db.transaction('word-list', 'readwrite')
        const store = tx.objectStore('word-list')
        return store.get(word)
    }
    catch (e) {
        console.log(e)
    }
}

function removeWord (word) {
    idb.open('vocabulary', 1)
        .then(function (db) {
            const tx = db.transaction('word-list', 'readwrite')
            const store = tx.objectStore('word-list')
            store.delete(word)
            return tx.complete
        })
        .then(function () {
            console.log('item deleted');
        })
        .catch(function (err) {
            console.log(err)
        })
}

function alterWord (word) {
    idb.open('vocabulary', 1)
        .then(function (db) {
            const tx = db.transaction('word-list', 'readwrite')
            const store = tx.objectStore('word-list')
            store.put(word)
            return tx.complete
        })
        .then(function () {
            console.log('item altered');
        })
        .catch(function (err) {
            console.log(err)
        })
}