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

router.get('/retail/:locale', [RetailController, 'show']).as('retail-show')
router.get('/retail', [RetailController, 'index']).as('retail')

router.get('/research/:locale', [ResearchController, 'show']).as('research-show')
router.get('/research', [ResearchController, 'index']).as('research')

router.get('/contact/:locale', [ContactController, 'show']).as('contact-show')
router.get('/contact', [ContactController, 'index']).as('contact')

router.get('/locale/:locale', [LanguageController, 'index']).as('locale')

router.get('/:locale', [HomeController, 'show']).as('home-show')
router.get('/', [HomeController, 'index']).as('home')
