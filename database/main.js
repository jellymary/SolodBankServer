const sql = require('sqlite3');

const db = new sql.Database(":memory:");

db.run('CREATE TABLE AnyBankForm(cardNumber nchar(16), cardDate nchar(5), cardCVC nchar(3), sum int, comment text, email text)');

function insertAnyBankFormTable({cardNumber, cardDate, cardCvc, sum, comment, email}) {
    insert('AnyBankForm', cardNumber, cardDate, cardCvc, sum, comment, email);
    print();
}

function insert(tableName, ...args){
    db.serialize(function () {
        const stm = db.prepare(`INSERT INTO ${tableName} VALUES (${
            '?'.repeat(args.length).split('').join(', ')
        })`);
        stm.run(args);
        stm.finalize();
    });

}

function print() {
    db.serialize(function(){
        db.each('SELECT * FROM AnyBankForm', (err, row) => {
            if (err) {
                console.error(err.message);
            }
            console.log([row.cardNumber, row.cardDate, row.cardCVC, row.sum, row.comment, row.email].join('\t'));
        });
    });
}


module.exports = {
    insertAnyBankFormTable
};
