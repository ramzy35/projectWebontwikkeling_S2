const fs = require('fs');

const autos = JSON.parse(fs.readFileSync("./dataset_auto's.json", "utf-8"));

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
            autos.forEach(autos => {
                console.log(`\n- ${autos.naam} (${autos.id})`);
            });
            readline.close();
            displayMenu();
        } else if (choice === '2') {
            readline.question("\nplease enter the id you want to filter by: ", (id) => {
                const found = autos.find(a => a.id === parseInt (id));
                if (found) {
                    console.log(`\n- ${found.naam} (${found.id})`);
                    console.log(`- Description: ${found.beschrijving}`);
                    console.log(`- prijs: ${found.prijs}`);
                    console.log(`- beschikbaar: ${found.beschikbaar}`);
                    console.log(`- bouwjaar: ${found.bouwjaar}`);
                    console.log(`- afbeelding: ${found.afbeeling}`);
                    console.log(`- brandstof: ${found.brandstof}`);
                    console.log(`- kenmerken: ${found.kenmerken.join(', ')}`);
                    console.log(`- fabrikanten: ${found.fabrikant.naam}`);
                    console.log(`- logo: ${found.fabrikant.logo}`);
                    console.log(`- opgericht: ${found.fabrikant.opgericht}`);
                } else {
                    console.log("No cars found with that ID.");
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