import Account from "./account.js"

// Something like that could be used too
export function createNewAccount(attributes) {
    return new Account(attributes);
}
