const { updateReadingList, resp } = require('../JS/index')

jest.mock("../JS/index")

it("Returning a fetch call function with google link", async () => {
    await fetch('https://www.googleapis.com/books/v1/volumes?q=')
    expect(resp).toHaveLinkTo('https://www.googleapis.com/books/v1/volumes?q=');
});