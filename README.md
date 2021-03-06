# Werkstuk security
Door Christian van den Puttelaar

Publieke url:
* Frontend --> [Klik hier om naar web app te gaan](https://www.opdracht.comagexinvoice.com/) of gebruik deze link https://www.opdracht.comagexinvoice.com/
* Backend --> [Klik hier om naar REST API te gaan](https://opdracht-security.herokuapp.com/api) of gebruik deze link https://opdracht-security.herokuapp.com/api

Dit werkstuk bestaat uit 2 applicaties:
* Frontend bestaat uit een SPA in Vue.js
* Backend bestaat uit een REST API in Express.js

Host:
* Frontend is gehost op [fastcomet](https://www.fastcomet.com/)
* Backend is gehost op [Heroku](https://www.heroku.com/)

## Inloggegevens
Er zijn al een paar accounts aangemaakt die de docent kan gebruiken

|               | Username                | Paswoord                |Rol
| ------------- | ----------------------- | ----------------------- |-----------------------|
| 1             | docent                  | erasmus1234567          |gebruiker              |
| 2             | admin                   | kruidvat1234            |beheerder              |
| 3             | bobby                   | blokker1234             |gebruiker              |
| 4             | Suzzy                   | action9874              |gebruiker              |
| 5             | admin2                  | blokker1234             |beheerder              |


## Beschrijving:
De frontend is een forum waar de gebruiker berichten op kan posten. 
Hij kan de berichten lezen maar moet ingelogd zijn om zelf een bericht te plaatsen.
Er zijn 2 rollen:
* Gebruiker: kunnen berichten plaatsen en hun eigen berichten aanpassen of verwijderen. Daarnaas kunnen ze ook hun gegevens van hun profiel bekijken, aanpassen en verwijderen. Een gebruiker kan ook een bezwaar indienen
* Beheerder: kan geen berichten plaatsen maar wel berichten bekijken en verwijderen

## Verwerkingsregister
Het verwerkingsregister is in de root van de git repository te vinden. Het is een word document
Hier is de link ernaar
* [Ga naar verwerkingsregister](https://github.com/Gitisfun/securitywerkstuk/blob/master/Verwerkingsregister.docx)
* Volledige link: https://github.com/Gitisfun/securitywerkstuk/blob/master/Verwerkingsregister.docx

## REST API
Hieronder volgt een tabel met de routes van REST API

### Toegangspolicy

| Resource | Operatie| Http methode| Parameter | Toegang |
| ------------- | ----------------------- | ----------------------- |------------------- |------------------- |
| /comments | oplijsten | GET| Geen | iedereen | 
| | get by id| GET| id| gebruiker,  beheerder | 
| | create| POST|Geen | gebruiker| 
| | update| PUT| id| gebruiker| 
| | delete| DELETE| id| gebruiker,  beheerder | 
| /bezwaar| oplijsten | GET| Geen | gebruiker,  beheerder | 
| | create| POST|Geen | gebruiker| 
| /login| inloggen| POST| Geen | iedereen | 
| /register| register| POST| Geen | iedereen | 
| /confirmation| confirmatie voor email| GET| token| gebruiker, beheerder| 
|/users | get by id| GET| id| gebruiker,  beheerder | 
| | update| PUT| id| gebruiker, beheerder| 
| | delete| DELETE| id| gebruiker,  beheerder | 
