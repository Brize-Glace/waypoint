# ✈️ Waypoint

**Log your sim flights, map your routes, track your hours.**

Waypoint est un carnet de vol (*logbook*) pour pilotes de simulation : on y enregistre ses vols, on les retrouve sur une carte et on suit ses statistiques. En bref, un Strava pour les vols en simulateur.

> Projet réalisé dans le cadre de l'atelier AdonisJS en BUT 3 MMI, Université Gustave Eiffel.

## Sommaire

1. [Pourquoi ce projet ?](#pourquoi-ce-projet-)
   - [La simulation de vol, ce n'est pas « bouton décoller, bouton atterrir »](#la-simulation-de-vol-ce-nest-pas--bouton-décoller-bouton-atterrir-)
   - [VATSIM : un ciel partagé, avec de vrais contrôleurs](#vatsim--un-ciel-partagé-avec-de-vrais-contrôleurs)
   - [Les avions « moddés »](#les-avions--moddés---des-répliques-de-systèmes-pas-des-modèles-3d)
2. [Fonctionnalités](#fonctionnalités)
3. [Technologies](#technologies)
4. [Les notions AdonisJS utilisées](#les-notions-adonisjs-utilisées)
5. [Installation](#installation)
6. [Retour sur l'utilisation de l'IA](#retour-sur-lutilisation-de-lia)
7. [Glossaire](#glossaire)

---

## Pourquoi ce projet ?

### La simulation de vol, ce n'est pas « bouton décoller, bouton atterrir »

Quand on parle de simulateur de vol, on imagine souvent un jeu : on choisit un avion, on appuie sur une touche, on décolle. La simulation que je pratique est l'inverse. Elle cherche à **reproduire le métier de pilote de ligne** le plus fidèlement possible. Un vol se prépare comme dans la réalité :

- le plan de vol (route, niveaux, carburant) ;
- la météo réelle ;
- les calculs de performance au décollage ;
- les check-lists ;
- puis le démarrage de l'avion, interrupteur par interrupteur, à partir d'un cockpit entièrement éteint (*cold & dark*).

Un vol Paris → Nice dure environ 1h30, comme en vrai, et on ne peut pas le mettre en accéléré.

### VATSIM : un ciel partagé, avec de vrais contrôleurs

**VATSIM** (*Virtual Air Traffic Simulation Network*) est un réseau mondial et gratuit. Des milliers de pilotes y connectent leur simulateur dans un même espace aérien virtuel. Surtout, ce ciel est **géré par des contrôleurs aériens humains**, qui parlent à la radio avec les pilotes en utilisant la phraséologie aéronautique réelle.

Ce n'est pas ouvert à n'importe qui, n'importe comment :

- **Pour voler en tant que pilote**, tout nouveau membre doit d'abord suivre un module d'orientation et réussir un examen d'entrée (le rating **P0**). Ce n'est qu'après qu'on peut se connecter. Ensuite, des qualifications pilote optionnelles calquées sur la réalité (P1 « PPL », P2 « IR », etc.) se passent avec des organismes de formation agréés. Elles combinent théorie, cours avec instructeur et test pratique en vol.
- **Pour devenir contrôleur**, c'est encore plus exigeant. Il faut d'abord passer un examen théorique, puis suivre plusieurs sessions de formation pratique avec un mentor sur un serveur d'entraînement, puis réussir un examen pratique devant un examinateur. Chaque grade se débloque de cette façon :
  - **S1** : sol ;
  - **S2** : tour ;
  - **S3** : approche ;
  - **C1** : contrôle en route.

  Dans certaines régions, l'**attente avant de commencer la formation pratique** se compte en mois.

Résultat : quand on vole sur VATSIM, il faut connaître ses procédures. Le contrôleur en face s'attend à ce que l'on suive sa clearance, son départ et ses instructions comme un vrai équipage.

### Les avions « moddés » : des répliques de systèmes, pas des modèles 3D

Les avions fournis de base avec les simulateurs grand public (Microsoft Flight Simulator, X-Plane) sont volontairement simplifiés. La communauté utilise des **add-ons** (des avions « moddés ») développés par des studios spécialisés. Les plus poussés sont dits *study level* : leur objectif est de **simuler chaque système de l'avion réel**, à savoir :

- l'électricité ;
- l'hydraulique ;
- le carburant ;
- le pneumatique ;
- l'avionique ;
- les pannes.

Ils sont souvent conçus à partir de la documentation constructeur et avec l'aide de pilotes de ligne.

L'exemple de référence est le **Fenix A320**, une reproduction de l'Airbus A320. Quelques anecdotes montrent à quel point tout est simulé :

- **La clim des passagers « vole » de la poussée aux moteurs.** Sur un A320, la climatisation (les *packs*) fonctionne avec de l'air chaud prélevé directement dans les moteurs. Prélever cet air réduit la poussée disponible. C'est pourquoi beaucoup de compagnies coupent la clim pendant le décollage quand les performances sont justes. Dans le Fenix, le calculateur de performances de la tablette de bord demande si les packs seront allumés ou éteints, car le résultat change.
- **Les centrales inertielles prennent leur temps.** Au démarrage, les centrales de navigation (ADIRS) doivent s'aligner avant que l'avion sache où il est. Comme sur le vrai avion, cela prend environ 7 à 10 minutes, et le temps dépend de la latitude : c'est plus rapide près de l'équateur, plus lent près des pôles. C'est donc la toute première chose qu'on lance en arrivant dans le cockpit.

**WASM ou programme externe : où tourne le « cerveau » de l'avion ?**

Pour coder la logique de leurs systèmes, la plupart des add-ons de Microsoft Flight Simulator utilisent des modules WASM (WebAssembly). Ce sont des programmes compilés qui s'exécutent à l'intérieur du simulateur, dans un environnement isolé (sandbox) qu'il contrôle. C'est la même technologie qui permet de faire tourner du code compilé dans un navigateur web.

Le Fenix fait un choix différent. Ses systèmes tournent dans une application séparée, lancée sur le PC à côté du simulateur. Elle calcule toute la logique de l'avion et échange en continu avec le simulateur. Cette approche ne dépend pas des limites de la sandbox, et elle soulage le processus principal du simulateur. En contrepartie, l'avion est réservé au PC : il ne peut pas tourner sur Xbox, qui n'autorise pas de programme externe.

### Et donc, pourquoi un logbook ?

Les vrais pilotes tiennent un **carnet de vol** où ils consignent chaque vol : date, appareil, départ, arrivée, durée. Avec ce niveau d'implication, beaucoup de pilotes virtuels veulent la même chose : garder une trace de leurs vols, voir leurs routes sur une carte et suivre leurs heures. Waypoint répond à ce besoin.

---

## Fonctionnalités

- **Gestion des vols (CRUD)** : créer, consulter, modifier et supprimer un vol (départ, arrivée, appareil, date, durée, notes).
- **Validation des données** : les codes OACI doivent correspondre à un vrai aéroport, l'arrivée doit être différente du départ, la durée et la date doivent être cohérentes.
- **Base d'aéroports** : plusieurs milliers d'aéroports réels importés depuis le jeu de données ouvert OurAirports.
- **Calcul de distance (Hors MVP)** : la distance de chaque vol est calculée à partir des coordonnées des aéroports (formule de haversine).
- **Carte des trajets (Hors MVP)** : tous les vols tracés sur une carte interactive.
- **Statistiques** : nombre de vols, heures totales, distance totale, aéroports visités, appareil le plus utilisé.
- *(Bonus)* **Import SimBrief (Hors MVP)** : pré-remplir un vol à partir de son dernier plan de vol SimBrief.

---

## Technologies

| Rôle | Outil |
|---|---|
| Framework backend | [AdonisJS](https://docs.adonisjs.com/) (starter kit React) |
| Base de données | SQLite |
| ORM | [Lucid](https://lucid.adonisjs.com/docs/introduction) |
| Validation | [VineJS](https://vinejs.dev/docs/introduction) |
| Frontend | React, via Inertia.js |
| Carte | Leaflet / React Leaflet + tuiles OpenStreetMap |
| Données aéroports | [OurAirports](https://ourairports.com/data/) (domaine public) |

---

## Les notions AdonisJS utilisées

### Architecture MVC
- **Modèles** (`app/models`) : `Airport` et `Flight`, qui décrivent les données et leurs relations.
- **Contrôleurs** (`app/controllers`) : `FlightsController` gère le CRUD et `DashboardController` calcule les statistiques.
- **Vues** : des pages React (Inertia) qui reçoivent directement les données envoyées par les contrôleurs, sans API séparée.

### Routes
Les routes sont déclarées dans `start/routes.ts`. Le CRUD des vols utilise une **route ressource**. Une seule ligne génère les sept routes standard (`index`, `create`, `store`, `show`, `edit`, `update`, `destroy`), chacune reliée à la méthode correspondante du contrôleur.

### Lucid ORM
- **Migrations** : elles décrivent la structure des tables (`airports`, `flights`) et la versionnent comme du code.
- **Relations** : un vol appartient à un aéroport de départ et à un aéroport d'arrivée (`belongsTo`). Grâce au *preload*, on récupère les aéroports avec le vol en une seule requête.
- **Seeder** : il importe le fichier CSV des aéroports dans la base au lancement du projet.

### VineJS
Chaque formulaire passe par un **validator** avant d'arriver en base. Point notable : la règle `exists` (ajoutée à VineJS par Lucid) vérifie directement **en base de données** que le code OACI saisi correspond à un aéroport existant.

---

## Installation

**Prérequis :** Node.js en version LTS (22 ou 24 recommandé) et npm 11, ou pnpm.

```bash
git clone https://github.com/<user>/waypoint.git
cd waypoint
npm install
cp .env.example .env
node ace generate:key
node ace migration:run
node ace db:seed
npm run dev
```

L'application est ensuite accessible sur l'adresse affichée dans le terminal (par défaut `http://localhost:3333`).

---

## Retour sur l'utilisation de l'IA

**Outils utilisés :**
- Claude (chat) : Cadrage du périmètre.
- Claude Code : aide au développement (explications des notions etc.), avec un fichier `CLAUDE.md` qui lui donne le contexte du projet.

---

## Glossaire

| Terme | Signification |
|---|---|
| **OACI** | Organisation de l'aviation civile internationale. Le code OACI d'un aéroport fait 4 lettres (ex. `LFPG` pour Paris-CDG). |
| **Logbook** | Carnet de vol où le pilote consigne chacun de ses vols. |
| **VATSIM** | Réseau en ligne gratuit où des pilotes et des contrôleurs humains partagent un même ciel virtuel. |
| **Study level** | Niveau de simulation qui reproduit fidèlement tous les systèmes d'un avion réel. |
| **Packs** | Groupes de climatisation d'un avion de ligne, alimentés par de l'air prélevé dans les moteurs. |
| **ADIRS** | Centrales inertielles qui calculent la position, l'attitude et la vitesse de l'avion. |
| **SimBrief** | Outil de préparation de plans de vol, très utilisé en simulation. |