# Introduction

sashu-showcase is a project to create a web page for the company [SaShu for Retail S.R.O](https://www.sa-shu.com "sa-shu.com").
It's based on the project [Adonis JS](https://adonisjs.com/) with [Edge JS](https://edgejs.dev/).

# How to add new project (Retail or Research)
## Prepare images
Each project have differents types of images:
### Main image Horizontal : 
* Visible on the main page when the screen is in *landscape* format.
* resolution: **1920 x 1080px**
* uncropped part: **1550 x 600px**
* format .webp
### Main image Vertical :
* Visible on the main page when the screen is in *portrait* format.
* resolution: **1080x1920px**
* uncropped part: **600x1550px**
* format .webp

### 5x images for the carousel :
* Images for the *carousel*. When you click on the main image of the project, you can see the description of it with 5 extra images, presented as a carousel (a pile).
* resolution: **900x600px**
* format .webp


## Copy images
Copy all the images to the folder :
* __/public/images/retail__ for the retail projects
* __/public/images/research__ for the research projects

## Create project folder
create a folder at :
* __/resources/content/retail__ for the retail projects
* __/resources/content/research__ for the research projects

The name of the folder must have this structure: [number]_[name of the project]
* __[number]:__ position of the project in the list, with 3 digits. The smaller number is in the bottom of the list. exemple : _001_, _010_, _123_.
* __[name of project]:__ short name of the project

exemple of names: _001_mitsubishi_, _023_alza_.

## Create the project structure
In the project folder, create the file _structure.json_ .

here is an exemple of the structure of the  file:
```
{
    "title": "Nani Nails",
    "subtitle": { "en":"1st store", "fr": "1ère boutique", "cz":"1. obchod"},
    "mainImageH": "nani-nails_h.webp",
    "mainImageV": "nani-nails_v.webp",
    "mainImageAlt": {
        "en": "Nani Nails shop interior",
        "fr": "Intérieur de la boutique Nani Nails",
        "cz": "Interiér obchodu Nani Nails"
    },
    "images": [
        {
        "image": "nani-nails_1.webp",
            "alt": {
            "en": "Nani Nails central stand",
            "fr": "Gondole centrale Nani Nails",
            "cz": "Stojan Nani Nails"
            }
        },
        {
        "image": "nani-nails_2.webp",
            "alt": {
            "en": "Nani Nails counter",
            "fr": "Comptoir Nani Nails",
            "cz": "Pult Nani Nails"
            }
        },
        {
        "image": "nani-nails_3.webp",
            "alt": {
            "en": "Nani Nails podium",
            "fr": "Podium Nani Nails",
            "cz": "Podium Nani Nails"
            }
        },
        {
        "image": "nani-nails_4.webp",
        "alt": {
            "en": "Nani Nails samples",
            "fr": "Échantillons Nani Nails",
            "cz": "Vzorky Nani Nails"
            }
        },
        {
        "image": "nani-nails_5.webp",
            "alt": {
            "en": "Nani Nails shelf",
            "fr": "Tablette Nani Nails",
            "cz": "Produkty Nani Nails"
            }   
        }
    ]
}
```

## Create the project descriptions
In the project folder, create 3 files for the description of the 3 languages:
* en.md
* fr.md
* cz.md

The description have to be writen in the __MarkDown__ format.








