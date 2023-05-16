const contacts = require("./contacts");
const { Command } = require("commander");

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const date = new Date();
console.log(`Today is ${date.getDate()}`);

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const listContact = await contacts.listContact();
      return console.table(listContact);
    case "get":
      const contact = await contacts.getContactById(id);
      return console.log(contact);
    case "add":
      const newContact = await contacts.addContact({ name, email, phone });
      return console.log(newContact);
    case "remove":
      const deleteContact = await contacts.delContact(id);
      return console.log(deleteContact);
    case "change":
      const removeContact = await contacts.removeContact(id, {
        name,
        email,
        phone,
      });
      console.log(removeContact);
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

invokeAction(argv);
