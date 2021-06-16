const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const fetch = require('node-fetch');
const readlineSync = require('readline-sync');



clear();

console.log(
    chalk.yellow(
        figlet.textSync('Jowel', { horizontalLayout: 'full' })
    )
);

bookList = [];
readingList = [];

const getBook = async(bookTitle) => {
    try {
        const resp = await fetch('https://www.googleapis.com/books/v1/volumes?q=' + bookTitle)
        const data = await resp.json()
        data.items.slice(0, 9)
            .forEach(id => {
                bookList.push(`Title: ${id.volumeInfo.title} ; ` + `Author: ${id.volumeInfo.authors}   `)
            })
    } catch (err) {
        console.log("Oh no! Something went wrong :(", err)
    }
}

const updateReadingList = (bookId) => {
    readingList.push(bookList[bookId])
    bookList.length = 0
    console.log("Book added in the list!\n")
}

const openClub = async() => {
    try {
        while (true) {
            const question = readlineSync.question("Welcome to Jowel's Book club!\n To search for a book - use key [1];\n To see your reading list - use key [2];\n To leave the store - use key [3]\n")
            if (question === "1") {
                const book = readlineSync.question("Type the book you are looking for\n")
                await getBook(book)
                const bookSelected = readlineSync.keyInSelect(bookList, "Which book do you want to add?\n")
                updateReadingList(bookSelected)
            } else if (question === "2") {
                if (readingList.length === 0) {
                    console.log("Nothing inside 🤷\n")
                } else {
                    console.log(`Your Reading List:\n${readingList.join("\n")}`)
                }
            } else {
                if (question === "3") {
                    console.log("Thank you and come again!\n");
                }
            }
        }
    } catch (err) {
        console.log("Oh no! Something went wrong :(", err)
    }

};


openClub();
