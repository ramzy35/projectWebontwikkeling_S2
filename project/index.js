const fs = require('fs');

const char = JSON.parse(fs.readFileSync("./cards.json", "utf-8"));

function displayMenu() {
    console.log("\nwelcome to jsjon data viewer");
    console.log("1. view all data");
    console.log("2. filter by id ");
    console.log("3. exit");
    promtUser();
}

function promtUser() {
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });


    readline.question("\nplease enter your choice: ", (choice) => {
        if (choice === '1') {
            char.forEach(char => {
                console.log(`\n- ${char.name} (${char.id})`);
            });
            readline.close();
            displayMenu();
        } else if (choice === '2') {
            readline.question("\nplease enter the id you want to filter by: ", (id) => {
                const found = char.find(card => parseInt(card.id) === parseInt(id));
                if (found) {
                    console.log(`\n- ${found.name} (${found.id})`);
                    console.log(`- Description: ${found.description}`);
                    console.log(`- powerLevel: ${found.powerLevel}`);
                    console.log(`- isLegendary: ${found.isLegendary}`);
                    console.log(`- rarity: ${found.rarity}`);
                    console.log(`- manaCost: ${found.manaCost}`);
                    console.log(`- cardGame: ${found.cardGame}`);
                    console.log(`- cardSet: ${found.cardSet}`);
                    console.log(`- abilities: ${found.abilities.join(', ')}`);
                    console.log(`- faction: ${found.faction.name}`);
                    console.log(`- alignment: ${found.faction.alignment}`);
                    console.log(`- foundedYear: ${found.faction.foundedYear}`);
                    console.log(`- isSecretSociety: ${found.faction.isSecretSociety}`);
                } else {
                    console.log("No cards found with that ID.");
                }
                readline.close();
                displayMenu();
            });
        } else if (choice === '3') {
            console.log("Goodbye!");
            readline.close();
        } else {
            console.log("Invalid choice, try again.");
            readline.close();
            displayMenu();
        }
    });
}

displayMenu();