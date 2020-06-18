// Boolzapp

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

  $(".finder-input").keyup(function() {

    var userSearch = $(this).val().toUpperCase();;
    var allContacts = $(".contact");

    allContacts.each(function() {

      var contactName = $(this).find("h4").text().toUpperCase();;

      if (contactName.includes(userSearch)) {
        $(this).show();
      } else {
        $(this).hide();
      }

    });

  });

  $("#btn-send").click(function()
    {
      var valInput = $(".write input").val();
      if (valInput != "") {

        sendMessage();
        autoAnswer("ok");

      }
    }
  );

  $(".write input").keypress(function(event) {

      var valInput = $(".write input").val();
      if (valInput != "") {

        if ( event.which === 13
          || event.keyCode === 13
          || valInput !== "" ) {

          sendMessage();
          autoAnswer("ok");
        }

      }

    }
  );

});///end//ready///

//\FUNCTIONS///\
//questa funzione stampa nella chat il valore inserito nel campo input.
/// N.B. struttura e stile vengono definiti sulla
///falsa riga di un template nascosto nell' html
function sendMessage() {

  //salvo il valore di input in una variabile
  var messageText = $(".write input").val();
  //clono il template
  var newMessage = $(".template .single-message").clone();
  //stampo in un suo figlio il valore di input
  newMessage.children(".msg-text").text(messageText);
  //aggiungo al clone lo stile dei messaggi inviati
  newMessage.addClass("sent");

  //genero orario
      var date = new Date();
      var currentHours = date.getHours();
      var currentMinutes = date.getMinutes();
      var currentTime = addZero(currentHours) + ":" + addZero(currentMinutes);
  //lo stampo nell'elemento apposito del template e
  //gli aggiungo direttamente anche la classe che definisce il suo stile
  newMessage.children(".msg-time").text(currentTime).addClass("timestamp");

  //appendo il clone di single-message a current-chat
  $(".chatbox > .current-chat").append(newMessage);

  // $(".chatbox > .current-chat").scrollTop($(".current-chat").height());

}

//aggiungi uno zero se inferiore a 10
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
    //aggiungo al clone lo stile dei messaggi ricevuti
    newMessage.addClass("received");

    //genero orario
        var date = new Date();
        var currentHours = date.getHours();
        var currentMinutes = date.getMinutes();
        var currentTime = addZero(currentHours) + ":" + addZero(currentMinutes);

    //lo stampo nell'elemento apposito del template e
    //gli aggiungo direttamente anche la classe che definisce il suo stile
    newMessage.children(".msg-time").text(currentTime).addClass("timestamp");

    //appendo il clone di single-message a current-chat
    $(".chatbox > .current-chat").append(newMessage);

    // $(".chatbox > .current-chat").scrollTop($(".current-chat").height());

  }, 1000); //1sec

  return answer;

}
