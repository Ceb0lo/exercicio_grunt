document.addEventListener('DOMContentLoaded', function(){
    document.getElementById('form-sort').addEventListener('submit', function(evento){
        evento.preventDefault();
        let numbMax =document.getElementById('numb-max').value;
        numbMax = parseInt(numbMax);

        let numbRand = Math.random() * numbMax;
        numbRand = Math.floor(numbRand + 1);

        document.getElementById('result-numb').innerText = numbRand;
        document.querySelector('#result').style.display = 'block'
    })
})