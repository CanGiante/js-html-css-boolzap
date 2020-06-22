 //Boolzapp

            // Milestone 1
            // Replica della grafica con la possibilità di avere messaggi scritti dall’utente
            // (verdi) e dall’interlocutore (bianco) assegnando due classi CSS diverse
            // Aggiunta di un messaggio: l’utente scrive un testo nella parte bassa e
            // cliccando “invia” il testo viene aggiunto al thread sopra, come messaggio verde

      // Milestone 2
      // Risposta dall’interlocutore: ad ogni inserimento di un messaggio, l’utente
      // riceverà un “ok” come risposta, che apparirà dopo 1 secondo.
      // Ricerca utenti: scrivendo qualcosa nell’input a sinistra, vengono visualizzati
      // solo i contatti il cui nome contiene le lettere inserite
      // (es, Marco, Matteo Martina -> Scrivo “mar” rimangono solo Marco e Martina)

// Milestone 3
// Click sul contatto mostra la conversazione del contatto cliccato,
// è possibile inserire nuovi messaggi per ogni conversazione
// Cancella messaggio: cliccando sul messaggio appare un menu a tendina che
// permette di cancellare il messaggio selezionato
$(document).ready(function() {

  //___SELEZIONE CHAT___//
  //se clicco su un contatto mostro finestra chat relativa
  $(".contact").click(function() {

    //evidenzio ultimo contatto cliccato
    $(this).addClass('selected');
    $(this).siblings().removeClass('selected');

    //ogni .window-chat è display none
    $(".window-chat").removeClass("current");
    //ogni .avatar-contact (blocco .header-right) dei miei contatti è display none
    $(".avatar-contact").removeClass("current");


//
    $(".last-access").removeClass("current");
//


    //leggo l'attributo data-contact del contatto cliccato
    var dataContact = $(this).attr('data-contact');
    //cerco data-chat e data-avatar corrispondenti
    var selettoreChat = $('.window-chat[data-chat="' + dataContact + '"]');
    var selettoreAvatar = $('.avatar-contact[data-avatar="' + dataContact + '"]');


//
    var selettoreAccess = $('.last-access[data-access="' + dataContact + '"]');
//


    //li mostro
    $(selettoreChat).addClass("current");
    $(selettoreAvatar).addClass("current");


//
    $(selettoreAccess).addClass("current");
//


    //stampo in .header-right il nome del contatto
    var nomeContatto = $(this).find("h4").clone().text();
    $(".header-right > .info-contact > h4").text(nomeContatto);


  });


  //___RICERCA CONTATTO___//
  //cerco il nome del contatto contenente la sequenza di caratteri inseriti nell'input
  $(".finder-input").keyup(function() {

    //devo confrontare la coincidenza della stringa generata dall'utente
    //con le stringhe contenute nei tag h4 di ciascun .contact
    var userSearch = $(this).val().toUpperCase();;
    var allContacts = $(".contact");

    //effettuo la verifica su ogni contatto ad ogni input
    allContacts.each(function() {

      //leggo il contenuto del tag h4, che ciascuno contiene
      var contactName = $(this).find("h4").text().toUpperCase();

      //lo mostro solo se il contenuto letto (il nome) include la sequenza
      //di caratteri inseriti dall'utente, altrimenti lo nascondo
      if (contactName.includes(userSearch)) {
        $(this).show();
      } else {
        $(this).hide();
      }

    });

  });


  //___INVIO MESSAGGIO___//
  //gestisco la classe visible del tasto di invio messaggio;
  //al click (o all'enter): prendo il valore di input e:
  //simulo invio messaggio (funzione sendMessage());
  //simulo risposta automatica predefinita (funzione autoAnswer()).

    //cliccando nell'html rendo visibile solo l'icona microfono//
    $("html").click(function() {
      $(".btn.mic").addClass("visible");
      $(".btn.send").removeClass("visible");
    });
    //cliccando .write > input rendo visibile solo l'icona paperplane//
    $(document).on("click", ".write > input", function() {
      $(".btn.mic").removeClass("visible");
      $(".btn.send").addClass("visible");
    });

  /// al click ///
  $(".btn.send").click(function() {
    var valInput = $(".write > input").val();

    //a meno che il campo input non sia vuoto
    if (valInput != "") {
      //stampo un messaggio inviato
      sendMessage();


//

      // staScrivendo();

//


      //stampo un messaggio ricevuto
      autoAnswer("Ok");
      //svuoto input
      $(".write > input").val("");


//
      stampCurrentTime($(".contacts > .contact.selected > div > span"));
      // $(".content > .header-right > .info-contact > .last-access.current").text("Online");


//


    }

  });

  /// alla pressione del tasto invio ///
  $(".write input").keypress(function(event) {
    var valInput = $(".write input").val();

    //a meno che il campo input non sia vuoto
    if (valInput != "") {
      if ( event.which === 13 || event.keyCode === 13 ) {
        //stampo un messaggio inviato
        sendMessage();
        //stampo un messaggio ricevuto
        autoAnswer("OHOHOHOHOHOHOHOHOHOHOHOHOHOHOHOHOHOHOHOHOHOHOHOHOH OH OH");
        //svuoto input
        $(".write > input").val("");


//
        stampCurrentTime($(".contacts > .contact.selected > div > span"));
//



      }
    }

  });


  //___ELIMINAZIONE MESSAGGIO___//
  //entrando col mouse sul messaggio appare chevron-down,
  //se ci clicco appare un dropdown contenente un <li class="delete">,
  //che se cliccato cancella il messaggio
  $(document).on("mouseenter", ".single-message", function() {
    //nascondo tutte le frecce
    $(".msg-arrow").hide();
    //mostro solo la freccia figlia del messaggio su cui ho fatto effettivamente mouseenter
    $(this).children(".msg-arrow").show();
  });

  $(document).on("mouseleave", ".single-message", function() {
    //chiudo la freccia figlia del messaggio da cui ho fatto mouseleave
    $(this).children(".msg-arrow").hide();
  });

  $(document).on("click", ".msg-arrow", function() {
    //apro e chiudo un dropdown
    $(this).siblings(".options").toggleClass("visible");
    //quando apro un dropdown chiudo tutti gli altri
    //(i figli dei fratelli del suo genitore)
    $(this).parent().siblings().find(".options").removeClass("visible");

//
    // //se necessario scrollo
    // $(".chatbox > .window-chat.current").scrollTop($(".window-chat.current").prop("scrollHeight"));
//

  });

  $(document).on("click", ".delete", function() {
    //al click simulo eliminazione messaggio
    $(this).closest(".single-message").hide();
  });


});//end_ready

