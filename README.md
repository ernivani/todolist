# TodoList - Instructions de Configuration

Ce fichier README fournit les instructions pour configurer et lancer le projet TodoList. Ce projet est construit avec un framework JavaScript personnalisé et utilise Babel pour la compilation de JSX.

## Prérequis

Pour exécuter le projet, assurez-vous d'avoir les éléments suivants installés sur votre machine :

- [Node.js](https://nodejs.org/) : Optionnel, pour exécuter le serveur.
- [Extension Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) : Optionnelle mais recommandée pour exécuter le projet dans Visual Studio Code.

## Pour Commencer

1. **Cloner le Dépôt**

   Clonez ce dépôt sur votre machine locale :
   ```sh
   git clone https://github.com/ernivani/nowledgeable.git
   cd nowledgeable
   ```

2. **Installer les Dépendances**

   Ce projet ne nécessite pas de dépendances NPM supplémentaires pour le front-end. Cependant, nous recommandons d'installer les outils de développement suivants pour une configuration plus fluide :
   
   - **http-server** : Un moyen simple de servir des fichiers statiques.

   Vous pouvez l'installer globalement avec :
   ```sh
   npm install -g http-server
   ```

3. **Démarrer un Serveur Local**

   Ce projet nécessite que les fichiers soient servis via un serveur HTTP pour éviter les problèmes CORS. Vous pouvez utiliser l'une des méthodes suivantes pour exécuter un serveur local :

   ### Option 1 : Utiliser http-server (Recommandé)
   
   Exécutez la commande suivante depuis le répertoire du projet :
   ```sh
   http-server
   ```
   Par défaut, cela lancera un serveur sur `http://localhost:8080`. Ouvrez cette URL dans votre navigateur pour voir l'application TodoList.

   ### Option 2 : Extension Live Server de VS Code

   Si vous utilisez Visual Studio Code, vous pouvez installer l'extension **Live Server**. Faites un clic droit sur `index.html` et sélectionnez **"Open with Live Server"**. Cela démarrera un serveur et ouvrira l'application dans votre navigateur par défaut.

## Lancer l'Application

Une fois le serveur lancé, ouvrez votre navigateur et naviguez à l'URL du serveur local (par exemple, `http://localhost:8080`). Vous devriez voir l'application TodoList, où vous pouvez ajouter, basculer et supprimer des tâches.

## Fichiers du Projet

- **index.html** : Le point d'entrée de l'application, chargeant `framework.js` et `app.js`.
- **framework.js** : Une bibliothèque JavaScript personnalisée qui fournit des fonctions similaires à JSX avec `createElement` et une gestion basique de l'état.
- **app.js** : Contient la classe `TodoApp` qui implémente la logique principale de la TodoList.

## Dépannage

- **Problèmes de CORS** : Si vous ouvrez `index.html` directement depuis le système de fichiers (c'est-à-dire avec une URL `file://`), vous rencontrerez des problèmes de CORS lors du chargement de `framework.js` et `app.js`. Utilisez toujours un serveur local comme indiqué ci-dessus.

- **Erreurs JavaScript** : Vérifiez la console du navigateur pour d'éventuelles erreurs JavaScript si l'application ne se charge pas correctement. Cela peut souvent donner des indices sur ce qui a mal tourné.

