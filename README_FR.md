# White list , Merkle tree , Solidity and Dapp

Que de mots dans ce titre  agicheur  , résumons ici ce qui est décit dans lignes de cette article.

**_La petite histoire sous jacente à ce petit projet de démontration :_** 
Vous êtes le développeur d'un projet de NFT en charge de tout la partie technique , et les gars du marketing vous shoot un fichier 
excel contenant les adresses et le nombre de NFT  possible à mint par personne.

![This is an image](./mdimages/excel.png)


A partir ce cette petite mise en bouche nous allons explorer le pourquoi et le comment de ce besoin.


<hr/>

## Comment limiter l'accès à une méthode de votre "smartcontract" à certaine adresses

### Solidity mapping 
Un technique simple et efficace serait de créer un simple mapping _allowlist_, et d'y ajouter sans hésitations le contenu de votre fichier excel. 
Cela est possible , focntionne bien mais reste relativement couteux en gaz et vous nécéssite en cas de volumes importants de faire un traitement par lot pour éviter le OOG (out of gaz )

ps : nous n'allons pas retenir cette solution pour notre démontration.

### Merkle tree

l'autre approche est d'utiliser le merkel tree , dont je vais résumer le principe simplement ( peux-être trop )
c'est une technique qui permet à partir d'une liste de
- Générer un clé globale
- une preuve par élement de la liste.
la combinaison de ces deux élements pouvant être validé mathématiquement, prouvant indéniablement que l'élément fait partie de la liste.

ps : libre à vous d'aller vous instruire sur les merveilles mathématique qui se cache derrière cette triste restitution.(cf. Ressources)

Tout l'intérêt de cette approche c'est qu'il nous suffit maintenant de stocker un simple clé la "merkleRoot" sur notre smart contract ,
ce qui est économiquement bien plus profitable.
Ce qui à aussi  secondairement l'avantage de masquer la liste des adresses WL au yeux de tous.




<hr/>

# Ressources 

## links 


##images 

thanks :
<a href="https://pixabay.com/fr/users/denisdoukhan-607002/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1164424">Denis Doukhan</a> de <a href="https://pixabay.com/fr/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1164424">Pixabay</a>
