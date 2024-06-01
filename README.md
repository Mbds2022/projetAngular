# Angular Assignments 

## Description

Ce projet est une application de gestion des assignments développée avec Angular et intégrée à une base de données MongoDB. Il inclut plusieurs fonctionnalités avancées, telles qu'une barre d'outils, une barre latérale, une gestion de l'authentification codée en dur, et des améliorations esthétiques pour une meilleure expérience utilisateur.

## Fonctionnalités

- **Toolbar et Sidebar/Sidenav** : Ajout d'une barre d'outils et d'une barre latérale pour une meilleure navigation.
- **Gestion des utilisateurs** : Authentification avec login/password codée en dur.
- **Propriétés étendues pour les Assignments** :
  - Auteur (nom ou photo de l'élève)
  - Matière (avec image associée et photo du prof)
  - Note sur 20
  - Remarques
- **Affichage amélioré des Assignments** : Utilisation de Material Cards, affichage des détails de chaque assignment, etc.
- **Administration** : Seul l'administrateur peut modifier ou supprimer les assignments.
- **Hébergement** : Application hébergée sur [render.com](https://render.com).

## Installation

### Prérequis

- Node.js
- Angular CLI
- MongoDB

### Étapes

1. **Cloner le dépôt** :

    ```bash
    git clone https://github.com/Mbds2022/Angular_Back.git
    cd Angular_Back
    ```

2. **Installer les dépendances** :

    ```bash
    npm install
    ```

3. **Configurer la base de données** :

    - Assurez-vous que MongoDB est installé et en cours d'exécution.
    - Créez une collection `assignments` pour gérer les assignments.

4. **Démarrer le serveur** :

    ```bash
    ng serve
    ```

    L'application sera accessible à l'adresse local: `http://localhost:4200` | hebergé: `https://angular-front-ddfj.onrender.com`.

## Utilisation

### Authentification

- L'application utilise une liste de login/passwords codée en dur pour l'authentification. Vous pouvez modifier le service d'authentification pour ajouter ou supprimer des utilisateurs.
- Pour une meilleure gestion des utilisateurs, vous pouvez étendre cette fonctionnalité pour utiliser une collection `users` dans MongoDB et valider les utilisateurs via cette collection.
- Pour une sécurité accrue, nous pouvons implémenter l'authentification avec JSON Web Tokens (JWT) à l'avenir.

### Administration

- Seul l'utilisateur ayant le rôle `admin` peut modifier ou supprimer les assignments. Il faut s'assurer de configurer les utilisateurs avec les rôles appropriés dans le service d'authentification codé en dur.


## Améliorations futures

- Implémentation de l'authentification via JWT.
- Ajout de tests unitaires et de tests d'intégration pour assurer la qualité du code.
- Optimisation des performances et amélioration de l'expérience utilisateur.


## Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus d'informations.

## Remerciements

Merci à tous les contributeurs qui ont aidé à développer ce projet !
M. Buffa,
Nos camarades de classe,
...
