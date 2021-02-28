window.addEventListener('load', main);

import { Account } from "./account.js";
const SEPARTOR = ', ';

// Calculation "Manager" with Guard Check for valid input.
function create_controls(account, info) {
    const container = document.getElementById('controls');
    const controls = document.createElement('div');
    let acc_info = account.info();

    controls.className = 'control';

    // Identifcator for each object is their account number
    const idx = document.createElement('span');
    idx.textContent = `#${acc_info.account_number}`;

    const button_info = document.createElement('button');
    button_info.textContent = 'Info';
    button_info.addEventListener('click', () => {
        let acc_info = account.info();
        info.textContent = `[#${acc_info.account_number}] Balance: ${acc_info.balance} ${acc_info.currency} | ${acc_info.date_created}`;
    });


    // Input for changing money by value
    const money_input = document.createElement('input');
    money_input.type = 'number'

    // Using Credit / Debit functions through buttons
    const button_credit = document.createElement('button');
    button_credit.textContent = 'Credit';
    button_credit.addEventListener('click', () => {
        const money = parseInt(money_input.value);
        try {
            account.credit(money);
            info.textContent = `Increased credit by: ${money} (now: ${account.info().balance})`;
        } catch (error) {
            info.textContent = error;
        }
    });

    const button_debit = document.createElement('button');
    button_debit.textContent = 'Debit';
    button_debit.addEventListener('click', () => {
        const money = parseInt(money_input.value);
        try {
            account.debit(money);
            info.textContent = `Decreased credit by: ${money} (now: ${account.info().balance})`;
        } catch (error) {
            info.textContent = error;
        }
    });


    // Spawning Elements
    controls.append(idx, button_info, money_input, button_credit, button_debit);
    container.append(controls);
}

function create_new_object(input_string) {
    const args = parse_arguments(input_string);
    const account = Account(args[0], args[1], args[2]);
    const info = document.getElementById('info');
    create_controls(account, info);
}

function parse_arguments(string) {
    if (!string.trim()) { return };
    const input = string
        .replace(/\s+/g, ' ')   // Multiple spaces/tabs -> one space
        .trim()                 // Trailing spaces removed
        .split(SEPARTOR)        // Split on space
    return input;
}



function main() {
    const create = document.getElementById('create');
    const args_input = document.getElementById('arguments_input');

    args_input.addEventListener('keyup', (event) => {
        event.preventDefault();
        if (event.key === 'Enter') {
            create_new_object(args_input.value)
        }
     });

    create.addEventListener('click', () => {
        create_new_object(args_input.value)
    });

    // task_test()
}
