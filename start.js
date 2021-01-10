const crypto = require('crypto');
const chalk = require('chalk')
let algorithm = String
algorithm = "aes-256-cbc";
const iv = crypto.randomBytes(16);
const key1 = 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3'
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function encrypt() {
    rl.question("What would you like to encrypt? ", function (msg) {
        const encrypt1 = (text) => {
    
            const cipher = crypto.createCipheriv(algorithm, key1, iv);
        
            const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
        
            return {
                iv: iv.toString('hex'),
                content: encrypted.toString('hex')
            };
        };
    
    
        console.log()
        console.log(chalk.redBright("CLASSIFIED BEFORE |"), msg)
        console.log()
        console.log(chalk.greenBright("CLASSIFIED AFTER |"), encrypt1(msg))
        console.log()
        rl.close()
    });
}

async function decrypt() {
    rl.question("What do you want to decrypt? ", function(hash) {
        rl.question("What is the key? ", function(code) {

            const decrypt1 = (hash) => {

                const decipher = crypto.createDecipheriv(algorithm, code, Buffer.from(hash.iv, 'hex'));
                const decrpyted = Buffer.concat([decipher.update(Buffer.from(hash.content, 'hex')), decipher.final()]);
                return decrpyted.toString();
        
            };
        
            console.log()
            console.log(chalk.redBright("CLASSIFIED BEFORE |"), hash)
            console.log()
            console.log(chalk.greenBright("CLASSIFIED AFTER |"), decrypt1(hash))
            console.log()

            rl.close()
        })
    })
}

rl.question("Would you like to encrypt a message or decrypt a message? ", function(choice) {
    if (choice.toLowerCase() === 'encrypt') {
        encrypt()
    } else if (choice.toLowerCase() === 'decrypt') {
        decrypt()
        
    } else {
        console.log(chalk.red("You need to say 'encrypt' or 'decrypt' !"))
        rl.close()
        return
    }
})
