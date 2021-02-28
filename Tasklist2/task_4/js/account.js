// (a) Account Factory + (d) Initializing Fields + (b) Additional Fields
export const Account = (account_number, date_created, currency) => {

    // (d) All fields below and above are not exposed publicly
    let balance = 0;

    const debit = (amount) => {
        if (amount < 0) { throw new Error(`Illegal amount.`); }
        if (balance < amount) { throw new Error(`Insufficient account balance.`); }

        balance -= amount;
        return balance;
    };

    const credit = (amount) => {
        if (amount < 0) { throw new Error(`Illegal amount.`); }

        balance += amount;
        return balance;
    }

    // (e) Logging all fields and returning them as an object.
    const info = () => {
        console.log(`Account [${account_number}]: ${balance}${currency} (${date_created})`)
        return { account_number, date_created, currency, balance };
    }

    // (c) Fields from "b" and "balance" are out of scope
    return { debit, credit, info };
};

export default Account;

// Below is a function that hints more explanations

function task_test() {
    // (a) Can create multiple accounts + (d) Can init with Values
    const account_no_1 = Account(100, "27-02-2021", "PLN");
    const account_no_2 = Account(101, "28-02-2021", "GBP");

    // (c)
    console.log(account_no_1.info());       // Is:    Account [1]: 0PLN (28-02-2021)
    account_no_1.currency = "XD";           // Won't work.
    console.log(account_no_1.info());       // Still: Account [1]: 0PLN (28-02-2021)
    account_no_1.info().currency = "XD";    // Won't work either.
    console.log(account_no_1.info());       // Still: Account [1]: 0PLN (28-02-2021)

    // Can use debit/credit functions
    console.log(account_no_2.info());
    account_no_2.credit(15);
    console.log(account_no_2.info());
    account_no_2.debit(10);
    console.log(account_no_2.info());       // These two are different objects
    console.log(account_no_1.info());       // They do not share same balance field for ex.
    // account_no_2.debit(20);              // Err: Insufficient account balance.
}