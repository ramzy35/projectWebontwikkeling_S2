import { Card } from "./interfaces";
import * as cardData from './cards.json';
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
                card.id === choiceId
            });
            // console.log(`\n- ${found.name} (${found.id})`);
            // console.log(`- Description: ${found.description}`);
            // console.log(`- powerLevel: ${found.powerLevel}`);
            // console.log(`- isLegendary: ${found.isLegendary}`);
            // console.log(`- rarity: ${found.rarity}`);
            // console.log(`- manaCost: ${found.manaCost}`);
            // console.log(`- cardGame: ${found.cardGame}`);
            // console.log(`- cardSet: ${found.cardSet}`);
            // console.log(`- abilities: ${found.abilities.join(', ')}`);
            // console.log(`- faction: ${found.faction.name}`);
            // console.log(`- alignment: ${found.faction.alignment}`);
            // console.log(`- foundedYear: ${found.faction.foundedYear}`);
            // console.log(`- isSecretSociety: ${found.faction.isSecretSociety}`);
            break;

        case "3":

            break;
    
        default:
            break;
    }
}



// readline.question("\nplease enter your choice", (choice: string ) => {
//     if (choice === '1') {
//         char.forEach((card) => {
//             console.log(`\n- ${card.name} (${card.id})`)
//         })
//     }
// })
