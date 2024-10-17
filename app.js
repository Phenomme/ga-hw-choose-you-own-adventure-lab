const prompt = require("prompt-sync")();
const username = prompt("What is your name? ");
console.log(`Your name is ${username}`)
    // Player's initial stats
    let inventory = [];
    let money = 50; // Starting with $50
    let health = 100; // Starting health

    // Determine if the player's name starts with the first half of the alphabet (A-M) or the second half (N-Z)
    let firstLetter = username.charAt(0).toUpperCase();
    let isFirstHalf = firstLetter >= 'A' && firstLetter <= 'M';
    let isSecondHalf = firstLetter >= 'N' && firstLetter <= 'Z';

    // Introduction
    console.log("You stand before a mysterious land filled with danger, treasures, and a legendary dragon awaiting challengers.");

    // First Choice: The path selection
    let path = prompt("Do you choose the 'forest', 'mountain', or 'castle', path?");
    
    // Forest Path
    if (path === 'forest' || path === 'Forest') {
        let forestChoice = prompt("You hear rustling in the bushes. Do you 'investigate' or 'ignore' it?");
        if (forestChoice === 'investigate' || forestChoice === 'Investigate') {
            let forestAction = prompt("A wild animal appears! Do you 'run' or 'fight'?");
            if (forestAction === 'run' || forestAction === 'Run') {
                if (isFirstHalf) {
                    console.log("You escape quickly and without injury. Good instincts!");
                } else {
                    console.log("You escape, but trip along the way and lose some stamina.");
                    health -= 10; // Less favorable outcome
                }
            } else if (forestAction === 'fight' || forestAction === 'Fight') {
                if (isFirstHalf) {
                    console.log("You bravely fight the animal and find treasure! You've gained a health potion and some gold.");
                    inventory.push('health potion');
                    money += 50;
                } else {
                    console.log("You manage to fight off the animal, but you sustain injuries. You find a small health potion.");
                    inventory.push('small health potion');
                    health -= 20;
                }
            } else {
                console.log("You freeze in panic and the animal chases you away. You lose health.");
                health -= 30;
            }
        } else if (forestChoice === 'ignore' || forestChoice === 'Ignore') {
            if (isFirstHalf) {
                console.log("You wisely ignore the noise and move deeper into the forest. You find a hidden treasure chest!");
                money += 100;
            } else {
                console.log("You ignore the noise, but miss an opportunity to find something valuable.");
                money += 30;
            }
        }

        // Connect to River Path from Forest
        let continueToRiver = prompt("Do you want to continue to the river? 'yes' or 'no'");
        if (continueToRiver === 'yes' || continueToRiver === 'Yes') {
            path = 'river'; // Redirect to the river path logic below
        }
    }

    // Mountain Path
    if (path === 'mountain' || path === 'Mountain') {
        let mountainChoice = prompt("The mountain path is steep. Do you 'climb' the rocky wall or follow the 'trail'?");
        if (mountainChoice === 'climb' || mountainChoice === 'Climb') {
            if (isFirstHalf) {
                console.log("You climb the mountain easily and find rare gems along the way. Your agility serves you well!");
                money += 100;
                inventory.push('rare gem');
            } else {
                console.log("The climb is tough, and you slip a few times. You make it, but sustain some injuries.");
                health -= 30;
            }
        } else if (mountainChoice === 'trail' || mountainChoice === 'Trail') {
            let trailAction = prompt("You encounter a mysterious traveler. Do you 'talk' to them or 'ignore' them?");
            if (trailAction === 'talk' || trailAction === 'Talk') {
                if (isFirstHalf) {
                    console.log("The traveler offers you a rare artifact for free! You graciously accept.");
                    inventory.push('rare artifact');
                } else {
                    console.log("The traveler offers you an artifact for 20 gold. You consider it carefully.");
                    if (money >= 20) {
                        let buyArtifact = prompt("Do you buy the artifact? 'yes' or 'no'");
                        if (buyArtifact === 'yes' || buyArtifact === 'Yes') {
                            money -= 20;
                            inventory.push('artifact');
                            console.log("You bought the artifact and added it to your inventory.");
                        } else {
                            console.log("You decided not to buy the artifact and continued on your journey.");
                        }
                    } else {
                        console.log("You don't have enough money to buy the artifact, so you continue on your journey.");
                    }
                }
            } else if (trailAction === 'ignore' || trailAction === 'Ignore') {
                console.log("You ignore the traveler and continue, missing out on a potential opportunity.");
            }
        }

        // Connect to Cave Path from Mountain
        let continueToCave = prompt("Do you want to continue to the cave? 'yes' or 'no'");
        if (continueToCave === 'yes' || continueToCave === 'Yes') {
            path = 'cave'; // Redirect to cave path logic below
        }
    }

    // Castle Path
    if (path === 'castle' || path === 'Castle') {
        let castleChoice = prompt("You approach a grand castle. Do you 'enter' or 'sneak' in?");
        if (castleChoice === 'enter' || castleChoice === 'Enter') {
            if (isFirstHalf) {
                console.log("The guards welcome you inside. You are given a royal banquet and a treasure chest full of gold.");
                money += 150;
            } else {
                console.log("The guards are suspicious, but let you enter. You find a small treasure chest with 50 gold.");
                money += 50;
            }
        } else if (castleChoice === 'sneak' || castleChoice === 'Sneak') {
            let sneakChoice = prompt("You sneak into the castle. Do you 'explore' the throne room or the 'dungeon'?");
            if (sneakChoice === 'explore' || sneakChoice === 'Explore') {
                console.log("You find the king's hidden treasure stash! You've gained 200 gold.");
                money += 200;
            } else if (sneakChoice === 'dungeon' || sneakChoice === 'Dungeon') {
                console.log("You encounter prisoners and decide to help them. They reward you with a magical sword.");
                inventory.push('magical sword');
            }
        }

        // **New: Finding the Magical Ring**
        let ringChoice = prompt("In the castle dungeon, you find a mysterious glowing ring. Do you 'take' the ring or 'leave' it?");
        if (ringChoice === 'take' || ringChoice === 'Take') {
            console.log("You've acquired the magical ring.");
            inventory.push('magical ring');
        }

        // Connect to River or Cave Path from Castle
        let continueTo = prompt("Do you want to continue to the 'river' or 'cave'?");
        if (continueTo === 'river' || continueTo === 'River') {
            path = 'river';
        } else if (continueTo === 'cave' || continueTo === 'Cave') {
            path = 'cave';
        }
    }

    // River Path
    if (path === 'river' || path === 'River') {
        console.log("You follow the river, navigating the waters carefully. Along the way, you find a treasure chest floating by.");
        money += 50;
        inventory.push('water-proof pouch');
        
        let riverContinue = prompt("Do you want to continue to the 'castle' or 'mountain'?");
        if (riverContinue === 'castle' || riverContinue === 'Castle') {
            path = 'castle';
        } else if (riverContinue === 'mountain' || riverContinue === 'Mountain') {
            path = 'mountain';
        }
    }

    // Cave Path
    if (path === 'cave' || path === 'Cave') {
        console.log("You enter a dark and damp cave. It's dangerous but filled with treasures. You find a large treasure chest.");
        money += 200;
        inventory.push('golden goblet');

        let caveContinue = prompt("The cave has many tunnels. Do you want to exit towards the 'forest', 'mountain', or 'castle'?");
        if (caveContinue === 'forest' || caveContinue === 'Forest') {
            path = 'forest';
        } else if (caveContinue === 'mountain' || caveContinue === 'Mountain') {
            path = 'mountain';
        } else if (caveContinue === 'castle' || caveContinue === 'Castle') {
            path = 'castle';
        }
    }

    // Final Challenge: The Dragon
    console.log("Suddenly, you hear a loud roar. The legendary dragon appears!");

    let dragonChoice = prompt("Do you 'fight' the dragon or 'run'?");
    if (dragonChoice === 'fight' || dragonChoice === 'Fight') {
        if (inventory.includes('magical sword')) {
            console.log("With the power of your magical sword, you slay the dragon!");
        } else if (inventory.includes('health potion') || inventory.includes('rare gem')) {
            console.log("You fight bravely but get injured. Thankfully, your health potion helps you survive and defeat the dragon.");
            health -= 50;
        } else {
            console.log("You fight courageously, but without powerful items, you fall to the dragon.");
            health -= 100; // Defeat if unprepared
        }
    } else if (dragonChoice === 'run' || dragonChoice === 'Run') {
        console.log("You flee from the dragon, saving your life but missing out on glory.");
    }

    //  Magical Ring and the Princess
    if (inventory.includes('magical ring') && isSecondHalf) {
        console.log("The magical ring grants you the right to marry the princess!");
    } else if (inventory.includes('magical ring')) {
        console.log("The Kindom celebrates you!");
    } else {
        
    }

    // End of the adventure
    console.log(`Thanks for playing, ${username}!`);
