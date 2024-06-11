import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';

export const User = sequelize.define(
	'user',
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		username: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		lastname: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		boss: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		tableName: 'users',
		timestamps: false,
	}
);

export default User;
