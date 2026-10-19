# Waypoint — brief projet

## Contexte
Projet réalisé pour un **atelier AdonisJS noté** : 2 séances de 3h30, avec une présentation de 5 min à la fin de la séance 2.
**Temps de dev réel : ~4h25** (2h40 en séance 1, 1h45 en séance 2). Le reste part en setup, README et présentations.
L'IA est autorisée, mais **je doit pouvoir expliquer tout le code** à l'oral : modèles, routes, contrôleurs, gestion des données.
### Règles primaires (+checklist personnelle)
- Privilégier un code simple et lisible plutôt qu'astucieux.
- Expliquer brièvement chaque choix technique.
- Avancer par petites étapes, avec des commits réguliers.

## Le projet
**Waypoint** est un logbook de vols en simulateur, « un Strava pour les flight simmers ».
On enregistre ses vols : départ, arrivée, appareil, durée, date, notes, bonus le plan de vol. On les voit sur une carte, et on consulte ses stats.

## Contraintes imposées par le sujet (obligatoires)
- **AdonisJS** comme backend. Projet créé avec le starter kit React : `npm create adonisjs@latest waypoint -- --kit=react`, donc Inertia + React.
- **Une base de données : SQLite.**
- **Lucid ORM** pour manipuler les données : modèles, migrations, seeders, relations.
- **Des routes et des contrôleurs** dans `start/routes.ts`, avec des contrôleurs ressource.
- **Un CRUD complet** : créer, consulter, modifier et supprimer des vols.
- **VineJS** pour valider les données.
- **Une interface utilisable**, ici des pages React via Inertia.
- **Un README.md** qui contient : nom et objectif, fonctionnalités, technologies, installation et lancement, et un retour sur l'usage de l'IA (outils, avantages, difficultés, erreurs corrigées).
- **Dépôt GitHub public** : ne jamais committer `.env`, de clé API ou la base `.sqlite`.

## Contraintes imposées par la nature du projet:
- **système d'authentification**: déjà mis sur l'init de Adonis, la nature de projet donne sens à avoir un système d'authentification. 
- **Relations**: Créer les relation entre User et flights. 
- **Sécurité**: Vérifier que les routes sont toujours protégées. Sinon lors d'un prompt, ne pas hésiter à fix et alerter. 

## Modèle de données (MVP)
**Airport** : données de référence, seedées et non éditables par l'utilisateur.
- `id`, `icao` (string, unique, 4 caractères), `name`, `city`, `country`, `latitude`, `longitude`

**Flight**
- `id`, `departure_airport_id` (FK vers Airport), `arrival_airport_id` (FK vers Airport)
- `aircraft` (string, par ex. « A320 », sans modèle séparé pour le MVP)
- `flown_on` (date), `duration_minutes` (int), `notes` (text, nullable), timestamps
- Relations Lucid : `Flight` a `belongsTo` vers `departure` et vers `arrival`.

## Sources de données
- **Aéroports** : dataset gratuit **OurAirports** (`airports.csv`). Garder uniquement les `large_airport` et `medium_airport` qui ont un code OACI valide, puis l'importer via un **seeder Lucid**. Garder le CSV filtré dans le repo, sous une taille raisonnable.
- **Carte** : `leaflet` + `react-leaflet` avec les tuiles OpenStreetMap, en affichant l'attribution OSM obligatoire. Les trajets se tracent en polylignes entre les coordonnées des aéroports.
- **SimBrief (BONUS uniquement, en dernier)** : l'endpoint public renvoie le **dernier** plan de vol d'un username. Il sert à pré-remplir le formulaire, pas à importer un historique. Appel **côté Adonis**, pas depuis le navigateur. Vérifie la doc SimBrief pour l'URL et les paramètres exacts.

## Validation VineJS (points à montrer)
- Les codes de départ et d'arrivée doivent **exister dans la table airports**, via la règle `exists` que Lucid ajoute à VineJS.
- L'arrivée doit être différente du départ initial (possible diversion, rajouter un champs en bdd nullable "old_arrival"/"old_departure").
- `duration_minutes` doit être un entier positif borné, par exemple entre 1 et 1200.
- `flown_on` doit être une date valide, pas dans le futur.

## Fonctionnalités, par ordre de priorité
1. CRUD des vols (liste, détail, création, édition, suppression), avec validation.
2. Seeder des aéroports.
3. Distance de chaque vol calculée avec la **formule de haversine** à partir des coordonnées (petite logique métier à expliquer en présentation).
4. Carte de tous les trajets, plus la carte d'un vol sur sa page de détail.
5. Dashboard de stats : nombre de vols, heures totales, distance totale, aéroports visités, appareil le plus utilisé.
6. Bonus : import SimBrief, filtres et recherche, auth.

Le fonctionnement de l'application principale passe avant tout bonus.

## Direction artistique
Univers aéronautique, avec quelques pistes :
- esthétique carte de navigation aérienne ;
- vols présentés comme des **cartes d'embarquement** ;
- historique façon **tableau des départs split-flap** ;
- chiffres en police monospace.

Romain aime le design UX/UI : propose une structure propre et laisse-le piloter les choix visuels.

## Repo
- Nom : `waypoint`
- Description : « Strava for flight simmers, a logbook built with AdonisJS and React. »