//\_FUNCTIONS_//\
//questa funzione stampa nella chat il valore inserito nel campo input.
// N.B. struttura e stile vengono definiti sulla
//falsa riga di un template nascosto nell' html
function sendMessage() {

  //salvo il valore di input in una variabile
  var messageText = $(".write input").val();
  //clono il template
  var newMessage = $(".template .single-message").clone();
  //stampo in un suo figlio il valore di input
  newMessage.children(".msg-text").text(messageText);
      //stampo la stessa stringa salvata in messageText anche in .preview
      $(".contact.selected > .preview > p").text(messageText);
  //aggiungo al clone lo stile dei messaggi inviati
  newMessage.addClass("sent");

  //genero orario
    var date = new Date();
    var currentHours = date.getHours();
    var currentMinutes = date.getMinutes();
    var time = addZero(currentHours) + ":" + addZero(currentMinutes);
  //lo stampo nell'elemento apposito del template e
  //gli aggiungo direttamente anche la classe che definisce il suo stile
  newMessage.children(".msg-time").text(time).addClass("timestamp");
  //aggiungo lo stile alla chevron-down
  newMessage.children(".msg-arrow").addClass("arrow");

  //appendo il clone di single-message a current-chat
  $(".chatbox > .window-chat.current").append(newMessage);
  //se necessario scrollo
  $(".chatbox > .window-chat.current").scrollTop($(".window-chat.current").prop("scrollHeight"));

}

//questa funzione aggiunge uno zero davanti a un numero inferiore a 10
//modifica aspetto orario stampato
function addZero(number) {

  if (number < 10) {
    return "0" + number;
  }

  return number;
}

//funzione simile a sendMessage(),
//stampa la stringa passata come argomento
//con ritardo di un secondo
function autoAnswer(answer) {

  setTimeout(function() {

    //clono il template
    var newMessage = $(".template .single-message").clone();
    //stampo in un suo figlio la stringa passata come argomento
    newMessage.children(".msg-text").text(answer);
        //stampo la stessa stringa anche in ''.contacts .preview''
        $(".contact.selected > .preview > p").text(answer);
    //aggiungo al clone lo stile dei messaggi ricevuti
    newMessage.addClass("received");

    //genero orario
      var date = new Date();
      var currentHours = date.getHours();
      var currentMinutes = date.getMinutes();
      var time = addZero(currentHours) + ":" + addZero(currentMinutes);
    //lo stampo nell'elemento apposito del template e
    //gli aggiungo direttamente anche la classe che definisce il suo stile
    newMessage.children(".msg-time").text(time).addClass("timestamp");

    //aggiungo lo stile alla chevron-down
    newMessage.children(".msg-arrow").addClass("arrow");

    //appendo il clone di single-message a current-chat
    $(".chatbox > .window-chat.current").append(newMessage);
    //se necessario scrollo
    $(".chatbox > .window-chat.current").scrollTop($(".window-chat.current").prop("scrollHeight"));

    //
    var orarioUltimoAccesso = stampCurrentTime($(".content > .header-right > .info-contact > .last-access.current > span"));
    $(".content > .header-right > .info-contact > .last-access").text("Ultimo accesso alle " + ultimo);
    //




  }, 3000); //3sec

  return answer;

}


/////////////////////////////////////////////////////////////////////////////

//mancano:

/*
home page
bug scroll
sta scrivendo
prependi ultimo contatto con cui hai avuto conversazione
dark mode
*/


function stampCurrentTime(selector) {

  //genero orario
  var date = new Date();
  var currentHours = date.getHours();
  var currentMinutes = date.getMinutes();
  var time = addZero(currentHours) + ":" + addZero(currentMinutes);
  $(selector).text(time);

  return selettore;
}




function staScrivendo() {

  setTimeout(function() {
    $(".content > .header-right > .info-contact > .last-access.current").text("Sta scrivendo...");
  }, 2000); //2sec

}
