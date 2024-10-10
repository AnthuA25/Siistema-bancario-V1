import User from './User';
import Account from './Account';
import Transaction from './Transaction';

User.hasMany(Account, { foreignKey: 'id_user' });
Account.belongsTo(User, { foreignKey: 'id_user' });

Account.hasMany(Transaction, { foreignKey: 'id_account' });
Transaction.belongsTo(Account, { foreignKey: 'id_account' });
