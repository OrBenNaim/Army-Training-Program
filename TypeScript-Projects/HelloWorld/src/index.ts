import * as readline from 'readline';

class Greeter {

    // The greeter method defined as static because 
    static greet(name: string): string {
        return `Hello, ${name}!`;
    }
}


function main(): void {

    // Importing 'readline' to handle user input from the console
    const readLine = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    readLine.question('Enter your name: ', (name: string) => {
        console.log(Greeter.greet(name));
        readLine.close();
    });
}

// Call the main function
main();