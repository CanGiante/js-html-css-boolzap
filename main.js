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


$(document).ready(function() {

  $('#btn-send').click(function()
    {
      sendMessage();
    }
  );

  $(".write input").keypress(function(event)
    {
      if (event.which === 13 || event.keyCode === 13) {
        sendMessage();
      }
    }
  );

});///end//ready///

//\FUNCT///\
function sendMessage() {

  //salvo il valore di input in una variabile
  var messageText = $(".write input").val();
  //clono il template
  var newMessage = $(".template .single-message").clone();
  //stampo in un suo figlio il valore di input
  newMessage.children(".msg-text").text(messageText);
  //aggiungo lo stile al clone
  newMessage.addClass("sent");

  //genero orario
      var date = new Date();
      var currentHours = date.getHours();
      var currentMinutes = date.getMinutes();
      var currentTime = addZero(currentHours) + ":" + addZero(currentMinutes);
  //lo stampo nel selettore apposito e aggiungo classe con stile apposito
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
