### What is this repository for? ###

* Nodejs API Test
* Author: [Maurício](https://github.com/mauricionr/)
* Version 0.0.1
### How do I get set up? ###

* Install [NodeJS](https://nodejs.org/dist/v5.6.0/)

* Install [MongoDB](https://www.mongodb.org/downloads#production)

       *Make sure MongoDB is running in background*

       *Make sure MongoDB default folder `data\db` exists in expected location*

* Clone

       `git clone https://github.com/mauricionr/csnodeapi.git`

* Installl dependencies
       
      `npm install`

* How to run tests

      `npm run test`

* How to build

      `npm run buid`

* How to develop

      `npm run start`

### API ###

**route:** */auth/sign-in*

**method:** POST

**body:** `{"email":"emailparalogin@login.com.br","senha":"senha123"}`

---

**route:** */auth/sign-up*

**method:** POST

**body:** `{"email":"emailparalogin@login.com.br","senha":"senha123", "nome":"nomeDoUsuario", "telefones":[]}`

---

**route:** */api/users*

**method:** GET

**Headers:** `authentication: Bearer {token}`

---

**route:** */api/users/:user_id*

**method:** GET

**Headers:** `authentication: Bearer {token}`

----
