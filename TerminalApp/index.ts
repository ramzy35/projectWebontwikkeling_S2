import { Card } from "./interfaces";
import cardData from './cards.json';
import * as readline from 'readline-sync';
import { parse } from "path";


function displayMenu(): void {
    console.log ("\nwelcome to jsjon data viewer");
    console.log("1. view all data");
    console.log("2. filter by id ");
    console.log("3. exit");
    promtUser();
}

function promtUser(): void {
    const res = readline.question("\nplease enter your choice");
    switch (res) {
        case "1":
            cardData.forEach(card => {
                console.log(`\n- ${card.name} (${card.id})`);
            });

            displayMenu();
            break;
        case "2":
            const choiceId = readline.question("\nPlease enter the id you want to filter by: ");
            const found: Card[] = cardData.filter(card => {
                return card.id === choiceId
            });
            if (found.length === 0 ) {
                console.log("No cards found with that ID")
            }else {
            console.log(`\n- ${found[0].name} (${found[0].id})`);
            console.log(`- Description: ${found[0].description}`);
            console.log(`- powerLevel: ${found[0].powerLevel}`);
            console.log(`- isLegendary: ${found[0].isLegendary}`);
            console.log(`- rarity: ${found[0].rarity}`);
            console.log(`- manaCost: ${found[0].manaCost}`);
            console.log(`- cardGame: ${found[0].cardGame}`);
            console.log(`- cardSet: ${found[0].cardSet}`);
            console.log(`- abilities: ${found[0].abilities.join(', ')}`);
            console.log(`- faction: ${found[0].faction.name}`);
            console.log(`- alignment: ${found[0].faction.alignment}`);
            console.log(`- foundedYear: ${found[0].faction.foundedYear}`);
            console.log(`- isSecretSociety: ${found[0].faction.isSecretSociety}`);
            }
            break;

        case "3":

            break;
    
        default:
            break;
    }
}

displayMenu();



// readline.question("\nplease enter your choice", (choice: string ) => {
//     if (choice === '1') {
//         char.forEach((card) => {
//             console.log(`\n- ${card.name} (${card.id})`)
//         })
//     }
// })
