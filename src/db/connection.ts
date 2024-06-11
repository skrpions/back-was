import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('db_was', 'root', 'adminWas123', {
	host: 'localhost',
	dialect: 'mysql',
});

export default sequelize;
