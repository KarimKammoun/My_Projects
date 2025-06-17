const btn=document.getElementById("btn");
const input=document.getElementById("input");
const ul=document.getElementById("liste_d_affichage");
const completedSection = document.getElementById("completed-section");
const completedList = document.getElementById("completed-list");
const showCompletedBtn = document.getElementById("show-completed-btn");



function tache_terminer(){
    ul.removeChild(li);

    const completedItem = document.createElement("li");
    completedItem.textContent = text.textContent;

    completedList.appendChild(completedItem);

}











function ajouter_element(){
    //btn pour mettre une tache terminer
    const caree= document.createElement("img");
    caree.src="./tache_terminer.png";
    caree.width = 20; 
    caree.height = 20;

    const btn_terminer_tache=document.createElement("button");
    btn_terminer_tache.appendChild(caree);


    //btn supprimer une tache
    const img = document.createElement("img");
    img.src="./corbaille.png";
    img.alt = "Supprimer";
    img.width = 20; 
    img.height = 20;

    const btn_supprimer=document.createElement("button");
    btn_supprimer.style.marginLeft = "10px";
    btn_supprimer.appendChild(img);

    //le texte de la tache
    const text=document.createElement("label");
    text.textContent =input.value;


    //cree une nouvelle ligne
    const nouvelElement = document.createElement("li");

    nouvelElement.appendChild(btn_supprimer);
    nouvelElement.appendChild(text);
    nouvelElement.appendChild(btn_terminer_tache);

    ul.appendChild(nouvelElement);
    

    //supprimer la tache qunad clicker sur le btn supprimer
    btn_supprimer.addEventListener("click", function () {
        ul.removeChild(nouvelElement); 
    });

    //les taches terminer
    btn_terminer_tache.addEventListener("click", function(){
        ul.removeChild(nouvelElement);

        const completedItem = document.createElement("li");
        completedItem.textContent = text.textContent;
        completedList.appendChild(completedItem);
    });
}


showCompletedBtn.addEventListener("click", function(){
    completedSection.style.display = "block";
});

const closeCompletedBtn = document.getElementById("close-completed");

closeCompletedBtn.addEventListener("click", () => {
    completedSection.style.display = "none";
});


input.addEventListener("keydown",function(){
    if (event.key=== "Enter"){
        ajouter_element();
    }
});


btn.addEventListener("click",ajouter_element);




