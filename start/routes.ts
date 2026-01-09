/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
const LanguageController = () => import('#controllers/language_controller')
const ResearchController = () => import('#controllers/research_controller')
const ContactController = () => import('#controllers/contact_controller')
const RetailController = () => import('#controllers/retail_controller')
const HomeController = () => import('#controllers/home_controller')

router.get('/retail', [RetailController, 'index']).as('retail')
router.get('/retail/:lang', [RetailController, 'show']).as('retail-show')

router.get('/research', [ResearchController, 'index']).as('research')
router.get('/research/:lang', [ResearchController, 'show']).as('research-show')

router.get('/contact', [ContactController, 'index']).as('contact')
router.get('/contact/:lang', [ContactController, 'show']).as('contact-show')

router.get('/locale/:lang', [LanguageController, 'index']).as('locale')

router.get('/', [HomeController, 'index']).as('home')
router.get('/:lang', [HomeController, 'show']).as('home-show')
