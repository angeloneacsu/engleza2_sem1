
var obj_gameType_multipleChoice = {
    "id": "multiple_choice_select",
    "titlu": "<span>6</span>  ",
    "nr_pagina": "17","nr_exercitiu": "3",
    'unit_nr':'1',
    "game_ico": 'buton.svg','unit_title': 'My family','unit_nr': '1',
    'game_desc':'<span class="start_nr"></span>'+  'Look, read and choose.',
    "ajutor": {
        "sunet": "aj3.mp3",
        'text': 'Priveşte cu atenţie imaginile şi selectează cuvântul corespunzător fiecăreia apăsând pe el. Când crezi că ai terminat, apasă butonul de verificare în forma <span class="btn_verifica">literei V</span>. Butonul cu <span class="btn_reia_sarcina">Săgetuţe</span> va relua jocul de la început! Succes!'
    },
    "sarcina": {
        "sunet": "",
        "text": ' '
    },
    "no_input": {
        "sunet": "no_input.mp3"
    },
    "corect": {
        "sunet": ""
    },
    "gresit": {
        "sunet": ""
    },
    'raspuns_corect': {
        'sunet': "raspunsul_corect.mp3"
    },
    "start_page": [{
            "name": "sister",
            "imagine": "sister.png",
            "sunet": "",
            "variante": [{
                    "valoare": "mummy",
                    "status": "false"
                }, {
                    "valoare": "sister",
                    "status": "true"
                }]
        }, {
            "name": "brother",
            "imagine": "brother.png",
            "sunet": "",
            "variante": [{
                    "valoare": "brother",
                    "status": "true"
                }, {
                    "valoare": "daddy",
                    "status": "false"
                }]
        }, {
            "name": "mummy",
            "imagine": "mummy.png",
            "sunet": "",
            "variante": [{
                    "valoare": "sister",
                    "status": "false"
                }, {
                    "valoare": "mummy",
                    "status": "true"
                }]
        }, {
            "name": "daddy",
            "imagine": "daddy.png",
            "sunet": "",
            "variante": [{
                    "valoare": "daddy",
                    "status": "true"
                }, {
                    "valoare": "brother",
                    "status": "false"
                }]
        }]



};
